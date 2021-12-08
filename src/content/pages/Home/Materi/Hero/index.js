import { Container, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getCourseBySlug } from '../../../../../Api/Course';

function Hero() {
  const { useMateri } = useParams();
  const [course, setCourse] = useState([]);
  useEffect(() => {
    getCourseBySlug(useMateri).then(function (result) {
      setCourse(result.data);
    });
  }, [useMateri]);

  return (
    <Container
      maxWidth="lg"
      sx={{ textAlign: 'center', pt: 10 }}
      style={{ color: '#ffffff' }}
    >
      <Grid
        spacing={{ xs: 6, md: 10 }}
        justifyContent="center"
        alignItems="center"
        container
      >
        <Grid item xs={12} sm={12} md={6}>
          <Typography
            sx={{
              fontSize: {
                lg: 30,
                md: 25,
                sm: 20,
                xs: 15
              },
              color: `#FBD15B`
            }}
          >
            Materi {course.title}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Hero;
