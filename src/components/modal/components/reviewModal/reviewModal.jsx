import { useState } from 'react';

import { Tabs } from 'antd';

import VehicleAvailableCalendar
  from './components/availability/availableCalendor';
import DetailTab from './components/details/detailTab';
import ReserveTab from './components/reserve/reserve';
import CustomImageGallery from 'src/components/imageGallery/customImageGallery';

const { TabPane } = Tabs;

const ReviewModal = ({modalData}) => {
    const { tab,vehicleData } = modalData;
    const [disabled,setDisabled] = useState(true);
    // console.log(vehicleData)
    return(
        <Tabs defaultActiveKey={tab}>
            <TabPane tab="Details" key="1">
                <DetailTab vehicleData={vehicleData}/>
            </TabPane>
            <TabPane tab="Availability" key="2">
                <VehicleAvailableCalendar vehicleData={vehicleData}/>
            </TabPane>
            <TabPane tab="Photo" key="3">
            <CustomImageGallery  images={vehicleData.files}/>
            </TabPane>
            <TabPane tab="Reserve" disabled={disabled} key="4">
                <ReserveTab vehicleData={vehicleData}/>
            </TabPane>
        </Tabs>
    )
};
export default ReviewModal;