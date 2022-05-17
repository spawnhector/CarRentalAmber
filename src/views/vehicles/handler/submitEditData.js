import { message } from 'antd';

export const submitEditData = (data,main,dispatch) => {
        function isFile(input) {
            if ('File' in window && input instanceof File)
            return true;
            else return false;
        }
        const { mainData,addonData,fileData  } = data;
        // console.log(fileData)
        let oldFile = [];
        const formData = new FormData();
        formData.append('mainData', JSON.stringify( mainData));
        formData.append('addonData', JSON.stringify( addonData));
        fileData.forEach(file => {
            // console.log()
            if(isFile(file)){
                formData.append('files[]', file);
            }
            if(!isFile(file)){
                oldFile.push(file);
            }
        });
        formData.append('oldFile', JSON.stringify( oldFile));

        fetch(""+main+"/edit_vehicles", {
        method: 'POST',
        body: formData,
        })
        .then(res => res.json())
        .then((results) => {
            console.log(results);
            dispatch({type: 'set', refresh: true});
            dispatch({type:'set',visibleEditVehicle:{
                active: false,
                modalId: false
            }})
            message.success('upload successfully.');
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