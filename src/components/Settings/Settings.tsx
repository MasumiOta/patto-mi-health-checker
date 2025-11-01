import { Typography, Box } from '@mui/material';

const Settings = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        設定・データ管理
      </Typography>
      <Typography variant="body1" color="text.secondary">
        データのエクスポート/インポート、設定変更、免責事項の確認を行います。
      </Typography>
      {/* TODO: PDF/CSVエクスポート、CSVインポート、全データ削除、免責事項を実装 */}
    </Box>
  );
};

export default Settings;
