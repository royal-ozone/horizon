import React,{useState, useEffect} from 'react';
import { connect} from 'react-redux';
import {useTranslation } from 'react-i18next';
import {useHistory} from 'react-router-dom';
import {Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
const Account = props => {
    return(
        <div>
            <p>Account </p>
        </div>
    )
}

const mapStateToProps = (state) => ({
    accountData:state.editProfile?state.editProfile:null
});
export default connect(mapStateToProps)(Account);