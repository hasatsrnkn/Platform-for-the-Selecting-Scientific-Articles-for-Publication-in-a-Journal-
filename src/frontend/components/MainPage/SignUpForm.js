import { Button, Form, Row, Col, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { API_SIGN_UP } from "../../pages/api/api";

const SignUpForm = (props) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [nameIsInvalid, setNameIsInvalid] = useState(false);
  const [surnameIsInvalid, setSurnameIsInvalid] = useState(false);
  const [usernameIsInvalid, setUsernameIsInvalid] = useState(false);
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);

  const handleClose = () => {
    setShow(false);
    setErrorMessage("");
    setSuccessMessage("");
  };
  const handleShow = () => {
    setErrorMessage("");
    setSuccessMessage("");
    setShow(true);
    setPasswordIsInvalid(false);
  };

  const nameHandler = (event) => {
    event.preventDefault();
    setNameIsInvalid(false);
    setName(event.target.value);
  };

  const surnameHandler = (event) => {
    event.preventDefault();
    setSurnameIsInvalid(false);
    setSurname(event.target.value);
  };

  const usernameHandler = (event) => {
    event.preventDefault();
    setUsernameIsInvalid(false);
    setUsername(event.target.value);
  };

  const emailHandler = (event) => {
    event.preventDefault();
    setEmailIsInvalid(false);
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  useEffect(() => {
    if (password.length > 5) {
      setPasswordIsInvalid(false);
    }
  }, [password]);

  const signUpHandler = (event) => {
    event.preventDefault();
    if (
      name == "" ||
      surname == "" ||
      username == "" ||
      email == "" ||
      password.length < 6
    ) {
      if (name == "") {
        setNameIsInvalid(true);
      }
      if (surname == "") {
        setSurnameIsInvalid(true);
      }
      if (username == "") {
        setUsernameIsInvalid(true);
      }
      if (email == "") {
        setEmailIsInvalid(true);
      }
      if (password.length < 6) {
        setPasswordIsInvalid(true);
      }
    } else {
      fetch(API_SIGN_UP, {
        method: "POST",
        body: JSON.stringify({
          name: name,
          surname: surname,
          username: username,
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Signup failed!";
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
          console.log("POST request was successful!", data);
          setErrorMessage("");
          setSuccessMessage("Added the account successfully!");
          setTimeout(() => {
            setShow(false);
          }, 2000);
        })
        .catch((error) => {
          // Handle any errors that occurred during the request
          console.error("Error occurred during POST request:", error);
        });
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center">
      <Button size="lg" onClick={handleShow}>
        Sign Up
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Form>
              <Row>
                <Form.Group>
                  <Form.Label>
                    <strong>Name </strong>
                    <small>(No empty)</small>
                  </Form.Label>
                  <Form.Control
                    id="name"
                    name="name"
                    type="text"
                    onChange={nameHandler}
                    isInvalid={nameIsInvalid}
                  ></Form.Control>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group>
                  <Form.Label>
                    <strong>Surname </strong>
                    <small>(No empty)</small>
                  </Form.Label>
                  <Form.Control
                    id="surname"
                    name="surname"
                    type="text"
                    onChange={surnameHandler}
                    isInvalid={surnameIsInvalid}
                  ></Form.Control>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group>
                  <Form.Label>
                    <strong>Username </strong>
                    <small>
                      (No space between characters and mininum 6 characters)
                    </small>
                  </Form.Label>
                  <Form.Control
                    id="username"
                    name="username"
                    type="text"
                    onChange={usernameHandler}
                    isInvalid={emailIsInvalid}
                  ></Form.Control>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group>
                  <Form.Label>
                    <strong>Email </strong> <small>(No empty)</small>
                  </Form.Label>
                  <Form.Control
                    id="email"
                    name="email"
                    type="email"
                    onChange={emailHandler}
                    isInvalid={emailIsInvalid}
                  ></Form.Control>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group>
                  <Form.Label>
                    <strong>Password</strong>{" "}
                    <small>(Minimum 6 characters)</small>
                  </Form.Label>
                  <Form.Control
                    id="password"
                    name="password"
                    type="password"
                    onChange={passwordHandler}
                    isInvalid={passwordIsInvalid}
                  ></Form.Control>
                </Form.Group>
              </Row>

              <Row>
                <Col className="col-8">
                  <Button
                    variant="success"
                    className="mt-3"
                    type="submit"
                    onClick={signUpHandler}
                  >
                    Sign Up
                  </Button>
                </Col>
              </Row>
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

export default SignUpForm;
