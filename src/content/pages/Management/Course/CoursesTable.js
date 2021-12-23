import { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader,
  Dialog,
  DialogTitle,
  TextField,
  Button,
  Slide
} from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';

import { updateCourse, destroyCourse } from '../../../../Api/Course';
import { getAllCategory } from '../../../../Api/Category';
import Label from 'src/components/Label';

const statuss = [
  {
    id: 1,
    status: 'Completed'
  },
  {
    id: 2,
    status: 'Pending'
  },
  {
    id: 3,
    status: 'Failed'
  }
];

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Update(props) {
  const { onClose, selectedValue, open } = props;
  const [data, setData] = useState({
    id: '',
    title: '',
    description: '',
    price: '',
    category: '',
    status: ''
  });

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

  useEffect(
    () =>
      setData({
        id: selectedValue.id,
        title: selectedValue.title,
        description: selectedValue.description,
        price: selectedValue.price,
        category: selectedValue.category,
        status: selectedValue.status
      }),
    [open]
  );

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

  function onUpdate(data) {
    updateCourse(data).then(function (result) {
      window.location.reload();
    });
  }

  const handleChange = (event) => {
    setData({ ...data, category: event.target.value });
  };

  const handleChange2 = (event) => {
    setData({ ...data, status: event.target.value });
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
        '& .MuiButton-root': { width: '10ch' },
        'text-align': '-webkit-center'
      }}
    >
      <DialogTitle>Update Course</DialogTitle>
      <div>
        <TextField
          required
          id="outlined-title"
          label="Title"
          style={{ width: '95%' }}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          helperText="Please add your title"
          defaultValue={selectedValue.title}
        />
        <TextField
          required
          id="outlined-price-input"
          label="Price"
          style={{ width: '95%' }}
          autoComplete="current-price"
          helperText="Please add your price"
          onChange={(e) => setData({ ...data, price: e.target.value })}
          defaultValue={selectedValue.price}
        />
        <div>
          <TextField
            id="outlined-select-category"
            select
            label="Category"
            style={{ width: '46%' }}
            value={data.category}
            onChange={handleChange}
            helperText="Please select your category"
            defaultValue={selectedValue.category}
          >
            {categorys.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.title}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-select-status"
            select
            label="Status"
            style={{ width: '46%' }}
            value={data.status}
            onChange={handleChange2}
            helperText="Please select your status"
            defaultValue={selectedValue.status}
          >
            {statuss.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.status}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            onChange={(content, delta, source, editor) =>
              setData({ ...data, description: editor.getHTML() })
            }
            value={data.description}
            style={{ marginLeft: 25, marginRight: 25, marginBottom: 10 }}
          />
        </div>
      </div>
      <Box mt={2} mb={2}>
        <Button
          variant="contained"
          style={{ margin: '0 auto', display: 'flex', marginBottom: 2 }}
          onClick={() => onUpdate(data)}
        >
          Update
        </Button>
      </Box>
    </Dialog>
  );
}

Update.propTypes = {
  onClose: PropTypes.func.isRequired,
  selectedValue: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired
};

const getStatusLabel = (Status) => {
  const map = {
    3: {
      text: 'Failed',
      color: 'error'
    },
    1: {
      text: 'Completed',
      color: 'success'
    },
    2: {
      text: 'Pending',
      color: 'warning'
    }
  };

  const { text, color } = map[Status];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (datas, filters) => {
  return datas.filter((datas) => {
    let matches = true;

    if (filters.status && datas.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (datas, page, limit) => {
  return datas.slice(page * limit, page * limit + limit);
};

const CoursesTable = ({ datas }) => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedData, setData] = useState({
    id: '',
    title: '',
    description: '',
    price: '',
    category: '',
    status: ''
  });
  const selectedBulkActions = selectedCourses.length > 0;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [filters, setFilters] = useState({
    status: null
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = (id, title, description, price, category, status) => {
    setData({
      id: id,
      title: title,
      description: description,
      price: price,
      category: category,
      status: status
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 1,
      name: 'Completed'
    },
    {
      id: 2,
      name: 'Pending'
    },
    {
      id: 3,
      name: 'Failed'
    }
  ];

  const handleStatusChange = (e) => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAllDatas = (event) => {
    setSelectedCourses(
      event.target.checked ? datas.map((datas) => datas.id) : []
    );
  };

  const handleSelectOneData = (event, userId) => {
    if (!selectedCourses.includes(userId)) {
      setSelectedCourses((prevSelected) => [...prevSelected, userId]);
    } else {
      setSelectedCourses((prevSelected) =>
        prevSelected.filter((id) => id !== userId)
      );
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const filteredDatas = applyFilters(datas, filters);
  const paginatedCourses = applyPagination(filteredDatas, page, limit);
  const selectedSomeDatas =
    selectedCourses.length > 0 && selectedCourses.length < datas.length;
  const selectedAllDatas = selectedCourses.length === datas.length;
  const theme = useTheme();

  function onDelete(id) {
    destroyCourse(id).then(function (result) {
      window.location.reload();
    });
  }

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status || 'all'}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="Recent Courses"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllDatas}
                  indeterminate={selectedSomeDatas}
                  onChange={handleSelectAllDatas}
                />
              </TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCourses.map((datas) => {
              const isCoursesSelected = selectedCourses.includes(datas.id);
              return (
                <TableRow hover key={datas.id} selected={isCoursesSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCoursesSelected}
                      onChange={(event) => handleSelectOneData(event, datas.id)}
                      value={isCoursesSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {datas.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {datas.category}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {datas.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                      align="right"
                    >
                      Rp. {datas.price.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(datas.status)}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => {
                          handleClickOpen(
                            datas.id,
                            datas.title,
                            datas.description,
                            datas.price,
                            datas.category_id,
                            datas.status
                          );
                        }}
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => onDelete(datas.id)}
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Update selectedValue={selectedData} open={open} onClose={handleClose} />
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredDatas.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

CoursesTable.propTypes = {
  datas: PropTypes.array.isRequired
};

CoursesTable.defaultProps = {
  datas: []
};

export default CoursesTable;
