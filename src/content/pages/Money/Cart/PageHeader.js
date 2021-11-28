import PropTypes from 'prop-types';

import {
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  TextField,
  MenuItem,
  Slide
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { forwardRef, useEffect, useState } from 'react';
import { Box } from '@mui/system';

import { getCurrentUser, getAllUser } from '../../../../Api/Users';
import { createCart } from '../../../../Api/Cart';
import { getAllCourse } from '../../../../Api/Course';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Create(props) {
  const { onClose, open } = props;
  const [data, setData] = useState({
    id: '',
    user_id: '',
    course_id: '',
    price: ''
  });

  const [rows, setRows] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAllCourse().then(function (result) {
      setRows(result.data);
    });
    getAllUser().then(function (result) {
      setUsers(result.data);
    });
  }, []);

  const handleClose = () => {
    onClose('');
  };

  function onCreate(data) {
    createCart(data).then(function (result) {
      console.log(result.data);
      window.location.reload();
    });
  }

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      maxWidth="sm"
      fullWidth={true}
      TransitionComponent={Transition}
      sx={{
        '& .MuiTextField-root': { m: 2, width: '25ch' },
        '& .MuiButton-root': { width: '10ch' }
      }}
    >
      <DialogTitle>Create Cart</DialogTitle>
      <div style={{ marginLeft: 45 }}>
        <div>
          <TextField
            id="outlined-select-course"
            select
            label="Course"
            value={data.course_id}
            onChange={(event) =>
              setData({ ...data, course_id: event.target.value })
            }
            helperText="Please select your course"
          >
            {rows.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.title}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-select-user"
            select
            label="User"
            value={data.user_id}
            onChange={(event) =>
              setData({ ...data, user_id: event.target.value })
            }
            helperText="Please select your user"
          >
            {users.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.username}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <TextField
          required
          id="outlined-price"
          label="Price"
          style={{ width: 470 }}
          onChange={(e) => setData({ ...data, price: e.target.value })}
          helperText="Please add your price"
        />
      </div>
      <Box mt={2} mb={2}>
        <Button
          variant="contained"
          style={{ margin: '0 auto', display: 'flex', marginBottom: 2 }}
          onClick={() => onCreate(data)}
        >
          Create
        </Button>
      </Box>
    </Dialog>
  );
}

Create.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

function PageHeader() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [user, setUser] = useState([]);
  useEffect(() => {
    getCurrentUser().then((data) => setUser(data));
  }, []);
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Cart
        </Typography>
        <Typography variant="subtitle2">
          {user.username}, these are all Carts
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={handleClickOpen}
        >
          Create Cart
        </Button>
        <Create open={open} onClose={handleClose} />
      </Grid>
    </Grid>
  );
}

export default PageHeader;
