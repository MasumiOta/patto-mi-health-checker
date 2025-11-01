import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useHealthStore } from '../../stores/healthStore';
import { validateHeight } from '../../utils/validation';

const UserSettingsForm = () => {
  const { settings, updateSettings } = useHealthStore();
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other' | ''>('');
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setHeight(settings.height?.toString() || '');
    setAge(settings.age?.toString() || '');
    setGender(settings.gender || '');
  }, [settings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setSuccessMessage('');

    const validationErrors: string[] = [];

    // 身長のバリデーション
    if (height) {
      const heightError = validateHeight(parseFloat(height));
      if (heightError) {
        validationErrors.push(heightError);
      }
    }

    // 年齢のバリデーション
    if (age) {
      const ageNum = parseInt(age);
      if (isNaN(ageNum) || ageNum < 0 || ageNum > 150) {
        validationErrors.push('年齢は0〜150の範囲で入力してください');
      }
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    // 保存
    const success = updateSettings({
      height: height ? parseFloat(height) : undefined,
      age: age ? parseInt(age) : undefined,
      gender: gender || undefined,
    });

    if (success) {
      setSuccessMessage('設定を保存しました');
      setTimeout(() => setSuccessMessage(''), 3000);
    } else {
      setErrors(['設定の保存に失敗しました']);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          ユーザー設定
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          身長を入力すると、BMIが自動計算されます。
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
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="身長"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                inputProps={{ step: 0.1, min: 100, max: 250 }}
                helperText="cm（BMI計算に使用）"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="年齢"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                inputProps={{ step: 1, min: 0, max: 150 }}
                helperText="歳（任意）"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>性別</InputLabel>
                <Select
                  value={gender}
                  label="性別"
                  onChange={(e) =>
                    setGender(e.target.value as 'male' | 'female' | 'other')
                  }
                >
                  <MenuItem value="">未設定</MenuItem>
                  <MenuItem value="male">男性</MenuItem>
                  <MenuItem value="female">女性</MenuItem>
                  <MenuItem value="other">その他</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
                fullWidth
              >
                保存
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserSettingsForm;
