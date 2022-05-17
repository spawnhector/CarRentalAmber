import './scss/style.scss';

import React, { Suspense } from 'react';

import { BackTop } from 'antd';
import {
  HashRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import AboutUs from './assets/themes/muiKit2/pages/LandingPages/AboutUs';
import InvoicePage from './assets/themes/muiKit2/pages/LandingPages/Invoice';
import ReservePage from './assets/themes/muiKit2/pages/LandingPages/Reserve';
import ReviewPage from './assets/themes/muiKit2/pages/LandingPages/Review';
import muiTheme from './assets/themes/muiKit2/theme';
import CustomModal from './components/modal/customModal';
import HomeLayout from './layout/HomeLayout';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse" />
  </div>
);

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {

  const CheckAuth = (props) => {

    return (
      <ThemeProvider theme={muiTheme}>
          <CssBaseline />
          <BackTop duration={200}/>
          <Routes>
            {/* {getRoutes(muiRoutes)} */}
            <Route exact path="/*" name="Home Page" element={<HomeLayout />} />
            <Route exact path="/admin/*" name="Admin" element={<DefaultLayout />} />
            <Route exact path="/about-us" name="About Us" element={<AboutUs />} />
            <Route exact path="/review" name="Review" element={<ReviewPage />} />
            <Route exact path="/reserve" name="Reserve" element={<ReservePage />} />
            <Route exact path="/reserve" name="Reserve" element={<ReservePage />} />
            <Route exact path="/invoice" name="Invoice" element={<InvoicePage />} />
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route exact path="*" name="Page 404" element={<Page404 />} />
          </Routes>
          <CustomModal/>
      </ThemeProvider>
    )

    // const location  = window.location.pathname;
    // let isAuthRoute = location === '/admin' ? true : false;
    // // console.log(isAuthRoute);
    // // isAuthRoute && Navigate({to: '/login'})

    // switch (isAuthRoute) {
    //   case false:
    //     console.log('not auth');
    //       return (
    //         <ThemeProvider theme={muiTheme}>
    //             <CssBaseline />
    //             <BackTop duration={200}/>
    //             <Routes>
    //               {/* {getRoutes(muiRoutes)} */}
    //               <Route exact path="/" name="Home Page" element={<HomeLayout />} />
    //               <Route exact path="/about-us" name="About Us" element={<AboutUs />} />
    //               <Route exact path="/review" name="Review" element={<ReviewPage />} />
    //               <Route exact path="/reserve" name="Reserve" element={<ReservePage />} />
    //               <Route exact path="/reserve" name="Reserve" element={<ReservePage />} />
    //               <Route exact path="/invoice" name="Invoice" element={<InvoicePage />} />
    //               <Route exact path="*" name="Home" element={<Page404 />} />
    //             </Routes>
    //             <CustomModal/>
    //         </ThemeProvider>
    //       );
    //     break;
    //   case true:
    //     console.log('auth');
    //       return (
    //         <ThemeProvider theme={muiTheme}>
    //             <CssBaseline />
    //             <Routes>
    //               <Route exact path="/login" name="Login Page" element={<Login />} />
    //               <Route exact path="/register" name="Register Page" element={<Register />} />
    //               <Route exact path="/404" name="Page 404" element={<Page404 />} />
    //               <Route exact path="/500" name="Page 500" element={<Page500 />} />
    //               <Route exact path="*" name="Home" element={<DefaultLayout />} />
    //             </Routes>
    //         </ThemeProvider>
    //       );
    //   break;
    // }
  } 

  return (
    <HashRouter>
      <Suspense fallback={loading}>
            <Routes>
              <Route exact path="/*" name="auth" element={<CheckAuth />} />
            </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
