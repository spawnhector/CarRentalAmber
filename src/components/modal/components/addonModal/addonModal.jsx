import { useState } from 'react';

import { Tabs } from 'antd';

import AttachAddonTab from './components/attachAddon/attachAddon';
import DetailTab from './components/details/detailTab';

const { TabPane } = Tabs;

const AddonModal = ({modalData}) => {
    const { tab,addonData } = modalData;
    const [disabled,setDisabled] = useState(true);

    return(
        <Tabs defaultActiveKey={tab}>
            <TabPane tab="Details" key="1">
                <DetailTab addonData={addonData}/>
            </TabPane>
            <TabPane tab="Attach Addon" key="2">
                <AttachAddonTab addonData={addonData}/>
            </TabPane>
        </Tabs>
    )
};
export default AddonModal;