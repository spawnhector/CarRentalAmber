import React from 'react';

import { cilSpeedometer } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CNavItem } from '@coreui/react';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/admin/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
//   {
//     component: CNavItem,
//     name: 'Orders',
//     to: '/orders',
//     icon: <FontAwesomeIcon icon={faBagShopping} className="nav-icon" />,
//   },
  {
    component: CNavItem,
    name: 'Vehicles',
    to: '/admin/vehicles',
    icon: <FontAwesomeIcon icon={faCar} className="nav-icon" />,
  },
//   {
//     component: CNavItem,
//     name: 'Customers',
//     to: '/customers',
//     icon: <FontAwesomeIcon icon={faUsers} className="nav-icon" />,
//   },
]

export default _nav
