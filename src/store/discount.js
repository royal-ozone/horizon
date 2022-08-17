import Discount from "../services/Discount";
import { createSlice} from "@reduxjs/toolkit";


const discount = createSlice({
    name: 'discount',
    initialState: {message:'', discount:{}, status: 0},
    reducers:{
        checkCode(state, action){
            return {...state,...action.payload}
        }, 
        clearDiscount (state, action){
            console.log("🚀 ~ file: discount.js ~ line 13 ~ clearDiscount ~ action", action)
            return {message:'', discount:{}, status: 0}
        }
    }
})


export const checkCodeHandler = payload => async (dispatch,state) => {
    try {
        let {status, message, result} = await Discount.checkCode(payload)
        if (status === 200){
            dispatch(checkCode({message: message, status: status, discount: result}))
        } else {
            dispatch(checkCode({message: message, status: status}))
        }
    } catch (error) {
        dispatch(checkCode({message: error.message}))
    }
}


export default discount.reducer

export  const {checkCode,clearDiscount} = discount.actions