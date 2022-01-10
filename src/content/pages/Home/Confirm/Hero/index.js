import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography
} from '@mui/material';

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import CloseIcon from '@mui/icons-material/Close';

import Method from './method';

import { getCourseBySlug } from '../../../../../Api/Course';
import { createPaymentTransaction } from '../../../../../Api/Transaction';

import {
  varFadeInLeft,
  varFadeInRight,
  MotionInView
} from '../../../../../components/animate';

function Hero() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { slug } = state;

  return (
    <Grid spacing={{ xs: 3 }} container>
      <Grid item sm={12}>
        <MotionInView variants={varFadeInLeft}>
          <Typography
            textAlign="center"
            sx={{
              fontSize: {
                lg: 50
              },
              color: `#FBD15B`
            }}
          >
            Terima Kasih Atas Pembelian Anda
          </Typography>
        </MotionInView>
      </Grid>
      <Grid item sm={12}>
        <Divider />
      </Grid>
      <Method />
      <Box width={'100%'} sx={{ ml: 3, mt: 5 }}>
        <Stack direction="row" justifyContent="space-between">
          <MotionInView variants={varFadeInLeft}>
            <Button
              variant="outlined"
              sx={{ color: 'white', borderRadius: 2, borderColor: 'white' }}
              onClick={() => {
                navigate(-1, { state: { slug: slug } });
              }}
            >
              Previous
            </Button>
          </MotionInView>
          <MotionInView variants={varFadeInRight}>
            <Button
              variant="contained"
              sx={{ borderRadius: 2, background: '#4BB543' }}
              onClick={() => {
                navigate('/materi/' + slug);
              }}
            >
              Terima Kasih
            </Button>
          </MotionInView>
        </Stack>
      </Box>
    </Grid>
  );
}

export default Hero;
