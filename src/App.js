import logo from './logo.svg';
import Form from './component/Form';
import React, { Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SignupForm from './component/SignupForm';
import SignInForm from './component/SignInForm';
import Verification from './component/verification';
import Home from './component/Home';
import Header from './component/header';
import Main from './pages/main'
import Page404 from './pages/Page404';
import PageInvalidToken from './pages/pageInvalidtoken';
import Footer from './component/footer'
import Cart from './component/cart'
import Wishlist from './component/wishlist'
import Product from './component/product'
import Settings from './component/Settings'
import Products from './component/products/products';
import Account from './component/account/account';
import Address from './component/address/address';
import Email from './component/email/changeEmail';
import Password from './component/password/changPassword';
import Notification from './component/notification/notification';
import { useTranslation } from 'react-i18next';
import {Rings } from 'react-loader-spinner'
import Loader from './component/loader'
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Seller from './component/seller'


function App() {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    let lang = localStorage.getItem('i18nextLng')
    if (lang === 'en') {
      i18n.changeLanguage(lang);
      document.documentElement.setAttribute("lang", 'en');
      document.documentElement.setAttribute("dir", 'ltl');
    } else {
      i18n.changeLanguage(lang);
      document.documentElement.setAttribute("lang", 'ar');
      document.documentElement.setAttribute("dir", 'rtl');
    }
  }, [])

  return (



    <div className="body">
      <Router>
        <Header />
        <Switch>

          <Route exact path="/">
            <Main />

          </Route>
          <Route exact path="/page404">
            <Page404 />
          </Route>
          <Route exact path="/pageInvalidToken">
            <PageInvalidToken />
          </Route>
          <Route exact path='/signup' >
            <SignupForm />
          </Route>
         
          <Route exact path='/signIn'>
            <SignInForm/>

          </Route>
          <Route exact path='/settings'>
            <Settings/>

          </Route>
          <Route  path='/settings/account'>
           <Settings/>
            

          </Route>
          <Route exact path='/settings/email'>
          <Settings/>

          </Route>
          <Route exact path='/settings/password'>
          <Settings/>

          </Route>
          <Route exact path='/settings/notification'>
          <Settings/>

          </Route>
          <Route exact path='/settings/address'>
            
          <Settings/>

          </Route>
          <Route exact path='/verification'>
            <Verification/>

          </Route>
          
          <Route exact path='/cart'>
            <Cart />
          </Route>
          <Route exact path="/home">
            <Home />

          </Route>
          <Route exact path='/wishlist'>
            <Wishlist />
          </Route>
          <Route exact path='/products/:childName'>
              <Products />
          </Route>
          <Route exact path='/product/:id'>
            <Product />
          </Route>
          <Route exact path='/store/:id' component={Seller} />
        </Switch>

        <Route path='/loader'>
        <Loader/>
        </Route>
        <Footer />
      </ Router>
    </div>

  );
}

export default App;
