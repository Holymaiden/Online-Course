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
import Total from './total';

import { getCourseBySlug } from '../../../../../Api/Course';
import { createPaymentTransaction } from '../../../../../Api/Transaction';

function Hero() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { slug } = state;
  const [discount, setDiscount] = useState('');
  const [pay, setPay] = useState([]);

  const [course, setCourse] = useState('');
  useEffect(() => {
    getCourseBySlug(slug).then(function (result) {
      setCourse(result.data);
    });
  }, [slug]);

  const handlePayment = () => {
    createPaymentTransaction(
      pay,
      discount.persentase
        ? course.price - course.price * (discount.persentase / 100)
        : course.price,
      course.id,
      discount.id
    ).then(function (result) {
      if (result.code == 200) {
        enqueueSnackbar('Transaction success', {
          variant: 'success',
          action: (key) => (
            <IconButton size="small" onClick={() => closeSnackbar(key)}>
              <CloseIcon />
            </IconButton>
          )
        });
        window.location.reload();
      } else {
        enqueueSnackbar('Transaction Failed', {
          variant: 'error',
          action: (key) => (
            <IconButton size="small" onClick={() => closeSnackbar(key)}>
              <CloseIcon />
            </IconButton>
          )
        });
      }
    });
  };

  return (
    <Grid spacing={{ xs: 3 }} container>
      <Grid item sm={12}>
        <Typography
          sx={{
            fontSize: {
              lg: 30
            },
            color: `#FBD15B`
          }}
        >
          Materi {course.title}
        </Typography>
      </Grid>
      <Grid item sm={12}>
        <Divider />
      </Grid>
      <Method
        back={(childData) => {
          setPay(childData);
        }}
      />
      <Total
        course={course}
        discount={(childData) => {
          setDiscount(childData);
        }}
      />
      <Box width={'100%'} sx={{ ml: 3, mt: 5 }}>
        <Stack direction="row" justifyContent="space-between">
          <Button
            variant="outlined"
            sx={{ color: 'white' }}
            onClick={() => {
              navigate(-1);
            }}
          >
            Previous
          </Button>
          <Button variant="contained" onClick={handlePayment}>
            Pay Rp.{' '}
            {discount.persentase
              ? (
                  course.price -
                  course.price * (discount.persentase / 100)
                ).toLocaleString()
              : parseInt(course.price).toLocaleString()}
          </Button>
        </Stack>
      </Box>
    </Grid>
  );
}

export default Hero;
