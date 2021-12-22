import {
  CardMedia,
  Grid,
  Typography,
  CardContent,
  Card,
  Button
} from '@mui/material';
import { useEffect, useState } from 'react';

import { getCourseBySlug } from '../../../../../Api/Course';
import { getExistCourse } from '../../../../../Api/TeachingMaterial';

import { useParams, useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();
  const { useMateri } = useParams();
  const [course, setCourse] = useState([]);
  const [exist, setExist] = useState(0);

  useEffect(() => {
    getCourseBySlug(useMateri).then(function (result) {
      setCourse(result.data);
    });
    getExistCourse(useMateri).then(function (result) {
      console.log(result.data);
      if (result.code == 200) setExist(1);
      else setExist(0);
    });
  }, [useMateri]);

  return (
    <Grid item lg={3} md={12} sx={{ mr: 1, alignSelf: 'start' }}>
      <Grid container>
        <Grid item border={1} borderColor="#F2F2F2">
          <Card sx={{ backgroundColor: '#ffffff' }}>
            <CardMedia
              component="img"
              image="/static/images/overview/anu.svg"
              alt="camp"
              style={{
                margin: 0
              }}
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
              <Button
                variant="contained"
                sx={{ mt: 5 }}
                onClick={() => {
                  navigate('/payment', { state: { slug: course.slug } });
                }}
                disabled={exist == 1 ? 1 : 0}
                color="success"
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
