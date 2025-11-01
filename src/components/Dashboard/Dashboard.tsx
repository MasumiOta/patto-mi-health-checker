import { useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import { useHealthStore } from '../../stores/healthStore';
import {
  evaluateWeight,
  evaluateBloodPressure,
  evaluateHeartRate,
  evaluateTemperature,
  evaluateBloodGlucose,
} from '../../utils/healthEvaluation';
import { getHealthRecordsByPeriod } from '../../utils/localStorage';
import HealthMetricCard from './HealthMetricCard';
import QuickInputForm from './QuickInputForm';
import MiniChart from './MiniChart';
import HealthAdvice from './HealthAdvice';
import { HealthEvaluation } from '../../types';

const Dashboard = () => {
  const { records, settings, loadRecords, loadSettings } = useHealthStore();

  useEffect(() => {
    loadRecords();
    loadSettings();
  }, [loadRecords, loadSettings]);

  // 最新のレコード
  const latestRecord = records[0];

  // 直近7日間のデータ
  const last7DaysData = getHealthRecordsByPeriod(7);

  // 健康指標の評価
  const evaluations: HealthEvaluation[] = [];

  if (latestRecord) {
    // 体重・BMI
    if (latestRecord.weight) {
      evaluations.push(evaluateWeight(latestRecord.weight, settings.height));
    }

    // 血圧
    if (
      latestRecord.bloodPressureSystolic &&
      latestRecord.bloodPressureDiastolic
    ) {
      evaluations.push(
        evaluateBloodPressure(
          latestRecord.bloodPressureSystolic,
          latestRecord.bloodPressureDiastolic
        )
      );
    }

    // 心拍数
    if (latestRecord.heartRate) {
      evaluations.push(evaluateHeartRate(latestRecord.heartRate));
    }

    // 体温
    if (latestRecord.temperature) {
      evaluations.push(evaluateTemperature(latestRecord.temperature));
    }

    // 血糖値
    if (latestRecord.bloodGlucose) {
      evaluations.push(evaluateBloodGlucose(latestRecord.bloodGlucose));
    }
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        ダッシュボード
      </Typography>

      {/* 改善アドバイス */}
      {latestRecord && <HealthAdvice evaluations={evaluations} />}

      {/* 健康指標カード */}
      {latestRecord && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            現在の健康指標
          </Typography>
          <Grid container spacing={2}>
            {latestRecord.weight && (
              <Grid item xs={12} sm={6} md={4}>
                <HealthMetricCard
                  title="体重"
                  value={latestRecord.weight.toFixed(1)}
                  unit="kg"
                  status={evaluateWeight(latestRecord.weight, settings.height).status}
                  icon="weight"
                />
              </Grid>
            )}
            {latestRecord.bloodPressureSystolic &&
              latestRecord.bloodPressureDiastolic && (
                <Grid item xs={12} sm={6} md={4}>
                  <HealthMetricCard
                    title="血圧"
                    value={`${latestRecord.bloodPressureSystolic}/${latestRecord.bloodPressureDiastolic}`}
                    unit="mmHg"
                    status={
                      evaluateBloodPressure(
                        latestRecord.bloodPressureSystolic,
                        latestRecord.bloodPressureDiastolic
                      ).status
                    }
                    icon="bloodPressure"
                  />
                </Grid>
              )}
            {latestRecord.heartRate && (
              <Grid item xs={12} sm={6} md={4}>
                <HealthMetricCard
                  title="心拍数"
                  value={latestRecord.heartRate}
                  unit="bpm"
                  status={evaluateHeartRate(latestRecord.heartRate).status}
                  icon="heartRate"
                />
              </Grid>
            )}
            {latestRecord.temperature && (
              <Grid item xs={12} sm={6} md={4}>
                <HealthMetricCard
                  title="体温"
                  value={latestRecord.temperature.toFixed(1)}
                  unit="°C"
                  status={evaluateTemperature(latestRecord.temperature).status}
                  icon="temperature"
                />
              </Grid>
            )}
            {latestRecord.bloodGlucose && (
              <Grid item xs={12} sm={6} md={4}>
                <HealthMetricCard
                  title="血糖値"
                  value={latestRecord.bloodGlucose}
                  unit="mg/dL"
                  status={evaluateBloodGlucose(latestRecord.bloodGlucose).status}
                  icon="bloodGlucose"
                />
              </Grid>
            )}
          </Grid>
        </Box>
      )}

      {/* ミニグラフ */}
      {last7DaysData.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            直近7日間の推移
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <MiniChart
                title="体重"
                data={last7DaysData}
                valueKey="weight"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <MiniChart
                title="収縮期血圧"
                data={last7DaysData}
                valueKey="bloodPressureSystolic"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <MiniChart
                title="心拍数"
                data={last7DaysData}
                valueKey="heartRate"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <MiniChart
                title="体温"
                data={last7DaysData}
                valueKey="temperature"
              />
            </Grid>
          </Grid>
        </Box>
      )}

      {/* クイック入力フォーム */}
      <Box sx={{ mb: 3 }}>
        <QuickInputForm />
      </Box>

      {/* データがない場合のメッセージ */}
      {records.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            まだ健康データがありません
          </Typography>
          <Typography variant="body2" color="text.secondary">
            下のフォームから健康データを入力してください
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
