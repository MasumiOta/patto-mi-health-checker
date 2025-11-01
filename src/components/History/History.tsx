import { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import { useHealthStore } from '../../stores/healthStore';
import { PeriodOption } from '../../types';
import { METRIC_LABELS, METRIC_UNITS } from '../../constants/healthStandards';
import DetailChart from './DetailChart';
import TrendStatsCard from './TrendStatsCard';
import DataTable from './DataTable';

type MetricKey = 'weight' | 'bloodPressureSystolic' | 'heartRate' | 'temperature' | 'bloodGlucose';

const History = () => {
  const { selectedPeriod, setSelectedPeriod, getFilteredRecords, loadRecords } =
    useHealthStore();
  const [selectedMetric, setSelectedMetric] = useState<MetricKey>('weight');

  useEffect(() => {
    loadRecords();
  }, [loadRecords]);

  const filteredData = getFilteredRecords();

  const handlePeriodChange = (_: unknown, newValue: number) => {
    const periods: PeriodOption[] = ['7days', '30days', '90days', 'all'];
    setSelectedPeriod(periods[newValue]!);
  };

  const periodMap: Record<PeriodOption, number> = {
    '7days': 0,
    '30days': 1,
    '90days': 2,
    all: 3,
  };

  const metrics: Array<{ key: MetricKey; label: string }> = [
    { key: 'weight', label: METRIC_LABELS.weight },
    { key: 'bloodPressureSystolic', label: '収縮期血圧' },
    { key: 'heartRate', label: METRIC_LABELS.heartRate },
    { key: 'temperature', label: METRIC_LABELS.temperature },
    { key: 'bloodGlucose', label: METRIC_LABELS.bloodGlucose },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        履歴・詳細分析
      </Typography>

      {/* 期間選択タブ */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={periodMap[selectedPeriod]}
          onChange={handlePeriodChange}
          aria-label="期間選択"
        >
          <Tab label="7日間" />
          <Tab label="30日間" />
          <Tab label="90日間" />
          <Tab label="全期間" />
        </Tabs>
      </Box>

      {filteredData.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            選択した期間のデータがありません
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ダッシュボードからデータを入力してください
          </Typography>
        </Box>
      ) : (
        <>
          {/* 指標選択 */}
          <Box sx={{ mb: 3 }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>表示する指標</InputLabel>
              <Select
                value={selectedMetric}
                label="表示する指標"
                onChange={(e) => setSelectedMetric(e.target.value as MetricKey)}
              >
                {metrics.map((metric) => (
                  <MenuItem key={metric.key} value={metric.key}>
                    {metric.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* トレンド統計カード */}
          <Box sx={{ mb: 3 }}>
            <TrendStatsCard
              title={
                metrics.find((m) => m.key === selectedMetric)?.label || ''
              }
              data={filteredData}
              valueKey={selectedMetric}
              unit={
                selectedMetric === 'bloodPressureSystolic'
                  ? METRIC_UNITS.bloodPressure
                  : METRIC_UNITS[selectedMetric as keyof typeof METRIC_UNITS]
              }
            />
          </Box>

          {/* 詳細グラフ */}
          <Box sx={{ mb: 3 }}>
            <DetailChart
              title={
                metrics.find((m) => m.key === selectedMetric)?.label || ''
              }
              data={filteredData}
              valueKey={selectedMetric}
              unit={
                selectedMetric === 'bloodPressureSystolic'
                  ? METRIC_UNITS.bloodPressure
                  : METRIC_UNITS[selectedMetric as keyof typeof METRIC_UNITS]
              }
            />
          </Box>

          {/* データテーブル */}
          <Box sx={{ mb: 3 }}>
            <DataTable data={filteredData} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default History;
