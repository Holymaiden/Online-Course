import {
  IconButton,
  CardMedia,
  Card,
  Container,
  Grid,
  Typography,
  CardContent,
  Stack,
  CardActions,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Pagination,
  TablePagination
} from '@mui/material';
import { useEffect, useState } from 'react';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import PaymentIcon from '@mui/icons-material/Payment';

import { getAllCategory } from '../../../../../Api/Category';
import { getAllInstructor } from '../../../../../Api/Instructor';
import { getAllCourseKursus } from '../../../../../Api/Course';

import { Link as RouterLink } from 'react-router-dom';

const applyPagination = (datas, page, limit) => {
  return datas.slice(page * limit, page * limit + limit);
};

function All() {
  const [data, setData] = useState({
    category: '',
    instructor: '',
    star: ''
  });
  const [category, setCategory] = useState([]);
  const [instructor, setInstructor] = useState([]);
  const [course, setCourse] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getAllInstructor().then(function (result) {
      setInstructor(result.data);
    });
    getAllCategory().then(function (result) {
      setCategory(result.data);
    });
  }, []);

  useEffect(() => {
    getAllCourseKursus(data).then(function (result) {
      setCourse(result.data);
    });
  }, [data]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedCarts = applyPagination(course, page - 1, 10);

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
            Semua Materi
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
            Temukan materi belajar dengan mudah tentang apa yang Anda inginkan
            dan mulailah belajar.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Card sx={{ background: '#5A47AB' }}>
                <CardContent>
                  <Stack spacing={3} direction="row">
                    <FormControl fullWidth>
                      <InputLabel
                        id="demo-simple-select-label"
                        sx={{ color: `#ffffff` }}
                      >
                        Category
                      </InputLabel>
                      <Select
                        value={data.category}
                        label="Category"
                        sx={{ color: `#ffffff` }}
                        onChange={(event) =>
                          setData({ ...data, category: event.target.value })
                        }
                      >
                        <MenuItem value="">All</MenuItem>
                        {category
                          ? category.map((datas) => (
                              <MenuItem value={datas.id}>
                                {datas.title}
                              </MenuItem>
                            ))
                          : null}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel
                        id="demo-simple-select-label"
                        sx={{ color: `#ffffff` }}
                      >
                        Instructor
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={data.instructor}
                        label="Instructor"
                        sx={{ color: `#ffffff` }}
                        onChange={(event) =>
                          setData({ ...data, instructor: event.target.value })
                        }
                      >
                        <MenuItem value="">All</MenuItem>
                        {instructor
                          ? instructor.map((datas) => (
                              <MenuItem value={datas.user_id}>
                                {datas.username}
                              </MenuItem>
                            ))
                          : null}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel
                        id="demo-simple-select-label"
                        sx={{ color: `#ffffff` }}
                      >
                        Star
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={data.star}
                        label="Star"
                        sx={{ color: `#ffffff` }}
                        onChange={(event) =>
                          setData({ ...data, star: event.target.value })
                        }
                      >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            {paginatedCarts
              ? paginatedCarts.map((datas) => (
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
                        {datas.category}
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
        <Pagination
          count={course.length / 10}
          onChange={handlePageChange}
          page={page}
          color="primary"
        />
      </Grid>
    </Container>
  );
}

export default All;
