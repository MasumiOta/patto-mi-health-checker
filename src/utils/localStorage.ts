import { HealthRecord, UserSettings } from '../types';

// localStorageのキー名
const STORAGE_KEYS = {
  HEALTH_RECORDS: 'health-records',
  USER_SETTINGS: 'user-settings',
} as const;

/**
 * 健康データレコードの取得
 */
export const getHealthRecords = (): HealthRecord[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.HEALTH_RECORDS);
    if (!data) {
      return [];
    }
    const records = JSON.parse(data) as HealthRecord[];
    // タイムスタンプ順にソート（新しい順）
    return records.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  } catch (error) {
    console.error('健康データの読み込みに失敗しました:', error);
    return [];
  }
};

/**
 * 健康データレコードの保存
 */
export const saveHealthRecords = (records: HealthRecord[]): boolean => {
  try {
    const sortedRecords = records.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    localStorage.setItem(STORAGE_KEYS.HEALTH_RECORDS, JSON.stringify(sortedRecords));
    return true;
  } catch (error) {
    console.error('健康データの保存に失敗しました:', error);
    return false;
  }
};

/**
 * 健康データレコードの追加
 */
export const addHealthRecord = (record: HealthRecord): boolean => {
  try {
    const records = getHealthRecords();
    const now = new Date().toISOString();
    const newRecord: HealthRecord = {
      ...record,
      createdAt: now,
      updatedAt: now,
    };
    records.push(newRecord);
    return saveHealthRecords(records);
  } catch (error) {
    console.error('健康データの追加に失敗しました:', error);
    return false;
  }
};

/**
 * 健康データレコードの更新
 */
export const updateHealthRecord = (
  timestamp: string,
  updates: Partial<HealthRecord>
): boolean => {
  try {
    const records = getHealthRecords();
    const index = records.findIndex((r) => r.timestamp === timestamp);
    if (index === -1) {
      return false;
    }
    records[index] = {
      ...records[index],
      ...updates,
      timestamp: records[index]!.timestamp, // タイムスタンプは変更しない
      createdAt: records[index]!.createdAt, // 作成日時は変更しない
      updatedAt: new Date().toISOString(),
    };
    return saveHealthRecords(records);
  } catch (error) {
    console.error('健康データの更新に失敗しました:', error);
    return false;
  }
};

/**
 * 健康データレコードの削除
 */
export const deleteHealthRecord = (timestamp: string): boolean => {
  try {
    const records = getHealthRecords();
    const filteredRecords = records.filter((r) => r.timestamp !== timestamp);
    return saveHealthRecords(filteredRecords);
  } catch (error) {
    console.error('健康データの削除に失敗しました:', error);
    return false;
  }
};

/**
 * 最新の健康データレコードを取得
 */
export const getLatestHealthRecord = (): HealthRecord | null => {
  const records = getHealthRecords();
  return records[0] ?? null;
};

/**
 * 指定期間の健康データレコードを取得
 */
export const getHealthRecordsByPeriod = (days: number): HealthRecord[] => {
  const records = getHealthRecords();
  if (days === 0) {
    return records; // 全期間
  }
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  return records.filter((r) => new Date(r.timestamp) >= cutoffDate);
};

/**
 * ユーザー設定の取得
 */
export const getUserSettings = (): UserSettings => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER_SETTINGS);
    if (!data) {
      return { disclaimerAccepted: false };
    }
    return JSON.parse(data) as UserSettings;
  } catch (error) {
    console.error('ユーザー設定の読み込みに失敗しました:', error);
    return { disclaimerAccepted: false };
  }
};

/**
 * ユーザー設定の保存
 */
export const saveUserSettings = (settings: UserSettings): boolean => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_SETTINGS, JSON.stringify(settings));
    return true;
  } catch (error) {
    console.error('ユーザー設定の保存に失敗しました:', error);
    return false;
  }
};

/**
 * すべてのデータを削除
 */
export const clearAllData = (): boolean => {
  try {
    localStorage.removeItem(STORAGE_KEYS.HEALTH_RECORDS);
    localStorage.removeItem(STORAGE_KEYS.USER_SETTINGS);
    return true;
  } catch (error) {
    console.error('データの削除に失敗しました:', error);
    return false;
  }
};
