import AuthService from '../services/Auth';
import { createSlice } from "@reduxjs/toolkit";
import cookie from 'react-cookies';


let Address = createSlice({
    name: 'address',
    initialState:{addresses:[],message:''},
    reducers:{
        addressAction(state,action){
            
            return action.payload
        } 
    }
})

export const addAddressHandler =(payload) => (dispatch,state) => {

    (async()=>{
        let data =await AuthService.insertAddress(payload);
        if(data.status ===200){
            dispatch(addressAction({addresses:[...state().address.addresses,data.data],message:data.message}))
        }else{
            dispatch(addressAction({message:data.message}))
        }
        
    })()
}
export const removeAddressHandler =(payload) => (dispatch,state) => {

    (async()=>{
        let data =await AuthService.removeAddress(payload);
        if(data.status ===200){
            let oldData =state().address.addresses;
            let filter = oldData.filter(el => el.id !==data.data.id)
            dispatch(addressAction({addresses:[...filter],message:data.message}))
        }else{
            dispatch(addressAction({message:data.message}))
        }
        
    })()
}
export const updateAddressHandler = (payload) => (dispatch,state)=> {
    (async()=>{
        let data =await AuthService.updateAddress(payload);
        if(data.status ===200){
            let oldData =state().address.addresses;
            let filter = oldData.filter(el => el.id !==data.data.id)
            dispatch(addressAction({addresses:[...filter,data.data],message:data.message}))
        }else{
            dispatch(addressAction({message:data.message}))
        }
        
    })()
}
export const myAddressHandler = () => (dispatch,state)=> {
    (async()=>{
        let data =await AuthService.getAddress();
        if(data.status ===200){
            let filter = data.data.filter(el => el.display ===true)
            dispatch(addressAction({addresses:filter,message:data.message}))
        }else{
            dispatch(addressAction({message:data.message}))
        }
        
    })()
}


export default Address.reducer
export const {addressAction} = Address.actions