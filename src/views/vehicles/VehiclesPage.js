import React, { useEffect, useState } from 'react';

import { Button } from 'antd';
import { SmartTable } from 'src/components/table/table';

import { errorDialog } from 'src/utils/modals';
import {
  PlusOutlined,
  ReloadOutlined,
} from '@ant-design/icons';

import AddVehicleModal from './components/addVehicleModal';
import { useDispatch, useSelector } from 'react-redux';
import { GetVehicles } from 'src/services/VehicleService';

const VehiclesPage = () => {
  const dispatch = useDispatch();
  const [visibleAddVehicle, setVisibleAddVehicle] = useState(false)
  const [storeSeleted, setStorSelected] = useState(null)
  const [reset,setReset] = useState(false);
  const refresh = useSelector((state) => state.refresh);
  const [vehicleData, setVehicleData] = useState([])
  const main = useSelector((state) => state.REACT_APP_BACKEND_ENPOINT);
  
//   useEffect(() => {
//     refresh == true ? setReset(true) : null;
//     dispatch({type: 'set', refresh: false});
//     // console.log(refresh)
// }, [refresh])

  
  const fetchAllVehicle = async () => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        const results = await GetVehicles(main+"/vehicles",requestOptions)
        // setLoading(false);
        let result = JSON.parse(results)
        // console.log(vehicleData)
        // console.log(results)
        if (result.vehicles) {
            setVehicleData(result.vehicles)
        } else {
            errorDialog('An error occurred. Please check again !')
        }
    } catch (error) {
    errorDialog('An error occurred. Please check again !')
    }
  }

  useEffect(() => {
    fetchAllVehicle()
  }, [refresh]);

  // useEffect(() => {
  //   fetchAllStore()
  // }, [])

  // const onChangePage = (e) => {
  //   fetchAllStore(e)
  // }

  const onHandleRefresh = () => {
    fetchAllVehicle()
  }

  const onHandleSubmitAddVehicle = (values) => {
    console.log(values)
    // addNewStore(values)
    // setVisibleAddVehicle(!visibleAddVehicle)
  }

  // const onHandleSubmitEditStore = (values) => {
  //   console.log(values)
  //   editStore(storeSeleted.id, values)
  //   setVisibleEditStore(!visibleEditStore)
  // }

  // const showDeleteConfirm = (id) => {
  //   showDeleteConfirmDialg('Are you sure delete this store?', null, () => delStore(id), null)
  // }
  return (
    <div>
      <div className="mt-6 flex justify-between">
        <p className="font-medium text-2xl">Vehicles</p>
        <div className="space-x-2">
          <Button size="large" icon={<ReloadOutlined />} onClick={() => onHandleRefresh()}>
            Refresh
          </Button>
          <Button size="large" icon={<PlusOutlined />}  onClick={() => setVisibleAddVehicle(true)}>
            Add new vehicle
          </Button>
        </div>
      </div>

      <div className="mt-3">
        <div className="shadow rounded bg-white divide-y">
          <div className="grid grid-cols-12 gap-x-0.5 justify-center items-end p-2">
            <SmartTable vehicleData={vehicleData}/>
          </div>
          <div className="flex justify-end p-6">
            
          </div>
          <AddVehicleModal
            visible={visibleAddVehicle}
            onSubmit={onHandleSubmitAddVehicle}
            onClose={() => setVisibleAddVehicle(!visibleAddVehicle)}
            setVisibleAddVehicle={setVisibleAddVehicle}
          />
          {/* <EditStoreModal
            visible={visibleEditStore}
            onSubmit={onHandleSubmitEditStore}
            onClose={() => setVisibleEditStore(!visibleEditStore)}
            defaultValues={storeSeleted}
          /> */}
        </div>
      </div>
    </div>
  )
}


export default VehiclesPage
