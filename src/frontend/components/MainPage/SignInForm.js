import { Button, Form, Row, Col, Spinner } from "react-bootstrap";

const SignInForm = (props) => {
  return (
    <div className="">
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
              <Button variant="light" className="mt-3" type="submit">
                Forgot Password
              </Button>
            </Col>
          </Row>
        </Form>
      </Row>
    </div>
  );
};

export default SignInForm;
