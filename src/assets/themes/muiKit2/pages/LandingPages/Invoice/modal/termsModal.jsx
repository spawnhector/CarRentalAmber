import './style.scss';

import { useEffect, useRef } from 'react';

import {
  Button,
  Checkbox,
  Form,
  Input,
  Progress,
  message,
  notification
} from 'antd';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NewlineText from 'src/components/text/newLine';

import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
} from '@coreui/react-pro';
import {
  Box,
  Grid,
  Typography,
} from '@mui/material';

import Signature from './signature/signature';
import terms from './terms';

const TermsModal = () => {
    
    const dispatch = useDispatch();
    const termsModalData = useSelector((state) => state.termsModalData);
    const {visible,modalData} = termsModalData;
    const {step,completedSteps,progress} = modalData;
    let stepCheck = completedSteps.filter((val)=>{
        return val !== ''
    });


    // console.log(stepCheck)
    const onFinish = (values) => {
        // console.log('Success:', values);
        dispatch({type: 'set', termsModalData:{
            ...termsModalData,
            visible: false,
            modalData: {
                ...modalData,
                data: values
            }
        }})
    };

    const handleCheckBoxChange = (e) => {
        // console.log()
        if(e.target.checked){
            dispatch({type: 'set', termsModalData:{
                ...termsModalData,
                modalData: {
                    ...modalData,
                    step: 5,
                    completedSteps : [
                        ...stepCheck,
                        completedSteps.includes(4) ? '' : 4
                    ]
                }
            }});
        }else{
            dispatch({type: 'set', termsModalData:{
                ...termsModalData,
                modalData: {
                    ...modalData,
                    step: 5,
                    completedSteps : completedSteps.includes(4) ? stepCheck.filter((val)=>{return val !== 4}) : [...stepCheck]
                }
            }});
        }
    }

    const handleStep = (step) => {
        let allSteps  = [1,2,3,4];

        if(stepCheck.includes(step)){
            allSteps.filter((val)=>{ return val !== step});
            return 'step'
        }
        let activeStep = Math.min(...allSteps)
        
        return activeStep && step ? 'active step' : 'step';

    }
    return(
        <CModal size='lg' backdrop='static' visible={visible} onClose={() => dispatch({type: 'set', termsModalData:{
            ...termsModalData,
            visible: false
        }})}>
            <CModalBody>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Typography
                                variant="h5"
                                // color="white"
                                sx={{mt:2}}
                                
                            >
                                RENTAL AGREEMENT TERMS AND CONDITION
                            </Typography>
                            <Progress
                            strokeColor={{
                                from: '#108ee9',
                                to: '#87d068',
                            }}
                            percent={stepCheck.length * 25}
                            status="active"
                            />
                            <div className="ui vertical steps">
                            <div className={handleStep(1)}>
                                {/* <i className="truck icon"></i> */}
                                <div className="content">
                                <div className="title">Read Terms & Condition</div>
                                <div className="description">Please read and agree to the terms and conditions</div>
                                </div>
                            </div>
                            <div className={handleStep(2)}>
                                {/* <i className="credit card icon"></i> */}
                                <div className="content">
                                <div className="title">Fill In Full Name</div>
                                <div className="description">Name of user agreeing to terms and condition</div>
                                </div>
                            </div>
                            <div className={handleStep(3)}>
                                {/* <i className="credit card icon"></i> */}
                                <div className="content">
                                <div className="title">Sign Your Signature</div>
                                <div className="description">Sign electric signature below</div>
                                </div>
                            </div>
                            <div className={handleStep(4)}>
                                {/* <i className="info icon"></i> */}
                                <div className="content">
                                <div className="title">Select Consent</div>
                                <div className="description">Select electric signature consent</div>
                                </div>
                            </div>
                            </div>

                        </Grid>
                        <Grid item xs={8}>
                            <Typography
                                variant="h5"
                                // color="white"
                                sx={{mt:2}}
                                
                            >
                                RENTAL AGREEMENT TERMS AND CONDITIONS TIMELESS (MOBAY) CAR RENTAL
                            </Typography>
                            <div>
                                <NewlineText text={terms}/>
                                <Form
                                name="termsForm"
                                labelCol={{
                                    span: 8,
                                }}
                                wrapperCol={{
                                    span: 16,
                                }}
                                onFinish={onFinish}
                                // initialValues={{
                                //     trimmedDataURL: {}
                                //   }}
                                autoComplete="off"
                                >
                                <Form.Item
                                    label="Full Name"
                                    name="fullname"
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Please input your full name!',
                                    },
                                    ]}
                                >
                                    <Input onChange={()=>{
                                        dispatch({type: 'set', termsModalData:{
                                            ...termsModalData,
                                            modalData: {
                                                ...modalData,
                                                step: 3,
                                                completedSteps : [
                                                    ...stepCheck,
                                                    completedSteps.includes(2) ? '' : 2
                                                ]
                                            }
                                        }});
                                        // message.success('Step Two Completed')
                                    }}/>
                                </Form.Item>

                                <Form.Item
                                    // label="Signature"
                                    name="trimmedDataURL"
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Please input your signature!',
                                    },
                                    ]}
                                >
                                <Signature/>
                                </Form.Item>
                                <Form.Item
                                    name="signature_consent"
                                    valuePropName="checked"
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Please agree to electric consent!',
                                    },
                                    ]}
                                >
                                    <Checkbox onChange={handleCheckBoxChange}>
                                        <Typography variant='body1'>Electric Signature Consent</Typography>
                                    </Checkbox>
                                </Form.Item>
                                </Form>
                                <span style={{fontSize: '13px'}}>
                                By checking here, you acknowledge you have read and understand the above terms, and are consenting to the use of your electronic signature in lieu of an original signature on paper. You have the right to request that you sign a paper copy instead. By checking here, you are waiving that right. After consent, you may, upon written request to us, obtain a paper copy of an electronic record. No fee will be charged for such copy and no special hardware or software is required to view it. Your agreement to use an electronic signature with us for any documents will continue until such time as you notify us in writing that you no longer wish to use an electronic signature. There is no penalty for withdrawing your consent. You should always make sure that we have a current email address in order to contact you regarding any changes, if necessary.
                                </span>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={() => dispatch({type: 'set', termsModalData:{
                    ...termsModalData,
                    visible: false
                }})}>
                Close
                </CButton>
                {stepCheck.length === 4 && (
                    <Button form="termsForm" key="submit" type="primary" size="large" htmlType="submit">
                        Submit
                    </Button>
                )}
            </CModalFooter>
        </CModal>
    )
}
export default TermsModal;