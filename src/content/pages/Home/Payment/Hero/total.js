import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';

import { findDiscountByUser } from '../../../../../Api/Discount';

function Total({ course, discount }) {
  const [dis, setDis] = useState(0);
  const [kode, setKode] = useState(0);

  useEffect(() => {
    discount(kode);
  }, [kode]);

  const handleClick = () => {
    findDiscountByUser(dis).then(function (result) {
      if (result.code == 200) {
        setKode(result.data);
      } else {
        setKode({ persentase: 0 });
      }
    });
  };

  return (
    <Grid item sm={12} md={6} xs={12}>
      <Card
        sx={{
          background: '#5A47AB',
          border: 1,
          borderColor: 'gray',
          height: '100%',
          width: '100%'
        }}
      >
        <Box sx={{ m: 3 }}>
          <Card sx={{ p: 2 }}>
            <Stack direction="row" spacing={2}>
              <Avatar
                sx={{ bgcolor: 'gray', p: 5 }}
                variant="rounded"
                alt="f"
                src="ds"
              ></Avatar>
              <Box>
                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    color: 'white',
                    background: '#FBD15B',
                    opacity: '95%',
                    mb: 1
                  }}
                >
                  {course.category}
                </Button>
                <Typography
                  sx={{
                    fontSize: {
                      lg: 13
                    }
                  }}
                >
                  {course.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: {
                      lg: 13
                    }
                  }}
                >
                  {course.status == '1' ? 'Active' : 'Process '}
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Box>
        <Grid container sx={{ mx: 0 }} spacing={3}>
          <Grid item xs={8}>
            <TextField
              sx={{ width: '100%' }}
              color="warning"
              label="Discount Code"
              variant="outlined"
              onChange={(x) => setDis(x.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              sx={{
                width: '100%',
                height: '100%',
                color: 'white',
                background: '#FBD15B',
                opacity: '95%'
              }}
              variant="outlined"
              onClick={handleClick}
            >
              Apply
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ my: 3, mx: 6 }}>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Typography>Materi Price</Typography>
            <Typography color="white">
              Rp. {parseInt(course.price).toLocaleString()}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Typography>Discount</Typography>
            <Typography color="greenyellow">
              - Rp.{' '}
              {kode.persentase
                ? (course.price * (kode.persentase / 100)).toLocaleString()
                : 0}
            </Typography>
          </Stack>
          <Divider sx={{ my: 3 }} />
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Typography variant="h4" color="white">
              Total Amount
            </Typography>
            <Typography variant="h4" color="white">
              Rp.{' '}
              {kode.persentase
                ? (
                    course.price -
                    course.price * (kode.persentase / 100)
                  ).toLocaleString()
                : parseInt(course.price).toLocaleString()}
            </Typography>
          </Stack>
        </Box>
      </Card>
    </Grid>
  );
}

export default Total;
