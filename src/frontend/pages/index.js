import MainPageForm from "../components/MainPage/MainPageForm";
import bg from "../assets/mainmenubg.jpg";
import { Col, Row, Container } from "react-bootstrap";
const HomePage = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${bg.src})`,
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        className="d-flex justify-content-end me-5 align-items-center"
        style={{ height: "50vh"}}
      >
        <div className="d-flex align-items-center justify-content-center">
          <Col
            className="p-4"
            style={{
              backgroundColor: "white",
              borderRadius: "5%",
            }}
          >
            <Row>
              <h1 className="text-primary">Welcome To TESTXXX Page</h1>
            </Row>
            <Row className="mt-3">
              <MainPageForm></MainPageForm>
            </Row>
          </Col>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
