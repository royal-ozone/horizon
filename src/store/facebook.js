import axios from 'axios';

import { createSlice, current } from "@reduxjs/toolkit";

let signInWithFacebook = createSlice({
    name: 'signInWithFacebook',
    initialState: {},
    reducers:{
        addUserWithFacebook(state,action){
        
            
            return action.payload 
        }
    }

})

export const signInHandlerWithFacebook = (payload) => (dispatch,state) => {

    
    let API = `http://localhost:5000/auth/facebook/callback${payload}`;
    
    
    return axios({
        method: 'get',
        url: API,
    } 
   
    )
    .then(res => {
    dispatch(addUserWithFacebook(res.data));
   })
   .catch(e=>{
       console.error(e.message);
    //    throw new Error(e.message);
});
}

export default signInWithFacebook.reducer 
export const {addUserWithFacebook} = signInWithFacebook.actions