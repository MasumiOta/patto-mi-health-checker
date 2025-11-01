import { Card, CardContent, Typography, Grid, Box, Chip } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { HealthRecord, TrendStats } from '../../types';

interface TrendStatsCardProps {
  title: string;
  data: HealthRecord[];
  valueKey: keyof HealthRecord;
  unit: string;
}

const calculateTrendStats = (
  data: HealthRecord[],
  valueKey: keyof HealthRecord
): TrendStats | null => {
  const values = data
    .map((r) => r[valueKey] as number | undefined)
    .filter((v) => v !== undefined) as number[];

  if (values.length === 0) {
    return null;
  }

  const average = values.reduce((sum, v) => sum + v, 0) / values.length;
  const max = Math.max(...values);
  const min = Math.min(...values);

  // トレンド判定（最初の3件と最後の3件を比較）
  let trend: 'up' | 'stable' | 'down' = 'stable';
  if (values.length >= 6) {
    const firstThree = values.slice(0, 3);
    const lastThree = values.slice(-3);
    const firstAvg = firstThree.reduce((sum, v) => sum + v, 0) / 3;
    const lastAvg = lastThree.reduce((sum, v) => sum + v, 0) / 3;
    const diff = lastAvg - firstAvg;
    const threshold = average * 0.05; // 5%の変化を閾値とする

    if (diff > threshold) {
      trend = 'up';
    } else if (diff < -threshold) {
      trend = 'down';
    }
  }

  return { average, max, min, trend };
};

const TrendStatsCard = ({ title, data, valueKey, unit }: TrendStatsCardProps) => {
  const stats = calculateTrendStats(data, valueKey);

  if (!stats) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {title}の統計
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            データがありません
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const trendConfig = {
    up: {
      icon: <TrendingUpIcon />,
      label: '上昇傾向',
      color: '#f44336',
    },
    stable: {
      icon: <TrendingFlatIcon />,
      label: '横ばい',
      color: '#4caf50',
    },
    down: {
      icon: <TrendingDownIcon />,
      label: '下降傾向',
      color: '#2196f3',
    },
  };

  const trendInfo = trendConfig[stats.trend];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}の統計
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 1 }}>
              <Typography variant="caption" color="text.secondary">
                平均値
              </Typography>
              <Typography variant="h5" component="div">
                {stats.average.toFixed(1)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {unit}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 1 }}>
              <Typography variant="caption" color="text.secondary">
                最大値
              </Typography>
              <Typography variant="h5" component="div" color="error">
                {stats.max.toFixed(1)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {unit}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 1 }}>
              <Typography variant="caption" color="text.secondary">
                最小値
              </Typography>
              <Typography variant="h5" component="div" color="primary">
                {stats.min.toFixed(1)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {unit}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 1 }}>
              <Typography variant="caption" color="text.secondary">
                トレンド
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Chip
                  icon={trendInfo.icon}
                  label={trendInfo.label}
                  sx={{
                    bgcolor: trendInfo.color,
                    color: 'white',
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TrendStatsCard;
