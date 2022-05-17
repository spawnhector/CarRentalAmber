import {
  Calendar,
  Col,
  Radio,
  Row,
  Select,
} from 'antd';
import moment from 'moment';
import { useDispatch } from 'react-redux';

function onPanelChange(value, mode) {
    // console.log(value, mode);
  }

export default function VehicleAvailableCalendar({vehicleData}){ 
    const dispatch = useDispatch();

    return <Calendar
    fullscreen={false}
    headerRender={({ value, type, onChange, onTypeChange }) => {
      const start = 0;
      const end = 12;
      const monthOptions = [];

      const current = value.clone();
      const localeData = value.localeData();
      const months = [];
      for (let i = 0; i < 12; i++) {
        current.month(i);
        months.push(localeData.monthsShort(current));
      }

      for (let index = start; index < end; index++) {
        monthOptions.push(
          <Select.Option className="month-item" key={`${index}`}>
            {months[index]}
          </Select.Option>,
        );
      }
      const month = value.month();

      const year = value.year();
      const options = [];
      for (let i = year - 10; i < year + 10; i += 1) {
        options.push(
          <Select.Option key={i} value={i} className="year-item">
            {i}
          </Select.Option>,
        );
      }
      return (
        <div style={{ padding: 8 }}>
          <Row gutter={8}>
            <Col>
              <Radio.Group size="small" onChange={e => onTypeChange(e.target.value)} value={type}>
                <Radio.Button value="month">Month</Radio.Button>
                {/* <Radio.Button value="year">Year</Radio.Button> */}
              </Radio.Group>
            </Col>
            <Col>
              <Select
                size="small"
                dropdownMatchSelectWidth={false}
                className="my-year-select"
                onChange={newYear => {
                  const now = value.clone().year(newYear);
                  onChange(now);
                }}
                value={String(year)}
              >
                {options}
              </Select>
            </Col>
            <Col>
              <Select
                size="small"
                dropdownMatchSelectWidth={false}
                value={String(month)}
                onChange={selectedMonth => {
                  const newValue = value.clone();
                  newValue.month(parseInt(selectedMonth, 10));
                  onChange(newValue);
                }}
              >
                {monthOptions}
              </Select>
            </Col>
          </Row>
        </div>
      );
    }}
    disabledDate={(current) => {
        let startCheck = true;
        let endCheck = true;
        let startDate = moment(vehicleData.is_available.startDate);
        let endDate = moment(vehicleData.is_available.endDate);
        if (startDate) {
        startCheck = current && current < moment(startDate, 'YYYY-MM-DD');
        }
        if (endDate) {
        endCheck = current && current > moment(endDate, 'YYYY-MM-DD');
        }
        // return (startDate > current) || (endDate && endCheck);
        
        return (startDate < moment());
    }}
    onPanelChange={onPanelChange}
    onSelect={(value)=>{
        dispatch({type: 'set', bookingReserveStartDate: value});
        dispatch({type: 'set', bookingReserveEndDate: value});
        dispatch({type: 'setModal', tab: '4'});
    }}
  />};