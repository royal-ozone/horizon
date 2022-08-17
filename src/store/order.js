import Order from "../services/Order";

import {createSlice} from "@reduxjs/toolkit";



const order = createSlice({
    name: 'order',
    initialState: {message:'', placedOrder: {}},
    reducers:{
        addPlacedOrder(state, action){
            return {...state, ...action.payload}
        }, 

        addMessage(state, action){
            return {...state, message:action.payload}
        }, 
        clearPlacedOrder (state, action){
            return {...state, placedOrder:action.payload}
        }
    
    }
})

export const placedOrderHandler = payload => async (dispatch, state) => {
    try {
        let {order, status, message} = await Order.placeOrder(payload)
        if (status === 200){
            dispatch(addPlacedOrder({placedOrder: order}))
        } else {
            dispatch(addMessage(message))
        }
    } catch (error) {
        dispatch(addMessage(error.message))
    }
}

export default order.reducer

export const {addPlacedOrder, addMessage,clearPlacedOrder} = order.actions