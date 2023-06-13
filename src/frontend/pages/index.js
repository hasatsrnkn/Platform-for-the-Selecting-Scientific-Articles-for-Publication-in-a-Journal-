import SignInForm from "../components/MainPage/SignInForm";
import bg from "../assets/mainmenubg.jpg";
import { Col, Row, Container } from "react-bootstrap";
import SignUpForm from "../components/MainPage/SignUpForm";
const HomePage = () => {
  
  return (
    <Col
      style={{
        backgroundImage: `url(${bg.src})`,
        height: "100vh",
      }}
    >
      <h1 className="text-white text-center pt-5">Welcome to Review Platform</h1>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <div className="p-5">
          <Row
            className="p-4 d-flex align-items-center justify-content-center"
            style={{
              backgroundColor: "white",
              borderRadius: "5%",
            }}
          >
            <Row>
              <h2 className="text-primary text-center">Sign In</h2>
            </Row>
            <Row className="d-flex align-items-center justify-content-center">
              <SignInForm></SignInForm>
            </Row>
            <hr className="mt-3"></hr>
            <Row className="d-flex align-items-center justify-content-center">
              <SignUpForm></SignUpForm>
            </Row>
          </Row>
        </div>
      </div>
    </Col>
  );
};

export default HomePage;
