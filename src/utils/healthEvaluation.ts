import {
  BMI_STANDARDS,
  BLOOD_PRESSURE_STANDARDS,
  HEART_RATE_STANDARDS,
  TEMPERATURE_STANDARDS,
  BLOOD_GLUCOSE_STANDARDS,
} from '../constants/healthStandards';
import { HealthEvaluation, HealthStatus } from '../types';

/**
 * BMIを計算
 */
export const calculateBMI = (weightKg: number, heightCm: number): number => {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
};

/**
 * BMIの評価
 */
export const evaluateBMI = (bmi: number): HealthEvaluation => {
  if (bmi < BMI_STANDARDS.UNDERWEIGHT) {
    return {
      status: 'warning',
      value: bmi,
      message: '低体重',
      advice: '栄養バランスの良い食事を心がけ、適度な運動を行いましょう。',
    };
  }
  if (bmi <= BMI_STANDARDS.NORMAL_MAX) {
    return {
      status: 'normal',
      value: bmi,
      message: '正常',
    };
  }
  if (bmi < BMI_STANDARDS.OBESE) {
    return {
      status: 'warning',
      value: bmi,
      message: '肥満（1度）',
      advice: 'バランスの良い食事と定期的な運動で体重管理を心がけましょう。',
    };
  }
  return {
    status: 'danger',
    value: bmi,
    message: '肥満（2度以上）',
    advice: '健康リスクが高まっています。医療機関での相談をお勧めします。',
  };
};

/**
 * 体重の評価（BMI計算が必要）
 */
export const evaluateWeight = (
  weight: number,
  height?: number
): HealthEvaluation => {
  if (!height) {
    return {
      status: 'normal',
      value: weight,
      message: '体重記録済み',
      advice: '設定画面で身長を入力すると、BMIを自動計算できます。',
    };
  }
  const bmi = calculateBMI(weight, height);
  return {
    ...evaluateBMI(bmi),
    value: weight,
  };
};

/**
 * 血圧の評価
 */
export const evaluateBloodPressure = (
  systolic: number,
  diastolic: number
): HealthEvaluation => {
  // 正常血圧
  if (
    systolic <= BLOOD_PRESSURE_STANDARDS.NORMAL_SYSTOLIC &&
    diastolic <= BLOOD_PRESSURE_STANDARDS.NORMAL_DIASTOLIC
  ) {
    return {
      status: 'normal',
      value: systolic,
      message: '正常血圧',
    };
  }

  // II度高血圧以上
  if (
    systolic >= BLOOD_PRESSURE_STANDARDS.HYPERTENSION_2_SYSTOLIC ||
    diastolic >= BLOOD_PRESSURE_STANDARDS.HYPERTENSION_2_DIASTOLIC
  ) {
    return {
      status: 'danger',
      value: systolic,
      message: 'II度高血圧以上',
      advice: '血圧が高い状態です。早めに医療機関を受診してください。',
    };
  }

  // I度高血圧
  if (
    (systolic >= BLOOD_PRESSURE_STANDARDS.HYPERTENSION_1_SYSTOLIC_MIN &&
      systolic <= BLOOD_PRESSURE_STANDARDS.HYPERTENSION_1_SYSTOLIC_MAX) ||
    (diastolic >= BLOOD_PRESSURE_STANDARDS.HYPERTENSION_1_DIASTOLIC_MIN &&
      diastolic <= BLOOD_PRESSURE_STANDARDS.HYPERTENSION_1_DIASTOLIC_MAX)
  ) {
    return {
      status: 'warning',
      value: systolic,
      message: 'I度高血圧',
      advice: '生活習慣の見直しを行い、定期的に血圧を測定しましょう。',
    };
  }

  // 正常高値血圧
  return {
    status: 'warning',
    value: systolic,
    message: '正常高値血圧',
    advice: '塩分控えめの食事と適度な運動を心がけましょう。',
  };
};

/**
 * 心拍数の評価
 */
export const evaluateHeartRate = (heartRate: number): HealthEvaluation => {
  // 正常
  if (
    heartRate >= HEART_RATE_STANDARDS.NORMAL_MIN &&
    heartRate <= HEART_RATE_STANDARDS.NORMAL_MAX
  ) {
    return {
      status: 'normal',
      value: heartRate,
      message: '正常',
    };
  }

  // 徐脈（重度）
  if (heartRate < HEART_RATE_STANDARDS.BRADYCARDIA_SEVERE) {
    return {
      status: 'danger',
      value: heartRate,
      message: '徐脈',
      advice: '心拍数が低すぎます。医療機関を受診してください。',
    };
  }

  // 徐脈（軽度）
  if (heartRate <= HEART_RATE_STANDARDS.BRADYCARDIA_MILD) {
    return {
      status: 'warning',
      value: heartRate,
      message: '徐脈傾向',
      advice: '心拍数がやや低めです。体調の変化に注意しましょう。',
    };
  }

  // 頻脈（軽度）
  if (heartRate <= HEART_RATE_STANDARDS.TACHYCARDIA_MILD) {
    return {
      status: 'warning',
      value: heartRate,
      message: '頻脈傾向',
      advice: '心拍数がやや高めです。ストレスや疲労に注意しましょう。',
    };
  }

  // 頻脈（重度）
  return {
    status: 'danger',
    value: heartRate,
    message: '頻脈',
    advice: '心拍数が高すぎます。医療機関を受診してください。',
  };
};

/**
 * 体温の評価
 */
export const evaluateTemperature = (temperature: number): HealthEvaluation => {
  // 高熱
  if (temperature >= TEMPERATURE_STANDARDS.HIGH_FEVER) {
    return {
      status: 'danger',
      value: temperature,
      message: '高熱',
      advice: '発熱があります。医療機関を受診してください。',
    };
  }

  // 発熱
  if (temperature >= TEMPERATURE_STANDARDS.FEVER) {
    return {
      status: 'danger',
      value: temperature,
      message: '発熱',
      advice: '発熱があります。安静にして様子を見てください。',
    };
  }

  // 微熱
  if (
    temperature >= TEMPERATURE_STANDARDS.MILD_FEVER_MIN &&
    temperature <= TEMPERATURE_STANDARDS.MILD_FEVER_MAX
  ) {
    return {
      status: 'warning',
      value: temperature,
      message: '微熱',
      advice: '体温がやや高めです。体調の変化に注意しましょう。',
    };
  }

  // 正常
  if (
    temperature >= TEMPERATURE_STANDARDS.NORMAL_MIN &&
    temperature <= TEMPERATURE_STANDARDS.NORMAL_MAX
  ) {
    return {
      status: 'normal',
      value: temperature,
      message: '正常',
    };
  }

  // 低体温
  return {
    status: 'warning',
    value: temperature,
    message: '低体温',
    advice: '体温が低めです。体を温めて安静にしましょう。',
  };
};

/**
 * 血糖値の評価
 */
export const evaluateBloodGlucose = (bloodGlucose: number): HealthEvaluation => {
  // 糖尿病型
  if (bloodGlucose >= BLOOD_GLUCOSE_STANDARDS.DIABETES) {
    return {
      status: 'danger',
      value: bloodGlucose,
      message: '糖尿病型',
      advice: '血糖値が高い状態です。医療機関を受診してください。',
    };
  }

  // 境界型
  if (
    bloodGlucose >= BLOOD_GLUCOSE_STANDARDS.PREDIABETES_MIN &&
    bloodGlucose <= BLOOD_GLUCOSE_STANDARDS.PREDIABETES_MAX
  ) {
    return {
      status: 'warning',
      value: bloodGlucose,
      message: '境界型（正常高値）',
      advice: '血糖値がやや高めです。食生活の見直しを心がけましょう。',
    };
  }

  // 正常
  if (
    bloodGlucose >= BLOOD_GLUCOSE_STANDARDS.NORMAL_MIN &&
    bloodGlucose <= BLOOD_GLUCOSE_STANDARDS.NORMAL_MAX
  ) {
    return {
      status: 'normal',
      value: bloodGlucose,
      message: '正常',
    };
  }

  // 低血糖
  return {
    status: 'warning',
    value: bloodGlucose,
    message: '低血糖',
    advice: '血糖値が低めです。糖分を摂取してください。',
  };
};

/**
 * 全体的な健康状態の判定
 */
export const getOverallHealthStatus = (
  evaluations: HealthEvaluation[]
): HealthStatus => {
  const statuses = evaluations.map((e) => e.status);
  if (statuses.includes('danger')) {
    return 'danger';
  }
  if (statuses.includes('warning')) {
    return 'warning';
  }
  return 'normal';
};
