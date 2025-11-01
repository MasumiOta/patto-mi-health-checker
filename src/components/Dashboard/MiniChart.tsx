import { Card, CardContent, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { HealthRecord } from '../../types';
import { METRIC_LABELS } from '../../constants/healthStandards';

interface MiniChartProps {
  title: string;
  data: HealthRecord[];
  valueKey: keyof HealthRecord;
}

const MiniChart = ({ title, data, valueKey }: MiniChartProps) => {
  // データポイントを抽出（最大7件、古い順）
  const chartData = data
    .slice(0, 7)
    .reverse()
    .map((record) => ({
      date: new Date(record.timestamp).toLocaleDateString('ja-JP', {
        month: 'numeric',
        day: 'numeric',
      }),
      value: record[valueKey] as number | undefined,
    }))
    .filter((d) => d.value !== undefined);

  if (chartData.length === 0) {
    return (
      <Card>
        <CardContent>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            データがありません
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const xLabels = chartData.map((d) => d.date);
  const yValues = chartData.map((d) => d.value!);

  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {title}（直近7日間）
        </Typography>
        <LineChart
          xAxis={[{ scaleType: 'point', data: xLabels }]}
          series={[
            {
              data: yValues,
              label: METRIC_LABELS[valueKey as keyof typeof METRIC_LABELS] || title,
              showMark: true,
            },
          ]}
          height={200}
          margin={{ top: 10, right: 10, bottom: 30, left: 40 }}
        />
      </CardContent>
    </Card>
  );
};

export default MiniChart;
