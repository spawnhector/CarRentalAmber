import { message } from 'antd';

export const submitData = (data,main) => {
        // console.log(data)

        const formData = new FormData();
        formData.append('data', JSON.stringify( data));

        fetch(""+main+"/reserve_vehicle", {
        method: 'POST',
        body: formData,
        })
        .then(res => res.json())
        .then((results) => {
            console.log(results)
            message.success('Vehicle Reserved.');
            // setIsLoading(false)
        })
        .catch(() => {
            // setIsLoading(false)
            message.error('error while reserving vehicle.');
        })
        .finally(() => {
            // setIsLoading(false)
        });
        
}