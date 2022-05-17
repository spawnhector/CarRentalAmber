import {
  useRef,
  useState,
} from 'react';

import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  CCol,
  CRow,
} from '@coreui/react-pro';

import { submitData } from '../handler/submitData';
import AddVehicleAddon from './addVehicleAddon';
import AddVehicleAddonSub from './addVehicleAddonSub';
import FileUpload from './fileUpload';
import { submitEditData } from '../handler/submitEditData';

const { RangePicker } = DatePicker;
const AddVehicleModal = ({ visible, onClose, onSubmit,edit,setVisibleAddVehicle,}) => {

    // console.log(edit)
    const dispatch = useDispatch();
    const main = useSelector((state) => state.REACT_APP_BACKEND_ENPOINT);
    const detailFormRef = useRef(null)
    const addonFormRef = useRef(null)
    const addonSubFormRef = useRef(null)
    const [vehicleData,setVehicleData] = useState({
        mainData: '',
        addonData: '',
        fileData: []
    });
    const [triggerStore,setTriggerStore] = useState(false)
    const [triggerEdit,setTriggerEdit] = useState(false)
    
    // console.log(vehicleData)

    if(vehicleData.mainData && vehicleData.addonData && vehicleData.fileData && triggerStore){
        setVisibleAddVehicle(!visible)
        submitData(vehicleData,main,dispatch);
        setTriggerStore(false);
    }

    if(vehicleData.mainData && vehicleData.addonData && vehicleData.fileData && triggerEdit){
        submitEditData(vehicleData,main,dispatch);
        setTriggerEdit(false);
    }

    const [attachedAddon,setAttachedAddon] = useState(edit ? edit.addons : []);
    const rangeConfig = {
        rules: [
        {
            type: 'array',
            required: true,
            message: 'Please select time!',
        },
        ],
    };
    
    const onFinish = (values) => {
        // onSubmit(values)
        // formRef.current?.resetFields()
    }

    const checkPrice = (_, value) => {
        if (value.price > 0) {
        return Promise.resolve();
        }

        return Promise.reject(new Error('Price must be greater than zero!'));
    };

    function disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }

    // edit && edit.addons.map((addon,index) => { attachedAddon.push(addon)})
    // console.log(edit)
    return edit ? (
        <Modal
        title="Edit vehicle data"
        visible={visible}
        onOk={onFinish}
        onCancel={onClose}
        footer={[
            <Button key="cancel" onClick={onClose} size="large" htmlType="button">
            Cancel
            </Button>,
            <Button form="formEditvehicle" key="submit" type="primary" size="large" htmlType="submit">
            Submit
            </Button>,
        ]}
        >
            <Form.Provider
                onFormFinish={(name,values) => {

                    // /////////////////////////////////////////
                    // console.log(vehicleData.fileData)
                    if (name === 'formEditvehicle') {
                        setVehicleData(prev=>{
                            switch (vehicleData.fileData.length > 0) {
                                case true:
                                    return {
                                        ...prev,
                                        mainData: values.values,
                                        fileData: [...vehicleData.fileData]
                                    }
                                    break;
                                case false:
                                    return {
                                        ...prev,
                                        mainData: values.values,
                                        fileData: edit.files
                                    }
                                    break;
                            }
                        });
                        setTriggerEdit(true);
                    }

                    if (name === 'formEditvehicleAddon') {
                        // console.log('editaddon')
                        setAttachedAddon(prev => {
                            values.values.addons.forEach(element => {
                                // console.log(element)
                                prev.push({
                                    title: element,
                                    subAddon: []
                                })
                            });
                            return [...prev]
                        })
                        // console.log(attachedAddon)
                        addonFormRef.current?.resetFields()
                    }

                    attachedAddon.map((val,index)=>{
                        if(val.title === name){
                            values.values.sub.map((addonSub)=>{
                                if(val.subAddon){
                                    val.subAddon = [...val.subAddon,addonSub]
                                }
                                if(val.sub_addons){
                                    val.sub_addons = [...val.sub_addons,addonSub]
                                }
                            });
                            setAttachedAddon(attachedAddon);
                            for (var k in values.forms) k === val.title && values.forms[k].resetFields();
                        }
                    });

                    setVehicleData(prev=>{
                        return {
                            ...prev,
                            addonData: attachedAddon
                        }
                    });
                }}
            >
                <Form
                    name="formEditvehicle"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    autoComplete="off"
                    layout="vertical"
                    ref={detailFormRef}
                    initialValues={{
                        vehicle_id: edit.id,
                        vehicle_name: edit.name,
                        vehicle_category: edit.category,
                        vehicle_model: edit.model,
                        // vehicle_year: moment(edit.year).format("YYYY-MM-DD"),
                        seat: edit.seat,
                        price: edit.price,
                        // startEndDate: [moment(edit.is_available.startDate).format("YYYY-MM-DD"),moment(edit.is_available.endDate).format("YYYY-MM-DD")],
                        vehicle_details: edit.detail,
                        additional_vehicle_details: edit.subDetail
                    }}
                >
                    <Form.Item
                    name="vehicle_id"
                    hidden
                    >
                    </Form.Item>
                    <Form.Item
                    label="Vehicle Name"
                    name="vehicle_name"
                    rules={[{ required: true, message: 'Please input vehicle name!' }]}
                    >
                    <Input size="large" allowClear placeholder="Enter vehicle name" />
                    </Form.Item>
                    <Form.Item
                        label="Vehicle Category"
                        name="vehicle_category"
                        rules={[{ required: true, message: 'Please input vehicle category!' }]}
                    >
                        <Select
                        placeholder="Select a vehicle category"
                        allowClear
                        >
                            <Select.Option value="FULL_SIZE">FULL SIZE</Select.Option>
                            <Select.Option value="VAN/SUV">VAN/SUV</Select.Option>
                            <Select.Option value="COMPACT">COMPACT</Select.Option>
                            <Select.Option value="STANDARD_SUV">STANDARD SUV</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Vehicle Model"
                        name="vehicle_model"
                        rules={[{ required: true, message: 'Please input vehicle model!' }]}
                    >
                    <Input size="large" allowClear placeholder="Enter vehicle model" />
                    </Form.Item>
                    <CRow>
                        <CCol xs>
                            <Form.Item
                            label="Vehicle Year"
                            name="vehicle_year"
                            rules={[{ required: true, message: 'Please input vehicle year!' }]}
                            >
                            <DatePicker picker="year" />
                            </Form.Item>
                            <Form.Item name="seat" label="Number Of seats" rules={[{ required: true}]}>
                                {/* <PriceInput /> */}
                                <InputNumber />
                            </Form.Item>
                        </CCol>
                        <CCol xs>
                            <Form.Item name="price" label="Price" rules={[{ required: true}]}>
                                {/* <PriceInput /> */}
                                <InputNumber addonBefore="Cost" addonAfter="$" />
                            </Form.Item>
                        </CCol>
                    </CRow>
                    <Divider orientation="left" plain>
                        Add Vehicle Available Days
                    </Divider>
                    <Form.Item name="startEndDate" label="Start-date / End-date" {...rangeConfig}>
                        <RangePicker
                            disabledDate={disabledDate}
                        />
                    </Form.Item>
                    <Divider orientation="left" plain>
                        Vehicle Details
                    </Divider>
                    <Form.Item 
                    name="vehicle_details" 
                    label="Vehicle Details" 
                    rules={[{ required: true, message: 'Please input vehicle details!' }]}
                    >
                        <Input.TextArea 
                            autoSize={{ minRows: 3, maxRows: 10 }}
                        />
                    </Form.Item>
                    <Divider orientation="left" plain>
                        Additional Vehicle Details
                    </Divider>
                    <Form.Item 
                    name="additional_vehicle_details" 
                    label="Additional Vehicle Details" 
                    rules={[{ required: true, message: 'Please input additional vehicle details!' }]}
                    >
                        <Input.TextArea 
                            autoSize={{ minRows: 3, maxRows: 10 }}
                        />
                    </Form.Item>
                    <Divider orientation="left" plain>
                        Add Vehicle Addon If Any
                    </Divider>
                </Form>
                <Form
                    name="formEditvehicleAddon"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    autoComplete="off"
                    layout="vertical"
                    ref={addonFormRef}
                >
                    <AddVehicleAddon edit={edit}/>
                </Form>
                {
                    edit ? (<AddVehicleAddonSub 
                        edit={edit}
                        addons={attachedAddon}
                        setAttachedAddon={setAttachedAddon}
                    />) : attachedAddon.length > 0 && (
                        <AddVehicleAddonSub 
                            addons={attachedAddon}
                            setAttachedAddon={setAttachedAddon}
                        />
                    )
                }
                <Divider orientation="left" plain>
                    Add Image / Video
                </Divider>
                <FileUpload setVehicleData={setVehicleData} edit={edit}/>
            </Form.Provider>
        </Modal>
    ) : (
        <Modal
        title="Add new vehicle"
        visible={visible}
        onOk={onFinish}
        onCancel={onClose}
        footer={[
            <Button key="cancel" onClick={onClose} size="large" htmlType="button">
            Cancel
            </Button>,
            <Button form="formAddvehicle" key="submit" type="primary" size="large" htmlType="submit">
            Submit
            </Button>,
        ]}
        >
            <Form.Provider
                onFormFinish={(name,values) => {

                    if (name === 'formAddvehicle') {
                        setVehicleData(prev=>{
                            return {
                                ...prev,
                                mainData: values.values
                            }
                        });
                        setTriggerStore(true)
                        // console.log(vehicleData)
                    }

                    if (name === 'formAddvehicleAddon') {
                        setAttachedAddon(prev => {
                            values.values.addons.forEach(element => {
                                // console.log(element)
                                prev.push({
                                    title: element.name,
                                    detail: element.detail,
                                    subAddon: []
                                })
                            });
                            return [...prev]
                        })
                        console.log(attachedAddon)
                        addonFormRef.current?.resetFields()
                    }

                    attachedAddon.map((val,index)=>{
                        if(val.title === name){
                            values.values.sub.map((addonSub)=>{
                                val.subAddon = [...val.subAddon,addonSub]
                            });
                            setAttachedAddon(attachedAddon);
                            for (var k in values.forms) k === val.title && values.forms[k].resetFields();
                        }
                    });

                    setVehicleData(prev=>{
                        return {
                            ...prev,
                            addonData: attachedAddon
                        }
                    });
                    // console.log(attachedAddon)
                }}
            >
                <Form
                    name="formAddvehicle"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    autoComplete="off"
                    layout="vertical"
                    ref={detailFormRef}
                >
                    <Form.Item
                    label="Vehicle Name"
                    name="vehicle_name"
                    rules={[{ required: true, message: 'Please input vehicle name!' }]}
                    >
                    <Input size="large" allowClear placeholder="Enter vehicle name" />
                    </Form.Item>
                    <Form.Item
                        label="Vehicle Category"
                        name="vehicle_category"
                        rules={[{ required: true, message: 'Please input vehicle category!' }]}
                    >
                        <Select
                        placeholder="Select a vehicle category"
                        allowClear
                        >
                            <Select.Option value="FULL_SIZE">FULL SIZE</Select.Option>
                            <Select.Option value="VAN/SUV">VAN/SUV</Select.Option>
                            <Select.Option value="COMPACT">COMPACT</Select.Option>
                            <Select.Option value="STANDARD_SUV">STANDARD SUV</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Vehicle Model"
                        name="vehicle_model"
                        rules={[{ required: true, message: 'Please input vehicle model!' }]}
                    >
                    <Input size="large" allowClear placeholder="Enter vehicle model" />
                    </Form.Item>
                    <CRow>
                        <CCol xs>
                            <Form.Item
                            label="Vehicle Year"
                            name="vehicle_year"
                            rules={[{ required: true, message: 'Please input vehicle year!' }]}
                            >
                            <DatePicker picker="year" />
                            </Form.Item>
                            <Form.Item name="seat" label="Number Of seats" rules={[{ required: true}]}>
                                {/* <PriceInput /> */}
                                <InputNumber />
                            </Form.Item>
                        </CCol>
                        <CCol xs>
                            <Form.Item name="price" label="Price" rules={[{ required: true}]}>
                                {/* <PriceInput /> */}
                                <InputNumber addonBefore="Cost" addonAfter="$" />
                            </Form.Item>
                        </CCol>
                    </CRow>
                    <Divider orientation="left" plain>
                        Add Vehicle Available Days
                    </Divider>
                    <Form.Item name="startEndDate" label="Start-date / End-date" {...rangeConfig}>
                        <RangePicker
                            disabledDate={disabledDate}
                        />
                    </Form.Item>
                    <Divider orientation="left" plain>
                        Vehicle Details
                    </Divider>
                    <Form.Item 
                    name="vehicle_details" 
                    label="Vehicle Details" 
                    rules={[{ required: true, message: 'Please input vehicle details!' }]}
                    >
                        <Input.TextArea 
                            autoSize={{ minRows: 3, maxRows: 10 }}
                        />
                    </Form.Item>
                    <Divider orientation="left" plain>
                        Additional Vehicle Details
                    </Divider>
                    <Form.Item 
                    name="additional_vehicle_details" 
                    label="Additional Vehicle Details" 
                    rules={[{ required: true, message: 'Please input additional vehicle details!' }]}
                    >
                        <Input.TextArea 
                            autoSize={{ minRows: 3, maxRows: 10 }}
                        />
                    </Form.Item>
                    <Divider orientation="left" plain>
                        Add Vehicle Addon If Any
                    </Divider>
                </Form>
                <Form
                    name="formAddvehicleAddon"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    autoComplete="off"
                    layout="vertical"
                    ref={addonFormRef}
                >
                    <AddVehicleAddon />
                </Form>
                {
                    attachedAddon.length > 0 && (
                        <AddVehicleAddonSub 
                            addons={attachedAddon}
                            setAttachedAddon={setAttachedAddon}                        />
                    )
                }
                <Divider orientation="left" plain>
                    Add Image / Video
                </Divider>
                <FileUpload setVehicleData={setVehicleData}/>
            </Form.Provider>
        </Modal>
    ) 
}

AddVehicleModal.propTypes = {}

export default AddVehicleModal
