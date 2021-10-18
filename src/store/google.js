import axios from 'axios';

import { createSlice } from "@reduxjs/toolkit";

let signInWithGoogle = createSlice({
    name: 'signInWithGoogle',
    initialState: {},
    reducers:{
        addUserWithGoogle(state,action){
        
            
            return state 
        }
    }

})

export const signInHandlerWithGoogle = () => (dispatch,state) => {

    
    let API = 'http://localhost:5000/auth/google/callback';
    
    
    return axios({
        method: 'get',
        url: API,
       
    }
   
    )
    .then(res => {
    console.log("🚀 ~ file: google.js ~ line 32 ~ signInHandlerWithGoogle ~ res", res)
    

    dispatch(addUserWithGoogle(res.data));
   })
   .catch(e=>{throw new Error(e.message);});
}

export default signInWithGoogle.reducer 
export const {addUserWithGoogle} = signInWithGoogle.actions