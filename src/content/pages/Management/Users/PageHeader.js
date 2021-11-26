import PropTypes from 'prop-types';

import {
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  TextField,
  Slide
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { forwardRef, useEffect, useState } from 'react';
import { Box } from '@mui/system';

import { createUser, getCurrentUser } from '../../../../Api/Users';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Create(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState([]);
  const { onClose, open } = props;

  const handleClose = () => {
    onClose('');
  };

  function onCreate({ username, password, email, avatar }) {
    createUser({ username, password, email, avatar }).then(function (result) {
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
      <DialogTitle>Add New User</DialogTitle>
      <div>
        <TextField
          required
          id="outlined-username"
          label="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          id="outlined-email"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <TextField
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
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
            onChange={(e) => setAvatar(e.target.files[0])}
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
          onClick={() => onCreate({ username, password, email, avatar })}
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
          Users
        </Typography>
        <Typography variant="subtitle2">
          {user.username}, these are all users
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={handleClickOpen}
        >
          Create User
        </Button>
        <Create open={open} onClose={handleClose} />
      </Grid>
    </Grid>
  );
}

export default PageHeader;
