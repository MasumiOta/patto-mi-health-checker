import { useState } from 'react';
import { Typography, Box, Button, Grid } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import UserSettingsForm from './UserSettingsForm';
import DataManagement from './DataManagement';
import DisclaimerDialog from './DisclaimerDialog';

const Settings = () => {
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        設定・データ管理
      </Typography>

      {/* ユーザー設定 */}
      <Box sx={{ mb: 3 }}>
        <UserSettingsForm />
      </Box>

      {/* データ管理 */}
      <Box sx={{ mb: 3 }}>
        <DataManagement />
      </Box>

      {/* 免責事項 */}
      <Box sx={{ mb: 3 }}>
        <Button
          variant="outlined"
          startIcon={<InfoIcon />}
          onClick={() => setDisclaimerOpen(true)}
          fullWidth
        >
          免責事項を表示
        </Button>
      </Box>

      {/* アプリについて */}
      <Box
        sx={{
          p: 2,
          border: 1,
          borderColor: 'divider',
          borderRadius: 1,
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="h6" gutterBottom>
          アプリについて
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          バージョン: 1.0.0
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          「ぱっと見ヘルスケア」は、健康データを手軽に記録し、
          ダッシュボードで複数指標を直感的に一目で把握できるヘルスケアアプリです。
        </Typography>
        <Typography variant="caption" color="text.secondary">
          ※ 本アプリは医療機器ではありません。健康管理の補助目的でご利用ください。
        </Typography>
      </Box>

      {/* 免責事項ダイアログ */}
      <DisclaimerDialog
        open={disclaimerOpen}
        onClose={() => setDisclaimerOpen(false)}
      />
    </Box>
  );
};

export default Settings;
