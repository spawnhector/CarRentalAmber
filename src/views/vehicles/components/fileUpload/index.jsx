// import {
//   Button,
//   Form,
//   Spin,
//   Upload,
// } from 'antd';
// import ImgCrop from 'antd-img-crop';
// import { useSelector } from 'react-redux';

// import {
//   InboxOutlined,
//   UploadOutlined,
// } from '@ant-design/icons';

// const normFile = (e) => {
//     console.log('Upload event:', e);
  
//     if (Array.isArray(e)) {
//       return e;
//     }
  
//     return e && e.fileList;
// };
// export default function FileUpload(){
    
//     const main = useSelector((state) => state.REACT_APP_BACKEND_ENPOINT);
//     return (
//         <Form
//             name="formAddvehicleAddon"
//         >
//             <Form.Item
//                 name="upload"
//                 label="Upload"
//                 valuePropName="fileList"
//                 getValueFromEvent={normFile}
//                 extra="Upload Image/Video"
//             >
//                 <Upload name="logo" action="/upload.do" listType="picture">
//                 <Button icon={<UploadOutlined />}>Click to upload</Button>
//                 </Upload>
//             </Form.Item>

//             <Form.Item >
//                 <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
//                 <ImgCrop rotate>
//                 <Upload.Dragger 
//                     name="files"
//                     // customRequest={()=>{
//                     //     var myHeaders = new Headers();
//                     //     myHeaders.append("Accept", "application/json");

//                     //     var formdata = new FormData();
//                     //     formdata.append("email", "admin@gmail.com");
//                     //     formdata.append("password", "password");

//                     //     var requestOptions = {
//                     //     method: 'POST',
//                     //     headers: myHeaders,
//                     //     redirect: 'follow'
//                     //     };

//                     //     fetch(""+main+"/file_upload", requestOptions)
//                     //     .then(response => response.text())
//                     //     .then(result => console.log(result))
//                     //     .catch(error => console.log('error', error));
//                     // }}
//                     // action={""+main+"/file_upload"}
//                     listType="picture-card"
//                     iconRender={()=>{
//                         return <Spin></Spin>
//                     }}
//                 >
//                     <p className="ant-upload-drag-icon">
//                     <InboxOutlined />
//                     </p>
//                     <p className="ant-upload-text">Click or drag file to this area to upload</p>
//                     <p className="ant-upload-hint">Support for a single or bulk upload.</p>
//                 </Upload.Dragger>
//                 </ImgCrop>
//                 </Form.Item>
//             </Form.Item>
//         </Form>
//     )
// }

import React, { useState } from 'react';

import {
  Form,
  Input,
  Upload,
} from 'antd';

import { InboxOutlined } from '@ant-design/icons';

const { Search } = Input

const FileUpload =({setVehicleData,edit}) => {
  
  const [state,setState] = useState({
    fileList: edit ? edit.files : [],
    uploading: false,
    urlLoader: false,
    urlString: ''
  });

    const { uploading, fileList } = state;
    const props = {
      onRemove: file => {
        const index = state.fileList.indexOf(file);
        const newFileList = state.fileList.slice();
        newFileList.splice(index, 1);
        setState(state => {
          return {
              ...state,
            fileList: newFileList,
          };
        });
        setVehicleData(prev =>{
            return {
                ...prev,
                fileData: newFileList,
            }
        });
      },
      beforeUpload: file => {
        setState(state => {return {
            ...state,
          fileList: [...state.fileList, file],
        }});
        setVehicleData(prev =>{
            return {
                ...prev,
                fileData: [
                    ...prev.fileData,
                    file
                ]
            }
        });
        return false;
      },
      fileList,
    };

    const onSearch = (val) => {
      setState({
        ...state,
        urlString: val
      })
    }
    // console.log(state.urlString)
    return (
      <>
      <Form
          name="formAddvehiclefile"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          autoComplete="off"
          layout="vertical"
      >
        <Form.Item
        label="Vehicle File"
        name="vehicle_file"
        rules={[{ required: true, message: 'Please input vehicle name!' }]}
        >
        {/* <Search
        addonBefore="https://"
        placeholder="search the web"
        allowClear
        onSearch={onSearch}
        style={{ width: 304 ,marginBottom: '30px'}}
        />

          <iframe src={'https://'+state.urlString}
              frameBorder='0'
              allow='autoplay; encrypted-media'
              allowFullScreen
              title='video'
              onLoad={()=> setState({
                ...state,
                urlLoader:true
              })}
          /> */}

        <Upload.Dragger
        
        listType="picture"  
        {...props}>
            <p className="ant-upload-drag-icon">
            <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
        </Upload.Dragger>
        {/* <Button
          type="primary"
          onClick={handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? 'Uploading' : 'Start Upload'}
        </Button> */}
        </Form.Item>
        </Form>
      </>
    );
}

export default FileUpload;