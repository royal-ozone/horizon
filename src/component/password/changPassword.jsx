import React,{useState, useEffect} from 'react';
import { connect} from 'react-redux';
import {useTranslation } from 'react-i18next';
import {useHistory} from 'react-router-dom';
import {Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
const Password = props => {
    return(
        <div>
            <p>Change Password </p>
        </div>
    )
}

const mapStateToProps = (state) => ({
    accountData:state.password?state.password:null
});
export default connect(mapStateToProps)(Password);