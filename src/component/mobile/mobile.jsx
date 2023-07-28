import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { Button, Row, Form, Col, Spinner } from "react-bootstrap";
import { usePopup } from "react-custom-popup";
import { updateMobileHandler } from "../../store/auth";

import "bootstrap/dist/css/bootstrap.min.css";
// import "./email.css";
const Mobile = (props) => {
  const { updateMobileHandler, profileData } = props;
  const [loading, setLoading] = useState(true);
  const [showMissing,setShowMissing] = useState(false);

  const { showOptionDialog, showToast } = usePopup();
  const { mobile } = profileData.user;
  useEffect(() => {
    setLoading(false);
  }, [profileData]);

  useEffect(() => {
        if(profileData.message){
          if(profileData.message){
            setShowMissing(true);
          }
        }
      }, [profileData]);

  const updateHandler = (e) => {
    e.preventDefault();
    let data = {
      mobile: e.target.mobile.value,
    };
    showPopup(data);
  };
  const showPopup = (data) => {
    showOptionDialog({
      containerStyle: { width: 350 },
      text:
        "Are you sure you want to update your Mobile? You won't be able to revert that action.",
      title: "Update Mobile?",
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
        setLoading(true);
        updateMobileHandler(data);
      },
    });
  };

  return (
    <div>
      <Form onSubmit={updateHandler}>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicMobile1">  
              <Form.Label> Phone Number </Form.Label>
              <Form.Control
                placeholder="mobile"
                name="mobile"
                defaultValue={profileData ? mobile : "Phone Number"}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
        {showMissing ? <div style={{color:"red"}}> 
            {" "}
            {profileData ? profileData.message:null}
          </div>:
          null}
          <Button variant="primary" type="submit" controlId="button-email">
            Update
          </Button>
          {loading ? <Spinner animation="border" /> : null}
        </Row>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profileData: state.sign ? state.sign : null,
});
const mapDispatchToProps = { updateMobileHandler };
export default connect(mapStateToProps, mapDispatchToProps)(Mobile);
