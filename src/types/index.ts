// 健康状態の判定結果
export type HealthStatus = 'normal' | 'warning' | 'danger';

// 健康指標の種類
export type HealthMetric =
  | 'weight'
  | 'bmi'
  | 'bloodPressure'
  | 'heartRate'
  | 'temperature'
  | 'bloodGlucose';

// 健康データレコード
export interface HealthRecord {
  // 識別情報
  timestamp: string; // ISO 8601形式

  // 体重関連
  weight?: number; // kg
  bmi?: number; // 自動計算

  // 血圧関連
  bloodPressureSystolic?: number; // 収縮期血圧 (mmHg)
  bloodPressureDiastolic?: number; // 拡張期血圧 (mmHg)

  // その他バイタル
  heartRate?: number; // 心拍数 (bpm)
  temperature?: number; // 体温 (°C)
  bloodGlucose?: number; // 血糖値 (mg/dL)

  // メタ情報
  createdAt: string;
  updatedAt: string;
}

// ユーザー設定
export interface UserSettings {
  height?: number; // 身長 (cm) - BMI計算用
  age?: number; // 年齢（任意）
  gender?: 'male' | 'female' | 'other'; // 性別（任意）
  disclaimerAccepted: boolean; // 免責事項への同意
}

// 健康指標の評価結果
export interface HealthEvaluation {
  status: HealthStatus;
  value?: number;
  message: string;
  advice?: string;
}

// グラフ用のデータポイント
export interface ChartDataPoint {
  timestamp: string;
  value: number;
  status: HealthStatus;
}

// 期間選択オプション
export type PeriodOption = '7days' | '30days' | '90days' | 'all';

// トレンド統計
export interface TrendStats {
  average: number;
  max: number;
  min: number;
  trend: 'up' | 'stable' | 'down';
}

// エクスポート形式
export type ExportFormat = 'pdf' | 'csv';

// インポートオプション
export type ImportOption = 'merge' | 'overwrite';
