import {
  Layout,
  Select,
} from 'antd';
import { Content } from 'antd/lib/layout/layout';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import MKBox from 'src/assets/themes/muiKit2/components/MKBox';
import MKTypography from 'src/assets/themes/muiKit2/components/MKTypography';

const { Option } = Select;
const AttachAddonTab = ({addonData}) => {
    const dispatch = useDispatch();
    const tempSelectedAddon = useSelector((state) => state.tempSelectedAddon);
    // console.log(tempSelectedAddon)

    function handleChange(value) {
        dispatch({ type: 'setModal', tab: '2'});
        dispatch({type: 'set', tempSelectedAddon: [{
            addonId: addonData.id,
            subAddonData: value
        }]})
    }
    return (
        <Layout>
            <Content>
                <MKBox p={3} mt={-1} textAlign="center">
                        <MKTypography display="inline" variant="h5" textTransform="capitalize" fontWeight="regular">
                        {addonData.title}
                        </MKTypography>
                        <MKBox mt={1} mb={3}>
                            <Select
                                labelInValue
                                defaultValue={tempSelectedAddon.length > 0 ? { value: tempSelectedAddon[0].subAddonData.value} : {label: 'Select an option'}}
                                style={{ width: '80%' }}
                                onChange={handleChange}
                            >
                                {addonData.sub_addons.map((val,index)=>{
                                    return <Option key={index} value={val.id}>{val.title}<span style={{float:'right'}}>${val.rate}</span></Option>
                                })}
                            </Select>
                        </MKBox>
                </MKBox>
            </Content>
        </Layout>
    )
}
export default AttachAddonTab;