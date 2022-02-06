
import ApiService from '../services/ApiService';
import { createSlice } from "@reduxjs/toolkit";
import cookie from 'react-cookies';

cookie.load('tokenSignIn');

let sign = createSlice({
    name: 'sign',
    initialState: {},
    reducers:{
        addUser(state,action){
            return action.payload 
        },
        getUser(state,action){
            return action.payload 
        },
        logOut(state,action){
            return action.payload
        },
        verification(state,action){
            return action.payload
        },
        verify(state,action){
            return action.payload
        },
        
    }

})
export const signupHandler = (payload) => (dispatch,state) => {
    
    let SignUp = new ApiService();
   (async()=>{
       console.log('log in seccessfully')
       let data = await SignUp.post('auth/signup',null,payload,null)
       console.log("🚀 ~ file: signup.js ~ line 25 ~ data", data)
       
       cookie.save('tokenSignUp',data.accessToken);
       dispatch(addUser(data))
   })()
   
}

export const signInHandler = (payload) => (dispatch,state) => {
    let SignIn =new ApiService();
    
    
    (async()=>{
        let data = await SignIn.basicPost('auth/signin',null,payload);
        console.log("🚀 ~ file: signin.js ~ line 23 ~ data", data)
        cookie.save('tokenSignIn',data.access_token,{path:'/'})
        dispatch(getUser(data))
    })()

}
export const logOutHandler = (payload) => (dispatch,state) => {
    let LogOut =new ApiService();
    
    
    (async()=>{
        console.log('Log Out Seccessfully')
        let bearer = cookie.load('tokenSignIn');
        let data = await LogOut.post('auth/signout',null,payload,bearer);
        console.log("🚀 ~ file: signin.js ~ line 23 ~ data", data)
        cookie.remove('tokenSignIn',{path: '/'})
        dispatch(logOut(data))
        
    })()

}
export const verificationHandler = (payload) => (dispatch,state) => {
    let Verification =new ApiService();
    
    
    (async()=>{
        console.log('Verification Seccessfully')

        let bearer = cookie.load('tokenSignUp');
        console.log("🚀 ~ file: sign.js ~ line 80 ~ bearer", bearer)
        let data = await Verification.post('auth/user/verification',null,null,bearer);
        console.log("🚀 ~ file: sign.js ~ line 82 ~ data", data)
        dispatch(verification(data))
    })()

}

export const verifyHandler = (payload) => (dispatch,state) => {
    let Verification =new ApiService();
    
    
    (async()=>{
        console.log('Verify Seccessfully')
        let bearer = cookie.load('tokenSignUp');
        let data = await Verification.post('auth/user/verify',null,payload,bearer);
        console.log("🚀 ~ file: sign.js ~ line 78 ~ data", data)
        dispatch(verify(data))
    })()

}

export default sign.reducer 
export const {getUser,addUser,logOut,verification,verify} = sign.actions

