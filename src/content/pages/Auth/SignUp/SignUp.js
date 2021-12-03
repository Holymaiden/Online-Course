import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography } from '@mui/material';
// layouts
import AuthLayout from '../../../../layouts/AuthLayout';
// components
import { MHidden } from '../../../../components/@material-extend';
import RegisterForm from '../../../../components/Register';
import AuthSocial from '../AuthSocial';
import { forwardRef, useEffect, useState } from 'react';
import { useAuth } from '../../../../contexts/auth.context';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

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

export default function SignUp() {
  const history = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      return history('/dashboards');
    }
  }, []);
  return (
    <RootStyle title="Register">
      <AuthLayout>
        Already have an account? &nbsp;
        <Link
          underline="none"
          variant="subtitle2"
          component={RouterLink}
          to="/login"
        >
          Login
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle sx={{ background: '#9585DA' }}>
          <Typography
            variant="h3"
            sx={{ px: 5, mt: 10, mb: 5, color: '#ffffff' }}
          >
            Jadilah Peserta Pelajar
          </Typography>
          <img
            alt="register"
            src="/static/images/illustration/illustration_register.png"
          />
        </SectionStyle>
      </MHidden>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Ikutlah dengan kursus, bawa tradisi belajar ke masa depan.
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Pengalaman belajar sebagai bagian dari komunitas kami.
            </Typography>
          </Box>

          <AuthSocial />

          <RegisterForm />

          <Typography
            variant="body2"
            align="center"
            sx={{ color: '#ffffff', mt: 3 }}
          >
            By registering, I agree to Minimal&nbsp;
            <Link underline="always" sx={{ color: 'text.primary' }}>
              Terms of Service
            </Link>
            &nbsp;and&nbsp;
            <Link underline="always" sx={{ color: 'text.primary' }}>
              Privacy Policy
            </Link>
            .
          </Typography>

          <MHidden width="smUp">
            <Typography variant="subtitle2" sx={{ mt: 3, textAlign: 'center' }}>
              Already have an account?&nbsp;
              <Link to="/login" component={RouterLink}>
                Login
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
