import { useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { useHealthStore } from '../../stores/healthStore';

const Dashboard = () => {
  const { loadRecords, loadSettings } = useHealthStore();

  useEffect(() => {
    loadRecords();
    loadSettings();
  }, [loadRecords, loadSettings]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        ダッシュボード
      </Typography>
      <Typography variant="body1" color="text.secondary">
        健康指標の概要とクイック入力フォームを表示します。
      </Typography>
      {/* TODO: 健康指標カード、ミニグラフ、クイック入力フォームを実装 */}
    </Box>
  );
};

export default Dashboard;
