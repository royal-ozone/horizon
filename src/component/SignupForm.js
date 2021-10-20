import React,{useState, useEffect} from 'react'
import {connect} from 'react-redux'
import SignInForm from './SignInForm';
import { signupHandler } from '../store/signup';
import {signInHandlerWithGoogle} from '../store/google'

const SignupForm = (props) => {

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
    const handleSubmit =async (e) => {
        e.preventDefault();
       await props.signupHandler(values)
      window.location=`http://localhost:3000/signin`
    }
    // const ahmad = async () => {
    //     <SignInForm />
    // }

    useEffect(() => {
        if(window.location.search){
            props.signInHandlerWithGoogle(window.location.search)
        } 
      
    },[])
    useEffect(() => {
       
        
        setValues({
            ...values,
            first_name: props.googleUser.first_name,
            last_name: props.googleUser.last_name,
            email: props.googleUser.email,

        })
        // setUserTokens(props.googleUser.userTokens)
    },[props.googleUser])

    return (
        <div className='container'>
            <div className='app-wrapper'>
                <div>
                    <h2>Create Account</h2>
                    <form className='form-wrapper' onSubmit={handleSubmit}>
                        <div className='first-name'>
                            <label className='label'>first name</label>
                            <input className='input' name='first_name' type='text'value={values.first_name} onChange={handleChange}></input>

                        </div>
                        <div className='last-name'>
                            <label className='label'>last name</label>
                            <input className='input' name='last_name' type='text' value={values.last_name} onChange={handleChange}></input>

                        </div>
                        <div className='email'>
                            <label className='label'>E-mail</label>
                            <input className='input' name='email' value={values.email} onChange={handleChange}></input>

                        </div>
                        <div className='phone-number'>
                            <label className='label'>Phone Number</label>
                            <input className='input' name='mobile' value={values.mobile} onChange={handleChange}></input>

                        </div>
                        <div className='country-code'>
                            <label className='label'> Country Code</label>  
                            <select className='select' name='country_code' id='country_code'  onChange={handleChange}>
                                <option value='962'   >Jordan</option> 
                                <option value='374' >America</option>
                                <option value='43' >Austria</option>
                                <option value='1'>united_states</option>
                            </select>
                            
                        </div>
                        <div className='country'>
                            <label className='label'>Country</label>
                            <input className='input' name='country' type='text' value={values.country}onChange={handleChange}></input>

                        </div>
                        <div className='city'>
                            <label className='label'>City</label>
                            <input className='input' name='city' type='text' value={values.city} onChange={handleChange}></input>

                        </div>

                        <div className='password'>
                            <label className='label'>Password</label>
                            <input className='input' name='password' type='password' value={values.password} onChange={handleChange}></input>

                        </div>
                        <div className='googleId'>
                            <label hidden className='label'>googleId</label>
                            <input hidden className='input' name='google_id' type='text' value={values.google_id} onChange={handleChange}></input>

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
    googleUser : state.signInWithGoogleData ? state.signInWithGoogleData : null
  });
  
  const mapDispatchToProps = { signupHandler , signInHandlerWithGoogle};
  
  export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
