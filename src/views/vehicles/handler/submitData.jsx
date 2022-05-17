import { message } from 'antd';

export const submitData = (data,main,dispatch) => {
    
        const { mainData,addonData,fileData  } = data;

        const formData = new FormData();
        formData.append('mainData', JSON.stringify( mainData));
        formData.append('addonData', JSON.stringify( addonData));
        fileData.forEach(file => {
            console.log(file)
            formData.append('files[]', file);
        });

        fetch(""+main+"/add_vehicles", {
        method: 'POST',
        body: formData,
        })
        .then(res => res.json())
        .then((results) => {
            console.log(results)
            message.success('upload successfully.');
            dispatch({type: 'set', refresh: true});
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