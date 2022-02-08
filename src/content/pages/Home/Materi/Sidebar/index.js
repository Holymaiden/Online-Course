import {
  CardMedia,
  Grid,
  Typography,
  CardContent,
  Card,
  Button,
  Divider
} from '@mui/material';
import { useEffect, useState } from 'react';

import { getCourseBySlug } from '../../../../../Api/Course';
import { getExistCourse } from '../../../../../Api/TeachingMaterial';

import { useParams, useNavigate } from 'react-router-dom';

function Sidebar({ course }) {
  const navigate = useNavigate();
  const { useMateri } = useParams();
  const [exist, setExist] = useState(0);

  useEffect(async () => {
    await getExistCourse(useMateri).then(function (result) {
      if (result.code == 200) setExist(1);
      else setExist(0);
    });
  }, [useMateri]);

  return (
    <Grid item lg={3} md={12} sx={{ mr: 1, alignSelf: 'start' }}>
      <Grid container>
        <Grid item border={1} borderColor="#ffffff">
          <Card sx={{ backgroundColor: '#ffffff' }}>
            <CardMedia
              component="img"
              image={
                course && course.image
                  ? course.image
                  : '/static/images/overview/anu.svg'
              }
              alt="camp"
              style={{
                margin: 0
              }}
            />
            <Divider sx={{ height: 2, background: '#C5D2D3' }} />
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
                {course && course.category}
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
                {course && course.title}
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
                {course && course.username}
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
                Rp. {course && course.price && course.price.toLocaleString()}
              </Typography>
              <Button
                variant={exist == 1 ? 'outlined' : 'contained'}
                sx={{ mt: 5 }}
                onClick={() => {
                  navigate('/payment', { state: { slug: course.slug } });
                }}
                color={exist == 1 ? 'primary' : 'success'}
              >
                {exist == 1 ? 'Sudah Dipesan' : 'Pesan Sekarang'}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Sidebar;
