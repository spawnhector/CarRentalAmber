import * as React from 'react';

import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  FileAddOutlined,
  MailOutlined,
} from '@ant-design/icons';
import {
  Box,
  Fab,
  Grid,
  styled,
} from '@mui/material';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

// Material Kit 2 React components
import MKBox from '../../../components/MKBox';
import MKTypography from '../../../components/MKTypography';
import DefaultFooter from '../../../examples/Footers/DefaultFooter';
// Material Kit 2 React examples
import DefaultNavbar from '../../../examples/Navbars/DefaultNavbar';
import footerRoutes from '../../../footer.routes';
// Routes
import routes from '../../../routes';
import TermsModal from './modal/termsModal';
import { ReserveVehicle } from 'src/services/ReserveService';
import { submitData } from './handler/submitData';
import { numOfDays } from 'src/utils/cost_time';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
const InvoicePage = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const termsModalData = useSelector((state) => state.termsModalData);
    const reserveVehicleData = useSelector((state) => state.reserveVehicleData);
    const loading = useSelector((state) => state.loading);
    const success = useSelector((state) => state.success);
    const main = useSelector((state) => state.REACT_APP_BACKEND_ENPOINT);
    const {modalData} = termsModalData;
    const {data} = modalData;

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        // textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const buttonSx = {
        ...(success && {
          bgcolor: green[500],
          '&:hover': {
            bgcolor: green[700],
          },
        }),
      };

    const handleReserve = (data) => {
        
        dispatch({type: 'set', loading:true});
        dispatch({type: 'set', success:false});
        let reserveVehicleDataFix = {
            ...reserveVehicleData,
            booking_days:numOfDays(reserveVehicleData.bookingReserveStartDate,reserveVehicleData.bookingReserveEndDate),
            data
        }

        const formData = new FormData();
        formData.append('data', JSON.stringify( reserveVehicleDataFix));

        fetch(""+main+"/reserve_vehicle", {
        method: 'POST',
        body: formData,
        })
        .then(res => res.json())
        .then((results) => {
            // console.log(results)
            dispatch({type: 'set', loading:false});
            dispatch({type: 'set', success:true});
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
        // submitData(reserveVehicleDataFix,main)
    }

    React.useEffect(()=>{
        data && handleReserve(data)
    },[data]);

    return (
        <>
            <DefaultNavbar
            routes={routes}
            // transparent
            // light
            />
            <Layout>
                <Content 
                style={{
                    background:'white',
                    margin: '100px',
                    padding: '30px',
                    background: 'white',
                    borderRadius: '10px'
                }}>
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="success">Booking details pending — please read and complete the document below!</Alert>
                    </Stack>
                    <MKTypography
                        variant="h2"
                        // color="white"
                        sx={{mt:2}}
                        
                    >
                        Required Documents
                    </MKTypography>
                    
                    <div className="ui  segment">
                        <div className="ui two column stackable  grid">
                            <div className="ui vertical divider">.</div>
                            <div className="row">
                                <div className="column">
                                    <div className="ui vertical segment">
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={2}>
                                                    <Item elevation={0}>
                                                        <FileAddOutlined style={{
                                                            fontSize: '60px'
                                                        }}/>
                                                    </Item>
                                                </Grid>
                                                <Grid item xs={8}>
                                                <Item elevation={0}>
                                                    <MKTypography
                                                        variant="h5"
                                                        // sx={{mt:2}}
                                                        
                                                    >
                                                        Rental Agreement Terms And Condition
                                                    </MKTypography>
                                                    <MKTypography
                                                        variant="h6"
                                                        sx={{mt:2}}
                                                        
                                                    >
                                                        Required for the following item(s) in your booking: 
                                                    </MKTypography>
                                                    <div className="ui buttons">
                                                        <button className="ui button" onClick={() => dispatch({type: 'set', termsModalData:{
                                                            ...termsModalData,
                                                            visible: true
                                                        }})}>Fill Out Document</button>
                                                        <div className="or"></div>
                                                        <button className="ui positive button">Share Link</button>
                                                    </div>
                                                </Item>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </div>
                                    <div className="ui vertical segment">
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={2}>
                                                    <Item elevation={0}>
                                                        <MailOutlined style={{
                                                            fontSize: '60px'
                                                        }}/>
                                                    </Item>
                                                </Grid>
                                                <Grid item xs={8}>
                                                <Item elevation={0}>
                                                    <MKTypography
                                                        variant="h6"
                                                        sx={{mt:2}}
                                                        
                                                    >
                                                        Email these documents to other participants
                                                    </MKTypography>
                                                </Item>
                                                    <button className="ui right labeled icon button" style={{
                                                        width: '100%',
                                                        paddingBottom: '19px'}}>
                                                        <span>Email Participants</span>
                                                        <i className="mail icon"></i>
                                                    </button>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </div>
                                </div>
                                <div className="column">
                                <Layout style={{
                                    background:'white',
                                    height: '100%',
                                    justifyContent: 'center',
                                    // alignItems: 'center'
                                    padding: '20px'
                                }}>
                                    <Content style={{position:'absolute'}}>
                                        <MKTypography
                                            variant="h5"
                                            sx={{mt:2}}
                                            
                                        >
                                            Rental Agreement Terms & Condition.
                                        </MKTypography>
                                        {
                                            loading || success ? (
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <MKTypography
                                                        variant="body1"
                                                        sx={{mt:2}}
                                                        
                                                    >
                                                        No documents filled out yet
                                                    </MKTypography>
                                                    <Box sx={{ m: 1, position: 'relative' }}>
                                                        <Fab
                                                        aria-label="save"
                                                        color="primary"
                                                        sx={buttonSx}
                                                        // onClick={handleButtonClick}
                                                        >
                                                        {success ? <CheckIcon /> : <SaveIcon />}
                                                        </Fab>
                                                        {loading && (
                                                        <CircularProgress
                                                            size={68}
                                                            sx={{
                                                            color: green[500],
                                                            position: 'absolute',
                                                            top: -6,
                                                            left: -6,
                                                            zIndex: 1,
                                                            }}
                                                        />
                                                        )}
                                                    </Box>
                                                </Box>
                                            ) : null
                                        }
                                    </Content> 
                                </Layout>
                                </div>
                            </div>
                        </div>
                    </div>
                </Content>
            </Layout>
            <MKBox pt={6} px={1} mt={6}>
                <DefaultFooter content={footerRoutes} />
            </MKBox>
            <TermsModal/>
        </>
    )
}
export default InvoicePage;