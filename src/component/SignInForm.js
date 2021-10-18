import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {signInHandler} from '../store/signin';
import {signInHandlerWithGoogle} from '../store/google'


const SignInForm = props => {
console.log("🚀 ~ file: SignInForm.js ~ line 7 ~ props", props)

    let [value,setValue]= useState({
        
        email:'',
        password:'',
    })
    const handleChange = e=>{
        console.log("🚀 ~ file: SignInForm.js ~ line 10 ~ value", value)
        console.log(e.target.name,'name');
        console.log(e.target.value,'value');
        setValue({
            ...value,
            [e.target.name]:e.target.value
        })
       
    }
    const handleSubmit = async e=>{
        e.preventDefault();
        console.log(value);
        try {
            
            props.signInHandler(value);
            
        } catch (error) {
            console.log(error.message);
        }
    }
   
    const handleGoogle = async()=>{
        console.log('the handleGoogle is working')
        window.location ='http://localhost:5000/auth/google'
        

           await  props.signInHandlerWithGoogle()
        
        console.log(props.googleUser,'props.googleUser')
    }
    const handleFacebook = ()=>{
        console.log('the handleFacebook is working')
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
