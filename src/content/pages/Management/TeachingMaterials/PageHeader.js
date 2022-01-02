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

import { getCurrentUser } from '../../../../Api/Users';
import { createTeachingMaterial } from '../../../../Api/TeachingMaterial';
import { getAllCourse } from '../../../../Api/Course';

import Snack from '../../Components/SnackBar';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Create(props) {
  const { onClose, open } = props;
  const [data, setData] = useState({
    id: '',
    course_id: '',
    title: '',
    content: '',
    status: ''
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
    createTeachingMaterial(data).then(function (result) {
      if (result.code == 200) {
        Snack.success('Berhasil Dibuat!');
        window.location.reload();
      } else if (result.code == 300) {
        Snack.error('Gagal Dibuat!');
      } else {
        Snack.warning('Ada Yang Bermasalah!');
      }
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
        '& .MuiButton-root': { width: '10ch' },
        'text-align': '-webkit-center'
      }}
    >
      <DialogTitle>Create Teaching Material</DialogTitle>
      <div>
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
            required
            id="outlined-title"
            label="Title"
            onChange={(e) => setData({ ...data, title: e.target.value })}
            helperText="Please add your title"
          />
        </div>

        <label htmlFor="btn-upload">
          <input
            id="btn-upload"
            name="content"
            style={{
              display: 'none',
              marginBottom: '2ch',
              width: 215,
              height: 50
            }}
            type="file"
            onChange={(e) => setData({ ...data, content: e.target.files[0] })}
          />
          <Button
            style={{
              marginBottom: '2ch',
              width: 215,
              height: 50,
              marginLeft: '2ch'
            }}
            className="btn-choose"
            variant="outlined"
            component="span"
          >
            Choose Files
          </Button>
        </label>
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
          Teaching Materials
        </Typography>
        <Typography variant="subtitle2">
          {user.username}, these are all Teaching Materias
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={handleClickOpen}
        >
          Create Teaching Material
        </Button>
        <Create open={open} onClose={handleClose} />
      </Grid>
    </Grid>
  );
}

export default PageHeader;
