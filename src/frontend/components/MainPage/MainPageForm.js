import { Button, Form, Row, Col, Spinner } from "react-bootstrap";

const MainPageForm = (props) => {
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
          <Row>
            <Col className="col-3">
              <Button variant="primary" className="mt-3" type="submit">
                Log in
              </Button>
            </Col>
          </Row>
        </Form>
      </Row>
    </div>
  );
};

export default MainPageForm;
