import Order from "../services/Order";

import {createSlice} from "@reduxjs/toolkit";



const order = createSlice({
    name: 'order',
    initialState: {message:'', placedOrder: {} , orders: {count: 0, data:[]}, logs:[]},
    reducers:{
        addPlacedOrder(state, action){
            return {...state, ...action.payload}
        }, 

        addMessage(state, action){
            return {...state, message:action.payload}
        }, 
        clearPlacedOrder (state, action){
            return {...state, placedOrder:action.payload}
        },
        addOrders(state, action) {
            return {...state, orders:action.payload}
        },
        addOrderLogs(state, action) {
            return {...state, logs: action.payload}
        },

        updateOrders (state, action) {
            return {...state, orders: {...state.orders, data: action.payload}}
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

export const getOrderHandler = (payload) => async (dispatch,state) =>{
    try {
        let result = await Order.getOrders(payload) 
        dispatch(addOrders(result))
    } catch (error) {
        dispatch(addMessage(error))
    }
}

export const getOrderLogs = payload => async (dispatch, state) => {
    try {
        let {result, status} = await Order.orderLogs(payload)
        status === 200 && dispatch(addOrderLogs(result))
    } catch (error) {
        dispatch(addMessage(error))
    }
}

export default order.reducer

export const {addPlacedOrder, addMessage,clearPlacedOrder,addOrders,addOrderLogs,updateOrders} = order.actions