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
  updateRegistration,
  destroyRegistration
} from '../../../../Api/Registration';
import Label from 'src/components/Label';

import Snack from '../../Components/SnackBar';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const statuss = [
  {
    id: 'approved',
    status: 'Approved'
  },
  {
    id: 'pending',
    status: 'Pending'
  },
  {
    id: 'rejected',
    status: 'Rejected'
  }
];

function Update(props) {
  const { onClose, selectedValue, open } = props;
  const [data, setData] = useState({
    id: '',
    cv: '',
    status: ''
  });
  useEffect(
    () =>
      setData({
        id: selectedValue.id,
        cv: selectedValue.cv,
        status: selectedValue.status
      }),
    [open]
  );

  const handleClose = () => {
    onClose('');
  };

  function onUpdate(data) {
    updateRegistration(data).then(function (result) {
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
      <DialogTitle>Update Registrations</DialogTitle>
      <div style={{ alignItems: 'center', textAlignLast: 'center' }}>
        <TextField
          id="outlined-select-status"
          select
          label="Status"
          style={{ width: '46%' }}
          value={data.status}
          onChange={(e) => setData({ ...data, status: e.target.value })}
          helperText="Please select your status"
          defaultValue={selectedValue.status}
        >
          {statuss.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.status}
            </MenuItem>
          ))}
        </TextField>
        <div style={{ marginLeft: -20 }}>
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
              onChange={(e) => setData({ ...data, cv: e.target.files[0] })}
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
    rejected: {
      text: 'Rejected',
      color: 'error'
    },
    approved: {
      text: 'Approved',
      color: 'success'
    },
    pending: {
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

const RegistrationsTable = ({ datas }) => {
  const [selectedRegistrations, setSelectedRegistrations] = useState([]);
  const [selectedData, setData] = useState({
    id: '',
    cv: '',
    status: ''
  });
  const selectedBulkActions = selectedRegistrations.length > 0;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [filters, setFilters] = useState({
    status: null
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = (id, cv, status) => {
    setData({
      id: id,
      cv: cv,
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
      name: 'Approved'
    },
    {
      id: 2,
      name: 'Pending'
    },
    {
      id: 3,
      name: 'Rejected'
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
    setSelectedRegistrations(
      event.target.checked ? datas.map((datas) => datas.id) : []
    );
  };

  const handleSelectOneData = (event, userId) => {
    if (!selectedRegistrations.includes(userId)) {
      setSelectedRegistrations((prevSelected) => [...prevSelected, userId]);
    } else {
      setSelectedRegistrations((prevSelected) =>
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
  const paginatedRegistrations = applyPagination(filteredDatas, page, limit);
  const selectedSomeDatas =
    selectedRegistrations.length > 0 &&
    selectedRegistrations.length < datas.length;
  const selectedAllDatas = selectedRegistrations.length === datas.length;
  const theme = useTheme();

  function onDelete(id) {
    destroyRegistration(id).then(function (result) {
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
          title="Recent Registrations"
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
              <TableCell>Username</TableCell>
              <TableCell>Cv</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRegistrations.map((datas) => {
              const isRegistrationsSelected = selectedRegistrations.includes(
                datas.id
              );
              return (
                <TableRow
                  hover
                  key={datas.id}
                  selected={isRegistrationsSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isRegistrationsSelected}
                      onChange={(event) => handleSelectOneData(event, datas.id)}
                      value={isRegistrationsSelected}
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
                      <Button variant="contained" href={datas.cv}>
                        PDF
                      </Button>
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
                          handleClickOpen(datas.id, datas.cv, datas.status);
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

RegistrationsTable.propTypes = {
  datas: PropTypes.array.isRequired
};

RegistrationsTable.defaultProps = {
  datas: []
};

export default RegistrationsTable;
