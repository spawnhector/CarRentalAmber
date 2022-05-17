import {
  CCol,
  CFormInput,
  CRow,
} from '@coreui/react-pro';

export const TableItem = ({item}) => {
    return (
        <CRow>
        <CCol xs={6}>
            <CFormInput placeholder="First name" aria-label="First name"/>
        </CCol>
        <CCol xs={6}>
            <CFormInput placeholder="Last name" aria-label="Last name"/>
        </CCol>
        </CRow>
    )
}