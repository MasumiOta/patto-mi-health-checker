import { VALIDATION_RANGES } from '../constants/healthStandards';
import { HealthRecord } from '../types';

/**
 * バリデーション結果
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * 数値の範囲バリデーション
 */
const validateRange = (
  value: number | undefined,
  min: number,
  max: number,
  label: string
): string | null => {
  if (value === undefined) {
    return null; // 任意項目
  }
  if (isNaN(value)) {
    return `${label}は数値で入力してください`;
  }
  if (value < min || value > max) {
    return `${label}は${min}〜${max}の範囲で入力してください`;
  }
  return null;
};

/**
 * 小数点桁数のバリデーション
 */
const validateDecimal = (
  value: number | undefined,
  maxDecimals: number,
  label: string
): string | null => {
  if (value === undefined) {
    return null;
  }
  const decimals = (value.toString().split('.')[1] || '').length;
  if (decimals > maxDecimals) {
    return `${label}は小数点第${maxDecimals}位までで入力してください`;
  }
  return null;
};

/**
 * 体重のバリデーション
 */
export const validateWeight = (weight: number | undefined): string | null => {
  const rangeError = validateRange(
    weight,
    VALIDATION_RANGES.weight.min,
    VALIDATION_RANGES.weight.max,
    '体重'
  );
  if (rangeError) return rangeError;

  return validateDecimal(weight, VALIDATION_RANGES.weight.decimal, '体重');
};

/**
 * 収縮期血圧のバリデーション
 */
export const validateBloodPressureSystolic = (
  value: number | undefined
): string | null => {
  return validateRange(
    value,
    VALIDATION_RANGES.bloodPressureSystolic.min,
    VALIDATION_RANGES.bloodPressureSystolic.max,
    '収縮期血圧'
  );
};

/**
 * 拡張期血圧のバリデーション
 */
export const validateBloodPressureDiastolic = (
  value: number | undefined
): string | null => {
  return validateRange(
    value,
    VALIDATION_RANGES.bloodPressureDiastolic.min,
    VALIDATION_RANGES.bloodPressureDiastolic.max,
    '拡張期血圧'
  );
};

/**
 * 心拍数のバリデーション
 */
export const validateHeartRate = (value: number | undefined): string | null => {
  return validateRange(
    value,
    VALIDATION_RANGES.heartRate.min,
    VALIDATION_RANGES.heartRate.max,
    '心拍数'
  );
};

/**
 * 体温のバリデーション
 */
export const validateTemperature = (value: number | undefined): string | null => {
  const rangeError = validateRange(
    value,
    VALIDATION_RANGES.temperature.min,
    VALIDATION_RANGES.temperature.max,
    '体温'
  );
  if (rangeError) return rangeError;

  return validateDecimal(value, VALIDATION_RANGES.temperature.decimal, '体温');
};

/**
 * 血糖値のバリデーション
 */
export const validateBloodGlucose = (value: number | undefined): string | null => {
  return validateRange(
    value,
    VALIDATION_RANGES.bloodGlucose.min,
    VALIDATION_RANGES.bloodGlucose.max,
    '血糖値'
  );
};

/**
 * 身長のバリデーション
 */
export const validateHeight = (value: number | undefined): string | null => {
  if (value === undefined) {
    return null; // 任意項目
  }
  const rangeError = validateRange(
    value,
    VALIDATION_RANGES.height.min,
    VALIDATION_RANGES.height.max,
    '身長'
  );
  if (rangeError) return rangeError;

  return validateDecimal(value, VALIDATION_RANGES.height.decimal, '身長');
};

/**
 * タイムスタンプのバリデーション
 */
export const validateTimestamp = (timestamp: string): string | null => {
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) {
    return '日時が不正です';
  }
  if (date > new Date()) {
    return '未来の日時は入力できません';
  }
  return null;
};

/**
 * 健康データレコード全体のバリデーション
 */
export const validateHealthRecord = (
  record: Partial<HealthRecord>
): ValidationResult => {
  const errors: string[] = [];

  // タイムスタンプのバリデーション
  if (record.timestamp) {
    const timestampError = validateTimestamp(record.timestamp);
    if (timestampError) errors.push(timestampError);
  } else {
    errors.push('日時は必須です');
  }

  // 各指標のバリデーション
  const weightError = validateWeight(record.weight);
  if (weightError) errors.push(weightError);

  const systolicError = validateBloodPressureSystolic(record.bloodPressureSystolic);
  if (systolicError) errors.push(systolicError);

  const diastolicError = validateBloodPressureDiastolic(record.bloodPressureDiastolic);
  if (diastolicError) errors.push(diastolicError);

  // 血圧の整合性チェック
  if (
    record.bloodPressureSystolic !== undefined &&
    record.bloodPressureDiastolic !== undefined
  ) {
    if (record.bloodPressureSystolic <= record.bloodPressureDiastolic) {
      errors.push('収縮期血圧は拡張期血圧より大きい値を入力してください');
    }
  }

  const heartRateError = validateHeartRate(record.heartRate);
  if (heartRateError) errors.push(heartRateError);

  const temperatureError = validateTemperature(record.temperature);
  if (temperatureError) errors.push(temperatureError);

  const bloodGlucoseError = validateBloodGlucose(record.bloodGlucose);
  if (bloodGlucoseError) errors.push(bloodGlucoseError);

  // 少なくとも1つの健康指標が入力されているか確認
  const hasAnyMetric =
    record.weight !== undefined ||
    record.bloodPressureSystolic !== undefined ||
    record.bloodPressureDiastolic !== undefined ||
    record.heartRate !== undefined ||
    record.temperature !== undefined ||
    record.bloodGlucose !== undefined;

  if (!hasAnyMetric) {
    errors.push('少なくとも1つの健康指標を入力してください');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
