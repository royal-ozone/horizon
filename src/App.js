import logo from './logo.svg';
import Form from './component/Form';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SignupForm from './component/SignupForm';
import SignInForm from './component/SignInForm';
import Home from './component/Home';
import './App.css';

function App() {
  return (
   <div>  
     <Router> 
       <Switch>
          <Route exact path="/">
            <Home />

          </Route>
          <Route exact path='/signup' >
            <SignupForm/>
          </Route>
          <Route exact path='/signin'>
            <SignInForm/>
          </Route>
          
       </Switch>
       </ Router>
     
     
    </div>
  );
}

export default App;
