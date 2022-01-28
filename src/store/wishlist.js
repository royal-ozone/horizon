import { createSlice,current } from "@reduxjs/toolkit";
import cookie from 'react-cookies'
let cookieWishlist = cookie.load('wishlist') || []


const wishlist = createSlice({
    name: 'wishlist',
    initialState: [...cookieWishlist],
    reducers: {
        addProduct(state,action){
            cookie.save('wishlist',[...state, action.payload])
            return [...state, action.payload]
        },
        deleteProduct(state,action){
            let arr =state;
            let newState = arr.filter(item => item.id!== action.payload.id)
            cookie.save('wishlist',[...newState])

            return [...newState]
        }
    }
})

export default wishlist.reducer

export const {addProduct,deleteProduct} = wishlist.actions