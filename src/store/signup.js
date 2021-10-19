import axios from 'axios';

import { createSlice, current } from "@reduxjs/toolkit";

let signup = createSlice({
    name: 'signup',
    initialState: {},
    reducers:{
        addUser(state,action){
     
            return action.payload 
        }
    }

})

export const signupHandler = (payload) => (dispatch,state) => {
    
    let API = 'http://localhost:5000/auth/signup';
    console.log("🚀 ~ file: signup.js ~ line 19 ~ signupHandler ~ payload", payload)
    
    return axios({
        method: 'post',
        url: API,
        data: payload
    })
    .then(res => {
  console.log("🚀 ~ file: signup.js ~ line 28 ~ signupHandler ~ res", res.data)
    dispatch(addUser(res.data));
   })
   .catch(err => {throw new Error(err.message)});
}

export default signup.reducer 
export const {addUser} = signup.actions

