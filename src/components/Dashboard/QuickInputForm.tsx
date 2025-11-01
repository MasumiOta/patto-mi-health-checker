import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Box,
} from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import SaveIcon from '@mui/icons-material/Save';
import { useHealthStore } from '../../stores/healthStore';
import { validateHealthRecord } from '../../utils/validation';
import { calculateBMI } from '../../utils/healthEvaluation';
import { HealthRecord } from '../../types';

const QuickInputForm = () => {
  const { addRecord, loadRecords, settings } = useHealthStore();
  const [timestamp, setTimestamp] = useState(() => {
    const now = new Date();
    now.setSeconds(0, 0);
    return now.toISOString().slice(0, 16);
  });
  const [weight, setWeight] = useState('');
  const [bloodPressureSystolic, setBloodPressureSystolic] = useState('');
  const [bloodPressureDiastolic, setBloodPressureDiastolic] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [temperature, setTemperature] = useState('');
  const [bloodGlucose, setBloodGlucose] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setSuccessMessage('');

    // データの構築
    const record: Partial<HealthRecord> = {
      timestamp: new Date(timestamp).toISOString(),
      weight: weight ? parseFloat(weight) : undefined,
      bloodPressureSystolic: bloodPressureSystolic
        ? parseInt(bloodPressureSystolic)
        : undefined,
      bloodPressureDiastolic: bloodPressureDiastolic
        ? parseInt(bloodPressureDiastolic)
        : undefined,
      heartRate: heartRate ? parseInt(heartRate) : undefined,
      temperature: temperature ? parseFloat(temperature) : undefined,
      bloodGlucose: bloodGlucose ? parseInt(bloodGlucose) : undefined,
    };

    // BMI計算
    if (record.weight && settings.height) {
      record.bmi = calculateBMI(record.weight, settings.height);
    }

    // バリデーション
    const validation = validateHealthRecord(record);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // 保存
    const success = addRecord(record as HealthRecord);
    if (success) {
      setSuccessMessage('健康データを保存しました');
      // フォームをリセット
      const now = new Date();
      now.setSeconds(0, 0);
      setTimestamp(now.toISOString().slice(0, 16));
      setWeight('');
      setBloodPressureSystolic('');
      setBloodPressureDiastolic('');
      setHeartRate('');
      setTemperature('');
      setBloodGlucose('');
      loadRecords();
      // 成功メッセージを3秒後に消す
      setTimeout(() => setSuccessMessage(''), 3000);
    } else {
      setErrors(['データの保存に失敗しました']);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          クイック入力
        </Typography>
        {errors.length > 0 && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errors.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </Alert>
        )}
        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="日時"
                type="datetime-local"
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="体重"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                inputProps={{ step: 0.1, min: 10, max: 300 }}
                helperText="kg"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="心拍数"
                type="number"
                value={heartRate}
                onChange={(e) => setHeartRate(e.target.value)}
                inputProps={{ step: 1, min: 30, max: 200 }}
                helperText="bpm"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="収縮期血圧"
                type="number"
                value={bloodPressureSystolic}
                onChange={(e) => setBloodPressureSystolic(e.target.value)}
                inputProps={{ step: 1, min: 50, max: 250 }}
                helperText="mmHg（上）"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="拡張期血圧"
                type="number"
                value={bloodPressureDiastolic}
                onChange={(e) => setBloodPressureDiastolic(e.target.value)}
                inputProps={{ step: 1, min: 30, max: 150 }}
                helperText="mmHg（下）"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="体温"
                type="number"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                inputProps={{ step: 0.1, min: 34, max: 42 }}
                helperText="°C"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="血糖値"
                type="number"
                value={bloodGlucose}
                onChange={(e) => setBloodGlucose(e.target.value)}
                inputProps={{ step: 1, min: 30, max: 600 }}
                helperText="mg/dL"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
                fullWidth
                size="large"
              >
                保存
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuickInputForm;
