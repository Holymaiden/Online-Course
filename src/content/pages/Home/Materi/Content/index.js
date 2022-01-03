import {
  IconButton,
  CardMedia,
  Container,
  Grid,
  Typography,
  CardContent,
  CardActions,
  CardActionArea,
  Card
} from '@mui/material';
import { useEffect, useState } from 'react';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';

import { getCourseBySlug } from '../../../../../Api/Course';
import Sidebar from '../Sidebar';
import Belajar from '../Belajar';

import { useNavigate, useParams } from 'react-router-dom';
import parse from 'html-react-parser';

import { varFadeInLeft, MotionInView } from '../../../../../components/animate';

function Content() {
  const { useMateri } = useParams();
  const [course, setCourse] = useState([]);

  useEffect(() => {
    getCourseBySlug(useMateri).then(function (result) {
      setCourse(result.data);
    });
  }, [useMateri]);

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
        <Grid item xs={8}>
          <Grid container>
            <CardActionArea
              onClick={() => {
                navigate('/materi/' + course.slug);
              }}
            >
              <MotionInView variants={varFadeInLeft}>
                <CardMedia
                  component="img"
                  sx={{ maxWidth: 775, maxHeight: 441 }}
                  image={
                    course.image
                      ? course.image
                      : '/static/images/overview/anu.svg'
                  }
                  alt="camp"
                />
              </MotionInView>
              <CardContent>
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
                  {course.title}
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
                  {course.category}
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
              </CardActions>
            </CardActionArea>
            <Typography
              textAlign="left"
              sx={{
                fontSize: {
                  lg: 18,
                  sm: 8,
                  color: `#796F6F`
                },
                mb: 2,
                mt: 2
              }}
            >
              {parse(new String(course.description).toString())}
            </Typography>
            <Belajar />
          </Grid>
        </Grid>
        <Sidebar />
      </Grid>
    </Container>
  );
}

export default Content;
