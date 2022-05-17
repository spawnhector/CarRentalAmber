import React from 'react';

const Home = React.lazy(() => import('../views/home/index'))

const homeRoutes = [
  { path: '/home', name: 'Home', element: Home },
  { path: '/404', name: '404', element: Home }
]

export default homeRoutes
