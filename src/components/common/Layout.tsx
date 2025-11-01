import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  Box,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getNavigationValue = () => {
    if (location.pathname === '/') return 0;
    if (location.pathname === '/history') return 1;
    if (location.pathname === '/settings') return 2;
    return 0;
  };

  const handleNavigationChange = (_: unknown, newValue: number) => {
    switch (newValue) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/history');
        break;
      case 2:
        navigate('/settings');
        break;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* ヘッダー */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ぱっと見ヘルスケア
          </Typography>
        </Toolbar>
      </AppBar>

      {/* メインコンテンツ */}
      <Container maxWidth="lg" sx={{ flex: 1, py: 3, mb: 8 }}>
        {children}
      </Container>

      {/* ボトムナビゲーション */}
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          value={getNavigationValue()}
          onChange={handleNavigationChange}
          showLabels
        >
          <BottomNavigationAction
            label="ダッシュボード"
            icon={<DashboardIcon />}
          />
          <BottomNavigationAction label="履歴・分析" icon={<HistoryIcon />} />
          <BottomNavigationAction label="設定" icon={<SettingsIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default Layout;
