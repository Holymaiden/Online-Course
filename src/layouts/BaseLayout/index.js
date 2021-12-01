import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

const MainContent = styled(Box)(
  ({ theme }) => `
        flex: 1 1 auto;
        overflow: auto;
        background: #ffffff;
`
);

const BaseLayout = ({ children }) => {
  return (
    <>
      <Header />
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
    </>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node
};

export default BaseLayout;
