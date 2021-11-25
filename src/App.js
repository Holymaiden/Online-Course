import { useRoutes } from 'react-router-dom';
import routes from './router';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import ThemeProvider from './theme/ThemeProvider';
import { CssBaseline } from '@mui/material';

const App = () => {
  const content = useRoutes(routes);
  // const GetRoutes = (routes) => {
  //   routes.map((route) => {
  //     if (route.children) {
  //       return GetRoutes(route.children);
  //     }
  //     if (route.protected) {
  //       console.log('protect');
  //       return ProtectedRoute();
  //     }
  //     console.log(routes.protected);
  //     // return useRoutes(routes);
  //   });
  // };

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {/* {GetRoutes(routes)} */}
        {content}
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
