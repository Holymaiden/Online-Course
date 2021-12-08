import {
  IconButton,
  CardMedia,
  Container,
  Grid,
  Typography,
  CardContent,
  CardActions,
  CardActionArea
} from '@mui/material';
import { useEffect, useState } from 'react';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import PaymentIcon from '@mui/icons-material/Payment';

import { getCourseBySlug } from '../../../../../Api/Course';

import { useNavigate, useParams } from 'react-router-dom';

function Content() {
  const { useMateri } = useParams();
  const [course, setCourse] = useState([]);

  useEffect(() => {
    getCourseBySlug(useMateri).then(function (result) {
      setCourse(result.data);
    });
  }, []);

  let navigate = useNavigate();

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
        <Grid item xs={9}>
          <Grid container>
            <Grid
              xs={12}
              lg={3.5}
              xs={3}
              mt={5}
              mx={3}
              item
              border={1}
              borderColor="#F2F2F2"
            >
              <CardActionArea
                onClick={() => {
                  navigate('/materi/' + course.slug);
                }}
              >
                <CardMedia
                  component="img"
                  image="/static/images/overview/anu.svg"
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
                    {course.category}
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
                    {course.title} - HTML
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
                    {course.username}
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
                      Rp. {course.price}
                    </Typography>
                  </IconButton>
                </CardActions>
              </CardActionArea>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Grid container>
            <Grid item border={1} borderColor="#F2F2F2">
              <CardActionArea
                onClick={() => {
                  navigate('/materi/' + course.slug);
                }}
              >
                <CardMedia
                  component="img"
                  image="/static/images/overview/anu.svg"
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
                    {course.category}
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
                    {course.title} - HTML
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
                    {course.username}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Content;
