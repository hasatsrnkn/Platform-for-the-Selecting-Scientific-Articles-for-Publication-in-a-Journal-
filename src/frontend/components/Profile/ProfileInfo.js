import { Col, Row } from "react-bootstrap";

const ProfileInfo = (props) => {
  return (
    <Row className="ps-4">
      <Col className="text-dark">
        <Row className="mt-3">Name: {props.name}</Row>
        <Row className="mt-3">Surname: {props.surname}</Row>
        <Row className="mt-3">Username: {props.username}</Row>
        <Row className="mt-3">ID: {props.id}</Row>
        <Row className="mt-3">Role: {props.type}</Row>
        <Row className="mt-3">E-mail: {props.email}</Row>
      </Col>
    </Row>
  );
};

export default ProfileInfo;
