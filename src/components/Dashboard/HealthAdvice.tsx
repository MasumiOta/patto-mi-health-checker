import { Alert, AlertTitle, Box, Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import { HealthEvaluation } from '../../types';

interface HealthAdviceProps {
  evaluations: HealthEvaluation[];
}

const HealthAdvice = ({ evaluations }: HealthAdviceProps) => {
  // 警告・注意のあるアドバイスのみ抽出
  const advices = evaluations
    .filter((e) => (e.status === 'warning' || e.status === 'danger') && e.advice)
    .map((e) => ({
      severity: e.status,
      message: e.message,
      advice: e.advice!,
    }));

  if (advices.length === 0) {
    return (
      <Alert severity="success" sx={{ mb: 2 }}>
        <AlertTitle>すべての指標が正常範囲内です</AlertTitle>
        この調子で健康管理を続けましょう！
      </Alert>
    );
  }

  return (
    <Box sx={{ mb: 2 }}>
      {advices.map((item, index) => (
        <Alert
          key={index}
          severity={item.severity === 'danger' ? 'error' : 'warning'}
          icon={item.severity === 'danger' ? <ErrorIcon /> : <WarningIcon />}
          sx={{ mb: 1 }}
        >
          <AlertTitle>{item.message}</AlertTitle>
          <Typography variant="body2">{item.advice}</Typography>
          {item.severity === 'danger' && (
            <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
              ※ 異常値が続く場合は、必ず医療機関を受診してください。
            </Typography>
          )}
        </Alert>
      ))}
    </Box>
  );
};

export default HealthAdvice;
