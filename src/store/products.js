import ProductService from "../services/Product";
import {createSlice} from "@reduxjs/toolkit";

let Product = createSlice({
    name: "product",
    initialState:{product:[],message:''},
    reducers:{
        productAction(state,action){
            return action.payload
        }
    }
})

export const productHandler =(payload) =>async (dispatch,state) =>{
  
    let data4 = await ProductService.getProduct();

    if(data4.status ===200){
        dispatch(productAction({product:{...data4}}))
    }else{
        dispatch(productAction({message:data4.message}))
    }
}

export default Product.reducer
export const {productAction} =Product.actions