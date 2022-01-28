import { createSlice,current } from "@reduxjs/toolkit";
import cookie from 'react-cookies'

let cookieCard = cookie.load('cart')
const cart = createSlice({
    name: 'cart',
    initialState: cookieCard? cookieCard: [],
    reducers:{
        addItem(state,action) {
            cookie.save('cart', [...state,{...action.payload} ] )
            return [...state,{...action.payload} ];
        },
        decrementQuantity(state,action){
            let arr = current(state)
            let newState = arr.map(value => {
                if(value.id === action.payload.id){
                   return {...value, qty: value.qty-1}
                }
                return value
            } )
            cookie.save('cart',[...newState])
            return [...newState];
        },
        incrementQuantity(state,action){
            let arr = current(state)
            let newState = arr.map(value => {
                if(value.id === action.payload.id){
                   return {...value, qty: value.qty+1}
                }
                return value
            } )
            cookie.save('cart',[...newState])
            return [...newState];
        },

        deleteItem(state,action){
            let arr = current(state)
            let newState = arr.filter(item => item.id !== action.payload.id )
            cookie.save('cart',[...newState])
            return [...newState];
        }
    }
})

export default cart.reducer

export const {addItem,decrementQuantity,incrementQuantity,deleteItem} = cart.actions