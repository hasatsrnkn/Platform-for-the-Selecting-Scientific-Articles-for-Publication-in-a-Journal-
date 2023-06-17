import { Col, Container, Form, Row, Button } from "react-bootstrap";
import bg from "../../assets/mainmenubg.jpg";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { API_GET_NEW_PASSWORD, API_POST_NEW_PASSWORD } from "../api/api";

const ResetPasswordPage = (props) => {
  const router = useRouter();
  const { token } = router.query;

  const [newPassword, setNewPassword] = useState("");
  const [userId, setUserId] = useState(null);
  const [newPasswordIsInvalid, setNewPasswordIsInvalid] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const newPasswordHandler = (event) => {
    event.preventDefault();
    setNewPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (newPassword.length < 6) {
      setNewPasswordIsInvalid(true);
    } else {
      fetch(API_POST_NEW_PASSWORD, {
        method: "POST",
        body: JSON.stringify({
          password: newPassword,
          idUser: userId,
          passwordToken: token,
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
            router.push("/");
          }, 2000);
        })
        .catch((err) => {
          console.error("Error occurred during POST request:", err);
        });
    }
  };

  useEffect(() => {
    const fetchUserId = async () => {
      console.log(token);
      if (!token) {
        return; // Exit the function if the token is not defined yet
      }

      try {
        const response = await fetch(API_GET_NEW_PASSWORD + token, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const data = await response.json();
          let errorMessage = "Authentication failed!";
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }

          throw new Error(errorMessage);
        }

        const data = await response.json();
        setUserId(data.userId);
      } catch (err) {
        alert(err.message);
      }
    };
    fetchUserId();
  }, [token]);

  useEffect(() => {
    if (newPassword.length > 5) {
      setNewPasswordIsInvalid(false);
    }
  }, [newPassword]);

  return (
    <Col
      style={{
        backgroundImage: `url(${bg.src})`,
        height: "100vh",
      }}
    >
      <div
        className="d-flex justify-content-center align-items-center p-5"
        style={{ height: "70vh" }}
      >
        <Container
          style={{
            width: "40vw",
          }}
        >
          <Form>
            <Form.Group>
              <Form.Label className="d-flex justify-content-center align-items-center">
                <div className="text-center text-light fs-2">
                  Your New Password
                </div>
              </Form.Label>
              <Form.Control
                id="password"
                name="password"
                type="password"
                onChange={newPasswordHandler}
                isInvalid={newPasswordIsInvalid}
              ></Form.Control>
            </Form.Group>
          </Form>
          <Row className="d-flex justify-content-center">
            <div className="d-flex justify-content-center align-items-center mt-3">
              <Button
                variant="success"
                className="mt-3"
                type="submit"
                size="lg"
                onClick={submitHandler}
              >
                Submit
              </Button>
            </div>
          </Row>
          <Row className="d-flex justify-content-center">
            <div className="me-3 text-danger fs-2 d-flex justify-content-center align-items-center mt-3">
              {errorMessage}
            </div>
            <div className="me-3 text-success fs-2 d-flex justify-content-center align-items-center mt-3">{successMessage}</div>
          </Row>
        </Container>
      </div>
    </Col>
  );
};

export default ResetPasswordPage;
