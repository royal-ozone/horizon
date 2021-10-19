import thunk from 'redux-thunk';
import {combineReducers ,configureStore } from '@reduxjs/toolkit';
import { createStore, applyMiddleware } from 'redux';

import signup from './signup';
import signIn from './signin';
import signInWithGoogle from './google';
 

let reducers = combineReducers({signupData:signup,signInData:signIn,signInWithGoogleData:signInWithGoogle}) ;


let store = configureStore({reducer:reducers}, applyMiddleware(thunk));
console.log("🚀 ~ file: index.js ~ line 13 ~ store", store)

export default store;