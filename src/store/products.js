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
console.log("🚀 ~ file: products.js ~ line 15 ~ productHandler ~ payload", payload)
  
    let data4 = await ProductService.getProduct();
   let data5 = await ProductService.getProductByCategory(payload[6],payload[4],payload[2]);
   console.log("🚀 ~ file: products.js ~ line 18 ~ productHandler ~ data5", data5)
   
    if(data4.status ===200){
        dispatch(productAction({product:{...data4},productCategory:{...data5}}))
    }else{
        dispatch(productAction({message:data4.message}))
    }
}

export default Product.reducer
export const {productAction} =Product.actions