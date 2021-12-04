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

import { updateCart, destroyCart } from '../../../../Api/Cart';
import { getAllCourse } from '../../../../Api/Course';
import { getAllUser } from '../../../../Api/Users';
import Label from 'src/components/Label';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Update(props) {
  const { onClose, selectedValue, open } = props;
  const [data, setData] = useState({
    id: '',
    course_id: '',
    user_id: '',
    price: ''
  });
  useEffect(
    () =>
      setData({
        id: selectedValue.id,
        course_id: selectedValue.course_id,
        user_id: selectedValue.user_id,
        price: selectedValue.price
      }),
    [open]
  );

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

  function onUpdate(data) {
    updateCart(data).then(function (result) {
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
      <DialogTitle>Update Cart</DialogTitle>
      <div style={{ marginLeft: 45 }}>
        <div>
          <TextField
            id="outlined-select-user"
            select
            label="User"
            value={data.user_id}
            onChange={(event) =>
              setData({ ...data, user_id: event.target.value })
            }
            helperText="Please select your user"
            defaultValue={selectedValue.user_id}
          >
            {users.map((option) => (
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
            {rows.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.title}
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
          defaultValue={selectedValue.price}
        />
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
  if (!Status) {
    Status = 2;
  } else {
    Status = 1;
  }
  const map = {
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

const CartsTable = ({ datas }) => {
  const [selectedCarts, setSelectedCarts] = useState([]);
  const [selectedData, setData] = useState({
    id: '',
    course_id: '',
    user_id: '',
    price: ''
  });
  const selectedBulkActions = selectedCarts.length > 0;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [filters, setFilters] = useState({
    status: null
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = (id, course_id, user_id, price) => {
    setData({
      id: id,
      course_id: course_id,
      user_id: user_id,
      price: price
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
    setSelectedCarts(
      event.target.checked ? datas.map((datas) => datas.id) : []
    );
  };

  const handleSelectOneData = (event, userId) => {
    if (!selectedCarts.includes(userId)) {
      setSelectedCarts((prevSelected) => [...prevSelected, userId]);
    } else {
      setSelectedCarts((prevSelected) =>
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
  const paginatedCarts = applyPagination(filteredDatas, page, limit);
  const selectedSomeDatas =
    selectedCarts.length > 0 && selectedCarts.length < datas.length;
  const selectedAllDatas = selectedCarts.length === datas.length;
  const theme = useTheme();

  function onDelete(id) {
    destroyCart(id).then(function (result) {
      console.log(result.data);
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
          title="Recent Carts"
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
              <TableCell>User</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Price</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCarts.map((datas) => {
              const isCartsSelected = selectedCarts.includes(datas.id);
              return (
                <TableRow hover key={datas.id} selected={isCartsSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCartsSelected}
                      onChange={(event) => handleSelectOneData(event, datas.id)}
                      value={isCartsSelected}
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
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
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
                            datas.course_id,
                            datas.user_id,
                            datas.price
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

CartsTable.propTypes = {
  datas: PropTypes.array.isRequired
};

CartsTable.defaultProps = {
  datas: []
};

export default CartsTable;
