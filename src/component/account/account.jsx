import React, { useEffect, useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import {
  updateProfileHandler,
  updatePictureHandler,
  deactivateProfileHandler,
  logOutHandler, 
  changePasswordHandler,
  deleteMessage
} from "../../store/auth";
import { useHistory, Link } from "react-router-dom";
import cookie from "react-cookies";
import profilePicture from "../../assets/profilePictureDefult.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./account.css";
import { Button, Row, Form, Col, Figure, Spinner, Container } from "react-bootstrap";
import { usePopup, OutAnimationType,AnimationType,
  DialogType, ToastPosition} from "react-custom-popup";
import { FcEditImage } from "react-icons/fc";
import ChangeEmail from "../email/changeEmail";

const Account = ({
  updateProfileHandler,
  updatePictureHandler,
  profileData,
  deactivateProfileHandler,
  logOutHandler,
  changePasswordHandler
}) => {
  const { message,status,user: { first_name, last_name, country, city, profile_picture } } = useSelector(state => state.sign)
  const history = useHistory();
  const dispatch = useDispatch();
  
  // let {first_name,last_name,country,city,profile_picture} = profileData.user;
  const { showOptionDialog, showToast,showAlert } = usePopup();
  const [loading, setLoading] = useState(true);

  const [loading2, setLoading2] = useState(true);

  useEffect(() => {
    if (!cookie.load("access_token")) {
      history.push("/pageInvalidToken");
    }
  }, []);
  useEffect(() => {
    if (message && !message.title ? message.includes('deactivated') : null) {
      history.push("/signIn");
    }
  }, [history, profileData])
  useEffect(() => {
    setLoading(false);
    setLoading2(false);
  }, [profileData]);
  let data;
  const updateHandler = (e) => {
    e.preventDefault();
    data = {
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      country: e.target.country.value,
      city: e.target.city.value,
    };
    showPopup(data);
  };
  const deactivateHandler = () => {
    showPopup2();
  };

  const showPopup = (data) => {
    showOptionDialog({
      containerStyle: { width: 350 },
      text:
        "Are you sure you want to update your profile? You won't be able to revert that action.",
      title: "Update Profile?",
      options: [
        {
          name: "Cancel",
          type: "cancel",
        },
        {
          name: "Update",
          type: "confirm",
          style: { background: "lightcoral" },
        },
      ],
      onConfirm: () => {
        setLoading2(true);
        updateProfileHandler(data);

      },
    });
  };

  const showPopup2 = (data) => {
    showOptionDialog({
      containerStyle: { width: 350 },
      text:
        "Are you sure you want to deactivate your profile? You can activate your profile any time signin twice",
      title: "Deactivate Profile?",
      options: [
        {
          name: "Cancel",
          type: "cancel",
        },
        {
          name: "Deactivate",
          type: "confirm",
          style: { background: "lightcoral" },
        },
      ],
      onConfirm: () => {
        setLoading2(true);
        deactivateProfileHandler();
        logOutHandler();
      },
    });
  };

  const changeHandler = (e) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("image", e.target.files[0]);
    updatePictureHandler(formData);
  };

  const updatePasswordHandler = (e) =>{
    e.preventDefault()
    const obj = {current: e.target.password.value, new: e.target.newPassword.value, repeatedPassword: e.target.repeatedPassword.value}
    if (obj.new !== obj.repeatedPassword){
      return showAlert({
        type: DialogType.DANGER,
        text: 'Passwords don`t match',
        title: 'Please make sure to repeat new password correctly',
        animationType: AnimationType.FADE_IN,
        outAnimationType: OutAnimationType.FADE_OUT,
      })
     
    }
    Promise.all([changePasswordHandler(obj)]).then(([{status, message : msg}]) => {
      const {title, details} = msg
      if(title){
        showAlert({
        type: DialogType.DANGER,
        text: <Error data={details}/>,
        title: title,
        animationType: AnimationType.FADE_IN,
        outAnimationType: OutAnimationType.FADE_OUT,
      })  
      } else if (status === 403){
        showAlert({
          type: DialogType.DANGER,
          text: msg,
          title: 'Error',
          animationType: AnimationType.FADE_IN,
          outAnimationType: OutAnimationType.FADE_OUT,
        })  
      } else if (status === 200){
        showToast({
          text: msg,
          type: DialogType.INFO,
          position: ToastPosition.BOTTOM_RIGHT,
          timeoutDuration: 3000
        })
        e.target.reset()
      }
      
  
  }
    
    )
  }

  const Error = ({data}) => {
    return (
      <React.Fragment>
          
          <ol>
          {data.map((d, i) => <li key={`detail${i}`}>{d}</li> )}

          </ol>
      </React.Fragment>
    )
  }
  return (
    <div style={{ maxHeight: 'auto' }}>
      <div className="image">
        {loading ? (
          <Spinner animation="border" />
        ) : (
          <Figure>
            <div className="image-1">
              <Figure.Image
                roundedCircle
                width={100}
                height={100}
                maxwidth={200}
                maxheight={200}
                alt={"not found"}
                src={profileData ? profile_picture : profilePicture}
              />{" "}
            </div>
            <div>
              <Form>

                <Form.Group className="position-relative mb-3">
                  <Form.Label htmlFor="file-input">
                    <span>
                      <FcEditImage />{" "}
                    </span>
                  </Form.Label>
                  <Form.Control
                    id="file-input"
                    type="file"
                    name="file"
                    onChange={changeHandler}
                  />
                </Form.Group>
              </Form>
            </div>
          </Figure>
        )}
      </div>
      <Container>
        <Row>
          <Col xs={12} md={6} sm={12} lg={4}>
            <Form onSubmit={updateHandler} className="back">
              <fieldset className="fieldset" >
                <legend >Personal Information</legend>
                <Row>
                  <Col  >
                    <Form.Group className="mb-3" controlid="formBasicFirstName">
                      <Form.Label>First Name </Form.Label>
                      <Form.Control
                        type="first_name"
                        placeholder="first name"
                        name="first_name"
                        defaultValue={
                          profileData ? first_name : "First Name"
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      id="last_name"
                      controlid="formBasicLastName"
                    >
                      <Form.Label>Last Name </Form.Label>
                      <Form.Control
                        type="last_name"
                        placeholder="last name"
                        name="last_name"
                        defaultValue={profileData ? last_name : "Last Name"}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col >
                    <Form.Group
                      className="mb-3"
                      id="country"
                      controlid="formBasicCountry"
                    >
                      <Form.Label> Country </Form.Label>
                      <Form.Control
                        type="country"
                        placeholder="country"
                        name="country"
                        defaultValue={profileData ? country : "Country"}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      id="city"
                      controlid="formBasicCity"
                    >
                      <Form.Label> City </Form.Label>
                      <Form.Control
                        type="city"
                        placeholder="city"
                        name="city"
                        defaultValue={profileData ? city : "City"}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button variant="primary" type="submit">
                  Update
                </Button>
                {loading2 ? <Spinner animation="border" /> : null}
              </fieldset>
            </Form>
          </Col>
          <Col xs={12} md={6} sm={12} lg={4}>

            <ChangeEmail />
          </Col>
          <Col xs={12} md={6} sm={12} lg={4} >
            <Form className="back" onSubmit={updatePasswordHandler}>
              <fieldset>
                <legend>Change Password</legend>
                <Row>
                  <Form.Group className="mb-3">
                    <Form.Control placeholder='current password' type="password"  id='password'  required/>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group className="mb-3">
                    <Form.Control placeholder='new password' type="password" id='newPassword'  required/> 
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group className="mb-3">
                    <Form.Control placeholder='repeat new password' type="password" id="repeatedPassword"  required/>
                    <Button variant="primary" type="submit">Update</Button>
                  </Form.Group>
                </Row>
              </fieldset>
            </Form>
          </Col>
        </Row>

      </Container>
      <Button
        variant="danger"
        className=""
        type="submit"
        onClick={deactivateHandler}
      >
        Deactivate
      </Button >


    </div>
  );
};

const mapStateToProps = (state) => ({
  profileData: state.sign ? state.sign : null,
});
const mapDispatchToProps = {
  updateProfileHandler,
  updatePictureHandler,
  deactivateProfileHandler,
  logOutHandler,
  changePasswordHandler,
};
export default connect(mapStateToProps, mapDispatchToProps)(Account);
