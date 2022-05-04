import React from 'react'
import {
  CButton,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CLink,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMagnifyingGlass } from '@coreui/icons'

const PageInvalidToken = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <div className="clearfix">
              <h1 className="float-start display-3 me-4">404</h1>
              <h4 className="pt-3">Oops! You{"'"}re lost.</h4>
              <p className="text-medium-emphasis float-start">
                The page you are looking for was not found please Sign in again.
              </p>
            </div>
            {/* <CInputGroup className="input-prepend">
              <CInputGroupText>
                <CIcon icon={cilMagnifyingGlass} />
              </CInputGroupText>
              <CFormInput type="text" placeholder="What are you looking for?" />
              <CButton color="info">Search</CButton>
            </CInputGroup> */}
            <CLink href="/signIn"> Sign In </CLink> 
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default PageInvalidToken