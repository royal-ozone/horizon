import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {signInHandler} from '../store/signin';
import {signInHandlerWithGoogle} from '../store/google'
import {googleProvider,facebookProvider} from '../store/authProvider'
import {signInHandlerWithFacebook} from '../store/facebook'
import {useTranslation} from 'react-i18next';
import {
  
  Form,
  Button,
} from "react-bootstrap";
import './signInForm.css';
import background from "../assets/8.jpg";

const SignInForm = props => {
console.log("🚀 ~ file: SignInForm.js ~ line 10 ~ props", props)
  const {t,i18n}=useTranslation();
  const changeLanguage = att=>{
    i18n.changeLanguage(att)
  }
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
      <div className="wrapper">
        <div className="inner2">
        <div className="image-holder">
        <img className="image" src={background} alt={background}/>
        </div>
      <form className="form">
      <Form.Group className="mb-3" >
        
        <Form.Control type="email" placeholder={t("text2")}  />

        <Form.Text className="text-muted">
          {t("text3")}
        </Form.Text>
      </Form.Group>
    
      <Form.Group className="mb-3" >
      
        <Form.Control type="password" placeholder={t("pass")} />
      </Form.Group>
    
      <Button variant="primary" type="submit" className="btn">
        
        {t('sub')}
      </Button>
      <div>
        <a href="/signUp" className="btn btn-sign">{t('sign')} </a>
      </div>
    </form>
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