
import { createSlice } from "@reduxjs/toolkit";

let authProvider = createSlice({
    name: 'authProvider',
    initialState: {},
    reducers:{
        googleProviderHandler(state, action){
            return {provider: action.payload}
        },
        facebookProviderHandler(state, action){
            return {provider: action.payload}
        }
    }

})

export const googleProvider = () => (dispatch,state) => {
    
    dispatch(googleProviderHandler('google'));
}

export const facebookProvider = () => (dispatch,state) => {
    
    dispatch(facebookProviderHandler('facebook'));
}

export default authProvider.reducer 
export const {googleProviderHandler,facebookProviderHandler} = authProvider.actions

