import { Card, CardContent, Typography, Box } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { HealthRecord } from '../../types';
import {
  BMI_STANDARDS,
  BLOOD_PRESSURE_STANDARDS,
  HEART_RATE_STANDARDS,
  TEMPERATURE_STANDARDS,
  BLOOD_GLUCOSE_STANDARDS,
  STATUS_COLORS,
} from '../../constants/healthStandards';

interface DetailChartProps {
  title: string;
  data: HealthRecord[];
  valueKey: keyof HealthRecord;
  unit: string;
}

const DetailChart = ({ title, data, valueKey, unit }: DetailChartProps) => {
  // データポイントを抽出（古い順）
  const chartData = data
    .slice()
    .reverse()
    .map((record) => ({
      date: new Date(record.timestamp),
      value: record[valueKey] as number | undefined,
    }))
    .filter((d) => d.value !== undefined);

  if (chartData.length === 0) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body2" color="text.secondary">
              データがありません
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  const xLabels = chartData.map((d) =>
    d.date.toLocaleDateString('ja-JP', {
      month: 'numeric',
      day: 'numeric',
    })
  );
  const yValues = chartData.map((d) => d.value!);

  // 基準値ラインの設定
  let referenceLines: Array<{ y: number; label: string; color: string }> = [];

  switch (valueKey) {
    case 'weight':
      // 体重は個人差が大きいため基準線なし
      break;
    case 'bmi':
      referenceLines = [
        {
          y: BMI_STANDARDS.UNDERWEIGHT,
          label: '低体重',
          color: STATUS_COLORS.warning,
        },
        {
          y: BMI_STANDARDS.NORMAL_MAX,
          label: '正常範囲上限',
          color: STATUS_COLORS.normal,
        },
        {
          y: BMI_STANDARDS.OBESE,
          label: '肥満',
          color: STATUS_COLORS.danger,
        },
      ];
      break;
    case 'bloodPressureSystolic':
      referenceLines = [
        {
          y: BLOOD_PRESSURE_STANDARDS.NORMAL_SYSTOLIC,
          label: '正常上限',
          color: STATUS_COLORS.normal,
        },
        {
          y: BLOOD_PRESSURE_STANDARDS.HYPERTENSION_1_SYSTOLIC_MIN,
          label: 'I度高血圧',
          color: STATUS_COLORS.warning,
        },
        {
          y: BLOOD_PRESSURE_STANDARDS.HYPERTENSION_2_SYSTOLIC,
          label: 'II度高血圧',
          color: STATUS_COLORS.danger,
        },
      ];
      break;
    case 'heartRate':
      referenceLines = [
        {
          y: HEART_RATE_STANDARDS.NORMAL_MIN,
          label: '正常下限',
          color: STATUS_COLORS.normal,
        },
        {
          y: HEART_RATE_STANDARDS.NORMAL_MAX,
          label: '正常上限',
          color: STATUS_COLORS.normal,
        },
      ];
      break;
    case 'temperature':
      referenceLines = [
        {
          y: TEMPERATURE_STANDARDS.NORMAL_MIN,
          label: '正常下限',
          color: STATUS_COLORS.normal,
        },
        {
          y: TEMPERATURE_STANDARDS.NORMAL_MAX,
          label: '正常上限',
          color: STATUS_COLORS.normal,
        },
        {
          y: TEMPERATURE_STANDARDS.FEVER,
          label: '発熱',
          color: STATUS_COLORS.danger,
        },
      ];
      break;
    case 'bloodGlucose':
      referenceLines = [
        {
          y: BLOOD_GLUCOSE_STANDARDS.NORMAL_MAX,
          label: '正常上限',
          color: STATUS_COLORS.normal,
        },
        {
          y: BLOOD_GLUCOSE_STANDARDS.DIABETES,
          label: '糖尿病型',
          color: STATUS_COLORS.danger,
        },
      ];
      break;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}の推移
        </Typography>
        <LineChart
          xAxis={[
            {
              scaleType: 'point',
              data: xLabels,
            },
          ]}
          series={[
            {
              data: yValues,
              label: `${title} (${unit})`,
              showMark: true,
              color: '#1976d2',
            },
          ]}
          height={400}
          margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
        />
        {referenceLines.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="caption" color="text.secondary">
              基準値ライン:
            </Typography>
            {referenceLines.map((line, index) => (
              <Box
                key={index}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  ml: 1,
                  mr: 1,
                }}
              >
                <Box
                  sx={{
                    width: 12,
                    height: 2,
                    bgcolor: line.color,
                    mr: 0.5,
                  }}
                />
                <Typography variant="caption">
                  {line.label} ({line.y})
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default DetailChart;
