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
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

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
  const [image, setImage] = useState([]);
  const { onClose, open } = props;

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' }
      ],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false
    }
  };

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video'
  ];

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

  function onCreate({ title, description, price, category, image }) {
    createCourse({ title, description, price, category, image }).then(function (
      result
    ) {
      console.log(result);
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
      maxWidth="md"
      fullWidth={true}
      TransitionComponent={Transition}
      sx={{
        '& .MuiTextField-root': { m: 2 },
        'text-align': '-webkit-center',
        '& .MuiButton-root': { width: '10ch' }
      }}
    >
      <DialogTitle>Add New Course</DialogTitle>
      <div>
        <TextField
          required
          id="outlined-title"
          label="Title"
          style={{ width: '95%' }}
          onChange={(e) => setTitle(e.target.value)}
          helperText="Please add your title"
        />
        <div>
          <TextField
            id="outlined-select-category"
            select
            label="Category"
            style={{ width: '46%' }}
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
            style={{ width: '46%' }}
            autoComplete="current-price"
            helperText="Please add your price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <label htmlFor="btn-upload">
          <input
            id="btn-upload"
            name="avatar"
            style={{
              display: 'none',
              marginBottom: '2ch',
              width: 215,
              height: 50
            }}
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
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
        <div>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            onChange={(content, delta, source, editor) =>
              setDescription(editor.getHTML())
            }
            value={description}
            style={{ marginLeft: 25, marginRight: 25, marginBottom: 10 }}
          />
        </div>
      </div>
      <Box mt={2} mb={2}>
        <Button
          variant="contained"
          style={{ margin: '0 auto', display: 'flex', marginBottom: 2 }}
          onClick={() =>
            onCreate({ title, description, price, category, image })
          }
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
