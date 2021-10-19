import axios from 'axios';

import { createSlice, current } from "@reduxjs/toolkit";

let signInWithGoogle = createSlice({
    name: 'signInWithGoogle',
    initialState: {},
    reducers:{
        addUserWithGoogle(state,action){
        
            
            return action.payload 
        }
    }

})

export const signInHandlerWithGoogle = (payload) => (dispatch,state) => {

    
    let API = `http://localhost:5000/auth/google/callback${payload}`;
    
    
    return axios({
        method: 'get',
        url: API,
    }
   
    )
    .then(res => {
    dispatch(addUserWithGoogle(res.data));
   })
   .catch(e=>{throw new Error(e.message);});
}

export default signInWithGoogle.reducer 
export const {addUserWithGoogle} = signInWithGoogle.actions