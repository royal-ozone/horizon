import React, { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { getOrderHandler, getOrderLogs } from '../../store/order'
import { CCard, CCardHeader, CCardTitle, CCardText, CButton, CCardBody, CRow, CCol, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CSpinner } from '@coreui/react'
export const Orders = ({ getOrderHandler, getOrderLogs }) => {
  const { orders: { data, count }, logs } = useSelector(state => state.order)
  const [visible, setVisible] = useState(false)
  const [modalLoading, setModalLoading] = useState(true)
  useEffect(() => {
    getOrderHandler()
  }, [])
  useEffect(() => {
    console.log("🚀 ~ file: Orders.jsx ~ line 12 ~ Orders ~ data", logs)

  }, [logs])
  const logsModal = (id) => {
    Promise.all([getOrderLogs(id)]).then(() => setModalLoading(false));
    setVisible(!visible)
  }
  const styles = {
    maxWidth: '90%',
    margin: '1rem auto',
  }
  const onCloseModal = () =>{
    setVisible(false)
    setModalLoading(true)
  }
 
  return (
    <div>
      <CModal alignment="center" visible={visible} onClose={onCloseModal }>
        <CModalHeader>
          <CModalTitle>order tracking</CModalTitle>
        </CModalHeader>
        {modalLoading ? <CSpinner /> :
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">
                  status
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">
                  date
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {logs.map(log =>
                <CTableRow key={log.id}>
                  <CTableDataCell>{log.status}</CTableDataCell>
                  <CTableDataCell>{new Date(log.at).toLocaleString()}</CTableDataCell>
                </CTableRow>
              )
              }
            </CTableBody>
          </CTable>}
        <CModalFooter>
          <CButton color="secondary" onClick={onCloseModal}>
            Close
          </CButton>
          
        </CModalFooter>
      </CModal>
      <CRow xs={{ gutterY: 5 }}>
         {React.Children.toArray(data.map(({ id, customer_order_id, grand_total, payment_method, status, address: { first_name, last_name }, created_at }) =>
          <CCol xl={12} >
            <CCard>
              <CCardHeader component="h5">order# {customer_order_id}</CCardHeader>
              <CCardBody >
                <CRow >
                  <CCol xl={4}>

                    <CCardTitle>{`shipped to: ${first_name} ${last_name}`}</CCardTitle>
                  </CCol>
                  <CCol xl={4}>
                    <CCardTitle>{`price: ${grand_total}`} </CCardTitle>

                  </CCol>
                  <CCol xl={4}>
                    <CCardTitle>status: {status} </CCardTitle>

                  </CCol>
                  <hr style={styles} />
                  <CCol xl={4}>
                    <CCardTitle>{`Placed At: ${created_at.split('T')[0]}`}</CCardTitle>
                  </CCol>
                  <CCol xl={4}>
                    <CCardTitle>{`Payment Method: ${payment_method}`}</CCardTitle>
                  </CCol>

                  <hr style={styles} />
                </CRow>
                <CButton href="#">order details</CButton>
                <CButton color="secondary" onClick={() => logsModal(id)}>order tracking</CButton>
              </CCardBody>
            </CCard>
          </CCol>
        )
        )}
      </CRow>
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = { getOrderHandler, getOrderLogs }

export default connect(mapStateToProps, mapDispatchToProps)(Orders)