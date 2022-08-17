import ProductService from "../services/Product";
import { createSlice } from "@reduxjs/toolkit";

let Product = createSlice({
    name: "product",
    initialState: { product: [], message: '', searchedProducts: [], storeProducts: []},
    reducers: {
        productAction(state, action) {
            return { ...state, ...action.payload }
        }
    }
})

export const productHandler = (payload) => async (dispatch, state) => {
    console.log("🚀 ~ file: products.js ~ line 15 ~ productHandler ~ payload", payload)

    let data4 = await ProductService.getProduct();
    let data5 = await ProductService.getProductByCategory(payload[6], payload[4], payload[2]);

    if (data4.status === 200) {
        dispatch(productAction({ product: { ...data4 }, productCategory: { ...data5 } }))
    } else {
        dispatch(productAction({ message: data4.message }))
    }
}


export const searchProductsHandler = payload => async (dispatch, state) => {
    try {
        let result = await ProductService.productsSearch(payload)
        if (result) {
            dispatch(productAction({ message: result.length > 0 ? 'yes' : 'no', searchedProducts: result }))
        } else {
            dispatch(productAction({ message: 'something went wrong' }))
        }
    } catch (error) {
        dispatch(productAction({ message: error.message }))
    }
}

export const getStoreProductsHandler = ({id,query}) => async (dispatch, state) => {
    try {
        let {status, result} = await ProductService.getProductsByStore(id, query)
        if(status === 200){
            dispatch(productAction({storeProducts : result}))
        }
    } catch (error) {
        dispatch(productAction({ message: error.message}))
    }
}

export default Product.reducer
export const { productAction } = Product.actions