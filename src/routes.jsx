import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';

import { BASE_URL } from './config/constant';
import { Breadcrumb } from 'react-bootstrap';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard>
                <Layout>{route.routes ? renderRoutes(route.routes) : <Element props={true} />}</Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

const routes = [
  {
    exact: 'true',
    path: '/login',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },

  {
    exact: 'true',
    path: '/auth/signin-1',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    exact: 'true',
    path: '/auth/signup-1',
    element: lazy(() => import('./views/auth/signup/SignUp1'))
  },
  {
    path: '*',
    layout: AdminLayout,
    routes: [
      {
        exact: 'true',
        path: '/app/dashboard/default',
        element: lazy(() => import('./views/dashboard'))
      },

      {
        exact: 'true',
        path: '/app/contract-req',
        element: lazy(() => import('./views/contract-req'))

      },
      {
        exact: 'true',
        path: '/app/contract-res',
        element: lazy(() => import('./views/contract-res'))

      },
      {
        exact: 'true',
        path: '/app/create-tender',
        element: lazy(() => import('./views/create-tender'))

      },
      {
        exact: 'true',
        path: '/app/view-tender',
        element: lazy(() => import('./views/view-tender'))

      },
      {
        exact: 'true',
        path: '/app/create-contract/:tender_id/:buyer_id/:farmer_id',
        element: lazy(() => import('./views/create-contract'))

      },
      {
        exact: 'true',
        path: '/app/view-contracts',
        element: lazy(() => import('./views/view-contracts'))

      },
      {
        exact: 'true',
        path: '/app/tender-spec/:id',
        element: lazy(() => import('./views/tender-specb'))

      },
      {
        exact: 'true',
        path: '/app/contract-spec/:id',
        element: lazy(() => import('./views/contract-spec'))

      },
      {
        exact: 'true',
        path: '/app/profile',
        element: lazy(() => import('./views/profile'))

      },
      {
        exact: 'true',
        path: '/app/chat',
        element: lazy(() => import('./views/chat'))

      },
      {
        exact: 'true',
        path: '/app/req-details/:id',
        element: lazy(() => import('./views/req-details'))

      },
      {
        exact: 'true',
        path: '/app/res-details/:id',
        element: lazy(() => import('./views/res-details'))

      },
      {
        exact: 'true',
        path: '/app/payment-success/:id',
        element: lazy(() => import('./views/payment-success'))

      },
      {
        exact: 'true',
        path: '/app/payment-failure/:id',
        element: lazy(() => import('./views/payment-failure'))

      },
      {
        exact: 'true',
        path: '/app/payment-form/:id',
        element: lazy(() => import('./views/payment-form'))

      },
      {
        exact: 'true',
        path: '/app/payment-list',
        element: lazy(() => import('./views/pay-list'))

      },
      {
        exact: 'true',
        path: '/basic/button',
        element: lazy(() => import('./views/ui-elements/basic/BasicButton'))
      },
      {
        exact: 'true',
        path: '/basic/badges',
        element: lazy(() => import('./views/ui-elements/basic/BasicBadges'))
      },
      {
        exact: 'true',
        path: '/basic/breadcrumb-paging',
        element: lazy(() => import('./views/ui-elements/basic/BasicBreadcrumb'))
      },
      {
        exact: 'true',
        path: '/basic/collapse',
        element: lazy(() => import('./views/ui-elements/basic/BasicCollapse'))
      },
      {
        exact: 'true',
        path: '/basic/tabs-pills',
        element: lazy(() => import('./views/ui-elements/basic/BasicTabsPills'))
      },
      {
        exact: 'true',
        path: '/basic/typography',
        element: lazy(() => import('./views/ui-elements/basic/BasicTypography'))
      },
      {
        exact: 'true',
        path: '/forms/form-basic',
        element: lazy(() => import('./views/forms/FormsElements'))
      },
      {
        exact: 'true',
        path: '/tables/bootstrap',
        element: lazy(() => import('./views/tables/BootstrapTable'))
      },
      {
        exact: 'true',
        path: '/charts/nvd3',
        element: lazy(() => import('./views/charts/nvd3-chart'))
      },
      {
        exact: 'true',
        path: '/maps/google-map',
        element: lazy(() => import('./views/maps/GoogleMaps'))
      },
      {
        exact: 'true',
        path: '/sample-page',
        element: lazy(() => import('./views/extra/SamplePage'))
      },
      {
        path: '*',
        exact: 'true',
        element: () => <Navigate to={BASE_URL} />
      }
    ]
  }
];

export default routes;
