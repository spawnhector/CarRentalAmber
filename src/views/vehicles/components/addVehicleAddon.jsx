import 'antd/dist/antd.css';
import './style/addVehicleAddon.css';

import React from 'react';

import {
  Button,
  Form,
  Input,
  Space,
  Steps,
} from 'antd';

import {
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Box } from '@mui/material';

const { Step } = Steps;

const AddVehicleAddon = ({edit}) => {
    
  return (
      <Form.List
        name="addons"
      >
        {(fields, { add, remove }, { errors }) => {
            return (
                <>
                    {fields.map(({ key, name, ...restField }) => {
                        return (
                            
                            <Space key={key} style={{ display: 'list-item', marginBottom: 8 }} align="baseline">
                            <Form.Item
                                {...restField}
                                name={[name, 'name']}
                                rules={[{ required: true, message: 'Please input addon name or delete this field.' }]}
                            >
                                <Input placeholder="Addon Name" />
                            </Form.Item>
                            <Box >
                                <Form.Item
                                    {...restField}
                                    name={[name, 'detail']}
                                    rules={[{ required: true, message: 'Please input addon detail or delete this field.' }]}
                                >
                                    <Input.TextArea placeholder="Addon Detail" style={{ width: '80%' }}/>
                                </Form.Item>
                                    {fields.length > 0 ? (
                                            <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                onClick={() => remove(field.name)}
                                            />
                                    ) : null}
                            </Box>
                            </Space>
                            // <>
                            // <Form.Item
                            //     required={false}
                            //     key={field.key+'addon-name'}
                            // >
                            //     <Form.Item
                            //     {...field}
                            //     rules={[
                            //         {
                            //         required: true,
                            //         whitespace: true,
                            //         message: "Please input addon name or delete this field.",
                            //         },
                            //     ]}
                            //     noStyle
                            //     >
                            //     <Input placeholder="addon name" style={{ width: '80%' }} />
                            //     </Form.Item>
                            // </Form.Item>
                            // <Form.Item
                            //     required={false}
                            //     key={field.key+'addon-detail'}
                            // >
                            //     <Form.Item
                            //     {...field}
                            //     rules={[
                            //         {
                            //         required: true,
                            //         whitespace: true,
                            //         message: "Please input addon name or delete this field.",
                            //         },
                            //     ]}
                            //     noStyle
                            //     >
                            //     <Input.TextArea placeholder="addon detail" style={{ width: '80%' }} />
                            //     </Form.Item>
                            //     {fields.length > 0 ? (
                            //         <>
                            //             <MinusCircleOutlined
                            //                 className="dynamic-delete-button"
                            //                 onClick={() => remove(field.name)}
                            //             />
                            //         </>
                            //     ) : null}
                            // </Form.Item>
                            // </>
                    )})
                    }
                    <Form.Item>
                    <Button
                        type="dashed"
                        onClick={() => add()}
                        style={{ width: '100%' }}
                        icon={<PlusOutlined />}
                    >
                        Add addon
                    </Button>
                    {fields.length > 0 ? edit ? (
                        <Button
                            style={{ width: '100%' }}
                            form="formEditvehicleAddon" 
                            key="submit"
                            htmlType="submit"
                        >
                            Next
                        </Button>
                    ) : (
                        <Button
                            style={{ width: '100%' }}
                            form="formAddvehicleAddon" 
                            key="submit"
                            htmlType="submit"
                        >
                            Next
                        </Button>
                    ) : null}
                    <Form.ErrorList errors={errors} />
                    </Form.Item>
                </>
            )
        }}
      </Form.List>
  );
};

export default () => <AddVehicleAddon />;