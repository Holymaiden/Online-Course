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

import { getAllUser, getCurrentUser } from '../../../../Api/Users';
import { createTransaction } from '../../../../Api/Transaction';
import { getAllUserCourse } from '../../../../Api/UserCourse';
import { getAllPayment } from '../../../../Api/Payment';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Create(props) {
  const { onClose, open } = props;
  const [data, setData] = useState({
    id: '',
    user_id: '',
    username: '',
    course_id: '',
    course: '',
    payment_id: '',
    payment: ''
  });

  const [rows, setRows] = useState([]);
  const [courses, setCourses] = useState([]);
  const [payments, setPayments] = useState([]);
  useEffect(() => {
    getAllUser().then(function (result) {
      setRows(result.data);
    });
    getAllPayment().then(function (result) {
      setPayments(result.data);
    });
  }, []);

  useEffect(() => {
    getAllUserCourse().then(function (result) {
      setCourses(result.data);
    });
  }, [data.user_id]);

  const handleClose = () => {
    onClose('');
  };

  function onCreate(data) {
    createTransaction(data).then(function (result) {
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
      <DialogTitle>Create Transaction</DialogTitle>
      <div style={{ marginLeft: 45 }}>
        <div>
          <TextField
            id="outlined-select-users"
            select
            label="User"
            value={data.user_id}
            onChange={(event) =>
              setData({ ...data, user_id: event.target.value })
            }
            helperText="Please select your user"
          >
            {rows.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.username}
              </MenuItem>
            ))}
          </TextField>
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
            {courses.map((option) =>
              option.user_id == data.user_id ? (
                <MenuItem key={option.course_id} value={option.course_id}>
                  {option.course}
                </MenuItem>
              ) : null
            )}
          </TextField>
          <TextField
            id="outlined-select-payment"
            select
            label="Payment"
            value={data.payment_id}
            onChange={(event) =>
              setData({ ...data, payment_id: event.target.value })
            }
            helperText="Please select your payment"
          >
            {payments.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.account_number}
              </MenuItem>
            ))}
          </TextField>
        </div>
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
          Transactions
        </Typography>
        <Typography variant="subtitle2">
          {user.username}, these are all Transactions
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={handleClickOpen}
        >
          Create Transaction
        </Button>
        <Create open={open} onClose={handleClose} />
      </Grid>
    </Grid>
  );
}

export default PageHeader;
