import React, { useState, useEffect } from "react";
import { connect ,useDispatch} from "react-redux";
import { deleteMessage, signInHandler } from "../store/auth";
import { signInHandlerWithGoogle } from "../store/google";
import { googleProvider, facebookProvider } from "../store/authProvider";
import { signInHandlerWithFacebook } from "../store/facebook";
import { useTranslation } from "react-i18next";
import { useHistory ,Link} from "react-router-dom";
import { Form, Button, Spinner } from "react-bootstrap";
import "./signInForm.css";
import background from "../assets/8.jpg";
import cookie from 'react-cookies'
const SignInForm = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();
  const {userSignIn,signInHandler} = props;
  console.log("🚀 ~ file: SignInForm.jsx ~ line 19 ~ SignInForm ~ userSignIn", userSignIn)
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showDeactivate,setShowDeactivate] = useState(false);
  const [show,setShow] = useState(false);

  const submitHandler = (e) => {
    setErrorMessage('');
    setLoading(true);
    e.preventDefault();

    signInHandler({
      email: e.target.email.value,
      password: e.target.password.value,
    });
  };
  let currentPath =cookie.load('currentPath');

  // useEffect(()=>{
  //   if(userSignIn.user){
  //     dispatch(deleteMessage());
  //   }
  //   // setLoading(false);
  // },[dispatch, userSignIn.user])
  
  useEffect(()=>{
    if(userSignIn.login){
      history.push(currentPath || '/');
    }
    setLoading(false);
  },[currentPath, history, userSignIn.login])

  // useEffect(()=>{
  //   if(userSignIn.message){
  //     if(userSignIn.message.includes('password')){
  //       setErrorMessage(userSignIn.message)
  //       // dispatch(deleteMessage());
  //     }
  //   }
  //   setLoading(false);
  // },[dispatch, userSignIn])

  useEffect(()=>{
    if(userSignIn.message){
      if(userSignIn.message){
       
        setShow(true);
        // dispatch(deleteMessage());
      }
    }
    setLoading(false);
  },[dispatch, userSignIn])

  useEffect(()=>{
    if(userSignIn.message){
      if(userSignIn.message.includes('activate',30)){
        
        setShowDeactivate(true);
        // dispatch(deleteMessage());
      }
    }
    setLoading(false);
  },[dispatch, userSignIn])

  // const handleGoogle = ()=>{
  //    localStorage.setItem('provider', 'google');
  //     window.location ='http://localhost:5000/auth/google'
  // }

  // useEffect(() => {
  //     console.log("🚀 ~ file: SignInForm.js ~ line 54 ~ props.provider", props.provider)

  // },[props.provider])

  // useEffect(()=>{

  //     console.log(props.googleUser,'props.googleUser')

  // },[props.googleUser])

  // const handleFacebook = ()=>{
  //     localStorage.setItem('provider', 'facebook');
  //     props.facebookProvider()
  //     window.location ='http://localhost:5000/auth/facebook'
  // }
  // const responseGoogle = (response) => {
  //     console.log(response);
  //   }
  return (
    <div className="wrapper">
      <div className="inner2">
        <div className="image-holder">
          <img className="image" src={background} alt={background} />
        </div>
        <Form className="form" onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Control type="email" name="email" placeholder={t("text2")} />

            <Form.Text className="text-muted">{t("text3")}</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              name="password"
              placeholder={t("pass")}
            />
          </Form.Group>
          {errorMessage && (
            <div className="error" style={{ color: "red" }}>
              {" "}
              {errorMessage}{" "}
            </div>
          )}
           {show ? <div style={{color:"red"}}> 
            {" "}
            {userSignIn.message}
          </div>:
          null}
           {showDeactivate ? <div style={{color:"blue"}}> 
            {" "}
            {"your account is deactivate , you can sign in again to activate your account and We are glad to have you back in your second family ❤️"}
          </div>:
          null}
          <div>
            <Link to="/signUp" className="btn btn-sign">
              {t("sign")}{" "}
            </Link>
          </div>
          <Button variant="primary" type="submit" className="btn">
            {t("sub")}
          </Button>
         
          {loading ? <Spinner animation="border" /> : null}
         
        </Form>
      </div>
    </div>
  );
};

// export default SignInForm

const mapStateToProps = (state) => ({
  userSignIn: state.sign ? state.sign : null,
  googleUser: state.signInWithGoogleData ? state.signInWithGoogleData : null,
  provider: state.provider,
  facebookUser: state.signInWithFacebookData
    ? state.signInWithFacebookData
    : null,
});

const mapDispatchToProps = {
  signInHandler,
  signInHandlerWithGoogle,
  googleProvider,
  facebookProvider,
  signInHandlerWithFacebook,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
