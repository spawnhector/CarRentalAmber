import React, { useState } from 'react';

import {
  Button,
  InputNumber,
  List,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';

import SubDeleteConfirm from './deleteConfirm/subDeleteConfirm';

const isActive = (editData,index,subOwner) => {
    return editData.active && editData.type === 'sub' && editData.subOwner === subOwner && editData.subId === index ? true : false;
}
export default function SubAddonList({
    data,
    subOwner,
    addons,
    setAttachedAddon,
    edit
}){
    const [editData,setEditData] = useState({
        active: false,
        type: '',
        subId: '',
        subOwner: '',
        editData: {
            title: false,
            price: false
        }
    });

    const handleEditClick = (index)=> {
        setEditData(prev=>{
            return {
                ...prev,
                active: true,
                type: 'sub',
                subId: index,
                subOwner: subOwner,
            }
        })
    }

    const handleEditTitleChange = (e)=> {
        setEditData(prev=>{
            return {
                ...prev,
                editData: {
                    ...prev.editData,
                    title: e.target.value
                }
            }
        })
   }

    const handleEditPriceChange = (value) => {
        setEditData(prev=>{
            return {
                ...prev,
                editData: {
                    ...prev.editData,
                    price: value
                }
            }
        })
    }

    const handleSaveClick = () => {
        console.log(subOwner)
        addons.map((val,index)=>{
            if(val.title === subOwner){
                if(val.subAddon){
                    val.subAddon.map((subs,subindex)=>{
                        if (subindex ===  editData.subId) {
                            subs.title = editData.editData.title
                            subs.price = editData.editData.price
                            setAttachedAddon(addons);
                            setEditData({
                                active: false,
                                type: '',
                                subId: '',
                                subOwner: '',
                                editData: {
                                    title: false,
                                    price: false
                                }
                            })
                        }
                    })
                }
                if(val.sub_addons){
                    val.sub_addons.map((subs,subindex)=>{
                        if (subindex ===  editData.subId) {
                            subs.title = editData.editData.title
                            subs.price = editData.editData.price
                            setAttachedAddon(addons);
                            setEditData({
                                active: false,
                                type: '',
                                subId: '',
                                subOwner: '',
                                editData: {
                                    title: false,
                                    price: false
                                }
                            })
                        }
                    })
                }
            }
        })
        
    }

    const handleCancelClick = ( ) => {
        setEditData({
            active: false,
            type: '',
            subId: '',
            subOwner: '',
            editData: {
                title: false,
                price: false
            }
        })
    }

   

    return edit ? (
        <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item,index) => {

                // console.log(editData)S
                const IsEditActiveButtonOption = () => {
                    let saveKey = `list-${item.title}-save`;
                    let cancelKey = `list-${item.title}-cancel`;
                    let editKey = `list-${item.title}-edit`;
                    return isActive(editData,index,subOwner) === true ? (<><Button key={saveKey} onClick={()=>handleSaveClick()}>save</Button><Button key={cancelKey} onClick={()=>handleCancelClick()}>cancel</Button></>) : (<a  key={editKey} onClick={()=>handleEditClick(index)}>edit</a>)
                }

                const ActiveTitleChange = () => {

                    return isActive(editData,index,subOwner) ? (
                        <>  
                            <TextArea
                                value={editData.editData.title !== false  ? editData.editData.title : item.title}
                                onChange={(e)=>handleEditTitleChange(e)}
                                // placeholder="Controlled autosize"
                                autoSize={{ minRows: 2, maxRows: 3 }}
                                key={item.title+'-edit-input'}
                                // bordered={false}
                            />
                        </>
                    ) : (<span>{item.title}</span>);
                }
                const ActivePriceChange = () => {
                    // console.log(item)
                    return isActive(editData,index,subOwner) ? (
                        <>  
                            <span>Cost $ </span>
                            <InputNumber
                                value={editData.editData.price !== false  ? editData.editData.price : item.rate || item.price}
                                onChange={handleEditPriceChange}
                            />
                        </>
                    ) : item.price ? 'Cost $'+item.price : 'Cost $'+item.rate;
                }

                let removeKey = `list-${item.title}-remove`;
                return(
                    <List.Item
                    actions={[<IsEditActiveButtonOption/>, <SubDeleteConfirm index={index} setAttachedAddon={setAttachedAddon} subOwner={subOwner}/>]}
                    >
                        <List.Item.Meta
                        avatar={'-'}
                        title={ActiveTitleChange()}
                        description={ActivePriceChange()}
                        />
                    </List.Item>
                )}
            }
        />
    ) : (
        <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item,index) => {

                // console.log(editData)S
                const IsEditActiveButtonOption = () => {
                    let saveKey = `list-${item.title}-save`;
                    let cancelKey = `list-${item.title}-cancel`;
                    let editKey = `list-${item.title}-edit`;
                    return isActive(editData,index,subOwner) === true ? (<><Button key={saveKey} onClick={()=>handleSaveClick()}>save</Button><Button key={cancelKey} onClick={()=>handleCancelClick()}>cancel</Button></>) : (<a  key={editKey} onClick={()=>handleEditClick(index)}>edit</a>)
                }

                const ActiveTitleChange = () => {

                    return isActive(editData,index,subOwner) ? (
                        <>  
                            <TextArea
                                value={editData.editData.title !== false  ? editData.editData.title : item.title}
                                onChange={(e)=>handleEditTitleChange(e)}
                                // placeholder="Controlled autosize"
                                autoSize={{ minRows: 2, maxRows: 3 }}
                                key={item.title+'-edit-input'}
                                // bordered={false}
                            />
                        </>
                    ) : (<span>{item.title}</span>);
                }
                const ActivePriceChange = () => {
                    console.log(item)
                    return isActive(editData,index,subOwner) ? (
                        <>  
                            <span>Cost $ </span>
                            <InputNumber
                                value={editData.editData.price !== false  ? editData.editData.price : item.price}
                                onChange={handleEditPriceChange}
                            />
                        </>
                    ) : 'Cost $'+item.price;
                }

                let removeKey = `list-${item.title}-remove`;
                return(
                    <List.Item
                    actions={[<IsEditActiveButtonOption/>, <SubDeleteConfirm index={index} setAttachedAddon={setAttachedAddon} subOwner={subOwner}/>]}
                    >
                        <List.Item.Meta
                        avatar={'-'}
                        title={ActiveTitleChange()}
                        description={ActivePriceChange()}
                        />
                    </List.Item>
                )}
            }
        />
    )
};