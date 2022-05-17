import React from 'react';

import AboutUs from '../muiKit2/layouts/pages/landing-pages/about-us';

const Author = React.lazy(() => import('../muiKit2/layouts/pages/landing-pages/author'));
const ContactUs = React.lazy(() => import('../muiKit2/layouts/pages/landing-pages/contact-us'));

const routes = [
  
  {
    name: "READ OUR REVIEW",
    // icon: <GitHubIcon />,
    route: "/read-our-reviews",
    component: ContactUs
  },
  {
    name: "CAR RENTALS",
    // icon: <GitHubIcon />,
    route: "/",
    component: Author
  },
  {
    name: "ABOUT US",
    // icon: <GitHubIcon />,
    route: "/about-us",
    component: AboutUs
  },
  {
    name: "FAQ",
    // icon: <GitHubIcon />,
    route: "/about-us",
    component: AboutUs
  },
];

export default routes;
