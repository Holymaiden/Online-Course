import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography
} from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../../../contexts/auth.context';
import { loginUser } from '../../../../../Api/auth';

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
    color: ${theme.palette.success.contrastText};
`
);

function Hero() {
  const history = useNavigate();
  const { setUser } = useAuth();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      return history('/dashboards');
    }
  }, []);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async (event) => {
    if (event) {
      event.preventDefault();
    }
    loginUser({ username, password }).then(function (result) {
      if (result.error) {
        return console.log(result.error);
      } else {
        setProfile(result);
      }
    });
  };

  const setProfile = async (response) => {
    let data = { ...response };
    data = response.data;
    // let decoded = jwt.decode(data, { complete: true });
    setUser(data);
    localStorage.setItem('user', data);
    return history('/dashboards');
  };

  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
      <Grid
        spacing={{ xs: 6, md: 10 }}
        justifyContent="center"
        alignItems="center"
        container
      >
        <Grid item md={10} lg={10} mx="auto">
          <TypographyH1 sx={{ mb: 5 }} variant="h1">
            Sign In
          </TypographyH1>
          <Box sx={{ pb: 2 }}>
            <TextField
              required
              id="outlined-username"
              label="Username"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </Box>
          <Box sx={{ pb: 5 }}>
            <TextField
              required
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </Box>
          <Box sx={{ pb: 1 }}>
            <Button
              size="large"
              variant="contained"
              sx={{ px: 6 }}
              onClick={login}
            >
              Login
            </Button>
          </Box>
          <Button
            component={RouterLink}
            to="/signup"
            size="large"
            variant="text"
            sx={{ px: 5 }}
          >
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Hero;
