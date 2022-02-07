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
  Avatar
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';

import {
  updateInstructor,
  destroyInstructor
} from '../../../../Api/Instructor';
import { getAllUser } from '../../../../Api/Users';
import { getAllCourse } from '../../../../Api/Course';
import Label from 'src/components/Label';

import Snack from '../../Components/SnackBar';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Update(props) {
  const { onClose, selectedValue, open } = props;
  const [data, setData] = useState({
    id: '',
    user_id: '',
    username: '',
    course_id: '',
    course: '',
    status: ''
  });
  useEffect(
    () =>
      setData({
        id: selectedValue.id,
        user_id: selectedValue.user_id,
        username: selectedValue.username,
        course_id: selectedValue.course_id,
        course: selectedValue.course,
        status: selectedValue.status
      }),
    [open]
  );

  const [rows, setRows] = useState([]);
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    getAllUser().then(function (result) {
      setRows(result.data);
    });
    getAllCourse().then(function (result) {
      setCourses(result.data);
    });
  }, []);

  const handleClose = () => {
    onClose('');
  };

  function onUpdate(data) {
    updateInstructor(data).then(function (result) {
      if (result.code == 200) {
        Snack.success('Berhasil DiUpdate!');
        window.location.reload();
      } else if (result.code == 300) {
        Snack.error('Gagal DiUpdate!');
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
        '& .MuiButton-root': { width: '10ch' }
      }}
    >
      <DialogTitle>Update Instructor</DialogTitle>
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
            defaultValue={selectedValue.user_id}
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
            defaultValue={selectedValue.course_id}
          >
            {courses.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.title}
              </MenuItem>
            ))}
          </TextField>
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

const InstructorsTable = ({ datas }) => {
  const [selectedInstructors, setSelectedInstructors] = useState([]);
  const [selectedData, setData] = useState({
    id: '',
    user_id: '',
    username: '',
    course_id: '',
    course: '',
    status: ''
  });
  const selectedBulkActions = selectedInstructors.length > 0;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [filters, setFilters] = useState({
    status: null
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = (
    id,
    user_id,
    username,
    course_id,
    course,
    status
  ) => {
    setData({
      id: id,
      user_id: user_id,
      username: username,
      course_id: course_id,
      course: course,
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
    setSelectedInstructors(
      event.target.checked ? datas.map((datas) => datas.id) : []
    );
  };

  const handleSelectOneData = (event, userId) => {
    if (!selectedInstructors.includes(userId)) {
      setSelectedInstructors((prevSelected) => [...prevSelected, userId]);
    } else {
      setSelectedInstructors((prevSelected) =>
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
  const paginatedInstructors = applyPagination(filteredDatas, page, limit);
  const selectedSomeDatas =
    selectedInstructors.length > 0 && selectedInstructors.length < datas.length;
  const selectedAllDatas = selectedInstructors.length === datas.length;
  const theme = useTheme();

  function onDelete(id) {
    destroyInstructor(id).then(function (result) {
      if (result.code == 200) {
        Snack.success('Berhasil DiHapus!');
        window.location.reload();
      } else if (result.code == 300) {
        Snack.error('Gagal DiHapus!');
      } else {
        Snack.warning('Ada Yang Bermasalah!');
      }
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
          title="Recent Instructors"
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
              <TableCell>Avatar</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Course</TableCell>
              <TableCell align="right">Status Course</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedInstructors.map((datas) => {
              const isInstructorsSelected = selectedInstructors.includes(
                datas.id
              );
              return (
                <TableRow hover key={datas.id} selected={isInstructorsSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isInstructorsSelected}
                      onChange={(event) => handleSelectOneData(event, datas.id)}
                      value={isInstructorsSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Avatar
                      variant="rounded"
                      alt={datas.username}
                      src={datas.avatar}
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
                      {datas.username}
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
                      {datas.course}
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
                            datas.user_id,
                            datas.username,
                            datas.course_id,
                            datas.course,
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

InstructorsTable.propTypes = {
  datas: PropTypes.array.isRequired
};

InstructorsTable.defaultProps = {
  datas: []
};

export default InstructorsTable;
