import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Stack, Button, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { LoadingButton } from '@mui/lab';

import { uploadCV } from '../../../../../Api/Registration';
import { useEffect, useState } from 'react';

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

export default function Forms() {
  const navigate = useNavigate();
  const [uploadCv, setUploadCv] = useState('');

  useEffect(() => {
    formik.setFieldValue('cv', uploadCv);
  }, [uploadCv]);

  const Cv = Yup.object().shape({
    cv: Yup.mixed()
      .required('A file is required')
      .test('fileFormat', 'PDF only', (value) => {
        console.log(value);
        return value && ['application/pdf'].includes(value.type);
      })
  });

  const formik = useFormik({
    initialValues: {
      cv: ''
    },
    validationSchema: Cv,
    onSubmit: function (data) {
      uploadCV(data).then(function (result) {
        navigate('/login', { replace: true });
      });
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  const classes = styles();

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Typography color="#5A47AB" fontWeight="bold" marginBottom={3}>
          Upload CV
        </Typography>
        <Stack spacing={3}>
          <Grid sx={{ alignSelf: 'center', marginLeft: -3 }}>
            <label htmlFor="btn-upload">
              <input
                id="btn-upload"
                name="cv"
                style={{
                  display: 'none',
                  marginBottom: '2ch',
                  width: 215,
                  height: 50
                }}
                type="file"
                className={classes.root}
                onChange={(e) => {
                  setUploadCv(e.target.files[0]);
                }}
              />
              <Button
                style={{
                  marginBottom: '2ch',
                  width: 215,
                  height: 50,
                  marginLeft: '2ch'
                }}
                className="btn-choose"
                variant="outlined"
                component="span"
              >
                Choose Files
              </Button>
            </label>
          </Grid>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Daftar Instructor
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
