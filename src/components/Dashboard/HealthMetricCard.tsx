import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import { HealthStatus } from '../../types';
import { STATUS_COLORS, STATUS_LABELS } from '../../constants/healthStandards';

interface HealthMetricCardProps {
  title: string;
  value: number | string;
  unit: string;
  status: HealthStatus;
  icon: 'weight' | 'bloodPressure' | 'heartRate' | 'temperature' | 'bloodGlucose';
}

const iconMap = {
  weight: MonitorWeightIcon,
  bloodPressure: FavoriteIcon,
  heartRate: FavoriteIcon,
  temperature: ThermostatIcon,
  bloodGlucose: BloodtypeIcon,
};

const HealthMetricCard = ({
  title,
  value,
  unit,
  status,
  icon,
}: HealthMetricCardProps) => {
  const IconComponent = iconMap[icon];
  const statusColor = STATUS_COLORS[status];
  const statusLabel = STATUS_LABELS[status];

  return (
    <Card
      sx={{
        height: '100%',
        borderLeft: `4px solid ${statusColor}`,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3,
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <IconComponent sx={{ color: statusColor, mr: 1 }} />
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
            {unit}
          </Typography>
        </Box>
        <Chip
          label={statusLabel}
          size="small"
          sx={{
            bgcolor: statusColor,
            color: 'white',
            fontWeight: 'bold',
          }}
        />
      </CardContent>
    </Card>
  );
};

export default HealthMetricCard;
