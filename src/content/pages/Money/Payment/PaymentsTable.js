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

import { updatePayment, destroyPayment } from '../../../../Api/Payment';
import Label from 'src/components/Label';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Update(props) {
  const { onClose, selectedValue, open } = props;
  const [data, setData] = useState({
    id: '',
    name: '',
    account_number: ''
  });
  useEffect(
    () =>
      setData({
        id: selectedValue.id,
        name: selectedValue.name,
        account_number: selectedValue.account_number
      }),
    [open]
  );

  const handleClose = () => {
    onClose('');
  };

  function onUpdate(data) {
    updatePayment(data).then(function (result) {
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
      <DialogTitle>Update Payment</DialogTitle>
      <div style={{ marginLeft: 45 }}>
        <TextField
          required
          id="outlined-name"
          label="Name"
          style={{ width: 470 }}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          helperText="Please add your name"
          defaultValue={selectedValue.name}
        />
        <TextField
          required
          id="outlined-account-number"
          label="Account Number"
          style={{ width: 470 }}
          onChange={(e) => setData({ ...data, account_number: e.target.value })}
          helperText="Please add your account number"
          defaultValue={selectedValue.account_number}
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

const PaymentsTable = ({ datas }) => {
  const [selectedPayments, setSelectedPayments] = useState([]);
  const [selectedData, setData] = useState({
    id: '',
    name: '',
    account_number: ''
  });
  const selectedBulkActions = selectedPayments.length > 0;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [filters, setFilters] = useState({
    status: null
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = (id, name, account_number) => {
    setData({
      id: id,
      name: name,
      account_number: account_number
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
    setSelectedPayments(
      event.target.checked ? datas.map((datas) => datas.id) : []
    );
  };

  const handleSelectOneData = (event, userId) => {
    if (!selectedPayments.includes(userId)) {
      setSelectedPayments((prevSelected) => [...prevSelected, userId]);
    } else {
      setSelectedPayments((prevSelected) =>
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
  const paginatedPayments = applyPagination(filteredDatas, page, limit);
  const selectedSomeDatas =
    selectedPayments.length > 0 && selectedPayments.length < datas.length;
  const selectedAllDatas = selectedPayments.length === datas.length;
  const theme = useTheme();

  function onDelete(id) {
    destroyPayment(id).then(function (result) {
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
          title="Recent Payments"
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
              <TableCell>Name</TableCell>
              <TableCell align="center">Account Number</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPayments.map((datas) => {
              const isPaymentsSelected = selectedPayments.includes(datas.id);
              return (
                <TableRow hover key={datas.id} selected={isPaymentsSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isPaymentsSelected}
                      onChange={(event) => handleSelectOneData(event, datas.id)}
                      value={isPaymentsSelected}
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
                      {datas.name}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {datas.account_number}
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
                          handleClickOpen(
                            datas.id,
                            datas.name,
                            datas.account_number
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

PaymentsTable.propTypes = {
  datas: PropTypes.array.isRequired
};

PaymentsTable.defaultProps = {
  datas: []
};

export default PaymentsTable;
