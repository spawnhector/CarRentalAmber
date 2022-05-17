import { useEffect, useState } from 'react';

import {
  Button,
  Menu,
  message,
  Popconfirm,
  Space,
  Table,
  Typography,
} from 'antd';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  calculateCost,
  numOfDays,
} from 'src/utils/cost_time';

import {
  MinusCircleTwoTone,
  PlusCircleTwoTone,
} from '@ant-design/icons';

const { Text } = Typography;
const menu = <Menu items={[{ label: 'Action 1' }, { label: 'Action 2' }]} />;

function AddonTable() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const bookingReserveStartDate = useSelector((state) => state.bookingReserveStartDate);
    const bookingReserveEndDate = useSelector((state) => state.bookingReserveEndDate);
    const selectedVehicleData = useSelector((state) => state.selectedVehicleData);
    const selectedAddon = useSelector((state) => state.selectedAddon);
    const [expended, setExpended] = useState();
    const reserveVehicleData = useSelector((state) => state.reserveVehicleData);
    // console.log(selectedVehicleData)
    // console.log(selectedAddon)
    const expandedRowRender = (item) => {
        const data = [];
        let exits = selectedAddon.filter((val)=>{
            return val.addonId === item.id;
        });
        if (exits.length > 0) {
            let selectedSub = item.sub_addons.filter((val)=>{
                return val.id === exits[0].subAddonId
            });
            data.push({
                key: 0,
                title: selectedSub[0].title,
                rate: `$${selectedSub[0].rate}`,
            });
            // console.log(selectedSub)
        }

        function confirm(e) {
            let newSelectedAddon = selectedAddon.filter((val)=>{
                return val.addonId !== exits[0].addonId
            })
            dispatch({ type: 'set', selectedAddon: [
                ...newSelectedAddon
            ]});
            setExpended(undefined)
            message.success('Addon Removed');
        }

        function edit(){
            dispatch({ type: 'set', editSelectedAddon: true })
            dispatch({ type: 'set', ['modalData']:{
                visible: true,
                modalType: 'addon',
                tab: '1',
                addonData: item
            } });
        }
          
        function cancel(e) {
            // console.log(e);
            // message.error('Click on No');
        }

        // console.log(items)
        const columns = [
            { title: '', dataIndex: 'title', key: 'title' },
            { title: '', dataIndex: 'rate', key: 'rate' },
            {
                title: 'Action',
                dataIndex: 'operation',
                key: 'operation',
                render: () => (
                <Space size="middle">
                    <Button type="link"
                        onClick={edit}
                    >Edit</Button>
                    <Popconfirm
                        title="Are you sure to remove this addon?"
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a href="#">Remove</a>
                    </Popconfirm>
                </Space>
                ),
                fixed: 'right',
                width: 200,
            },
        ];
        
        return <Table columns={columns} dataSource={data} pagination={false} scroll={{ x: 1200, y: 400 }}/>;
    };
    
    const columns = [
        { 
            title: 'Additional Items', 
            dataIndex: 'title',
            key: 'additional_items' ,
            width:'auto'
        },
        { title: 'Rate', dataIndex: 'rate', key: 'rate' ,width:'auto'},
        { 
            title: 'amount', 
            dataIndex: 'amount', 
            key: 'amount' ,
            fixed: 'right',
            width: 200,
        },
    ];

    let addonSubTotal = [];
    const data = selectedVehicleData.addons.map((prev,index)=>{
        let exits = selectedAddon.filter((val)=>{
            return val.addonId === prev.id;
        });
        switch (exits.length > 0) {
            case true:
                let sub = prev.sub_addons.filter((subs)=>{
                    return subs.id === exits[0].subAddonId
                });
                addonSubTotal.push(sub[0]);
                // console.log(sub)
                return {
                    ...prev,
                    key: index,
                    rate: 'Car: '+numOfDays(bookingReserveStartDate,bookingReserveEndDate)+' Day @ $'+sub[0].rate+'',
                    amount: '$'+sub[0].rate+''
                }
                break;
            case false:
                return {
                    ...prev,
                    key: index,
                    rate: 'not selected',
                    amount: 'not selected'
                }
                break;
        }
    })
    
    // console.log(addonSubTotal)

    const expandIcon = ({ record }) =>
    {

        const handleExpand = e => {
            let exits = selectedAddon.filter((val)=>{
                return val.addonId === record.id;
            });
            // console.log(exits)
            switch (exits.length > 0) {
                case true: 
                    if (expended === record.key) setExpended(undefined);
                    else setExpended(record.key);
                    break;
                case false:
                    dispatch({ type: 'set', ['modalData']:{
                        visible: true,
                        modalType: 'addon',
                        tab: '1',
                        addonData: record
                    } });
                    break;
            }
        }

        return expended === record.key ? (
        <MinusCircleTwoTone onClick={handleExpand} />
        ) : (
        <PlusCircleTwoTone onClick={handleExpand} />
    )}

    
    let TAX_RATE = 0.15;
    let totalRepayment = 0;

    function ccyFormat(num) {
        return `${num.toFixed(2)}`;
    }
    
    function subtotal(items) {
            return items.map(({ rate }) => rate ).reduce((sum, i) => sum + i, 0);
    }

    const invoiceSubtotal = subtotal(addonSubTotal) + calculateCost(selectedVehicleData.reserveStartDate,selectedVehicleData.reserveEndtDate,selectedVehicleData.cost);
    // console.log(invoiceSubtotal)
    const invoiceTaxes = TAX_RATE * invoiceSubtotal;
    const invoiceTotal = invoiceTaxes + invoiceSubtotal;
    useEffect(()=>{
        dispatch({type: 'set', reserveVehicleData:{
            ...reserveVehicleData,
            booking_total: ccyFormat(invoiceTotal),
            booking_subTotal: ccyFormat(invoiceSubtotal),
            booking_after_tax: ccyFormat(invoiceTaxes),
        }})
    },[invoiceTotal]);

    return (
        <Table
        className="components-table-demo-nested"
        columns={columns}
        expandable={{
            expandedRowRender: expandedRowRender,
            expandIcon: expandIcon
        }}
        expandedRowKeys={[expended]}
        dataSource={data}
        scroll={{ x: 1200, y: 400 }}
        summary={addonData => {
            return (
                <Table.Summary fixed={'bottom'}>
                    <Table.Summary.Row>
                            <Table.Summary.Cell index={0} colSpan={2}></Table.Summary.Cell>
                            <Table.Summary.Cell index={2}>Subtotal</Table.Summary.Cell>
                            <Table.Summary.Cell index={3}><Text type="danger">${ccyFormat(invoiceSubtotal)}</Text></Table.Summary.Cell>
                    </Table.Summary.Row>
                    <Table.Summary.Row>
                            <Table.Summary.Cell index={0} colSpan={2}></Table.Summary.Cell>
                            <Table.Summary.Cell index={2}>Rate: {`${(TAX_RATE * 100).toFixed(0)} %`}</Table.Summary.Cell>
                            <Table.Summary.Cell index={3}><Text type="danger">${ccyFormat(invoiceTaxes)}</Text></Table.Summary.Cell>
                    </Table.Summary.Row>
                    <Table.Summary.Row>
                            <Table.Summary.Cell index={0} colSpan={2}></Table.Summary.Cell>
                            <Table.Summary.Cell index={2}>Total</Table.Summary.Cell>
                            <Table.Summary.Cell index={3}><Text type="danger">${ccyFormat(invoiceTotal)}</Text></Table.Summary.Cell>
                    </Table.Summary.Row>
                </Table.Summary>
            );
        }}
        pagination={false} 
        style={{position: 'relative',top: '-100px'}}
        />
    );
}

export default () => <AddonTable />;