import { Button, Form, Row, Col, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { API_LOGIN } from "../../pages/api/api";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { useRouter } from "next/router";

const SignInForm = (props) => {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameIsInvalid, setUsernameIsInvalid] = useState(false);
  const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const router = useRouter();

  const usernameHandler = (event) => {
    event.preventDefault();
    setUsername(event.target.value);
  };

  const passwordHandler = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const setAutoLogout = (milliseconds) => {
    setTimeout(() => {
      dispatch(authActions.logout());
      localStorage.removeItem("token");
      localStorage.removeItem("expiryDate");
      localStorage.removeItem("userId");
    }, milliseconds);
  };

  useEffect(() => {
    if (password.length > 5) {
      setPasswordIsInvalid(false);
    }
  }, [password]);

  useEffect(() => {
    if (username.length > 5) {
      setUsernameIsInvalid(false);
    }
  }, [username]);

  const signInHandler = (event) => {
    event.preventDefault();
    if (username.length < 6 || password.length < 6) {
      if (username.length < 6) {
        setUsernameIsInvalid(true);
      }
      if (password.length < 6) {
        setPasswordIsInvalid(true);
      }
    } else {
      fetch(API_LOGIN, {
        method: "POST",
        body: JSON.stringify({
          username: username,
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
                errorMessage = data.message;
              }
              alert(data.message);
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          dispatch(
            authActions.login({
              token: data.token,
              userID: data.userId,
              type: data.role,
            })
          );
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.userId);
          const remainingMilliseconds = 60 * 60 * 1000;
          const expiryDate = new Date(
            new Date().getTime() + remainingMilliseconds
          );
          localStorage.setItem("expiryDate", expiryDate.toISOString());
          dispatch(authActions.setExpiryDate(expiryDate));
          setAutoLogout(remainingMilliseconds);
          if (!data.role) {
            router.push(`nonrole/` + data.userId);
          } else {
            const profileType = data.role.toLowerCase();
            router.push(`${profileType}/myprofile/` + data.userId);
          }
        })
        .catch((err) => {
          console.error("Error occurred during POST request:", err);
        });
    }
  };

  return (
    <div>
      <Row>
        <Form>
          <Row>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                id="username"
                name="username"
                type="text"
                onChange={usernameHandler}
                isInvalid={usernameIsInvalid}
              ></Form.Control>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group>
              <Form.Label>Your Password</Form.Label>
              <Form.Control
                id="password"
                name="password"
                type="password"
                onChange={passwordHandler}
                isInvalid={passwordIsInvalid}
              ></Form.Control>
            </Form.Group>
          </Row>

          <Row className="d-flex justify-content-center">
            <Button
              variant="success"
              className="mt-3"
              type="submit"
              onClick={signInHandler}
            >
              Log in
            </Button>
          </Row>
          <Row className="d-flex justify-content-center">
            <Col className="d-flex justify-content-center">
              <Button variant="light" className="mt-3" onClick={handleShow}>
                Forgot Password
              </Button>
            </Col>
          </Row>
        </Form>
      </Row>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Form>
              <Row>
                <Form.Group>
                  <Form.Label>Your Email</Form.Label>
                  <Form.Control
                    id="email"
                    name="email"
                    type="email"
                  ></Form.Control>
                </Form.Group>
              </Row>
              <Row>
                <Col className="col-8">
                  <Button variant="success" className="mt-3" type="submit">
                    Send Email
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

export default SignInForm;
