import { useEffect, useRef, useState } from 'react';

import { NavLink, useNavigate } from 'react-router-dom';

import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography
} from '@mui/material';

import InboxTwoToneIcon from '@mui/icons-material/InboxTwoTone';
import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import { getCurrentUser } from '../../../../Api/Users';
// import { Logout } from '../../../../Api/auth';
import { useAuth } from '../../../../contexts/auth.context';

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: #5A47AB;
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${`#ffffff`};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(`#ffffff`, 0.5)}
`
);

const Dashboard = () => {
  return (
    <ListItem button to="/dashboards/tasks" component={NavLink}>
      <InboxTwoToneIcon fontSize="small" style={{ color: `#ffffff` }} />
      <ListItemText primary="Dashboard" style={{ color: `#ffffff` }} />
    </ListItem>
  );
};

function HeaderUserbox() {
  const navigate = useNavigate();
  const [user, setUsers] = useState([]);
  useEffect(() => {
    getCurrentUser().then((data) => setUsers(data));
  }, []);

  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { setUser } = useAuth();

  const handlelogout = async () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
    return window.location.reload();
  };

  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        <Avatar
          variant="rounded"
          alt={user ? user.username : null}
          src={user ? user.avatar : null}
        />
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant="body1">
              {user ? user.username : null}
            </UserBoxLabel>
            <UserBoxDescription variant="body2">
              {user ? user.email : null}
            </UserBoxDescription>
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
        </Hidden>
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <Avatar
            variant="rounded"
            alt={user ? user.username : ''}
            src={user ? user.avatar : ''}
          />
          <UserBoxText>
            <UserBoxLabel variant="body1">
              {user ? user.username : ''}
            </UserBoxLabel>
            <UserBoxDescription variant="body2">
              {user ? user.email : ''}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} style={{ background: `#8C7CF0` }} />
        <List sx={{ p: 1 }} component="nav" style={{ background: `#5A47AB` }}>
          <ListItem button to="/profile/details" component={NavLink}>
            <AccountBoxTwoToneIcon
              fontSize="small"
              style={{ color: `#ffffff` }}
            />
            <ListItemText primary="My Profile" style={{ color: `#ffffff` }} />
          </ListItem>
          {user ? (
            user.role ? (
              user.role[0].role_name == 'admin' ? (
                <Dashboard />
              ) : (
                ''
              )
            ) : (
              ''
            )
          ) : (
            ''
          )}
        </List>
        <Divider style={{ background: `#8C7CF0` }} />
        <Box style={{ background: `#5A47AB` }}>
          <Button
            color="primary"
            fullWidth
            onClick={handlelogout}
            style={{ color: `#ffffff` }}
          >
            <LockOpenTwoToneIcon sx={{ mr: 1 }} />
            Sign out
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default HeaderUserbox;
