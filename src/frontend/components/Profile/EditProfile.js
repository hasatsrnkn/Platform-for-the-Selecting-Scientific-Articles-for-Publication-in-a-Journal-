import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Col, Row, Button, Modal, Form } from "react-bootstrap";
import {
  API_PUT_NEW_PASSWORD,
  API_CHANGE_USER_INFO,
} from "../../pages/api/api";

const EditProfile = (props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [show, setShow] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const router = useRouter();
  const [currentPasswordIsInvalid, setCurrentPasswordIsInvalid] =
    useState(false);
  const [newPasswordIsInvalid, setNewPasswordIsInvalid] = useState(false);
  const [nameIsInvalid, setNameIsInvalid] = useState(false);
  const [surnameIsInvalid, setSurnameIsInvalid] = useState(false);
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);

  const [name, setName] = useState(props.name);
  const [surname, setSurname] = useState(props.surname);
  const [email, setEmail] = useState(props.email);

  const userID = useSelector((state) => state.auth.userID);
  const token = useSelector((state) => state.auth.token);

  const editProfileHandler = (event) => {
    event.preventDefault();
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setErrorMessage("");
    setSuccessMessage("");
    setCurrentPassword("");
    setNewPassword("");
  };

  const newProfileInfoHandler = (event) => {
    event.preventDefault();
    console.log(name);
    console.log(surname);
    console.log(email);
    if (name == "" || surname == "" || email == "") {
      if (name == "") {
        setNameIsInvalid(true);
      }
      if (surname == "") {
        setSurnameIsInvalid(true);
      }

      if (email == "") {
        setEmailIsInvalid(true);
      }
    } else {
      fetch(API_CHANGE_USER_INFO, {
        method: "PUT",
        body: JSON.stringify({
          name: name,
          surname: surname,
          email: email,
          userId: userID,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "User information change failed!";
              setSuccessMessage("");
              setErrorMessage(data.message);
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }

              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          // Handle the successful response
          console.log("User information updated successfully!", data);
          setErrorMessage("");
          setSuccessMessage("You successfully changed your information!");
          setTimeout(() => {
            router.reload(window.location.pathname);
          }, 2000);
        })
        .catch((error) => {
          // Handle any errors that occurred during the request
          console.error("Error occurred during password update:", error);
        });
    }
  };

  const changePasswordHandler = (event) => {
    event.preventDefault();

    if (currentPassword.length < 6 || newPassword.length < 6) {
      if (currentPassword.length < 6) {
        setCurrentPasswordIsInvalid(true);
      }
      if (newPassword.length < 6) {
        setNewPasswordIsInvalid(true);
      }
    } else {
      fetch(API_PUT_NEW_PASSWORD, {
        method: "PUT",
        body: JSON.stringify({
          newPassword: newPassword,
          currentPassword: currentPassword,
          userId: userID,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Password change failed!";
              setSuccessMessage("");
              setErrorMessage(data.message);
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }

              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          // Handle the successful response
          console.log("password updated successfully!", data);
          setErrorMessage("");
          setSuccessMessage("You successfully changed your password!");
          setTimeout(() => {
            router.reload(window.location.pathname);
          }, 2000);
        })
        .catch((error) => {
          // Handle any errors that occurred during the request
          console.error("Error occurred during password update:", error);
        });
    }
  };

  useEffect(() => {
    if (currentPassword.length > 5) {
      setCurrentPasswordIsInvalid(false);
    }
  }, [currentPassword]);

  useEffect(() => {
    if (newPassword.length > 5) {
      setNewPasswordIsInvalid(false);
    }
  }, [newPassword]);

  return (
    <div>
      <Fab aria-label="edit" className="" onClick={editProfileHandler}>
        <EditIcon fontSize="large"></EditIcon>
      </Fab>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Form>
              <Row>
                <Col className="col-6">
                  <Form.Group className="mt-1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      id="name"
                      name="email"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setNameIsInvalid(false);
                      }}
                      isInvalid={nameIsInvalid}
                      defaultValue={props.name}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col className="col-6">
                  <Form.Group className="mt-1">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control
                      id="surname"
                      name="email"
                      type="text"
                      required
                      value={surname}
                      isInvalid={surnameIsInvalid}
                      onChange={(e) => {
                        setSurname(e.target.value);
                        setSurnameIsInvalid(false);
                      }}
                      defaultValue={props.surname}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Form.Group className="mt-1">
                  <Form.Label>Your Email</Form.Label>
                  <Form.Control
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    isInvalid={emailIsInvalid}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailIsInvalid(false);
                    }}
                    defaultValue={props.email}
                  ></Form.Control>
                </Form.Group>
              </Row>
              <Button
                className="mt-2"
                variant="success"
                onClick={newProfileInfoHandler}
                type="submit"
              >
                Submit
              </Button>
            </Form>
          </Row>
          <hr></hr>
          <Row>
            <Form>
              <Row>
                <Form.Group className="mt-1">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    id="currentpassword"
                    name="currentpassword"
                    type="password"
                    value={currentPassword}
                    isInvalid={currentPasswordIsInvalid}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className="mt-1">
                  <Form.Label>New Password </Form.Label>
                  <Form.Control
                    id="newpassword"
                    name="newpassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    isInvalid={newPasswordIsInvalid}
                    required
                  ></Form.Control>
                </Form.Group>
              </Row>
              <Button
                className="mt-2"
                variant="success"
                type="submit"
                onClick={changePasswordHandler}
              >
                Submit
              </Button>
            </Form>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <div className="me-3 text-danger">{errorMessage}</div>
          <div className="me-3 text-success">{successMessage}</div>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditProfile;
