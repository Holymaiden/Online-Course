import { CardMedia, Grid, Typography, CardContent, Card } from '@mui/material';
import { useEffect, useState } from 'react';

import { getCourseBySlug } from '../../../../../Api/Course';

import { useParams } from 'react-router-dom';

function Sidebar() {
  const { useMateri } = useParams();
  const [course, setCourse] = useState([]);

  useEffect(() => {
    getCourseBySlug(useMateri).then(function (result) {
      setCourse(result.data);
    });
  }, [useMateri]);

  return (
    <Grid item xs={3} sx={{ mr: 1 }}>
      <Grid container>
        <Grid item border={1} borderColor="#F2F2F2">
          <Card sx={{ maxWidth: 345, backgroundColor: '#ffffff' }}>
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
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Sidebar;
