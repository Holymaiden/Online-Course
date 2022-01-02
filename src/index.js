import App from './App';
import ReactDOM from 'react-dom';
import 'src/utils/chart';
import * as serviceWorker from './serviceWorker';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import 'nprogress/nprogress.css';
import { SidebarProvider } from './contexts/SidebarContext';
import { SnackbarUtilsConfigurator } from 'src/content/pages/Components/SnackBar';
import { AuthProvider } from './contexts/auth.context';
import { SnackbarProvider } from 'notistack';

let user = localStorage.getItem('user');

ReactDOM.render(
  <HelmetProvider>
    <AuthProvider userData={user}>
      <SidebarProvider>
        <BrowserRouter>
          <SnackbarProvider>
            <SnackbarUtilsConfigurator />
            <App />
          </SnackbarProvider>
        </BrowserRouter>
      </SidebarProvider>
    </AuthProvider>
  </HelmetProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
