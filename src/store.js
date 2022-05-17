import { createStore } from 'redux';

const initialState = {
  loading: false,
  success: false,
  refresh: false,
  sidebarShow: true,
  modalData: {
    visible: false,
    modalType: false
  },
  termsModalData: {
    visible: false,
    modalData: {
      step: 2,
      completedSteps: [1],
      progress: 25,
      data: false
    }
  },
  selectedVehicleData:  false,
  carFilter: {
    active: false,
    filterType: [],
    filterData:[]
  },
  selectedAddon: [],
  tempSelectedAddon: [],
  editSelectedAddon: false,
  bookingReserveStartDate: false,
  bookingReserveEndDate: false,
  reserveVehicleData: {
    booking_total: 0,
    booking_subTotal: 0,
    booking_after_tax: 0,
    reserveForm: false,
  },
  visibleEditVehicle: {
    active: false,
    modalId: false
},
  REACT_APP_BACKEND_ENPOINT: 'https://api.epiccarrentalsja.com/api',
  REACT_APP_BACKEND_ENPOINT_NOAPI: 'https://api.epiccarrentalsja.com'
}

const changeState = (state = initialState, { type,...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    case 'setModal':
      return {
        ...state,
        modalData: {
          ...state.modalData,
          ...rest
        }
      }
    case 'filter':
      return { ...state, ...rest }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store
