import React from 'react';

import {
  AppContent,
  AppFooter,
  AppHeader,
  AppSidebar,
} from '../components/index';

const DefaultLayout = () => (
  <div>
    <AppSidebar />
    <div className="wrapper d-flex flex-column min-vh-100 bg-light">
      <AppHeader />
      <div className="body flex-grow-1 px-3 pb-4">
        <AppContent.Authenticate />
      </div>
      <AppFooter />
    </div>
  </div>
)

export default DefaultLayout
