import axios from 'axios';

import { createSlice } from "@reduxjs/toolkit";

let signup = createSlice({
    name: 'signup',
    initialState: {},
    reducers:{
        addUser(state,action){
        console.log("🚀 ~ file: signup.js ~ line 10 ~ addUser ~ state", state)
            
            return state 
        }
    }

})

export const signupHandler = (payload) => (dispatch,state) => {
    
    let API = 'http://localhost:5000/api/v1/signup';
    console.log("🚀 ~ file: signup.js ~ line 19 ~ signupHandler ~ payload", payload)
    
    return axios({
        method: 'post',
        url: API,
        data: payload
    })
    .then(res => {
  console.log("🚀 ~ file: signup.js ~ line 28 ~ signupHandler ~ res", res)
    dispatch(addUser(res.data));
   })
}

export default signup.reducer 
export const {addUser} = signup.actions

