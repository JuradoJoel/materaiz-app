// @mui
import { alpha, useTheme } from '@mui/material/styles';
import { Tooltip, Box } from '@mui/material';
// utils
import { bgBlur } from '../../utils/cssStyles';
//
import { IconButtonAnimate } from '../animate';
//
import WhatsappIcon from '../../assets/whatsapp-icon.png';
// ----------------------------------------------------------------------

export default function WhatsappButton() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        right: 24,
        bottom: 24,
        zIndex: 999,
        position: 'fixed',
        borderRadius: '50%',
        ...bgBlur({ color: theme.palette.background.default }),
      }}
    >
      <Tooltip title="Whatsapp">
        <IconButtonAnimate
          color="primary"
          onClick={() => window.open('https://wa.me/1161832176', '_blank')}
          sx={{ p: 1.25 }}
        >
          <img src={WhatsappIcon} alt="Whatsapp" width={42} height={42} />
        </IconButtonAnimate>
      </Tooltip>
    </Box>
  );
}
