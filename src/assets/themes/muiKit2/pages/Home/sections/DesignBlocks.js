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

import React from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GetVehicles } from 'src/services/VehicleService';
import { errorDialog } from 'src/utils/modals';

// @mui material components
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import MKBadge from '../../../components/MKBadge';
// Material Kit 2 React components
import MKBox from '../../../components/MKBox';
import MKTypography from '../../../components/MKTypography';
// Data
// import data from './data/designBlocksData';
import Filter from '../components/CarFilter/filter';
// Presentation page components
import ExampleCard from '../components/ExampleCard';
import moment,{ isMoment, } from 'moment';
import apiConfig from '../../../../../../../src/env.json'
function DesignBlocks() {
  console.log(apiConfig.REACT_APP_BACKEND_ENPOINT)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [allVehicle,setAllVehicle] = React.useState([]);
  const [filteredData,setFilteredData] = React.useState(false);
  const main = useSelector((state) => state.REACT_APP_BACKEND_ENPOINT);
  const carFilter = useSelector((state) => state.carFilter);
  const app = useSelector((state) => state.REACT_APP_BACKEND_ENPOINT_NOAPI);
  
  // [
  //   {
  //     image: `${imagesPrefix}/pricing.jpg`,
  //     name: "Pricing",
  //     cost: 8,
  //   },
  //   {
  //     image: `${imagesPrefix}/blogs.jpg`,
  //     name: "Blog Posts",
  //     cost: 11,
  //     pro: true,
  //   },
  // ]

  const fetchAllVehicles = async () => {
    try {
      
      var myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const results = await GetVehicles(main+'/vehicles',requestOptions);
      let result = JSON.parse(results);
      // console.log(results)
      // setLoading(false)
      if (result.vehicles) {
        const originResults = result.vehicles.map((cur) => {
          const { name,price,files } = cur;
          // console.log(files[0].path)
          return {
            ...cur,
            defaultImage: `${app}/${files[0].path}`,
            name: name,
            cost: price,
            route: "/sections/page-sections/page-headers",
          }})
        // setCustomers(results.data.results);
        setAllVehicle(originResults)
      } else {
        errorDialog('An error occurred. Please check again !')
      }
    } catch (error) {
      errorDialog('An error occurred. Please check again !')
    }
  }


  React.useEffect(() => {
    fetchAllVehicles()
  }, []);

  React.useEffect(() => {
    if(carFilter.active) {
      switch (carFilter.filterType) {

        case 'startEnd':
          let newFilteredData = allVehicle.filter((val)=>{
            let setStartDate = moment(val.is_available.startDate)
            let setEndDate = moment(val.is_available.endDate)
            return carFilter.filterData[0].isSameOrAfter(setStartDate) && carFilter.filterData[1].isSameOrBefore(setEndDate);
          });
          setFilteredData(newFilteredData)
          break;

          case 'category':
            let newFilteredDataCat = allVehicle.filter((val)=>{
              return val.category === carFilter.filterData
            });
            setFilteredData(newFilteredDataCat)
            console.log(newFilteredDataCat)
          break;
      
        default:
          break;
      }
    }
  },[carFilter]);

  let data = [
    {
      title: "Car Rental",
      description: `A selection of ${allVehicle.length} vehicles that fit perfectly in any combination`,
      items: filteredData ? filteredData : allVehicle,
      component: (<Filter />)
    }
  ];

  const renderData = data.map(({ title, description, items, component },index) => (
    <Grid container spacing={3} sx={{ mb: 10 }} key={title+index}>
      <Grid item xs={12} lg={3}>
        <MKBox position="sticky" top="100px" pb={{ xs: 2, lg: 6 }}>
          <MKTypography variant="h3" fontWeight="bold" mb={1}>
            {title}
          </MKTypography>
          <MKTypography variant="body2" fontWeight="regular" color="secondary" mb={1} pr={2}>
            {description}
          </MKTypography>
          {component}
        </MKBox>
      </Grid>
      <Grid item xs={12} lg={9}>
        <Grid container spacing={3}>
          {allVehicle && items.map((item,index) => (
            <Grid item xs={12} md={6} sx={{ mb: 2 }} key={item.name+index}>
              <div onClick={()=>{
                  // dispatch({ type: 'set', selectedVehicleData: item });
                  navigate('/review', {replace:true, state: {selectedVehicleData: item}});
              }}>
                <ExampleCard image={item.defaultImage} name={item.name} cost={item.cost} pro={item.pro} />
              </div>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  ));

  return (
    <MKBox component="section" my={2} py={2}>
      <Container>
        <Grid
          container
          item
          // xs={12}
          lg={6}
          flexDirection="column"
          alignItems="center"
          sx={{ textAlign: "center", my: 6, mx: "auto", px: 0.75 }}
        >
          <MKBadge
            variant="contained"
            color="info"
            badgeContent="Infinite combinations"
            container
            sx={{ mb: 2 }}
          />
          <MKTypography variant="h2" fontWeight="bold">
              NO 'AIRPORT CHARGE'.   ABSOLUTELY NO HIDDEN* FEES!
          </MKTypography>
        </Grid>
      </Container>
      <Container sx={{ mt: 6 }}>{renderData}</Container>
    </MKBox>
  );
}

export default DesignBlocks;
