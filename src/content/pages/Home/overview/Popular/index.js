import { CardMedia, Container, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import parse from 'html-react-parser';

import { getPopularCourse } from '../../../../../Api/Course';

import { useNavigate } from 'react-router-dom';

import {
  varFadeInUp,
  MotionInView,
  varFadeInDown
} from '../../../../../components/animate';

function Popular() {
  const [popular, SetPopular] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPopularCourse(9).then(function (result) {
      SetPopular(result.data);
    });
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{ textAlign: 'center', pt: 5, mb: 10 }}
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
              Popular Course
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
              Temukan materi belajar dengan mudah tentang apa yang Anda inginkan
              dan mulailah belajar.
            </Typography>
          </MotionInView>
        </Grid>
        <Grid item xs={12}>
          <MotionInView variants={varFadeInUp}>
            <Grid container spacing={3}>
              {popular
                ? popular.map((datas) => (
                    <Grid
                      xs={12}
                      sm={4}
                      container
                      justifyContent="center"
                      alignItems="center"
                      mt={5}
                    >
                      <Grid xs={6} item>
                        <CardMedia
                          sx={{ width: 1 / 2, display: 'inline' }}
                          component="img"
                          image={datas.image}
                          alt="camp"
                          onClick={() => navigate('materi/' + datas.slug)}
                        />
                      </Grid>
                      <Grid xs={6} item>
                        <Typography
                          textAlign="left"
                          sx={{
                            fontSize: {
                              lg: 20,
                              sm: 10,
                              color: `#5A47AB`
                            },
                            fontWeight: 'bold'
                          }}
                        >
                          {datas.title}
                        </Typography>
                        <Typography
                          textAlign="left"
                          sx={{
                            fontSize: {
                              lg: 18,
                              sm: 8,
                              color: `#796F6F`
                            }
                          }}
                        >
                          {parse(
                            new String(
                              datas.description.substring(3, 35)
                            ).toString()
                          ) + '-'}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))
                : null}
            </Grid>
          </MotionInView>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Popular;
