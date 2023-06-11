import { Button, Col, Container, Row } from "react-bootstrap";
import bg from "../../assets/mainmenubg.jpg";
import { authActions } from "../../store/auth";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
const NonRolePage = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const router = useRouter();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
    dispatch(authActions.logout());
    router.push("/");
  };

  return (
    <Col
      style={{
        backgroundImage: `url(${bg.src})`,
        height: "100vh",
      }}
    >
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <Container>
          <Row className="d-flex align-items-center justify-content-center">
            <Row className="d-flex align-items-center justify-content-center mb-5">
              <h1 className="text-white text-center pt-5">
                You are not assigned to any role! Wait for Adrien Ugon to assign
                you.
              </h1>
            </Row>
            <Row className="d-flex align-items-center p-5 ">
              <div className="d-flex justify-content-center align-items-center">
                {isAuth && (
                  <Button variant="danger" size="lg" onClick={logoutHandler}>
                    Logout
                  </Button>
                )}
              </div>
            </Row>
          </Row>
        </Container>
      </div>
    </Col>
  );
};

export default NonRolePage;
