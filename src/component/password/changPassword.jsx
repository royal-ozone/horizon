// import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
// import { useTranslation } from "react-i18next";
// import { useHistory } from "react-router-dom";
// import { Button, Row, Form, Col, Spinner } from "react-bootstrap";
// import { usePopup } from "react-custom-popup";
// import { updateMobileHandler } from "../../store/auth";

// import "bootstrap/dist/css/bootstrap.min.css";
// import "./email.css";
// const Email = (props) => {
//   const { updateMobileHandler, profileData } = props;
//   const [loading, setLoading] = useState(true);

//   const { showOptionDialog, showToast } = usePopup();
//   const { email } = profileData.user;
//   useEffect(() => {
//     setLoading(false);
//   }, [profileData]);

//   useEffect(() => {
//     if(profileData.message){
//       if(profileData.message.includes('Missing')){
//         setShowMissing(true);
//       }
//     }
//   }, [profileData]);

//   const updateHandler = (e) => {
//     e.preventDefault();
//     let data = {
//       email: e.target.email.value,
//     };
//     showPopup(data);
//   };
//   const showPopup = (data) => {
//     showOptionDialog({
//       containerStyle: { width: 350 },
//       text:
//         "Are you sure you want to update your Mobile? You won't be able to revert that action.",
//       title: "Update Mobile?",
//       options: [
//         {
//           name: "Cancel",
//           type: "cancel",
//         },
//         {
//           name: "Update",
//           type: "confirm",
//           style: { background: "lightcoral" },
//         },
//       ],
//       onConfirm: () => {
//         setLoading(true);
//         updateMobileHandler(data);
//       },
//     });
//   };

//   return (
//     <div>
//       <Form onSubmit={updateHandler}>
//         <Row>
//           <Col>
//             <Form.Group className="mb-3" controlId="formBasicEmail1">
//               <Form.Label>Email Address </Form.Label>
//               <Form.Control
//                 placeholder="first name"
//                 name="email"
//                 defaultValue={profileData ? email : "Email Address"}
//               />
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row>
//           <Button variant="primary" type="submit" controlId="button-email">
//             Update
//           </Button>
//           {loading ? <Spinner animation="border" /> : null}
//         </Row>
//       </Form>
//     </div>
//   );
// };

// const mapStateToProps = (state) => ({
//   profileData: state.sign ? state.sign : null,
// });
// const mapDispatchToProps = { updateMobileHandler };
// export default connect(mapStateToProps, mapDispatchToProps)(Email);
