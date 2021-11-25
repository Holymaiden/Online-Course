import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography
} from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';

import { styled } from '@mui/material/styles';

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
    color: ${theme.palette.success.contrastText};
`
);

const TypographyH2 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(17)};
`
);

const MuiAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #e5f7ff;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

const JsAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #fef8d8;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

function Hero() {
  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
      <Grid
        spacing={{ xs: 6, md: 10 }}
        justifyContent="center"
        alignItems="center"
        container
      >
        <Grid item md={10} lg={20} mx="auto">
          <TypographyH1 sx={{ mb: 5 }} variant="h1">
            Sign Up
          </TypographyH1>
          <Box sx={{ pb: 2 }}>
            <TextField required id="outlined-username" label="Username" />
          </Box>
          <Box sx={{ pb: 5 }}>
            <TextField
              required
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
          </Box>
          <Box sx={{ pb: 1 }}>
            <Button
              component={RouterLink}
              to="/dashboards/tasks"
              size="large"
              variant="contained"
              sx={{ px: 6 }}
            >
              Register
            </Button>
          </Box>
          <Button
            component={RouterLink}
            to="/login"
            size="large"
            variant="text"
            sx={{ px: 5 }}
          >
            Sign In
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Hero;
