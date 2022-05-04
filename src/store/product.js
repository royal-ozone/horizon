import ProductService from "../services/Product";
import {createSlice} from "@reduxjs/toolkit";

let Product = createSlice({
    name: "Product",
    initialState:{parentCategory:{},childCategory:{},grandChildCategory:{},product:{},message:''},
    reducers:{
        productAction(state,action){
            return action.payload
        }
    }
})

export const parentCategoryHandler =(payload) =>async (dispatch,state) =>{
    let data = await ProductService.getParentCategory();
    let data2 = await ProductService.getChildCategory();
    let data3 = await ProductService.getGrandChildCategory();
    let data4 = await ProductService.getProduct();
    let allData ={data,data2,data3,data4}
    console.log("🚀 ~ file: product.js ~ line 20 ~ parentCategoryHandler ~ allData", allData)
    if(data.status ===200){
        dispatch(productAction({parentCategory:data,childCategory:data2,grandChildCategory:data3,grandChildCategory:data4}))
    }else{
        dispatch(productAction({message:data.message}))
    }
}
// export const childCategoryHandler = (payload) => async (dispatch,state)=> {
//     let data = await ProductService.getChildCategory();
//     console.log("🚀 ~ file: product.js ~ line 25 ~ childCategoryHandler ~ data", data)
//     if(data.status ===200){
//         dispatch(productAction({childCategory:data}))
//     }else{
//         dispatch(productAction({message:data.message}))
//     }
// }
// export const grandChildCategoryHandler = (payload) => async (dispatch,state)=>{
//     let data = await ProductService.getGrandChildCategory();
//     if(data.status ===200){
//         dispatch(productAction({grandChildCategory:data}))
//     }else{
//         dispatch(productAction({message:data.message}))
//     }
// }
// export const productHandler =(payload) => async (dispatch,state)=>{
// let data = await ProductService.getProduct();
// if(data.status ===200){
//     dispatch(productAction({grandChildCategory:data}))
// }else{
//     dispatch(productAction({message:data.message}))
// }
// }
export default Product.reducer
export const {productAction} =Product.actions