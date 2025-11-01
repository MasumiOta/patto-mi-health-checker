import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';

interface DisclaimerDialogProps {
  open: boolean;
  onClose: () => void;
}

const DisclaimerDialog = ({ open, onClose }: DisclaimerDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>免責事項</DialogTitle>
      <DialogContent>
        <Box sx={{ '& > *': { mb: 2 } }}>
          <Typography variant="h6">
            本アプリケーションについて
          </Typography>

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              1. 本アプリは医療機器ではありません
            </Typography>
            <Typography variant="body2" color="text.secondary">
              本アプリは、入力されたデータに基づいて健康に関する情報を提供するものです。
              医療機器プログラムには該当せず、医学的助言、診断、治療、予防を目的とする
              ものではありません。
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              2. 医療従事者の代替ではありません
            </Typography>
            <Typography variant="body2" color="text.secondary">
              本アプリは、医師その他の医療従事者による診断や治療の代わりとなるもの
              ではありません。健康上の懸念がある場合や、医療的な判断が必要な場合は、
              必ず医師または医療機関にご相談ください。
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              3. 自己判断の禁止
            </Typography>
            <Typography variant="body2" color="text.secondary">
              本アプリが提供する情報のみに基づいて、医療上の意思決定や医薬品の服用
              開始・中止などの判断を行わないでください。
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              4. 緊急時の使用禁止
            </Typography>
            <Typography variant="body2" color="text.secondary">
              生命に関わる緊急事態や、至急の医療が必要な状況では、本アプリを使用
              せず、直ちに119番に連絡するか、最寄りの医療機関を受診してください。
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              5. 情報の正確性
            </Typography>
            <Typography variant="body2" color="text.secondary">
              本アプリで提供される情報は、一般的な医学的知見に基づくものですが、
              すべての個人に適用できるとは限りません。また、医学的知見は日々更新
              されるため、最新の情報については医療機関にご確認ください。
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              6. 責任の制限
            </Typography>
            <Typography variant="body2" color="text.secondary">
              本アプリの利用により生じたいかなる損害についても、開発者および
              提供者は一切の責任を負いません。
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              7. データの取り扱い
            </Typography>
            <Typography variant="body2" color="text.secondary">
              本アプリは健康情報を取り扱いますが、これらの情報は個人の健康管理を
              補助する目的でのみ使用され、医療行為には使用されません。
              データはお使いのブラウザ内に保存され、外部に送信されることはありません。
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DisclaimerDialog;
