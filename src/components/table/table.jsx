import {
  useEffect,
  useState,
} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { GetVehicles } from 'src/services/VehicleService';
import { Popconfirm, message } from 'antd';

import {
  CBadge,
  CButton,
  CCardBody,
  CCollapse,
  CSmartTable,
} from '@coreui/react-pro';

import { TableItem } from './component/tableItem';
import VehicleDetails from 'src/views/vehicles/components/vehicleDetails/vehicleDetail';
import AddVehicleModal from 'src/views/vehicles/components/addVehicleModal';
import { submitDeleteData } from 'src/views/vehicles/handler/submitDeleteData';

export const SmartTable = ({vehicleData}) => {
    const refresh = useSelector((state)=> state.refresh);
    const dispatch = useDispatch();
    const visibleEditVehicle = useSelector((state)=>state.visibleEditVehicle);
    const [details, setDetails] = useState([])
    const [loading, setLoading] = useState(false)
    
    const columns = [
    {
        key: 'name',
        _style: { width: '40%' },
        _props: { color: 'primary', className: 'fw-semibold' },
    },
    'model',
    { key: 'price', filter: false, sorter: false, _style: { width: '20%' } },
    { key: 'status', _style: { width: '20%' } },
    {
        key: 'show_details',
        label: '',
        _style: { width: '1%' },
        filter: false,
        sorter: false,
        _props: { color: 'primary', className: 'fw-semibold' },
    },
    ]

    
    const getBadge = (status) => {
    switch (status) {
      case 'Active':
        return 'success'
      case 'Inactive':
        return 'secondary'
      case 'Pending':
        return 'warning'
      case 'Banned':
        return 'danger'
      default:
        return 'primary'
    }
    }
    const toggleDetails = (index) => {
        const position = details.indexOf(index)
        let newDetails = details.slice()
        if (position !== -1) {
        newDetails.splice(position, 1)
        } else {
        newDetails = [...details, index]
        }
        setDetails(newDetails)
    }
    
    return (
        <CSmartTable
        activePage={3}
        cleaner
        clickableRows
        columns={columns}
        columnFilter
        columnSorter
        footer
        items={vehicleData}
        itemsPerPageSelect
        itemsPerPage={5}
        pagination
        scopedColumns={{
            status: (item) => (
            <td>
                <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
            </td>
            ),
            show_details: (item) => {
            return (
                <td className="py-2">
                <CButton
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                    onClick={() => {
                    toggleDetails(item._id)
                    }}
                >
                    {details.includes(item._id) ? 'Hide' : 'Show'}
                </CButton>
                </td>
            )
            },
            details: (item,number) => {
                function confirm(e) {
                    submitDeleteData(item.id,dispatch);
                    // console.log(item);
                  }
                  
                  function cancel(e) {
                  }
            return (
                <CCollapse visible={details.includes(item._id)} key={`collape-${number}`}>
                <CCardBody>
                    <CButton size="sm" color="info" onClick={() => dispatch({type: 'set',visibleEditVehicle:{
                        active: true,
                        modalId: number
                    }})} key={`edit-vehicle-${number}`}>
                    Edit
                    </CButton>
                    <Popconfirm
                        title="Are you sure to delete this vehicle?"
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                        key={`delete-vehicle-${number}`}
                    >
                        <CButton size="sm" color="info">
                        Delete
                        </CButton>
                    </Popconfirm>
                    <VehicleDetails selectedVehicleData={item}/>
                    
                    {
                        visibleEditVehicle.active && visibleEditVehicle.modalId === number ? ( 
                        <AddVehicleModal edit={item}
                            visible={visibleEditVehicle.active}
                            // onSubmit={onHandleSubmitAddVehicle}
                            onClose={() => dispatch({type: 'set', visibleEditVehicle:{
                                active: false,
                                modalId: false
                            }})}
                            key={`editModal-${number}`}
                        />) : null
                    }
                   
                </CCardBody>
                </CCollapse>
            )
            },
        }}
        selectable
        sorterValue={{ column: 'name', state: 'asc' }}
        tableFilter
        tableHeadProps={{
            color: 'danger',
        }}
        tableProps={{
            striped: true,
            hover: true,
        }}
        />
    )
}