import React, { Suspense } from 'react';

import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
// routes config
import AuthRouter from 'src/AuthRouter';
import authRoutes from 'src/routes';
import Page404 from 'src/views/pages/page404/Page404';

import {
  CContainer,
  CSpinner,
} from '@coreui/react';

import homeRoutes from '../routes/homeRoutes';

const Authenticate = () => { 
  
  return (
  <CContainer lg>
    <Suspense fallback={<CSpinner color="primary" />}>
      <Routes>
        {authRoutes.map(
          (route, idx) =>
            route.element && (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                element={
                  <AuthRouter>
                    <route.element />
                  </AuthRouter>
                }
              />
            ),
        )}
        <Route path="/" element={<Navigate to="dashboard" replace />} />
        <Route path="*" element={<Navigate to="404" replace />} />
      </Routes>
    </Suspense>
  </CContainer>
)};

const Main = () => { 
  return(
  <CContainer lg>
    <Suspense fallback={<CSpinner color="primary" />}>
      <Routes>
        {homeRoutes.map(
          (route, idx) =>
            route.element && (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                element={
                    <route.element />
                }
              />
            ),
        )}
        <Route path="/" element={<Navigate to="home"  />} />
        <Route path="*" element={<Page404/>} />
      </Routes>
    </Suspense>
  </CContainer>
)};

const AppContent = {
  Authenticate,
  Main
}

export default AppContent;
