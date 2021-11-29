import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';
import { useAuth } from './contexts/auth.context';

import SuspenseLoader from 'src/components/SuspenseLoader';

function ProtectedRoute({ children }) {
  let { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages

const Overview = Loader(lazy(() => import('src/content/overview')));
const Login = Loader(lazy(() => import('src/content/pages/Auth/Login/Login')));
const SignUp = Loader(
  lazy(() => import('src/content/pages/Auth/SignUp/SignUp'))
);

// Dashboards

const Tasks = Loader(lazy(() => import('src/content/dashboards/Tasks')));

// Applications

const Messenger = Loader(
  lazy(() => import('src/content/applications/Messenger'))
);
const UserProfile = Loader(
  lazy(() => import('src/content/applications/Users/profile'))
);
const UserSettings = Loader(
  lazy(() => import('src/content/applications/Users/settings'))
);

// Managements

const Users = Loader(lazy(() => import('src/content/pages/Management/Users')));
const Courses = Loader(
  lazy(() => import('src/content/pages/Management/Course'))
);
const Instructors = Loader(
  lazy(() => import('src/content/pages/Management/Instructor'))
);
const TeachingMaterials = Loader(
  lazy(() => import('src/content/pages/Management/TeachingMaterials'))
);

// Money

const Transactions = Loader(
  lazy(() => import('src/content/pages/Money/Transaction'))
);
const Carts = Loader(lazy(() => import('src/content/pages/Money/Cart')));
const Payments = Loader(lazy(() => import('src/content/pages/Money/Payment')));

// Components

const Buttons = Loader(
  lazy(() => import('src/content/pages/Components/Buttons'))
);
const Modals = Loader(
  lazy(() => import('src/content/pages/Components/Modals'))
);
const Accordions = Loader(
  lazy(() => import('src/content/pages/Components/Accordions'))
);
const Tabs = Loader(lazy(() => import('src/content/pages/Components/Tabs')));
const Badges = Loader(
  lazy(() => import('src/content/pages/Components/Badges'))
);
const Tooltips = Loader(
  lazy(() => import('src/content/pages/Components/Tooltips'))
);
const Avatars = Loader(
  lazy(() => import('src/content/pages/Components/Avatars'))
);
const Cards = Loader(lazy(() => import('src/content/pages/Components/Cards')));
const Forms = Loader(lazy(() => import('src/content/pages/Components/Forms')));

// Status

const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('src/content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Maintenance'))
);

const routes = [
  {
    path: '*',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Overview />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <SignUp />
      },
      {
        path: 'overview',
        element: <Navigate to="/" replace />
      },
      {
        path: 'status',
        children: [
          {
            path: '/',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: 'dashboards',
    element: [
      <ProtectedRoute>
        <SidebarLayout />
      </ProtectedRoute>
    ],
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboards/tasks" replace />
      },
      {
        path: 'tasks',
        element: <Tasks />
      },
      {
        path: 'messenger',
        element: <Messenger />
      }
    ]
  },
  {
    path: 'management',
    element: [
      <ProtectedRoute>
        <SidebarLayout />
      </ProtectedRoute>
    ],
    children: [
      {
        path: '/',
        element: <Navigate to="/management/transactions" replace />
      },
      {
        path: 'users',
        element: <Users />
      },
      {
        path: 'courses',
        element: <Courses />
      },
      {
        path: 'instructors',
        element: <Instructors />
      },
      {
        path: 'teachingmaterials',
        element: <TeachingMaterials />
      }
    ]
  },
  {
    path: 'Money',
    element: [
      <ProtectedRoute>
        <SidebarLayout />
      </ProtectedRoute>
    ],
    children: [
      {
        path: '/',
        element: <Navigate to="/money/transactions" replace />
      },
      {
        path: 'transactions',
        element: <Transactions />
      },
      {
        path: 'carts',
        element: <Carts />
      },
      {
        path: 'payments',
        element: <Payments />
      }
    ]
  },
  {
    path: 'profile',
    element: [
      <ProtectedRoute>
        <SidebarLayout />
      </ProtectedRoute>
    ],
    children: [
      {
        path: '/',
        element: <Navigate to="/profile/details" replace />
      },
      {
        path: 'details',
        element: <UserProfile />
      },
      {
        path: 'settings',
        element: <UserSettings />
      }
    ]
  },
  {
    path: 'components',
    element: [
      <ProtectedRoute>
        <SidebarLayout />
      </ProtectedRoute>
    ],
    children: [
      {
        path: '/',
        element: <Navigate to="/components/buttons" replace />
      },
      {
        path: 'buttons',
        element: <Buttons />
      },
      {
        path: 'modals',
        element: <Modals />
      },
      {
        path: 'accordions',
        element: <Accordions />
      },
      {
        path: 'tabs',
        element: <Tabs />
      },
      {
        path: 'badges',
        element: <Badges />
      },
      {
        path: 'tooltips',
        element: <Tooltips />
      },
      {
        path: 'avatars',
        element: <Avatars />
      },
      {
        path: 'cards',
        element: <Cards />
      },
      {
        path: 'forms',
        element: <Forms />
      }
    ]
  }
];

export default routes;
