import { Button, Form, Row, Col, Modal } from "react-bootstrap";
import { useState } from "react";

const SignUpForm = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="d-flex align-items-center justify-content-center">
      <Button size="lg" onClick={handleShow}>Sign Up</Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header >
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Form>
              <Row>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control name="user_name" type="text"></Form.Control>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group>
                  <Form.Label>Surname</Form.Label>
                  <Form.Control name="user_surname" type="text"></Form.Control>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control name="user_username" type="text"></Form.Control>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group>
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control name="user_email" type="text"></Form.Control>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="user_password"
                    type="password"
                  ></Form.Control>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group>
                  <Form.Label>Rewrite the password</Form.Label>
                  <Form.Control
                    name="user_password"
                    type="password"
                  ></Form.Control>
                </Form.Group>
              </Row>
              <Row>
                <Col className="col-8">
                  <Button variant="success" className="mt-3" type="submit">
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
