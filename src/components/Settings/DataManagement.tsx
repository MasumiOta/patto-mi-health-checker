import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
  Box,
} from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useHealthStore } from '../../stores/healthStore';

const DataManagement = () => {
  const { records, clearAllData, loadRecords } = useHealthStore();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleCSVExport = () => {
    if (records.length === 0) {
      setMessage({ type: 'error', text: 'エクスポートするデータがありません' });
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    try {
      // CSVヘッダー
      const headers = [
        '日時',
        '体重(kg)',
        'BMI',
        '収縮期血圧(mmHg)',
        '拡張期血圧(mmHg)',
        '心拍数(bpm)',
        '体温(°C)',
        '血糖値(mg/dL)',
      ];

      // CSVデータ
      const rows = records.map((record) => [
        new Date(record.timestamp).toLocaleString('ja-JP'),
        record.weight || '',
        record.bmi || '',
        record.bloodPressureSystolic || '',
        record.bloodPressureDiastolic || '',
        record.heartRate || '',
        record.temperature || '',
        record.bloodGlucose || '',
      ]);

      // CSV形式に変換
      const csvContent = [
        headers.join(','),
        ...rows.map((row) => row.join(',')),
      ].join('\n');

      // BOMを追加（Excelで文字化けしないように）
      const bom = '\uFEFF';
      const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `health-data-${new Date().toISOString().slice(0, 10)}.csv`;
      link.click();
      URL.revokeObjectURL(url);

      setMessage({ type: 'success', text: 'CSVファイルをダウンロードしました' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'エクスポートに失敗しました' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleCSVImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split('\n');

        // ヘッダー行をスキップ
        const dataLines = lines.slice(1).filter((line) => line.trim());

        if (dataLines.length === 0) {
          setMessage({ type: 'error', text: 'インポートするデータがありません' });
          setTimeout(() => setMessage(null), 3000);
          return;
        }

        // TODO: CSVパースとデータインポートの実装
        // react-papaparseを使用する予定

        setMessage({ type: 'success', text: `${dataLines.length}件のデータをインポートしました` });
        setTimeout(() => setMessage(null), 3000);
        loadRecords();
      } catch (error) {
        setMessage({ type: 'error', text: 'インポートに失敗しました' });
        setTimeout(() => setMessage(null), 3000);
      }
    };
    reader.readAsText(file);

    // ファイル選択をリセット
    event.target.value = '';
  };

  const handleDeleteConfirm = () => {
    if (!deleteConfirm) {
      setMessage({ type: 'error', text: 'チェックボックスをオンにしてください' });
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    const success = clearAllData();
    if (success) {
      setDeleteDialogOpen(false);
      setDeleteConfirm(false);
      setMessage({ type: 'success', text: 'すべてのデータを削除しました' });
      setTimeout(() => setMessage(null), 3000);
      loadRecords();
    } else {
      setMessage({ type: 'error', text: 'データの削除に失敗しました' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            データ管理
          </Typography>
          {message && (
            <Alert severity={message.type} sx={{ mb: 2 }}>
              {message.text}
            </Alert>
          )}
          <Grid container spacing={2}>
            {/* CSVエクスポート */}
            <Grid item xs={12} sm={6}>
              <Box sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
                <Typography variant="subtitle1" gutterBottom>
                  CSVエクスポート
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  すべての健康データをCSV形式でダウンロードします
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  onClick={handleCSVExport}
                  fullWidth
                >
                  CSVダウンロード
                </Button>
              </Box>
            </Grid>

            {/* CSVインポート */}
            <Grid item xs={12} sm={6}>
              <Box sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
                <Typography variant="subtitle1" gutterBottom>
                  CSVインポート
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  CSVファイルから健康データを取り込みます
                </Typography>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<UploadIcon />}
                  fullWidth
                >
                  CSVファイルを選択
                  <input
                    type="file"
                    accept=".csv"
                    hidden
                    onChange={handleCSVImport}
                  />
                </Button>
              </Box>
            </Grid>

            {/* 全データ削除 */}
            <Grid item xs={12}>
              <Box
                sx={{
                  p: 2,
                  border: 2,
                  borderColor: 'error.main',
                  borderRadius: 1,
                  bgcolor: 'error.light',
                  opacity: 0.1,
                }}
              >
                <Typography variant="subtitle1" gutterBottom color="error">
                  危険な操作
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  すべての健康データとユーザー設定を削除します。この操作は取り消せません。
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteForeverIcon />}
                  onClick={() => setDeleteDialogOpen(true)}
                  fullWidth
                >
                  すべてのデータを削除
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* 削除確認ダイアログ */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setDeleteConfirm(false);
        }}
      >
        <DialogTitle color="error">すべてのデータを削除</DialogTitle>
        <DialogContent>
          <Alert severity="error" sx={{ mb: 2 }}>
            この操作は取り消せません！
          </Alert>
          <Typography gutterBottom>
            すべての健康データとユーザー設定が完全に削除されます。
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            削除する前に、必要に応じてCSVエクスポートでバックアップを取得してください。
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={deleteConfirm}
                onChange={(e) => setDeleteConfirm(e.target.checked)}
              />
            }
            label="理解しました。すべてのデータを削除します。"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDeleteDialogOpen(false);
              setDeleteConfirm(false);
            }}
          >
            キャンセル
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            削除する
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DataManagement;
