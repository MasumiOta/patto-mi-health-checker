import { Typography, Box } from '@mui/material';

const History = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        履歴・詳細分析
      </Typography>
      <Typography variant="body1" color="text.secondary">
        過去のデータを時系列グラフで確認し、トレンド分析を行います。
      </Typography>
      {/* TODO: 期間選択、詳細グラフ、データ一覧、トレンド統計を実装 */}
    </Box>
  );
};

export default History;
