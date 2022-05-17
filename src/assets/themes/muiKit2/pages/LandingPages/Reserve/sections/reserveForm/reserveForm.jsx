import './style.scss';

import React, { useState } from 'react';

import {
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  Select,
  Space,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
  style: {
    margin: '94px',
    padding: '50px',
    background: 'white'
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const ReserveForm = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const bookingReserveStartDate = useSelector((state) => state.bookingReserveStartDate);
    const bookingReserveEndDate = useSelector((state) => state.bookingReserveEndDate);
    const selectedVehicleData = useSelector((state) => state.selectedVehicleData);
    const selectedAddon = useSelector((state) => state.selectedAddon);
    const reserveVehicleData = useSelector((state) => state.reserveVehicleData);
    const navigate = useNavigate();

    const [state,setState] = useState({
        value: 2,
    })
    const onFinish = (values) => {
        dispatch({type: 'set', reserveVehicleData:{
            ...reserveVehicleData,
            selectedVehicleData,
            selectedAddon: selectedAddon,
            reserveForm: values,
            bookingReserveStartDate:bookingReserveStartDate,
            bookingReserveEndDate: bookingReserveEndDate
        }});
        
        navigate('/invoice');
        // console.log(reserveVehicleData)
        // console.log('Received values of form: ', values);
    };

    const onChange = e => {
        setState({
        value: e.target.value,
        });
    };

    return (
        <Form
        {...formItemLayout}
        form={form}
        name="reserveForm"
        onFinish={onFinish}
        scrollToFirstError
        >
        <Form.Item
            name="name"
            label="Full Name"
            rules={[
            {
                required: true,
                message: 'Please input your full name',
            },
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name="country"
            label="Country"
            rules={[
            {
                required: true,
                message: 'This field is required',
            },
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name="license"
            label="License"
            rules={[
            {
                required: true,
                message: 'Please input your license number',
            },
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name="email"
            label="E-mail"
            rules={[
            {
                type: 'email',
                message: 'The input is not valid E-mail!',
            },
            {
                required: true,
                message: 'Please input your E-mail!',
            },
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
            {
                required: true,
                message: 'Please input your phone number!',
            },
            ]}
        >
            <Input
            //   addonBefore={prefixSelector}
            style={{
                width: '100%',
            }}
            />
        </Form.Item>

        <Form.Item
            name="dropoff"
            label="Different Dropoff"
            rules={[
            {
                required: true,
                message: 'This field is required!',
            },
            ]}
        >
            <Radio.Group  value={state.value}>
                <Space direction="vertical">
                    <Radio value={1}>Yes</Radio>
                    <Radio value={2}>No</Radio>
                </Space>
            </Radio.Group>
        </Form.Item>

        <Form.Item
            name="invoice"
            label="Detailed Invoice"
            rules={[
            {
                required: true,
                message: 'This field is required!',
            },
            ]}
        >
            <Radio.Group onChange={onChange} value={state.value}>
                <Space direction="vertical">
                    <Radio value={1}>Yes</Radio>
                    <Radio value={2}>No</Radio>
                </Space>
            </Radio.Group>
        </Form.Item>
        
        {state.value === 1 ? <>
            <Form.Item
                name="address"
                label="Address"
                rules={[
                {
                    required: true,
                    message: 'Please fill out this field',
                },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="address_cont"
                label="Address Con't"
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="city"
                label="City"
                rules={[
                {
                    required: true,
                    message: 'Please fill out this field',
                },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="state"
                label="State / Prov"
                rules={[
                {
                    required: true,
                    message: 'Please fill out this field',
                },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="postal"
                label="Postal Code"
                rules={[
                {
                    required: true,
                    message: 'Please fill out this field',
                },
                ]}
            >
                <Input />
            </Form.Item>
        </> : null}
        <Form.Item name="note" label="Note">
            <Input.TextArea />
        </Form.Item>
        <Form.Item
            name="booking_stay_in_touch"
            valuePropName="checked"
            rules={[
            {
                validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('This field is required')),
            },
            ]}
            {...tailFormItemLayout}
        >
            <Checkbox>
            Stay In Touch
            </Checkbox>
        </Form.Item>
        <Form.Item
            {...tailFormItemLayout}
        >
            <Input.TextArea value={`Terms and Conditions
    Vehicles are rented to persons 25 - 75 years old who have held a valid Driver's License for at least 2 years. This limitation also applies to additional drivers.

    No insurance is required when payment is made using a credit card that “covers” rentals in Jamaica. The credit card must match the license of the main driver.

    The driver is required to sign a Loss/Damage Waiver form before collecting the key(s)`} disabled autoSize />
        </Form.Item>
        <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
            {
                validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
            },
            ]}
            {...tailFormItemLayout}
        >
            <Checkbox>
            I have read the agreement
            </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit"
                // onClick={()=>{
                //     navigate('/invoice')
                // }}
            >
            Reserve
            </Button>
        </Form.Item>
        </Form>
    );
};

export default () => <ReserveForm />;