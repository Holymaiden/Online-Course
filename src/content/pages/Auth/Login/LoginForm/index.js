import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { makeStyles } from '@mui/styles';
import { loginUser } from '../../../../../Api/auth';
import { useAuth } from '../../../../../contexts/auth.context';

import Snack from '../../../Components/SnackBar';

// ----------------------------------------------------------------------

const styles = makeStyles({
  root: {
    '& label.Mui-focused': {
      color: '#5A47AB'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#5A47AB'
      },
      '&:hover fieldset': {
        borderColor: '#5A47AB'
      }
    },
    '& .MuiFormLabel-root': {
      color: '#5A47AB'
    }
  }
});

export default function LoginForm() {
  const history = useNavigate();
  const { setUser } = useAuth();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      return history('/dashboards');
    }
  }, []);
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: (data) => {
      loginUser(data).then(function (result) {
        if (result.error) {
          Snack.error('Gagal Login!');
          window.location.reload();
        } else {
          setProfile(result);
        }
      });
    }
  });

  const setProfile = async (response) => {
    let data = { ...response };
    data = response.data;
    // let decoded = jwt.decode(data, { complete: true });
    setUser(data);
    localStorage.setItem('user', data);
    return history('/dashboards');
  };

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const classes = styles();

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="text"
            label="Username"
            className={classes.root}
            sx={{
              input: { color: '#5A47AB' }
            }}
            {...getFieldProps('username')}
            error={Boolean(touched.username && errors.username)}
            helperText={touched.username && errors.username}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            className={classes.root}
            sx={{
              input: { color: '#5A47AB' }
            }}
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <FormControlLabel
            control={
              <Checkbox
                {...getFieldProps('remember')}
                checked={values.remember}
              />
            }
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
