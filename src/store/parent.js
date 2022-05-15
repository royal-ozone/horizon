import ProductService from "../services/Product";
import {createSlice} from "@reduxjs/toolkit";

let Parent = createSlice({
    name: "parent",
    initialState:{parentCategory:[],childCategory:[],grandChildCategory:[],product:[],message:''},
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
    let data5;
    if(payload){
         data5 = await ProductService.getProductByCategory(payload);
    }
    
    if(data.status ===200){
        dispatch(productAction({parentCategory:{...data},childCategory:{...data2},grandChildCategory:{...data3},product:{...data4},productCategory:{...data5}}))
    }else{
        dispatch(productAction({message:data.message}))
    }
}
// export const childCategoryHandler = (payload) => async (dispatch,state)=> {
//     let data = await ProductService.getChildCategory();
//     console.log("🚀 ~ file: product.js ~ line 25 ~ childCategoryHandler ~ data", data)
//     if(data.status ===200){
//         dispatch(productAction({childCategory:{...data}},...state()))
//     }else{
//         dispatch(productAction({message:data.message}))
//     }
// }
// export const grandChildCategoryHandler = (payload) => async (dispatch,state)=>{
//     let data = await ProductService.getGrandChildCategory();
//     if(data.status ===200){
//         dispatch(productAction({grandChildCategory:{...data}},...state()))
//     }else{
//         dispatch(productAction({message:data.message}))
//     }
// }
// export const productHandler =(payload) => async (dispatch,state)=>{
// let data = await ProductService.getProductByCategory(payload);
// if(data.status === 200){
//     dispatch(productAction({grandChildCategory:{...data}},...state()))
// }else{
//     dispatch(productAction({message:data.message}))
// }
// }
export default Parent.reducer
export const {productAction} =Parent.actions