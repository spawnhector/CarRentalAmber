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

import {
    Button,
    Collapse,
    List,
    Space,
    Timeline,
  } from 'antd';
  import { useDispatch } from 'react-redux';
  import CustomImageGallery from 'src/components/imageGallery/customImageGallery';
  import NewlineText from 'src/components/text/newLine';
  
  // @mui material components
  import Container from '@mui/material/Container';
  import Grid from '@mui/material/Grid';
  
  // Material Kit 2 React components
  import MKBox from '../../../../assets/themes/muiKit2/components/MKBox';
  import CenteredBlogCard from 'src/assets/themes/muiKit2/examples/Cards/BlogCards/CenteredBlogCard';
  // Material Kit 2 React examples
  import DefaultInfoCard from 'src/assets/themes/muiKit2/examples/Cards/InfoCards/DefaultInfoCard';
  import appApi from '../../../../env.json'
import { Box } from '@mui/material';
  
  const { Panel } = Collapse;
  
  function VehicleDetails({selectedVehicleData}) {
    // console.log(selectedVehicleData)
    const dispatch = useDispatch();
    return (
        <Box style={{maxWidth: '950px'}}>
        <MKBox component="section" py={12}>
          <Container>
            <Grid container marginTop={'-90px'} spacing={2} alignItems="center">
              <Grid item xs={12} lg={6}>
                <Grid >
                  <Timeline>
                      <Timeline.Item>
                          <Grid item xs={12} md={12}>
                            <MKBox mb={2}>
                              <DefaultInfoCard
                                // icon="public"
                                title="Images / Videos"
                                // description={<NewlineText text={selectedVehicleData.detail}/>}
                                description={<CustomImageGallery images={selectedVehicleData.files}/>}
                              />
                            </MKBox>
                          </Grid>
                      </Timeline.Item>
                      <Timeline.Item>
                          <Grid item xs={12} md={8}>
                            <MKBox mb={4}>
                              <DefaultInfoCard
                                // icon="public"
                                title="Vehicle Details"
                                description={<NewlineText text={selectedVehicleData.detail}/>}
                              />
                            </MKBox>
                          </Grid>
                      </Timeline.Item>
                      <Timeline.Item>
                          <Grid item xs={12} md={0}>
                            <MKBox mb={4}>
                              <DefaultInfoCard
                                // icon="public"
                                title="Additional Details"
                                description={<NewlineText text={selectedVehicleData.subDetail}/>}
                              />
                            </MKBox>
                          </Grid>
                      </Timeline.Item>
                  </Timeline>
                </Grid>
              </Grid>
              <Grid 
              item 
              xs={12} 
              lg={6} 
              sx={{ ml: "auto", mt: { xs: 3, lg: 0 }}}
              style={{maxWidth: '579px' }}
              >
                <CenteredBlogCard
                  image={`${appApi.REACT_APP_BACKEND_ENPOINT_NOAPI}/${selectedVehicleData.files[0].path}`}
                  title={selectedVehicleData.name}
                  description={(
                    <Collapse bordered={false} >
                      {selectedVehicleData.addons.map((item)=>{
                        return (<Panel header={item.title} key={item.title+item.id} style={{textAlign:'left'}}>
                          
                            <List
                              itemLayout="horizontal"
                              dataSource={item.sub_addons}
                              renderItem={item => {
                                console.log(item)
                                return (
                                <List.Item>
                                  <List.Item.Meta
                                    avatar={'-'}
                                    title={<span >{item.title}</span>}
                                    // description=""
                                  />
                                  <span>{'+ $'+item.rate}</span>
                                </List.Item>
                              )
                              }}
                            />
                        </Panel>);
                      })}
                    </Collapse>
                  )}
                  action={{
                    type: "internal",
                    route: "pages/company/about-us",
                    color: "info",
                    label: "find out more",
                  }}
                />
              </Grid>
            </Grid>
          </Container>
        </MKBox>
        </Box>
    );
  }
  
  export default VehicleDetails;
  