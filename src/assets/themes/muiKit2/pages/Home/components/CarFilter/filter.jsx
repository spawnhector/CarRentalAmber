// import MKDatePicker from 'src/assets/themes/muiKit2/components/MKDatePicker';
// import MKTypography from 'src/assets/themes/muiKit2/components/MKTypography';
import { DatePicker, Select } from 'antd';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

const { RangePicker } = DatePicker;
export default function Filter(){
    const dispatch = useDispatch()
    const carFilter = useSelector((state) => state.carFilter)
    return (
        <>
        <RangePicker onChange={(val)=>{
            dispatch({type:'set',carFilter: {
              active: true,
              filterType: 'startEnd',
              filterData: val
            }})
        }}/>
        
        <Select
        placeholder="Filter By Vehicle Category"
        allowClear
        style={{width:'100%'}}
        onChange={(val)=>{
            dispatch({type:'set',carFilter: {
              active: true,
              filterType: 'category',
              filterData: val
            }})
        }}
        >
            <Select.Option value="FULL_SIZE">FULL SIZE</Select.Option>
            <Select.Option value="VAN/SUV">VAN/SUV</Select.Option>
            <Select.Option value="COMPACT">COMPACT</Select.Option>
            <Select.Option value="STANDARD_SUV">STANDARD SUV</Select.Option>
        </Select>
          {/* <MKDatePicker input={{ 
              placeholder: "Select a date",
              style: {width:'100%'} ,
              onChange: val => dispatch({type: 'filter',carFilter: {
                active: true,
                filterType: ['date'],
                filterData:[{
                    startDate: val
                }]
              }})
          }}/>
          <MKTypography variant="body2" fontWeight="regular" color="secondary" sx={{textAlign:'center'}} mb={1} pr={2}>
              TO
            </MKTypography>
          <MKDatePicker input={{ placeholder: "Select a date",style: {width:'100%'} }} /> */}
        </>
    )
}                       