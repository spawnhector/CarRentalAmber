import {
  Button,
  Collapse,
  Divider,
  Form,
  Input,
  InputNumber,
  Space,
} from 'antd';

import {
  MinusCircleOutlined,
  PlusOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import SubAddonList from './subAddonList';

const { Panel } = Collapse;

const genExtra = () => (
  <SettingOutlined
    onClick={event => {
        event.stopPropagation();
    }}
  />
);
const AddVehicleAddonSub = ({
    addons,
    setAttachedAddon,
    edit
}) => {
    // console.log(addons)
    let fixAddon = addons.map((val)=>{
        let sub = ''
        if (val.sub_addons) {
            sub = val.sub_addons
        }
        if (val.subAddon) {
            sub = val.subAddon
        }
        return {
            subAddon: sub,
            title: val.title
        }
    })
    // console.log(fixAddon)
    return (
      <>
        <Collapse
          expandIconPosition={'right'}
        >
            {
               
               fixAddon.map((addon,index) => {
                let listName = "sub";
                return (
                    <Panel header={addon.title} key={index} extra={genExtra()}>
                        <Form
                            name={addon.title}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            autoComplete="off"
                            layout="vertical"
                        >
                                <Form.List
                                    name={listName}
                                >
                                    {(fields, { add, remove }, { errors }) => {
                                        return (
                                            <>
                                            {
                                                edit ? addon.subAddon.length > 0 && <SubAddonList 
                                                data={addon.subAddon} 
                                                subOwner={addon.title}
                                                addons={addons}
                                                edit
                                                setAttachedAddon={setAttachedAddon}

                                            /> : addon.subAddon.length > 0 && <SubAddonList 
                                                data={addon.subAddon} 
                                                subOwner={addon.title}
                                                addons={addons}
                                                setAttachedAddon={setAttachedAddon}

                                            />
                                            }
                                            {fields.map(({ key, name, ...restField }) => (
                                                <div key={key}>
                                                    <Divider orientation="left" plain>
                                                       
                                                    </Divider>
                                                    <Form.Item
                                                    {...restField}
                                                    name={[name, 'title']}
                                                    rules={[{ required: true, message: 'Please input sub-addon title or delete this field.' }]}
                                                    >
                                                        <Input placeholder="Sub title" style={{ width: '100%' }} />
                                                    </Form.Item>
                                                    <Space key={key} style={{ display: 'flex'}} align="baseline">
                                                        <Form.Item
                                                        {...restField}
                                                        name={[name, 'price']}
                                                        >
                                                            <InputNumber addonBefore="Cost" addonAfter="$" />
                                                        </Form.Item>
                                                        <MinusCircleOutlined onClick={() => remove(name)} style={{marginLeft: 10,fontSize:'20px',verticalAlign:'middle'}} />
                                                    </Space>
                                                </div>
                                                ))}
                                                <Form.Item>
                                                    <Button
                                                        type="dashed"
                                                        onClick={() => add()}
                                                        style={{ width: '100%' }}
                                                        icon={<PlusOutlined />}
                                                    >
                                                        Add new list item
                                                    </Button>
                                                    {fields.length > 0 ? (
                                                        <>
                                                            <Button
                                                                // type="dashed"
                                                                // onClick={() => add()}
                                                                style={{ width: '100%' }}
                                                                form={addon.title} 
                                                                key="submit"
                                                                htmlType="submit"
                                                                // icon={<PlusOutlined />}
                                                            >
                                                                Next
                                                            </Button>
                                                        </>
                                                    ) : null}
                                                    <Form.ErrorList errors={errors} />
                                                </Form.Item>
                                            </>
                                        )
                                    }}
                                </Form.List>
                        </Form>
                    </Panel>
                )
            })
            }
        </Collapse>
      </>
    );
}

export default AddVehicleAddonSub;