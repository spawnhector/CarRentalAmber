import {
  DatePicker,
  Layout,
} from 'antd';
import { Content } from 'antd/lib/layout/layout';
import moment from 'moment';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import MKBox from 'src/assets/themes/muiKit2/components/MKBox';
import MKTypography from 'src/assets/themes/muiKit2/components/MKTypography';
import {
  calculateCost,
  dateDiff,
} from 'src/utils/cost_time';

const { RangePicker } = DatePicker;
const ReserveTab = ({vehicleData}) => {
    const dispatch = useDispatch();
    const bookingReserveStartDate = useSelector((state) => state.bookingReserveStartDate);
    const bookingReserveEndDate = useSelector((state) => state.bookingReserveEndDate);
    let startDate = bookingReserveStartDate;
    let endDate = bookingReserveEndDate;
    const dateFormat = 'YYYY-MM-DD HH:mm';
    
    return (
        <Layout>
            <Content>
                <MKBox p={3} mt={-1} textAlign="center">
                    <MKTypography display="inline" variant="h5" textTransform="capitalize" fontWeight="regular">
                    {vehicleData.name}
                    </MKTypography>
                    <MKBox mt={1} mb={3}>
                        <RangePicker
                            showTime={{ format: 'HH:mm' }}
                            format="YYYY-MM-DD HH:mm"
                            //   onChange={onChange}
                            // onOk={onOk}
                            defaultValue={[moment(startDate, dateFormat), moment(endDate, dateFormat)]}
                            disabled={[true, false]}
                            disabledDate={(current) => {
                                let startCheck = true;
                                let endCheck = true;
                                let startDatee = moment(vehicleData.is_available.startDate);
                                let endDatee = moment(vehicleData.is_available.endDate);
                                if (startDatee) {
                                startCheck = current && current < moment(startDatee, 'YYYY-MM-DD');
                                }
                                if (endDatee) {
                                endCheck = current && current > moment(endDatee, 'YYYY-MM-DD');
                                }
                                return (startDatee && startCheck) || (endDatee && endCheck);
                            }}
                            onChange={(value)=>{
                                // console.log(value)
                                // dispatch({type: 'set', bookingReserveStartDate: startDate});
                                dispatch({type: 'set', bookingReserveEndDate: value[1]});
                            }}
                        />
                    </MKBox>
                    <MKTypography display="inline" variant="h5" textTransform="capitalize" fontWeight="regular">
                    {dateDiff(startDate,endDate)}: ${calculateCost(startDate,endDate,vehicleData.price)}
                    </MKTypography>
                </MKBox>
            </Content>
        </Layout>
    )
}
export default ReserveTab;