import logo from './logo.svg';
import Form from './component/Form';
import React, {Suspense} from 'react'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import SignupForm from './component/SignupForm';
import SignInForm from './component/SignInForm';
import Home from './component/Home';
import Header from './component/header';
import Main from './pages/main'
import Footer from './component/footer'
import Cart from './component/cart'
import './App.css';

function App() {
  return (
    <Suspense fallback='loading'>
   <div className="body">  
     <Router> 
       <Header/>
       <Switch>

       <Route exact path="/">
            <Main />

          </Route>
          <Route exact path='/signup' >
            <SignupForm/>
          </Route>
          <Route exact path='/signin'>
            <SignInForm/>
          </Route>
          <Route exact path='/cart'>
            <Cart/>
          </Route>
          <Route exact path="/home">
            <Home />

          </Route>
          
       </Switch>
       <Footer/>
       </ Router>
    </div>
    </Suspense>
  );
}

export default App;
