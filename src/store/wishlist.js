import { createSlice } from "@reduxjs/toolkit";
import cookie from 'react-cookies'
import NewWishlist from '../services/Wishlist'


let cookieWishlist = cookie.load('wishlist') || []

const wishlist = createSlice({
    name: 'wishlist',
    initialState: { message:'', items: [...cookieWishlist]},
    reducers: {
        addProduct(state, action) {

            return {...state, items:[...state.items, action.payload]}
        },
        deleteProduct(state, action) {
            let arr = state.items;
            let newState = arr.filter(item => item.id !== action.payload.id)
            action.payload.cookie && cookie.save('wishlist', [...newState], {path: '/'})

            return {...state,items:[...newState]}
        },
        addItems(state, action) {
            return {...state, items:action.payload}
        },
        addMessage(state, action){
            return {...state, message: action.payload}
        }, 
        resetWishlist(state, action){
            return {...state, items:action.payload}
        }
    }
})

export const addItemHandler = (payload) => async (dispatch, state) => {
    const login = state().sign.login
    try {
        if (login) {
            let { status, message, result } = await NewWishlist.addItem(payload)
            if (status === 200) {
                dispatch(addProduct({...result, entitle: payload.entitle, currency: payload.currency, artitle: payload.artitle, picture: payload.pictures?.product_picture, storeName: payload.store_name }))
            } else { 
                dispatch( addMessage(message))
            }
        } else {
            cookie.save('wishlist', [...state().wishlist.items, payload], {path: '/'})
            dispatch(addProduct(payload))
        }
    } catch (error) {
        dispatch( addMessage(error.message))
    }
}

export const getItemsHandler = () => async (dispatch, state) => {
    
    try {
        let { status, message, result} = await NewWishlist.getItems()
        if (status === 200) {
            dispatch(addItems(result))
        } else {
            dispatch(addMessage(message))
        } 
        const wishlist = cookie.load('wishlist', {path: '/'}) && JSON.parse(cookie.load('wishlist',{path: '/'}))
        if(wishlist.length > 0) {
            wishlist.map(item => !state().wishlist.items.find(i=> i.product_id === item.id) && dispatch(addItemHandler(item)))
            cookie.remove('wishlist', {path: '/'})
        }
        
    } catch (error) {
        dispatch( addMessage(error.message) )        
    }
}

export const deleteItemHandler = (payload) => async (dispatch, state) => {
    const login = state().sign.login
    try {
        if (login) {
            let { status, message, result} = await NewWishlist.deleteItem(payload)
            if (status === 200) {
                dispatch(deleteProduct(result))
            } else {
                dispatch(addMessage(message))
            }
        } else {
            dispatch(deleteProduct({...payload,cookie: true}))
        }
    } catch (error) {
        dispatch( addMessage(error.message))
    }
}

export default wishlist.reducer

export const { addProduct, deleteProduct,addItems,addMessage,resetWishlist } = wishlist.actions