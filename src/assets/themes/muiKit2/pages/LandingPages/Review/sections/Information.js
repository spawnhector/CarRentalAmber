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
import MKBox from '../../../../components/MKBox';
import CenteredBlogCard
  from '../../../../examples/Cards/BlogCards/CenteredBlogCard';
// Material Kit 2 React examples
import DefaultInfoCard
  from '../../../../examples/Cards/InfoCards/DefaultInfoCard';
import Typography from '@mui/material/Typography';
const { Panel } = Collapse;

function Information({selectedVehicleData}) {
  const dispatch = useDispatch();
  return (
    <MKBox component="section" py={12}>
      <Container>
      
      <Space style={{
        position: 'relative',
        top: '-90px'}}>

        <Button type="primary" onClick={()=>{
          dispatch({ type: 'set', ['modalData']:{
            visible: true,
            modalType: 'review',
            tab: '2',
            vehicleData: selectedVehicleData
          } });
        }}>Reserve Now</Button>

        <Button type="text" onClick={()=>{
          dispatch({ type: 'set', ['modalData']:{
            visible: true,
            modalType: 'review',
            tab: '1',
            vehicleData: selectedVehicleData
          } });
        }}>Details</Button>

        <Button type="text" onClick={()=>{
          dispatch({ type: 'set', ['modalData']:{
            visible: true,
            modalType: 'review',
            tab: '2',
            vehicleData: selectedVehicleData
          } });
        }}>Availability</Button>

        <Button type="text" onClick={()=>{
          dispatch({ type: 'set', ['modalData']:{
            visible: true,
            modalType: 'review',
            tab: '3',
            vehicleData: selectedVehicleData
          } });
        }}>Photo</Button>

      </Space>
        <Grid container marginTop={'-90px'} spacing={3} alignItems="center">
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
                            description={<CustomImageGallery  images={selectedVehicleData.files}/>}
                          />
                        </MKBox>
                      </Grid>
                  </Timeline.Item>
                  <Timeline.Item>
                      <Grid item xs={12} md={8}>
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
          <Grid item xs={12} lg={6} sx={{ ml: "auto", mt: { xs: 3, lg: 0 } }}>
            <CenteredBlogCard
              image={selectedVehicleData.defaultImage}
              title={selectedVehicleData.name}
              description={(
                <>
                <Typography variant='body1' sx={{fontWeight: 'bold'}}>
                  Add These Optional Features
                </Typography>
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
                </>
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
  );
}

export default Information;
