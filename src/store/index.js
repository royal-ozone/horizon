import thunk from 'redux-thunk';
import {combineReducers ,configureStore } from '@reduxjs/toolkit';
import { createStore, applyMiddleware } from 'redux';

import signup from './signup';
import signIn from './signin';
import signInWithGoogle from './google';
import authProvider from'./authProvider';
import signInWithFacebook from './facebook';
import cart from './cart';
import wishlist from './wishlist';

let reducers = combineReducers({signupData:signup,signInData:signIn,signInWithGoogleData:signInWithGoogle, provider:authProvider,signInWithFacebookData: signInWithFacebook, cart:cart, wishlist:wishlist }) ;


let store = configureStore({reducer:reducers}, applyMiddleware(thunk));

export default store;