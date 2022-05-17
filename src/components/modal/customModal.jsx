import {
  Button,
  message,
  Modal,
} from 'antd';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useNavigate } from 'react-router-dom';

import AddonModal from './components/addonModal/addonModal';
import ReviewModal from './components/reviewModal/reviewModal';

const CustomModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const bookingReserveStartDate = useSelector((state) => state.bookingReserveStartDate);
    const bookingReserveEndDate = useSelector((state) => state.bookingReserveEndDate);
    const selectedAddon = useSelector((state) => state.selectedAddon);
    const tempSelectedAddon = useSelector((state) => state.tempSelectedAddon);
    const editSelectedAddon = useSelector((state) => state.editSelectedAddon);
    const modalData = useSelector((state) => state.modalData);
    const { visible,modalType} = modalData;
    const handleOk = () => {
    };

    const handleCancel = () => {
        dispatch({ type: 'setModal', visible: false })
    };

    const HandleBody = () =>{
        switch (modalType) {
            case 'review':
                return <ReviewModal modalData={modalData}/>
                break;
            case 'addon':
                return <AddonModal modalData={modalData}/>
                break;
            default:
                return null;
                break;
        }
    }

    const handleFooter = () => {
        switch (modalType) {
            case 'review':
                const { vehicleData } = modalData;
                if(bookingReserveStartDate && bookingReserveEndDate){
                    return [
                        <Button key="review-cancel">
                          Cancel
                        </Button>,
                        <Button key="review-continue" type="primary" loading={false} onClick={()=>{
                            dispatch({ type: 'set', modalData: {
                                visible: false,
                                modalType: false
                            }});
                            dispatch({ type: 'set', selectedVehicleData: {
                                reserveStartDate: bookingReserveStartDate,
                                reserveEndtDate: bookingReserveEndDate,
                                ...vehicleData
                            }});
                            navigate('/reserve', {replace:true});
                        }}>
                          Continue
                        </Button>,
                      ]
                }
                return [
                    <Button key="review-cancel">
                      Cancel
                    </Button>,
                ]
                break;
            case 'addon':
                const { addonData } = modalData;
                switch (tempSelectedAddon.length > 0) {
                    case true:
                        
                        switch (editSelectedAddon === true) {
                            case true:
                                // console.log(addonData)
                                let removedAddon = selectedAddon.filter((val)=>{
                                    return val.addonId !== addonData.id
                                });
                                return [
                                    <Button key="addon-cancel" onClick={()=>{
                                        dispatch({ type: 'setModal', visible: false })
                                        dispatch({ type: 'set', editSelectedAddon: false })
                                    }}>
                                      Cancel
                                    </Button>,
                                    <Button key="addon-continue" onClick={()=>{
                                        dispatch({ type: 'setModal', tab: '2'});
                                    }}>
                                      Continue
                                    </Button>,
                                    <Button type="primary" key="addon-attach" onClick={()=>{
                                        dispatch({ type: 'setModal', visible: false });
                                        dispatch({ type: 'set', selectedAddon: [
                                            ...removedAddon,
                                            {
                                                addonId: tempSelectedAddon[0].addonId,
                                                subAddonId: tempSelectedAddon[0].subAddonData.value
                                            }
                                        ]});
                                        dispatch({ type: 'set', tempSelectedAddon:[]});
                                        dispatch({ type: 'set', editSelectedAddon: false });
                                        message.success('Addon Edit');
                                    }}>
                                      Edit Addon
                                    </Button>,
                                ]
                                break;
                            case false:
                                return [
                                    <Button key="addon-cancel" onClick={()=>{
                                        dispatch({ type: 'setModal', visible: false })
                                    }}>
                                      Cancel
                                    </Button>,
                                    <Button key="addon-continue" onClick={()=>{
                                        dispatch({ type: 'setModal', tab: '2'});
                                    }}>
                                      Continue
                                    </Button>,
                                    <Button type="primary" key="addon-attach" onClick={()=>{
                                        dispatch({ type: 'setModal', visible: false });
                                        dispatch({ type: 'set', selectedAddon: [
                                            ...selectedAddon,
                                            {
                                                addonId: tempSelectedAddon[0].addonId,
                                                subAddonId: tempSelectedAddon[0].subAddonData.value
                                            }
                                        ]});
                                        dispatch({ type: 'set', tempSelectedAddon:[]});
                                        message.success('Addon Attached');
                                    }}>
                                      Attach To Form
                                    </Button>,
                                ]
                                break;
                        
                            default:
                                return null;
                                break;
                        }
                        break;
                    case false:
                        return [
                            <Button key="addon-cancel">
                              Cancel
                            </Button>,
                            <Button key="addon-continue" onClick={()=>{
                                dispatch({ type: 'setModal', tab: '2'});
                            }}>
                              Continue
                            </Button>,
                        ]
                        break;
                    default:
                        return null;
                        break;
                }
                break;
            default:
                return null;
                break;
        }
    }
    // console.log(modalData)
    return (
      <>
        <Modal
          visible={visible}
        //   title="Title"
            centered
          onOk={handleOk}
          onCancel={handleCancel}
          footer={handleFooter()}
          style={{maxHeight:'500px'}}
        >
          <HandleBody/>
        </Modal>
      </>
    );
}
export default CustomModal;