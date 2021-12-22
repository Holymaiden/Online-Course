import { useEffect, useState } from 'react';

import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

import HeaderUserbox from './Userbox';
import Logo from 'src/components/Logo';

import { getCurrentUser } from '../../../Api/Users';

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 5;
        background-color: ${`#5A47AB`};
        position: fixed;
        justify-content: space-between;
        width: 100%;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            left: 0;
            width: auto;
        }
`
);

function Header() {
  const [user, setUsers] = useState([]);
  useEffect(() => {
    getCurrentUser().then((data) => setUsers(data));
  }, []);

  return (
    <HeaderWrapper display="flex" alignItems="center">
      <Logo />

      {/* <Hidden mdDown>
        <HeaderMenu />
      </Hidden> */}
      <Box display="flex" alignItems="center">
        {user ? (
          <HeaderUserbox />
        ) : (
          <Button
            style={{
              color: `#5A47AB`,
              background: `#ffffff`,
              width: 100
            }}
            variant="contained"
            size="medium"
            component={RouterLink}
            to="/login"
          >
            Login
          </Button>
        )}
      </Box>
    </HeaderWrapper>
  );
}

export default Header;
