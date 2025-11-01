import { HealthStatus } from '../types';

// BMI基準値（日本肥満学会基準）
export const BMI_STANDARDS = {
  UNDERWEIGHT: 18.5,
  NORMAL_MAX: 24.9,
  OVERWEIGHT: 25.0,
  OBESE: 30.0,
} as const;

// 血圧基準値（日本高血圧学会基準）
export const BLOOD_PRESSURE_STANDARDS = {
  NORMAL_SYSTOLIC: 129,
  NORMAL_DIASTOLIC: 84,
  HYPERTENSION_1_SYSTOLIC_MIN: 140,
  HYPERTENSION_1_SYSTOLIC_MAX: 159,
  HYPERTENSION_1_DIASTOLIC_MIN: 90,
  HYPERTENSION_1_DIASTOLIC_MAX: 99,
  HYPERTENSION_2_SYSTOLIC: 160,
  HYPERTENSION_2_DIASTOLIC: 100,
} as const;

// 心拍数基準値
export const HEART_RATE_STANDARDS = {
  BRADYCARDIA_SEVERE: 50,
  BRADYCARDIA_MILD: 59,
  NORMAL_MIN: 60,
  NORMAL_MAX: 100,
  TACHYCARDIA_MILD: 119,
  TACHYCARDIA_SEVERE: 120,
} as const;

// 体温基準値（腋窩温）
export const TEMPERATURE_STANDARDS = {
  NORMAL_MIN: 36.5,
  NORMAL_MAX: 37.2,
  MILD_FEVER_MIN: 37.0,
  MILD_FEVER_MAX: 37.4,
  FEVER: 37.5,
  HIGH_FEVER: 38.0,
} as const;

// 血糖値基準値（空腹時）
export const BLOOD_GLUCOSE_STANDARDS = {
  NORMAL_MIN: 70,
  NORMAL_MAX: 109,
  PREDIABETES_MIN: 110,
  PREDIABETES_MAX: 125,
  DIABETES: 126,
} as const;

// バリデーション範囲
export const VALIDATION_RANGES = {
  weight: { min: 10, max: 300, decimal: 1 },
  bloodPressureSystolic: { min: 50, max: 250, decimal: 0 },
  bloodPressureDiastolic: { min: 30, max: 150, decimal: 0 },
  heartRate: { min: 30, max: 200, decimal: 0 },
  temperature: { min: 34.0, max: 42.0, decimal: 1 },
  bloodGlucose: { min: 30, max: 600, decimal: 0 },
  height: { min: 100, max: 250, decimal: 1 },
} as const;

// ステータスラベル
export const STATUS_LABELS: Record<HealthStatus, string> = {
  normal: '正常',
  warning: '注意',
  danger: '警告',
};

// ステータスカラー
export const STATUS_COLORS: Record<HealthStatus, string> = {
  normal: '#4caf50',
  warning: '#ff9800',
  danger: '#f44336',
};

// メトリック名の日本語表示
export const METRIC_LABELS = {
  weight: '体重',
  bmi: 'BMI',
  bloodPressure: '血圧',
  heartRate: '心拍数',
  temperature: '体温',
  bloodGlucose: '血糖値',
} as const;

// メトリック単位
export const METRIC_UNITS = {
  weight: 'kg',
  bmi: '',
  bloodPressure: 'mmHg',
  heartRate: 'bpm',
  temperature: '°C',
  bloodGlucose: 'mg/dL',
} as const;
