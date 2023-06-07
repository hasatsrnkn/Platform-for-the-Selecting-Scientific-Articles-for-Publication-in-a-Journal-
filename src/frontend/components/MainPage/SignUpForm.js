import { Button, Form, Row, Col, Modal } from "react-bootstrap";
import { useState } from "react";
import { API_SIGN_UP } from "../../pages/api/api";

const SignUpForm = (props) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameIsEmpty, setNameIsEmpty] = useState(false);
  const [surnameIsEmpty, setSurnameIsEmpty] = useState(false);
  const [usernameIsEmpty, setUsernameIsEmpty] = useState(false);
  const [emailIsEmpty, setEmailIsEmpty] = useState(false);
  const [passwordIsEmpty, setPasswordIsEmpty] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const nameHandler = (event) => {
    event.preventDefault();
    setNameIsEmpty(false);
    setName(event.target.value);
  };

  const surnameHandler = (event) => {
    event.preventDefault();
    setSurnameIsEmpty(false);
    setSurname(event.target.value);
  };

  const usernameHandler = (event) => {
    event.preventDefault();
    setUsernameIsEmpty(false);
    setUsername(event.target.value);
  };

  const emailHandler = (event) => {
    event.preventDefault();
    setEmailIsEmpty(false);
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    event.preventDefault();
    setPasswordIsEmpty(false);
    setPassword(event.target.value);
  };

  const signUpHandler = (event) => {
    event.preventDefault();
    if (
      name == "" ||
      surname == "" ||
      username == "" ||
      email == "" ||
      password == ""
    ) {
      if (name == "") {
        setNameIsEmpty(true);
      }
      if (surname == "") {
        setSurnameIsEmpty(true);
      }
      if (username == "") {
        setUsernameIsEmpty(true);
      }
      if (email == "") {
        setEmailIsEmpty(true);
      }
      if (password == "") {
        setPasswordIsEmpty(true);
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
              let errorMessage = "Authentication failed!";
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }

              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          // Handle the successful response
          setShow(false)
          console.log("POST request was successful!", data);
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
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="user_name"
                    type="text"
                    onChange={nameHandler}
                    isInvalid={nameIsEmpty}
                  ></Form.Control>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group>
                  <Form.Label>Surname</Form.Label>
                  <Form.Control
                    name="user_surname"
                    type="text"
                    onChange={surnameHandler}
                    isInvalid={surnameIsEmpty}
                  ></Form.Control>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    name="user_username"
                    type="text"
                    onChange={usernameHandler}
                    isInvalid={usernameIsEmpty}
                  ></Form.Control>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group>
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    name="user_email"
                    type="text"
                    onChange={emailHandler}
                    isInvalid={emailIsEmpty}
                  ></Form.Control>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="user_password"
                    type="password"
                    onChange={passwordHandler}
                    isInvalid={passwordIsEmpty}
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
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SignUpForm;
