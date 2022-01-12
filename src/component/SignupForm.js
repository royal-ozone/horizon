import React,{useState, useEffect} from 'react'
import {connect} from 'react-redux'
import SignInForm from './SignInForm';
import { signupHandler } from '../store/signup';
import {signInHandlerWithGoogle} from '../store/google';
import {signInHandlerWithFacebook} from '../store/facebook';

const SignupForm = (props) => {
console.log('googleUser', props.googleUser);
console.log('provider', props.provider)

const [user,setUser] = useState({})
    const [values,setValues] =useState({
        first_name:props.googleUser.first_name||'' ,
        last_name:props.googleUser.last_name||'',
        email:props.googleUser.email||'',
        mobile:'',
        country:'',
        city:'',
        country_code:'' ,
        password:'',
        google_id:props.googleUser.google_id ||'' ,

    })

    const handleChange = (e) => {
        
        console.log(e.target.name,'name');
        console.log(e.target.value,'value');
        setValues({
            ...values,
            [e.target.name]: e.target.value

        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();

       let obj = {
        first_name:e.target.first_name.value,
        last_name:e.target.last_name.value,
        email:e.target.email.value,
        mobile:e.target.mobile.value,
        country:e.target.country.value,
        city:e.target.city.value,
        country_code:e.target.country_code.value ,
        password:e.target.password.value,
        google_id:e.target.google_id.value || null ,
       }
       console.log("🚀 ~ file: SignupForm.js ~ line 46 ~ handleSubmit ~ obj", obj)
        props.signupHandler(obj)
    //   window.location=`http://localhost:3000/signin`
    }
    // const ahmad = async () => {
    //     <SignInForm />
    // }

    useEffect(() => {
    let provider = localStorage.getItem('provider')
        if(window.location.search){
            if(provider=== 'google'){
                props.signInHandlerWithGoogle(window.location.search)
            } else if  (provider === 'facebook') {
                props.signInHandlerWithFacebook(window.location.search)
            }
        }
      
    },[])
    useEffect(() => {
       
        
        console.log("🚀 ~ file: SignupForm.js ~ line 72 ~ SignupForm ~ [props.googleUser", props.googleUser)
        setUser(props.googleUser)
      
    },[props.googleUser])
    useEffect(() => {
       
        
        setUser(props.facebookUser)
        console.log("🚀 ~ file: SignupForm.js ~ line 80 ~ useEffect ~ props.facebookUser.user", props.facebookUser.user)
      
    },[props.facebookUser])

    return (
        <div className='container'>
            <div className='app-wrapper'>
                <div>
                    <h2>Create Account</h2>
                    <form className='form-wrapper' onSubmit={handleSubmit}>
                        <div className='first-name'>
                            <label className='label'>first name</label>
                            <input className='input' name='first_name' type='text'value={user? user.first_name: null} ></input>

                        </div>
                        <div className='last-name'>
                            <label className='label'>last name</label>
                            <input className='input' name='last_name' type='text' value={user? user.last_name: null} ></input>

                        </div>
                        <div className='email'>
                            <label className='label'>E-mail</label>
                            <input className='input' name='email' value={user?user.email:null} ></input>

                        </div>
                        <div className='phone-number'>
                            <label className='label'>Phone Number</label>
                            <input className='input' name='mobile'  ></input>

                        </div>
                        <div className='country-code'>
                            <label className='label'> Country Code</label>  
                            <select className='select' name='country_code' id='country_code'  >
                                <option value='962'   >Jordan</option> 
                                <option value='374' >America</option>
                                <option value='43' >Austria</option>
                                <option value='1'>united_states</option>
                            </select>
                            
                        </div>
                        <div className='country'>
                            <label className='label'>Country</label>
                            <input className='input' name='country' type='text' ></input>

                        </div>
                        <div className='city'>
                            <label className='label'>City</label>
                            <input className='input' name='city' type='text'  ></input>

                        </div>

                        <div className='password'>
                            <label className='label'>Password</label>
                            <input className='input' name='password' type='password'  ></input>

                        </div>
                        <div className='googleId'>
                            <label hidden className='label'>googleId</label>
                            <input hidden className='input' name='google_id' type='text' value={user? user.google_id:null} ></input>

                        </div>

                        <button className='submit' type='submit' >sign Up </button>
                        

                    </form >
                    
                </div>

            </div>
           
        </div>
    );
}

// export default SignupForm

const mapStateToProps = (state) => ({
    user: state.signupData ? state.signupData : null,
    googleUser : state.signInWithGoogleData ? state.signInWithGoogleData : null,
    provider: state.provider,
    facebookUser: state.signInWithFacebookData ? state.signInWithFacebookData : null,
  });
  
  const mapDispatchToProps = { signupHandler , signInHandlerWithGoogle, signInHandlerWithFacebook};
  
  export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
