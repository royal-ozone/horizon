import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {signInHandler} from '../store/signin';
import {signInHandlerWithGoogle} from '../store/google'
import {googleProvider,facebookProvider} from '../store/authProvider'
import {signInHandlerWithFacebook} from '../store/facebook'


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
   
   
    const handleGoogle = ()=>{
       localStorage.setItem('provider', 'google');
        window.location ='http://localhost:5000/auth/google'
    }
    // useEffect(() => {
        
       
    //     if(window.location.search){
    //         if(props.provider=== 'google'){

    //             props.signInHandlerWithGoogle(window.location.search)
    //         } else if  (props.provider=== 'facebook'){
    //             props.signInHandlerWithfaceook(window.location.search)
    //         }
    //     } 
       
    // },[])
    useEffect(() => {
        console.log("🚀 ~ file: SignInForm.js ~ line 54 ~ props.provider", props.provider)

    },[props.provider])
    
    useEffect(()=>{

        console.log(props.googleUser,'props.googleUser')
        
    },[props.googleUser])
    
    const handleFacebook = ()=>{
        localStorage.setItem('provider', 'facebook');
        props.facebookProvider()
        window.location ='http://localhost:5000/auth/facebook'
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
    googleUser : state.signInWithGoogleData ? state.signInWithGoogleData : null,
    provider: state.provider,
    facebookUser: state.signInWithFacebookData ? state.signInWithFacebookData : null,

  });
  
  const mapDispatchToProps = { signInHandler ,signInHandlerWithGoogle, googleProvider,facebookProvider,signInHandlerWithFacebook};
  
  export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
