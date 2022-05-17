import React, { useState } from 'react';
import { Component } from 'react'
import { Button } from 'antd';
import SignaturePad from 'react-signature-canvas';

import SignatureCanvas from 'react-signature-canvas'
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';

const Signature =({ value = {}, onChange })=>{
  
  const dispatch = useDispatch();
  const termsModalData = useSelector((state) => state.termsModalData);
  const {modalData} = termsModalData;
  const {completedSteps} = modalData;
  const [trimmedDataURL,setTrimmedDataURL] = useState(false)
  const [showSubmit,setShowSubmit] = useState(false);
  let stepCheck = completedSteps.filter((val)=>{
      return val !== ''
  });
  
  
  const triggerChange = (changedValue) => {
    // console.log('no')
    onChange?.({
      trimmedDataURL,
      ...value,
      ...changedValue,
    });
};

  let sigPad = {}

  const clear = () => {
    sigPad.clear()
  }

  const trim = () => {
    setTrimmedDataURL({trimmedDataURL: sigPad.getTrimmedCanvas()
      .toDataURL('image/png')});

    triggerChange({
      trimmedDataURL: sigPad.getTrimmedCanvas()
        .toDataURL('image/png')
    });
  }
  
    return  <>
      <SignatureCanvas 
      penColor='green'
      canvasProps={{width: 500, height: 200, className: styles.container}} 
      ref={(ref) => { sigPad = ref }}
      onBegin={()=>{
        setShowSubmit(true)
      }}
      />
    <div>
      {
        showSubmit ? (
          <>
            <Button className={styles.buttons} onClick={clear}>
              Clear
            </Button>
            <Button className={styles.buttons} onClick={()=>{
              trim();
              dispatch({type: 'set', termsModalData:{
                  ...termsModalData,
                  modalData: {
                      ...modalData,
                      step: 3,
                      completedSteps : [
                          ...stepCheck,
                          completedSteps.includes(3) ? '' : 3
                      ]
                  }
              }});
              
            }}>
              Attach To Form
            </Button>
            {
              trimmedDataURL && (
                <Button className={styles.buttons} onClick={()=>{
                  setTrimmedDataURL(false)
                  triggerChange('');
                  dispatch({type: 'set', termsModalData:{
                      ...termsModalData,
                      modalData: {
                          ...modalData,
                          step: 3,
                          completedSteps : completedSteps.includes(3) ? stepCheck.filter((val)=>{return val !== 3}) : [...stepCheck]
                      }
                  }});
                }}>
                  Remove 
                </Button>)
            }
          </>
        ) : null
      }
    </div>
    </>
  
}

export default Signature;
