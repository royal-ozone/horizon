import { createSlice } from "@reduxjs/toolkit";
import Following from '../services/Following'

const follow = createSlice({
    name: 'follow',
    initialState: { message: '', following: [] },
    reducers: {
        addFollowStore(state, action) {
            return { ...state, following: [...state.following, action.payload] }
        },
        removeStoreFollow(state, action) {
            return { ...state, following: action.payload }
        },
        errorMessage(state, action) {
            return { ...state, message: action.payload }
        },
        addFollowingStores(state, action) {
            return { ...state, following: action.payload }
        }
    }
})

export const followStoreHandler = payload => async (dispatch, state) => {
    try {
        let { result, message, status } = await Following.followStore(payload)
        if (status === 200) {
            dispatch(addFollowStore( result ))
        } else dispatch(errorMessage(message))
    } catch (error) {
        dispatch(errorMessage(error))
    }
}

export const unFollowStoreHandler = payload => async (dispatch, state) => {
    try {
        let { status, result, message } = await Following.unfollowStore(payload)
        if (status === 200) {
            let newState = state().follow.following.filter(f => f.store_id !== result.store_id)
            dispatch(removeStoreFollow(newState))
        } else dispatch(errorMessage(message))

    } catch (error) {
        dispatch(errorMessage(error))
    }
}

export const getFollowingStores = () => async (dispatch, state) => {
    try {
        let { result, message, status } = await Following.getFollowingStore()
        if (status === 200) {
            dispatch(addFollowingStores(result))
        } else dispatch(errorMessage(message))
    } catch (error) {
        dispatch(errorMessage(error))
    }
}

export default follow.reducer
export const { addFollowStore, removeStoreFollow, errorMessage, addFollowingStores } = follow.actions