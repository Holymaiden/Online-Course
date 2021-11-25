import App from './App';
import ReactDOM from 'react-dom';
import 'src/utils/chart';
import * as serviceWorker from './serviceWorker';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import 'nprogress/nprogress.css';
import { SidebarProvider } from './contexts/SidebarContext';
import { AuthProvider } from './contexts/auth.context';

let user = localStorage.getItem('user');

ReactDOM.render(
  <HelmetProvider>
    <AuthProvider userData={user}>
      <SidebarProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SidebarProvider>
    </AuthProvider>
  </HelmetProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
