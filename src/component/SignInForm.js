import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {signInHandler} from '../store/signin';
import {signInHandlerWithGoogle} from '../store/google'
import { useParams } from 'react-router-dom';
import {GoogleLogin} from 'react-google-login'


const SignInForm = props => {
console.log("🚀 ~ file: SignInForm.js ~ line 10 ~ props", props)
  
    let [value,setValue]= useState({
        
        email:'',
        password:'',
    })
    const handleChange = e=>{
       
        setValue({
            ...value,
            [e.target.name]:e.target.value
        })
       
    }
    const handleSubmit = async e=>{
        e.preventDefault();
       
        try {
            
            props.signInHandler(value);
            
        } catch (error) {
            console.log(error.message);
        }
    }
   
   
    const handleGoogle = async()=>{
        window.location ='http://localhost:5000/auth/google'
    }
    useEffect(() => {
        
        console.log("🚀 ~ file: SignInForm.js ~ line 44 ~ useEffect ~ window.location.search", window.location.search)
        if(window.location.search){
            props.signInHandlerWithGoogle(window.location.search)
        } 
       
    },[])
    
    useEffect(()=>{

        console.log(props.googleUser,'props.googleUser')
        
    },[props.googleUser])
    const handleFacebook = ()=>{
        console.log('the handleFacebook is working')
    }
    const responseGoogle = (response) => {
        console.log(response);
      }
    return (
        <div>
            <div>Sign In</div>
            <div className="form-signIn">
                <form className="form"  onSubmit={handleSubmit}>
                <label >E-mail</label>
                <input type="text" className="email" name = "email" onChange={handleChange} value={value.email} ></input>

                <label className='password'>Password</label>
                <input type="text" className="password" name = "password" onChange={handleChange} value={value.password}></input>

                <button className='submit' >Sign In </button>

               {/* <GoogleLogin
               clientId='747281148015-p2998j799job733pm8a01ad0p6p09j0p.apps.googleusercontent.com'
               onSuccess={responseGoogle}
               onFailure={responseGoogle}
               cookiePolicy={'single_host_origin'}
               /> */}

                    
                </form>
                <div >
                <button className='google' onClick={handleGoogle} >continue with google </button>
                </div>
                <div>
                <button className='facebook' onClick={handleFacebook}>continue with facebook </button>
                </div>
            </div>
            
        </div>
    )
}



// export default SignInForm

const mapStateToProps = (state) => ({
    user: state.signInData ? state.signInData : null,
    googleUser : state.signInWithGoogleData ? state.signInWithGoogleData : null

  });
  
  const mapDispatchToProps = { signInHandler ,signInHandlerWithGoogle};
  
  export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
