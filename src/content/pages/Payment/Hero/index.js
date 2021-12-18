import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Stack,
  Typography
} from '@mui/material';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Method from './method';
import Total from './total';

import { getCourseBySlug } from '../../../../Api/Course';

function Hero() {
  const { state } = useLocation();
  const { slug } = state;

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
      <Method course={course} />
      <Total course={course} />
      <Box width={'100%'} margin={3}>
        <Stack direction="row" justifyContent="space-between">
          <Button variant="outlined">Previous</Button>
          <Button variant="contained">Pay</Button>
        </Stack>
      </Box>
    </Grid>
  );
}

export default Hero;
