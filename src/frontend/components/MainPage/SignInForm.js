import { Button, Form, Row, Col, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { API_LOGIN, API_RESET_PASSWORD } from "../../pages/api/api";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import { LinearProgress, Box } from "@mui/material";

const SignInForm = (props) => {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameIsInvalid, setUsernameIsInvalid] = useState(false);
  const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [resetEmail, setResetEmail] = useState("");

  const handleClose = () => {
    setShow(false);
    setErrorMessage("");
    setSuccessMessage("");
  };
  const handleShow = () => {
    setShow(true);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const dispatch = useDispatch();
  const router = useRouter();

  const usernameHandler = (event) => {
    event.preventDefault();
    setUsername(event.target.value);
  };

  const resetEmailHandler = (event) => {
    event.preventDefault();
    setResetEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const submitResetPassword = (event) => {
    event.preventDefault();
   
    fetch(API_RESET_PASSWORD, {
      method: "POST",
      body: JSON.stringify({
        email: resetEmail,
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
            setSuccessMessage("");
            setErrorMessage(data.message);
            if (data && data.error && data.error.message) {
              errorMessage = data.message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        // Handle the successful response
        console.log("POST request was successful!", data);
        setErrorMessage("");
        setSuccessMessage(data.message);
        setTimeout(() => {
          setShow(false);
        }, 2000);
      })
      .catch((err) => {
        console.error("Error occurred during POST request:", err);
      });
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
      setLoading(true);
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
            setLoading(false);
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
          localStorage.setItem("type", data.role);
          const remainingMilliseconds = 60 * 60 * 1000;
          const expiryDate = new Date(
            new Date().getTime() + remainingMilliseconds
          );
          localStorage.setItem("expiryDate", expiryDate.toISOString());
          dispatch(authActions.setExpiryDate(expiryDate));
          if (!data.role) {
            router.push(`nonrole/` + data.userId);
          } else {
            const profileType = data.role.toLowerCase();
            router.push(`${profileType}/myprofile/` + data.userId);
          }
        })
        .catch((err) => {
          console.error("Error occurred during POST request:", err);
          setLoading(false);
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
        {loading && (
          <Row className="d-flex justify-content-center mt-2">
            <Col className="d-flex justify-content-center">
              <LinearProgress style={{ width: "90%" }} />
            </Col>
          </Row>
        )}
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
                    onChange={resetEmailHandler}
                  ></Form.Control>
                </Form.Group>
              </Row>
              <Row>
                <Col className="col-8">
                  <Button
                    variant="success"
                    className="mt-3"
                    type="submit"
                    onClick={submitResetPassword}
                  >
                    Send Email
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

export default SignInForm;
