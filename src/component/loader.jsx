import React from "react";
import {Rings } from 'react-loader-spinner'

const Loader = ()=>{
    return(
        <div className="loader" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Rings color="#00BFFF" height={200} width={200} />
        </div>        
    )
}

export default Loader