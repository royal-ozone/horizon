import React,{useState, useEffect} from 'react'
import {connect} from 'react-redux'

import { signupHandler } from '../store/signup';
import {signInHandlerWithGoogle} from '../store/google'

const SignupForm = (props) => {

    const [user, setUser] = useState()
    const [userTokens, setUserTokens] = useState()


    const [values,setValues] =useState({
        first_name:'',
        last_name:'',
        email:'',
        mobile:'',
        country:'',
        city:'',
        country_code:'' ,
        password:'',

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
        props.signupHandler(values);
        
    }

    useEffect(() => {
        if(window.location.search){
            props.signInHandlerWithGoogle(window.location.search)
        } 
       console.log('props.googleUser', props.googleUser)
    },[])
    useEffect(() => {
        console.log('props.googleUser', props.googleUser)
        setUser(props.googleUser.user)
        setUserTokens(props.googleUser.userTokens)
    },[props.googleUser])

    return (
        <div className='container'>
            <div className='app-wrapper'>
                <div>
                    <h2>Create Account</h2>
                    <form className='form-wrapper' onSubmit={handleSubmit}>
                        <div className='first-name'>
                            <label className='label'>first name</label>
                            <input className='input' name='first_name' type='text'value={user? user.first_name: values.first_name} onChange={handleChange}></input>

                        </div>
                        <div className='last-name'>
                            <label className='label'>last name</label>
                            <input className='input' name='last_name' type='text' value={user? user.last_name:values.last_name} onChange={handleChange}></input>

                        </div>
                        <div className='email'>
                            <label className='label'>E-mail</label>
                            <input className='input' name='email' value={user? user.email:values.email} onChange={handleChange}></input>

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
