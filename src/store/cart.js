import { createSlice, current } from "@reduxjs/toolkit";
import cookie from 'react-cookies'
import Cart from '../services/Cart'

let cookieCard = cookie.load('cart')
const cart = createSlice({
    name: 'cart',
    initialState: cookieCard ?? [],
    reducers: {
        addItem(state, action) {
            action.payload.cookie && cookie.save('cart', [...state, { ...action.payload }])
            return [...state, { ...action.payload }];
        },
        decrementQuantity(state, action) {

            let newState = state.map(value => {
                if (value.id === action.payload.id) {
                    return { ...value, quantity: value.quantity - 1 }
                }
                return value
            })
            cookie.save('cart', [...newState])
            return [...newState];
        },
        incrementQuantity(state, action) {

            let newState = state.map(value => {
                if (value.id === action.payload.id) {
                    return { ...value, quantity: value.quantity + 1 }
                }
                return value
            })
            action.payload.cookie && cookie.save('cart', [...newState])
            return [...newState];
        },

        deleteItem(state, action) {

            let newState = state.filter(item => item.id !== action.payload.id)
            action.payload.cookie && cookie.save('cart', [...newState])
            return [...newState];
        },
        updateCartItem(state, action) {
            let newState = state.map(value => {
                if (value.id === action.payload.id) {
                    return action.payload
                }
                return value
            })
            action.payload.cookie && cookie.save('cart', [...newState])
            return [...newState];
        },
        addCartItems(state, action) {
            return action.payload
        },
        resetCartItems(state, action) {
            return action.payload
        }
    }
})

export const addCartItemHandler = payload => async (dispatch, state) => {
    const login = state().sign.login
    try {
        if (login) {
            let { data, status, message } = await Cart.addCartItem(payload)

            if (status === 200) {
                dispatch(addItem({ ...data, entitle: payload.entitle, currency: payload.currency, artitle: payload.artitle, picture: payload.pictures?.product_picture, storeName: payload.store_name }))
            } else {
                console.error(message)
            }
        } else {
            dispatch(addItem({ ...payload, cookie: true }))
        }
    } catch (error) {
        console.log("🚀 ~ file: cart.js ~ line 55 ~ addCartItemHandler ~ error", error)

    }
}

export const updateCartItemHandler = (payload) => async (dispatch, state) => {
    const login = state().sign.login
    try {
        if (login) {
            let { status, message, data } = await Cart.updateCartItem(payload)
            if (status === 200) {
                dispatch(updateCartItem({ ...payload, ...data }))
            } else {
                console.error(message)
            }
        } else {
            dispatch(updateCartItem({ ...payload, cookie: true }))
        }
    } catch (error) {
        console.log("🚀 ~ file: cart.js ~ line 69 ~ updateCartItemHandler ~ error", error)

    }
}

export const deleteCartItemHandler = (payload) => async (dispatch, state) => {
    const login = state().sign.login
    try {
        if (login) {
            let { status, data, message } = await Cart.removeCartItem(payload)
            if (status === 200) {
                dispatch(deleteItem(data))
            } else {
                console.error(message)
            }

        } else {
            dispatch(deleteItem({ ...payload, cookie: true }))
        }
    } catch (error) {
        console.log("🚀 ~ file: cart.js ~ line 98 ~ deleteCartItemHandler ~ error", error)

    }
}

export const getCartItemsHandler = () => async (dispatch, state) => {
    try {
        let { data, status, message } = await Cart.getCartItems()
        if (status === 200) {
            dispatch(addCartItems(data))

        } else {
            console.error(message)
        }
        const cart = cookie.load('cart', { path: '/' }) && JSON.parse(cookie.load('cart', { path: '/' }))
        if (cart && cart?.length !== 0) {
            await cart.map((item) => !state().cart.find(i => i.product_id === item.id) && dispatch(addCartItemHandler(item)))
            cookie.remove('cart', { path: '/' })
        }
    } catch (error) {
        console.log("🚀 ~ file: cart.js ~ line 118 ~ getCartItemsHandler ~ error", error)

    }
}

export const updateCartHandler = (payload) => async (dispatch, state) => {
    try {
        let { status } = await Cart.updateCart(payload)
        return status
    } catch (error) {
        return error.message
    }
}

export default cart.reducer

export const { addItem, decrementQuantity, incrementQuantity, deleteItem, updateCartItem, addCartItems, resetCartItems } = cart.actions