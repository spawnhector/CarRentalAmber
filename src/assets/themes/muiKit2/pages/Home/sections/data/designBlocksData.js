/*
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import Filter from '../../components/CarFilter/filter';

const imagesPrefix =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/material-design-system/presentation/sections";

export default [
  {
    title: "Car Rental",
    description: "A selection of 45 vehicles that fit perfectly in any combination",
    items: [
      {
        image: `${imagesPrefix}/headers.jpg`,
        name: "Page Headers",
        cost: 10,
        route: "/sections/page-sections/page-headers",
      },
      {
        image: `${imagesPrefix}/features.jpg`,
        name: "Features",
        cost: 14,
        route: "/sections/page-sections/features",
      },
      {
        image: `${imagesPrefix}/pricing.jpg`,
        name: "Pricing",
        cost: 8,
        pro: true,
      },
      {
        image: `${imagesPrefix}/faq.jpg`,
        name: "FAQ",
        cost: 1,
        pro: true,
      },
      {
        image: `${imagesPrefix}/blogs.jpg`,
        name: "Blog Posts",
        cost: 11,
        pro: true,
      },
    ],
    component: (<Filter/>)
  },
  // {
  //   title: "Navigation",
  //   description: "30+ components that will help go through the pages",
  //   items: [
  //     {
  //       image: `${imagesPrefix}/navbars.jpg`,
  //       name: "Navbars",
  //       count: 4,
  //       route: "/sections/navigation/navbars",
  //     },
  //     {
  //       image: `${imagesPrefix}/nav-tabs.jpg`,
  //       name: "Nav Tabs",
  //       count: 2,
  //       route: "/sections/navigation/nav-tabs",
  //     },
  //     {
  //       image: `${imagesPrefix}/pagination.jpg`,
  //       name: "Pagination",
  //       count: 3,
  //       route: "/sections/navigation/pagination",
  //     },
  //   ],
  //   component: <MKDatePicker input={{ placeholder: "Select a date" }} />
  // }
];
