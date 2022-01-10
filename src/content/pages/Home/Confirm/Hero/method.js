import { Box, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';

import { varFadeInLeft, MotionInView } from '../../../../../components/animate';

function Method() {
  return (
    <Grid item sm={12} md={12} xs={{ pl: -20 }}>
      <MotionInView variants={varFadeInLeft}>
        <Typography
          textAlign="center"
          sx={{
            fontSize: {
              lg: 30,
              color: 'white'
            }
          }}
        >
          Pembelian Anda Sedang di Proses
        </Typography>
        <Box display="flex" justifyContent="center" sx={{ mt: 5 }}>
          <img
            alt="Coming Soon"
            height={200}
            sx={{ textAlign: 'center' }}
            src="/static/images/placeholders/illustrations/2.png"
          />
        </Box>
        <Typography
          textAlign="center"
          sx={{
            fontSize: {
              lg: 20,
              color: 'white'
            }
          }}
        >
          Kami Akan Mengirimkan Pesan Ke Dalam Data Diri Yang Telah Anda Isi
          tadi
        </Typography>
      </MotionInView>
    </Grid>
  );
}

const styles = makeStyles({
  root: {
    '& label.Mui-focused': {
      color: 'white'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
        borderRadius: 12
      },
      '&:hover fieldset': {
        borderColor: 'white'
      }
    },
    '& .MuiFormLabel-root': {
      color: 'white'
    }
  }
});

export default Method;
