import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Method from './method';
import Total from './total';

import { getCourseBySlug } from '../../../../../Api/Course';

function Hero() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { slug } = state;
  const [discount, setDiscount] = useState(0);
  const [pay, setPay] = useState([]);

  const [course, setCourse] = useState('');
  useEffect(() => {
    getCourseBySlug(slug).then(function (result) {
      setCourse(result.data);
    });
  }, [slug]);

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
          <Button variant="contained">
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
