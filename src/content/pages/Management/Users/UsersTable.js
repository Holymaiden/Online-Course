import { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
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

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';

import { updateUser, destroyUser } from '../../../../Api/Users';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Update(props) {
  const [data, setData] = useState({
    id: '',
    username: '',
    password: '',
    email: '',
    avatar: ''
  });
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose('');
  };
  useEffect(
    () =>
      setData({
        id: selectedValue.id,
        username: selectedValue.username,
        email: selectedValue.email,
        avatar: selectedValue.avatar
      }),
    [open]
  );

  function onUpdate(data) {
    updateUser(data).then(function (result) {
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
      <DialogTitle>Update User</DialogTitle>
      <div>
        <TextField
          required
          id="outlined-username"
          label="Username"
          onChange={(e) => setData({ ...data, username: e.target.value })}
          defaultValue={selectedValue.username}
        />
        <TextField
          id="outlined-email"
          label="Email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
          defaultValue={selectedValue.email}
        />
      </div>
      <div>
        <TextField
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <label htmlFor="btn-upload">
          <input
            id="btn-upload"
            name="avatar"
            style={{
              display: 'none',
              marginTop: '2ch',
              width: 215,
              height: 50,
              marginLeft: '2ch'
            }}
            type="file"
            onChange={(e) => setData({ ...data, avatar: e.target.files[0] })}
          />
          <Button
            style={{
              marginTop: '2ch',
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

const UsersTable = ({ datas }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedData, setData] = useState({
    id: '',
    username: '',
    email: '',
    avatar: ''
  });
  const selectedBulkActions = selectedUsers.length > 0;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [filters, setFilters] = useState({
    status: null
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = ({ id, username, email, avatar }) => {
    setData({ id: id, username: username, email: email, avatar: avatar });
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
      id: 'completed',
      name: 'Completed'
    },
    {
      id: 'pending',
      name: 'Pending'
    },
    {
      id: 'failed',
      name: 'Failed'
    }
  ];

  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg',
    jobtitle: 'Project Manager'
  };

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
    setSelectedUsers(
      event.target.checked ? datas.map((datas) => datas.id) : []
    );
  };

  const handleSelectOneData = (event, userId) => {
    if (!selectedUsers.includes(userId)) {
      setSelectedUsers((prevSelected) => [...prevSelected, userId]);
    } else {
      setSelectedUsers((prevSelected) =>
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
  const paginatedUsers = applyPagination(filteredDatas, page, limit);
  const selectedSomeDatas =
    selectedUsers.length > 0 && selectedUsers.length < datas.length;
  const selectedAllDatas = selectedUsers.length === datas.length;
  const theme = useTheme();

  function onDelete(id) {
    destroyUser({ id }).then(function (result) {
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
          title="Recent Users"
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
              <TableCell>Email</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((datas) => {
              const isUserSelected = selectedUsers.includes(datas.id);
              return (
                <TableRow hover key={datas.id} selected={isUserSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isUserSelected}
                      onChange={(event) => handleSelectOneData(event, datas.id)}
                      value={isUserSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Avatar
                      variant="rounded"
                      alt={user.username}
                      src={user.avatar}
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
                      {datas.email}
                    </Typography>
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
                          handleClickOpen({
                            id: datas.id,
                            username: datas.username,
                            email: datas.email,
                            avatar: datas.avatar
                          });
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

UsersTable.propTypes = {
  datas: PropTypes.array.isRequired
};

UsersTable.defaultProps = {
  datas: []
};

export default UsersTable;
