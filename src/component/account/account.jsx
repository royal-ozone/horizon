import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  updateProfileHandler,
  updatePictureHandler,
  deactivateProfileHandler,
  logOutHandler
} from "../../store/auth";
import { useHistory , Link } from "react-router-dom";
import cookie from "react-cookies";
import profilePicture from "../../assets/profilePictureDefult.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./account.css";
import { Button, Row, Form, Col, Figure, Spinner } from "react-bootstrap";
import { usePopup } from "react-custom-popup";
import { FcEditImage } from "react-icons/fc";

const Account = (props) => {
  const history = useHistory();
  const {
    updateProfileHandler,
    updatePictureHandler,
    profileData,
    deactivateProfileHandler,
    logOutHandler,
  } = props;
  let {first_name,last_name,country,city,profile_picture} = profileData.user;
  const { showOptionDialog, showToast } = usePopup();
  const [loading, setLoading] = useState(true);
  console.log("🚀 ~ file: account.jsx ~ line 30 ~ Account ~ loading", loading)
  
  const [loading2, setLoading2] = useState(true);

  useEffect(() => {
    if (!cookie.load("access_token")) {
      history.push("/pageInvalidToken");
    }
  }, []);
useEffect(() => {
    if(profileData.message?profileData.message.includes('deactivated'):null){
    history.push("/signIn");
  }
},[history, profileData])
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

  return (
    <div>
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
                maxWidth={200}
                maxHeight={200}
                alt={"not found"}
                src={profileData?profile_picture:profilePicture}
              />{" "}
            </div>
            <div>
              <Form>
                <Form.Group className="position-relative mb-3">
                  <Form.Label for="file-input">
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

      <Form onSubmit={updateHandler}>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>First Name </Form.Label>
              <Form.Control
                type="first_name"
                placeholder="first name"
                name="first_name"
                defaultValue={
                  profileData ? first_name  : "First Name" 
                }
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group
              className="mb-3"
              id="last_name"
              controlId="formBasicPassword"
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
          <Col>
            <Form.Group
              className="mb-3"
              id="country"
              controlId="formBasicPassword"
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
              controlId="formBasicPassword"
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
      </Form>

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
};
export default connect(mapStateToProps, mapDispatchToProps)(Account);
