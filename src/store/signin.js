import axios from 'axios';

import { createSlice } from "@reduxjs/toolkit";

let signIn = createSlice({
    name: 'signIn',
    initialState: {},
    reducers:{
        getUser(state,action){
        
            
            return state 
        }
    }

})

export const signInHandler = (payload) => (dispatch,state) => {
console.log("🚀 ~ file: signin.js ~ line 19 ~ signInHandler ~ payload", payload)
    
    let API = 'http://localhost:5000/api/v1/signin';
    
    
    return axios({
        method: 'post',
        url: API,
        data: payload,
          headers:{Authorization:` Basic ${btoa(`${payload.email}:${payload.password}`)}`}

    }
   
    )
    .then(res => {
    console.log("🚀 ~ file: signin.js ~ line 29 ~ signInHandler ~ res", res)

    dispatch(getUser(res.data));
   })
   .catch(e=> console.log(e.message));
}

export default signIn.reducer 
export const {getUser} = signIn.actions

