import { CircularProgress, Box } from '@mui/material';

const LoadingSpinner: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
      }}
    >
      <CircularProgress size={60} sx={{ color: 'amber' }} /> {/* Default size and amber color */}
    </Box>
  );
};

export default LoadingSpinner;
