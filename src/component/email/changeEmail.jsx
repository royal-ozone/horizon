import React,{useState, useEffect} from 'react';
import { connect} from 'react-redux';
import {useTranslation } from 'react-i18next';
import {useHistory} from 'react-router-dom';
import {Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
const Email = props => {
    return(
        <div>
            <p>Change Email 5555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555</p>
        </div>
    )
}

const mapStateToProps = (state) => ({
    accountData:state.email?state.email:null
});
export default connect(mapStateToProps)(Email);