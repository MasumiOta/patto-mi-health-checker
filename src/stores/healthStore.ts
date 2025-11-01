import { create } from 'zustand';
import { HealthRecord, UserSettings, PeriodOption } from '../types';
import {
  getHealthRecords,
  addHealthRecord as addHealthRecordToStorage,
  updateHealthRecord as updateHealthRecordInStorage,
  deleteHealthRecord as deleteHealthRecordFromStorage,
  getHealthRecordsByPeriod,
  getUserSettings,
  saveUserSettings as saveUserSettingsToStorage,
  clearAllData as clearAllDataFromStorage,
} from '../utils/localStorage';

interface HealthStore {
  // 状態
  records: HealthRecord[];
  settings: UserSettings;
  selectedPeriod: PeriodOption;
  isLoading: boolean;

  // アクション
  loadRecords: () => void;
  loadSettings: () => void;
  addRecord: (record: HealthRecord) => boolean;
  updateRecord: (timestamp: string, updates: Partial<HealthRecord>) => boolean;
  deleteRecord: (timestamp: string) => boolean;
  updateSettings: (settings: Partial<UserSettings>) => boolean;
  clearAllData: () => boolean;
  setSelectedPeriod: (period: PeriodOption) => void;
  getFilteredRecords: () => HealthRecord[];
}

export const useHealthStore = create<HealthStore>((set, get) => ({
  // 初期状態
  records: [],
  settings: { disclaimerAccepted: false },
  selectedPeriod: '7days',
  isLoading: false,

  // データ読み込み
  loadRecords: () => {
    set({ isLoading: true });
    const records = getHealthRecords();
    set({ records, isLoading: false });
  },

  loadSettings: () => {
    const settings = getUserSettings();
    set({ settings });
  },

  // レコード追加
  addRecord: (record: HealthRecord) => {
    const success = addHealthRecordToStorage(record);
    if (success) {
      get().loadRecords();
    }
    return success;
  },

  // レコード更新
  updateRecord: (timestamp: string, updates: Partial<HealthRecord>) => {
    const success = updateHealthRecordInStorage(timestamp, updates);
    if (success) {
      get().loadRecords();
    }
    return success;
  },

  // レコード削除
  deleteRecord: (timestamp: string) => {
    const success = deleteHealthRecordFromStorage(timestamp);
    if (success) {
      get().loadRecords();
    }
    return success;
  },

  // 設定更新
  updateSettings: (updates: Partial<UserSettings>) => {
    const currentSettings = get().settings;
    const newSettings = { ...currentSettings, ...updates };
    const success = saveUserSettingsToStorage(newSettings);
    if (success) {
      set({ settings: newSettings });
    }
    return success;
  },

  // 全データ削除
  clearAllData: () => {
    const success = clearAllDataFromStorage();
    if (success) {
      set({
        records: [],
        settings: { disclaimerAccepted: false },
      });
    }
    return success;
  },

  // 期間選択
  setSelectedPeriod: (period: PeriodOption) => {
    set({ selectedPeriod: period });
  },

  // フィルタリングされたレコードを取得
  getFilteredRecords: () => {
    const { selectedPeriod } = get();
    const periodMap: Record<PeriodOption, number> = {
      '7days': 7,
      '30days': 30,
      '90days': 90,
      all: 0,
    };
    return getHealthRecordsByPeriod(periodMap[selectedPeriod]!);
  },
}));
