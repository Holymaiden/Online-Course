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
  Slide,
  CardMedia
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';

import {
  updateTeachingMaterial,
  destroyTeachingMaterial
} from '../../../../Api/TeachingMaterial';
import { getAllCourse } from '../../../../Api/Course';
import Label from 'src/components/Label';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const statuss = [
  {
    id: 1,
    status: 'Completed'
  },
  {
    id: 2,
    status: 'Process'
  },
  {
    id: 3,
    status: 'Failed'
  }
];

function Update(props) {
  const { onClose, selectedValue, open } = props;
  const [data, setData] = useState({
    id: '',
    course_id: '',
    title: '',
    content: '',
    status: ''
  });
  useEffect(
    () =>
      setData({
        id: selectedValue.id,
        course_id: selectedValue.course_id,
        title: selectedValue.title,
        content: selectedValue.content,
        status: selectedValue.status
      }),
    [open]
  );

  const [rows, setRows] = useState([]);
  useEffect(() => {
    getAllCourse().then(function (result) {
      setRows(result.data);
    });
  }, []);

  const handleClose = () => {
    onClose('');
  };

  const handleChange2 = (event) => {
    setData({ ...data, status: event.target.value });
  };

  function onUpdate(data) {
    updateTeachingMaterial(data).then(function (result) {
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
        '& .MuiButton-root': { width: '10ch' },
        'text-align': '-webkit-center'
      }}
    >
      <DialogTitle>Update Teaching Material</DialogTitle>
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
            defaultValue={selectedValue.course_id}
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
            defaultValue={selectedValue.title}
          />
        </div>
        <TextField
          id="outlined-select-status"
          select
          label="Status"
          style={{ width: 470 }}
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
              height: 50
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
      text: 'Process',
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

const TeachingMaterialsTable = ({ datas }) => {
  const [selectedTeachingMaterials, setSelectedTeachingMaterials] = useState(
    []
  );
  const [selectedData, setData] = useState({
    id: '',
    course_id: '',
    category_id: '',
    title: '',
    slug: '',
    content: '',
    description: '',
    status: ''
  });
  const selectedBulkActions = selectedTeachingMaterials.length > 0;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [filters, setFilters] = useState({
    status: null
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = (
    id,
    course_id,
    title,
    content,
    description,
    status
  ) => {
    setData({
      id: id,
      course_id: course_id,
      title: title,
      content: content,
      description: description,
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
      name: 'Process'
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
    setSelectedTeachingMaterials(
      event.target.checked ? datas.map((datas) => datas.id) : []
    );
  };

  const handleSelectOneData = (event, userId) => {
    if (!selectedTeachingMaterials.includes(userId)) {
      setSelectedTeachingMaterials((prevSelected) => [...prevSelected, userId]);
    } else {
      setSelectedTeachingMaterials((prevSelected) =>
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
  const paginatedTeachingMaterials = applyPagination(
    filteredDatas,
    page,
    limit
  );
  const selectedSomeDatas =
    selectedTeachingMaterials.length > 0 &&
    selectedTeachingMaterials.length < datas.length;
  const selectedAllDatas = selectedTeachingMaterials.length === datas.length;
  const theme = useTheme();

  function onDelete(id) {
    destroyTeachingMaterial(id).then(function (result) {
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
          title="Recent Teaching Materials"
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
              <TableCell>Content</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>description</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTeachingMaterials.map((datas) => {
              const isTeachingMaterialsSelected =
                selectedTeachingMaterials.includes(datas.id);
              return (
                <TableRow
                  hover
                  key={datas.id}
                  selected={isTeachingMaterialsSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isTeachingMaterialsSelected}
                      onChange={(event) => handleSelectOneData(event, datas.id)}
                      value={isTeachingMaterialsSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <CardMedia
                      sx={{ width: 5 / 6, display: 'inline' }}
                      component="video"
                      controls
                      src={datas.content}
                      alt="camp"
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
                      {datas.course_title}
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
                      {datas.description}
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
                            datas.course_id,
                            datas.title,
                            datas.content,
                            datas.description,
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

TeachingMaterialsTable.propTypes = {
  datas: PropTypes.array.isRequired
};

TeachingMaterialsTable.defaultProps = {
  datas: []
};

export default TeachingMaterialsTable;
