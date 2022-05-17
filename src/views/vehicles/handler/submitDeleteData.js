import { message } from 'antd';
import { useDispatch } from 'react-redux';
import appApi from '../../../env.json';

export const submitDeleteData = (id,dispatch) => {
        const formData = new FormData();
        formData.append('vehicle_id', id);
        fetch(""+appApi.REACT_APP_BACKEND_ENPOINT+"/delete_vehicles", {
        method: 'POST',
        body: formData,
        })
        .then(res => res.json())
        .then((results) => {
            // console.log(results)
            // message.success('Vehicle deleted.');
            dispatch({type: 'set', refresh : true})
            // setIsLoading(false)
        })
        .catch(() => {
            // setIsLoading(false)
            message.error('upload failed.');
        })
        .finally(() => {
            // setIsLoading(false)
        });
        
}