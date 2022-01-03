import { Box, Container, Grid, Typography } from '@mui/material';

import Search from '../Search';

import {
  varFadeInRight,
  varFadeInLeft,
  varFadeInUp,
  varFadeInDown,
  MotionInView
} from '../../../../../components/animate';

function Hero() {
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
              Katalog Kursus Kami
            </Typography>
          </MotionInView>
          <MotionInView variants={varFadeInUp}>
            <Typography
              sx={{
                fontSize: {
                  lg: 15,
                  sm: 10
                },
                color: `#F2F2F2`
              }}
            >
              Cari Instruktur atau Materi Pilihan Anda.
            </Typography>
          </MotionInView>
          <MotionInView variants={varFadeInRight}>
            <Box
              sx={{
                mt: 5,
                display: 'flex',
                flexDirection: 'row',
                alignItems: { xs: 'center', md: 'flex-start' }
              }}
            >
              <Search />
            </Box>
          </MotionInView>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Hero;
