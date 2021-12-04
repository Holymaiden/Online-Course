import {
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  lighten,
  CardActions,
  Button,
  IconButton
} from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';

import { getPopularCourse } from '../../../../../Api/Course';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import PaymentIcon from '@mui/icons-material/Payment';
import { useEffect, useState } from 'react';

function Course() {
  const [popular, SetPopular] = useState([]);

  useEffect(() => {
    getPopularCourse().then(function (result) {
      SetPopular(result.data);
    });
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{ textAlign: 'center', pt: 10, mb: 10 }}
      style={{ color: '#ffffff' }}
    >
      <Grid
        spacing={{ xs: 12 }}
        justifyContent="center"
        alignItems="center"
        container
      >
        <Grid item xs={12}>
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
            Materi Unggulan Kami
          </Typography>
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
            Temukan materi dengan mudah tentang subjek yang Anda inginkan dan
            mulailah belajar.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            {popular
              ? popular.map((datas) => (
                  <Grid
                    xs={12}
                    sm={3.5}
                    mt={5}
                    mx={3}
                    item
                    border={1}
                    borderColor="#F2F2F2"
                  >
                    <CardMedia
                      component="img"
                      image={
                        datas.image
                          ? datas.image
                          : '/static/images/overview/anu.svg'
                      }
                      alt="camp"
                    />
                    <CardContent>
                      <Typography
                        textAlign="left"
                        sx={{
                          fontSize: {
                            lg: 18,
                            sm: 8,
                            color: `#796F6F`
                          },
                          mb: 2
                        }}
                      >
                        {datas.category_title}
                      </Typography>
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
                        {datas.title} - HTML
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
                        {datas.username}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <IconButton aria-label="Time">
                        <AccessTimeIcon style={{ color: '#796F6F' }} />
                        <Typography
                          sx={{
                            fontSize: {
                              lg: 15,
                              sm: 10,
                              color: '#796F6F'
                            },
                            pl: 0.5
                          }}
                        >
                          3 hr
                        </Typography>
                      </IconButton>
                      <IconButton aria-label="Stars">
                        <LocalActivityIcon style={{ color: '#23BA29' }} />
                        <Typography
                          sx={{
                            fontSize: {
                              lg: 15,
                              sm: 10,
                              color: `#23BA29`
                            },
                            pl: 0.5
                          }}
                        >
                          4.5
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: {
                              lg: 15,
                              sm: 10,
                              color: '#796F6F'
                            },
                            pl: 0.5
                          }}
                        >
                          (300)
                        </Typography>
                      </IconButton>
                      <IconButton
                        aria-label="Pay"
                        style={{ marginLeft: { lg: 50, sm: 25 } }}
                      >
                        <PaymentIcon style={{ color: '#5A47AB' }} />
                        <Typography
                          sx={{
                            fontSize: {
                              lg: 15,
                              sm: 10,
                              color: `#5A47AB`
                            },
                            pl: 0.5
                          }}
                        >
                          Rp. {datas.price.toLocaleString()}
                        </Typography>
                      </IconButton>
                    </CardActions>
                  </Grid>
                ))
              : null}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Course;
