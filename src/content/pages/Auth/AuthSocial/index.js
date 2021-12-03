import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
// material
import { Stack, Button, Divider, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function AuthSocial() {
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button fullWidth size="large" color="inherit" variant="outlined">
          <GoogleIcon style={{ color: '#DF3E30' }} height={24} />
        </Button>

        <Button fullWidth size="large" color="inherit" variant="outlined">
          <FacebookIcon style={{ color: '#1877F2' }} height={24} />
        </Button>

        <Button fullWidth size="large" color="inherit" variant="outlined">
          <TwitterIcon style={{ color: '#1C9CEA' }} height={24} />
        </Button>
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography sx={{ color: '#ffffff' }}>OR</Typography>
      </Divider>
    </>
  );
}
