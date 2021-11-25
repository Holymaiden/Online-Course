import { Box, Container, Card } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material/styles';
import Logo from 'src/components/LogoSign';
import Hero from './Hero';

const LoginWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
);

function Login() {
  return (
    <LoginWrapper>
      <Helmet>
        <title>Sign Up - Online Course Maiden</title>
      </Helmet>
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center" py={5} alignItems="center">
          <Logo />
        </Box>
        <Box display="flex" justifyContent="center">
          <Card sx={{ p: 10, mb: 7, borderRadius: 12, maxWidth: 600 }}>
            <Hero />
          </Card>
        </Box>
      </Container>
    </LoginWrapper>
  );
}

export default Login;
