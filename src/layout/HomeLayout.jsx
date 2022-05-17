import React from 'react';

import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

import Home from '../assets/themes/muiKit2/pages/Home';
import {
  AppContent,
  AppFooter,
  AppHeader,
} from '../components/index';
import DefaultLayout from './DefaultLayout';

// const Page404 = React.lazy(() => import('../views/pages/page404/Page404'))

const HomeLayout = () => {
  const [appTheme,setAppTheme] = React.useState('MUIKIT2');
  const { pathname } = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

 

  // console.log(getRoutes(muiRoutes))
  switch (appTheme) {
    case 'COREUI':
      return (
        <div>
          <div className="wrapper d-flex flex-column min-vh-100 bg-light">
            <AppHeader />
            <div className="body flex-grow-1 px-3 pb-4">
              <AppContent.Main />
            </div>
            <AppFooter />
          </div>
        </div>
      );
      break;
    case 'MUIKIT2': return (
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="*" element={<Page404/>} /> */}
          </Routes>
      );
      break;
  }
};

export default HomeLayout
