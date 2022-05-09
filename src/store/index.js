import thunk from 'redux-thunk';
import {combineReducers ,configureStore } from '@reduxjs/toolkit';
import { createStore, applyMiddleware } from 'redux';

import auth from './auth';
import address from './address';
import parent from './parent';
import product from './products';
import signInWithGoogle from './google';
import authProvider from'./authProvider';
import signInWithFacebook from './facebook';
import cart from './cart';
import wishlist from './wishlist';
// import account from './auth';

let reducers = combineReducers({sign:auth,address:address,parent:parent,products:product,signInWithGoogleData:signInWithGoogle, provider:authProvider,signInWithFacebookData: signInWithFacebook, cart:cart, wishlist:wishlist }) ;


let store = configureStore({reducer:reducers}, applyMiddleware(thunk));

export default store;