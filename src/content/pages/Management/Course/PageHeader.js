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
import { createCourse } from '../../../../Api/Course';
import { getAllCategory } from '../../../../Api/Category';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Create(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(1);
  const { onClose, open } = props;

  const [rows, setRows] = useState([]);
  useEffect(() => {
    getAllCategory().then(function (result) {
      setRows(result.data);
    });
  }, []);

  const categorys = rows.map((data) => ({
    id: data.id,
    title: data.title
  }));

  const handleClose = () => {
    onClose('');
  };

  function onCreate({ title, description, price, category }) {
    createCourse({ title, description, price, category }).then(function (
      result
    ) {
      window.location.reload();
    });
  }

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

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
      <DialogTitle>Add New Course</DialogTitle>
      <div style={{ marginLeft: 45 }}>
        <TextField
          required
          id="outlined-title"
          label="Title"
          style={{ width: 470 }}
          onChange={(e) => setTitle(e.target.value)}
          helperText="Please add your title"
        />
        <div>
          <TextField
            id="outlined-multiline-flexible"
            label="Description"
            multiline
            maxRows={5}
            style={{ width: 470 }}
            helperText="Please add your description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="outlined-select-category"
            select
            label="Category"
            value={category}
            onChange={handleChange}
            helperText="Please select your category"
          >
            {categorys.map((option) => (
              <MenuItem key={option.title} value={option.id}>
                {option.title}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            id="outlined-price-input"
            label="Price"
            autoComplete="current-price"
            helperText="Please add your price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>
      <Box mt={2} mb={2}>
        <Button
          variant="contained"
          style={{ margin: '0 auto', display: 'flex', marginBottom: 2 }}
          onClick={() => onCreate({ title, description, price, category })}
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
          Courses
        </Typography>
        <Typography variant="subtitle2">
          {user.username}, these are all courses
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={handleClickOpen}
        >
          Create Course
        </Button>
        <Create open={open} onClose={handleClose} />
      </Grid>
    </Grid>
  );
}

export default PageHeader;
