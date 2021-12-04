import {
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  Typography
} from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';

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
          <Typography
            fontWeight="medium"
            textAlign="left"
            sx={{
              fontSize: {
                lg: 35,
                md: 30,
                sm: 25,
                xs: 20,
                color: `#FBD15B`
              }
            }}
          >
            Online Course Maiden
          </Typography>
          <Typography
            fontWeight="medium"
            textAlign="left"
            sx={{
              fontSize: {
                lg: 30,
                md: 25,
                sm: 20,
                xs: 15
              },
              color: `#ffffff`
            }}
          >
            Tempat Kursus Yang Mengasikkan
          </Typography>
          <Box
            sx={{
              mt: 5,
              display: 'flex',
              flexDirection: 'row',
              alignItems: { xs: 'center', md: 'flex-start' }
            }}
          >
            <Button
              size="large"
              style={{
                background: `#39229A`,
                color: '#ffffff',
                marginRight: 15,
                width: '40%'
              }}
              component={RouterLink}
              to="/kursus"
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: {
                    lg: 15,
                    md: 10,
                    sm: 10,
                    xs: 10
                  }
                }}
              >
                Bergabung
              </Typography>
            </Button>
            <Button
              size="large"
              style={{
                background: `#ffffff`,
                color: '#39229A',
                marginRight: 15,
                width: '60%'
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: {
                    lg: 15,
                    md: 10,
                    sm: 10,
                    xs: 10
                  }
                }}
              >
                Ingin Jadi Instruktur ?
              </Typography>
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <CardMedia
            component="img"
            image="/static/images/logo/Home-Logo.svg"
            alt="home-logo"
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Hero;
