import React,{useState, useEffect} from 'react';
import { connect} from 'react-redux';
import {useTranslation } from 'react-i18next';
import {useHistory} from 'react-router-dom';
import {Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
const Address = props => {
    return(
        <div>
            <p>Address </p>
        </div>
    )
}

const mapStateToProps = (state) => ({
    accountData:state.address?state.address:null
});
export default connect(mapStateToProps)(Address);