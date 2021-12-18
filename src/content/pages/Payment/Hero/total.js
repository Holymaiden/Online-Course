import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography
} from '@mui/material';

function Total({ course, discount }) {
  return (
    <Grid item sm={12} md={6} xs={12}>
      <Card
        sx={{
          background: '#5A47AB',
          border: 1,
          borderColor: 'gray',
          height: '100%',
          width: '100%'
        }}
      >
        <Box sx={{ m: 3 }}>
          <Card sx={{ p: 2 }}>
            <Stack direction="row" spacing={2}>
              <Avatar
                sx={{ bgcolor: 'gray', p: 5 }}
                variant="rounded"
                alt="f"
                src="ds"
              ></Avatar>
              <Box>
                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    color: 'white',
                    background: '#FBD15B',
                    opacity: '95%',
                    mb: 1
                  }}
                >
                  {course.category}
                </Button>
                <Typography
                  sx={{
                    fontSize: {
                      lg: 13
                    }
                  }}
                >
                  {course.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: {
                      lg: 13
                    }
                  }}
                >
                  {course.status == '1' ? 'Active' : 'Process '}
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Box>
        <Grid container sx={{ mx: 0 }} spacing={3}>
          <Grid item xs={8}>
            <TextField
              sx={{ width: '100%' }}
              color="warning"
              label="Discount Code"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              sx={{
                width: '100%',
                height: '100%',
                color: 'white',
                background: '#FBD15B',
                opacity: '95%'
              }}
              variant="outlined"
            >
              Apply
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ my: 3, mx: 6 }}>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Typography>Materi Price</Typography>
            <Typography color="white">Rp. {course.price}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Typography>Discount</Typography>
            <Typography color="greenyellow">- Rp. {discount}</Typography>
          </Stack>
          <Divider sx={{ my: 3 }} />
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Typography variant="h4" color="white">
              Total Amount
            </Typography>
            <Typography variant="h4" color="white">
              Rp. {course.price - discount}
            </Typography>
          </Stack>
        </Box>
      </Card>
    </Grid>
  );
}

export default Total;
