import ProductService from "../services/Product";
import { createSlice } from "@reduxjs/toolkit";
import { updateOrders } from './order'
let Product = createSlice({
    name: "product",
    initialState: { product: {}, message: '', searchedProducts: [], storeProducts: [], reviews: [] },
    reducers: {
        productAction(state, action) {
            return { ...state, ...action.payload }
        }
    }
})

export const productHandler = (payload) => async (dispatch, state) => {

    let { data, status, message } = await ProductService.getProduct(payload);


    if (status === 200) {
        dispatch(productAction({ product: data }))
    } else {
        dispatch(productAction({ message: message }))
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

export const getStoreProductsHandler = ({ id, query }) => async (dispatch, state) => {
    try {
        let { status, result } = await ProductService.getProductsByStore(id, query)
        if (status === 200) {
            dispatch(productAction({ storeProducts: result }))
        }
    } catch (error) {
        dispatch(productAction({ message: error.message }))
    }
}

export const addReviewHandler = (payload) => async (dispatch, state) => {
    try {
        let { order: { orders: { data: orders } } } = state()
        let { data, status, message } = await ProductService.addProductReview(payload)
        if (status === 200) {
            let newOrders = orders.map((order) => {
                if (order.id === data.order_id) {
                    let newItems = order.items.map((item) => {
                        if (item.id === data.id) return { ...item, ...data }
                        else return item
                    })

                    let newOrder = { ...order }
                    newOrder['items'] = newItems
                    return newOrder

                } else return order
            })
            dispatch(productAction({ message: 'Review submitted successfully' }))
            dispatch(updateOrders(newOrders))
        } else {
            dispatch(productAction({ message: message }))
        }
    } catch (error) {
        dispatch(productAction({ message: error }))
    }
}

export const getProductReviews = ({ id, query }) => async (dispatch) => {
    try {
        let { status, data, message } = await ProductService.getProductReviews(id, query)
        if (status === 200) {
            dispatch(productAction({ reviews: data }))

        } else {
            dispatch(productAction({ message: message }))
        }
    } catch (error) {
        dispatch(productAction({ message: error }))
    }
}

export default Product.reducer
export const { productAction } = Product.actions