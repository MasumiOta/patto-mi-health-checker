import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Alert,
} from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { HealthRecord } from '../../types';
import { useHealthStore } from '../../stores/healthStore';
import { validateHealthRecord } from '../../utils/validation';

interface DataTableProps {
  data: HealthRecord[];
}

const DataTable = ({ data }: DataTableProps) => {
  const { updateRecord, deleteRecord } = useHealthStore();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<HealthRecord | null>(null);
  const [editForm, setEditForm] = useState<Partial<HealthRecord>>({});
  const [errors, setErrors] = useState<string[]>([]);

  const handleEditClick = (record: HealthRecord) => {
    setSelectedRecord(record);
    setEditForm(record);
    setEditDialogOpen(true);
    setErrors([]);
  };

  const handleDeleteClick = (record: HealthRecord) => {
    setSelectedRecord(record);
    setDeleteDialogOpen(true);
  };

  const handleEditSave = () => {
    if (!selectedRecord) return;

    const validation = validateHealthRecord(editForm);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const success = updateRecord(selectedRecord.timestamp, editForm);
    if (success) {
      setEditDialogOpen(false);
      setSelectedRecord(null);
      setEditForm({});
      setErrors([]);
    } else {
      setErrors(['更新に失敗しました']);
    }
  };

  const handleDeleteConfirm = () => {
    if (!selectedRecord) return;

    const success = deleteRecord(selectedRecord.timestamp);
    if (success) {
      setDeleteDialogOpen(false);
      setSelectedRecord(null);
    }
  };

  if (data.length === 0) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            データ一覧
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            データがありません
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            データ一覧
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>日時</TableCell>
                  <TableCell align="right">体重(kg)</TableCell>
                  <TableCell align="right">血圧(mmHg)</TableCell>
                  <TableCell align="right">心拍数(bpm)</TableCell>
                  <TableCell align="right">体温(°C)</TableCell>
                  <TableCell align="right">血糖値(mg/dL)</TableCell>
                  <TableCell align="center">操作</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((record) => (
                  <TableRow key={record.timestamp}>
                    <TableCell>
                      {new Date(record.timestamp).toLocaleString('ja-JP')}
                    </TableCell>
                    <TableCell align="right">
                      {record.weight?.toFixed(1) || '-'}
                    </TableCell>
                    <TableCell align="right">
                      {record.bloodPressureSystolic &&
                      record.bloodPressureDiastolic
                        ? `${record.bloodPressureSystolic}/${record.bloodPressureDiastolic}`
                        : '-'}
                    </TableCell>
                    <TableCell align="right">
                      {record.heartRate || '-'}
                    </TableCell>
                    <TableCell align="right">
                      {record.temperature?.toFixed(1) || '-'}
                    </TableCell>
                    <TableCell align="right">
                      {record.bloodGlucose || '-'}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={() => handleEditClick(record)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteClick(record)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* 編集ダイアログ */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>データを編集</DialogTitle>
        <DialogContent>
          {errors.length > 0 && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errors.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </Alert>
          )}
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="体重"
                type="number"
                value={editForm.weight || ''}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    weight: e.target.value ? parseFloat(e.target.value) : undefined,
                  })
                }
                inputProps={{ step: 0.1 }}
                helperText="kg"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="心拍数"
                type="number"
                value={editForm.heartRate || ''}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    heartRate: e.target.value ? parseInt(e.target.value) : undefined,
                  })
                }
                helperText="bpm"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="収縮期血圧"
                type="number"
                value={editForm.bloodPressureSystolic || ''}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    bloodPressureSystolic: e.target.value
                      ? parseInt(e.target.value)
                      : undefined,
                  })
                }
                helperText="mmHg（上）"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="拡張期血圧"
                type="number"
                value={editForm.bloodPressureDiastolic || ''}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    bloodPressureDiastolic: e.target.value
                      ? parseInt(e.target.value)
                      : undefined,
                  })
                }
                helperText="mmHg（下）"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="体温"
                type="number"
                value={editForm.temperature || ''}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    temperature: e.target.value
                      ? parseFloat(e.target.value)
                      : undefined,
                  })
                }
                inputProps={{ step: 0.1 }}
                helperText="°C"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="血糖値"
                type="number"
                value={editForm.bloodGlucose || ''}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    bloodGlucose: e.target.value
                      ? parseInt(e.target.value)
                      : undefined,
                  })
                }
                helperText="mg/dL"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>キャンセル</Button>
          <Button onClick={handleEditSave} variant="contained">
            保存
          </Button>
        </DialogActions>
      </Dialog>

      {/* 削除確認ダイアログ */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>削除確認</DialogTitle>
        <DialogContent>
          <Typography>このデータを削除してもよろしいですか？</Typography>
          {selectedRecord && (
            <Typography variant="caption" color="text.secondary">
              {new Date(selectedRecord.timestamp).toLocaleString('ja-JP')}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            キャンセル
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            削除
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DataTable;
