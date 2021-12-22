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
import DateTimePicker from '@mui/lab/DateTimePicker';

import { getCurrentUser } from '../../../../Api/Users';
import { createSchedule } from '../../../../Api/Schedule';
import { getAllCourse } from '../../../../Api/Course';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Create(props) {
  const { onClose, open } = props;
  const [data, setData] = useState({
    id: '',
    course_id: '',
    from: '',
    until: ''
  });

  const [rows, setRows] = useState([]);
  useEffect(() => {
    getAllCourse().then(function (result) {
      setRows(result.data);
    });
  }, []);

  const handleClose = () => {
    onClose('');
  };

  function onCreate(data) {
    createSchedule(data).then(function (result) {
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
      <DialogTitle>Create Schedule</DialogTitle>
      <div style={{ marginLeft: 45 }}>
        <div>
          <TextField
            id="outlined-select-course"
            select
            label="Course"
            style={{ width: 470 }}
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
        </div>
        <DateTimePicker
          label="Date&Time From"
          value={data.from}
          onChange={(event) => setData({ ...data, from: event })}
          renderInput={(params) => <TextField {...params} />}
        />
        <DateTimePicker
          label="Date&Time Until"
          value={data.until}
          onChange={(event) => setData({ ...data, until: event })}
          renderInput={(params) => <TextField {...params} />}
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
          Schedules
        </Typography>
        <Typography variant="subtitle2">
          {user.username}, these are all Schedules
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={handleClickOpen}
        >
          Create Schedule
        </Button>
        <Create open={open} onClose={handleClose} />
      </Grid>
    </Grid>
  );
}

export default PageHeader;
