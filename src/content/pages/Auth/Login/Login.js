import { Link as RouterLink } from 'react-router-dom';
import { forwardRef, useEffect, useState } from 'react';
import { useAuth } from '../../../../contexts/auth.context';
import { Helmet } from 'react-helmet-async';
// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Link, Container, Typography } from '@mui/material';
// layouts
import AuthLayout from '../../../../layouts/AuthLayout';
// components
import { MHidden } from '../../../../components/@material-extend';
import LoginForm from './LoginForm';
import AuthSocial from '../AuthSocial';
import { Box } from '@mui/system';

// ----------------------------------------------------------------------
const Page = forwardRef(({ children, title = '', ...other }, ref) => (
  <Box ref={ref} {...other}>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    {children}
  </Box>
));

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  },
  background: '#5A47AB',
  color: '#ffffff'
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <RootStyle title="Login | Minimal-UI">
      <AuthLayout>
        Don’t have an account? &nbsp;
        <Link
          underline="none"
          variant="subtitle2"
          component={RouterLink}
          to="/signup"
        >
          Get started
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle sx={{ background: '#9585DA' }}>
          <Typography
            variant="h3"
            sx={{ px: 5, mt: 10, mb: 5, color: '#ffffff' }}
          >
            Hi, Welcome Back
          </Typography>
          <img
            src="/static/images/illustration/illustration_login.png"
            alt="login"
          />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Sign in to Online Course Maiden
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Enter your details below.
            </Typography>
          </Stack>
          <AuthSocial />

          <LoginForm />

          <MHidden width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Don’t have an account?&nbsp;
              <Link variant="subtitle2" component={RouterLink} to="register">
                Get started
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
