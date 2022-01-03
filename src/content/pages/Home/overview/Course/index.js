import { CardMedia, Container, Grid, Typography } from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';

import {
  varFadeInUp,
  MotionInView,
  varFadeInDown
} from '../../../../../components/animate';

function Course() {
  return (
    <Container
      maxWidth="lg"
      sx={{ textAlign: 'center', pt: 10, mb: 10 }}
      style={{ color: '#ffffff' }}
    >
      <Grid
        spacing={{ xs: 6 }}
        justifyContent="center"
        alignItems="center"
        container
      >
        <Grid item xs={12}>
          <MotionInView variants={varFadeInUp}>
            <Typography
              fontWeight="medium"
              textAlign="center"
              sx={{
                fontSize: {
                  lg: 45,
                  md: 40,
                  sm: 35,
                  xs: 30,
                  color: `#5A47AB`
                }
              }}
            >
              Online Course Maiden
            </Typography>
          </MotionInView>
          <MotionInView variants={varFadeInDown}>
            <Typography
              fontWeight="medium"
              textAlign="center"
              sx={{
                fontSize: {
                  lg: 20,
                  xs: 15
                },
                color: `#796F6F`
              }}
            >
              Tempat Kursus Yang Mengasikkan
            </Typography>
          </MotionInView>
        </Grid>
        <Grid item xs={12}>
          <MotionInView variants={varFadeInUp}>
            <Grid container spacing={2}>
              <Grid xs={12} sm={4} item>
                <CardMedia
                  sx={{ width: 1 / 2, display: 'inline' }}
                  component="img"
                  image="/static/images/overview/camp.svg"
                  alt="camp"
                />
                <Typography
                  textAlign="center"
                  sx={{
                    fontSize: {
                      lg: 20,
                      sm: 10,
                      color: `#5A47AB`
                    },
                    fontWeight: 'bold'
                  }}
                >
                  Camp Course
                </Typography>
                <Typography
                  textAlign="center"
                  sx={{
                    fontSize: {
                      lg: 18,
                      sm: 8,
                      color: `#796F6F`
                    }
                  }}
                >
                  Mari kita ciptakan komunitas belajar yang hebat bersama dengan
                  instruktur terbaik dan peserta pelatihan.
                </Typography>
              </Grid>
              <Grid xs={12} sm={4} item>
                <CardMedia
                  sx={{ width: 1 / 2, display: 'inline' }}
                  component="img"
                  image="/static/images/overview/play.svg"
                  alt="play"
                />
                <Typography
                  textAlign="center"
                  sx={{
                    fontSize: {
                      lg: 20,
                      sm: 10,
                      color: `#5A47AB`
                    },
                    fontWeight: 'bold'
                  }}
                >
                  7/24 Access Online
                </Typography>
                <Typography
                  textAlign="center"
                  sx={{
                    fontSize: {
                      lg: 18,
                      sm: 8,
                      color: `#796F6F`
                    }
                  }}
                >
                  Ikuti kegiatan online course, ​​simak pelajaran-nya, temukan
                  solusi masalah Anda, berpartisipasi dalam kegiatan dan
                  dapatkan pengalaman belajar yang aktif.
                </Typography>
              </Grid>
              <Grid xs={12} sm={4} item>
                <CardMedia
                  sx={{ width: 1 / 2, display: 'inline' }}
                  component="img"
                  image="/static/images/overview/hat.svg"
                  alt="hat"
                />
                <Typography
                  textAlign="center"
                  sx={{
                    fontSize: {
                      lg: 20,
                      sm: 10,
                      color: `#5A47AB`
                    },
                    fontWeight: 'bold'
                  }}
                >
                  E-Sertifikat
                </Typography>
                <Typography
                  textAlign="center"
                  sx={{
                    fontSize: {
                      lg: 18,
                      sm: 8,
                      color: `#796F6F`
                    }
                  }}
                >
                  Selesaikan pelatihan dengan sukses, menangkan penghargaan kami
                  dan semakin dekat dengan tujuan karir Anda.
                </Typography>
              </Grid>
            </Grid>
          </MotionInView>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Course;
