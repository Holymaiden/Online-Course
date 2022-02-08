import { Container, Grid, Typography } from '@mui/material';

import { varFadeInDown, MotionInView } from '../../../../../components/animate';

function Hero({ course }) {
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
          <MotionInView variants={varFadeInDown}>
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
              Materi {course && course.title}
            </Typography>
          </MotionInView>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Hero;
