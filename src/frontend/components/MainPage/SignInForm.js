import { Button, Form, Row, Col, Modal } from "react-bootstrap";
import { useState } from "react";

const SignInForm = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Row>
        <Form>
          <Row>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control name="user_id" type="text"></Form.Control>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group>
              <Form.Label>Your Password</Form.Label>
              <Form.Control name="password" type="password"></Form.Control>
            </Form.Group>
          </Row>

          <Row className="d-flex justify-content-center">
            <Button variant="success" className="mt-3" type="submit">
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
                  <Form.Control name="user_name" type="text"></Form.Control>
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
