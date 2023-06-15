import Link from "next/link";
import { Nav, Form, Button, Row } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { useRouter } from "next/router";

const NavbarMenu = (props) => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const userType = useSelector((state) => state.auth.type);
  const userID = useSelector((state) => state.auth.userID);
  const router = useRouter();
  const logoutHandler = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
    localStorage.removeItem("type");
  };

  return (
    <div>
      {isAuth && (
        <Navbar bg="primary" className="ps-2" variant="dark">
          <Navbar.Brand className="ms-2">Review Platform</Navbar.Brand>
          <Nav className="me-auto">
            <Link
              href={`/${userType}/myprofile/${userID}`}
              passHref
              legacyBehavior
            >
              <Nav.Link className="ms-5">Profile</Nav.Link>
            </Link>

            <Link href={`/${userType}/papers/${userID}`} passHref legacyBehavior>
              <Nav.Link className="ms-5">Papers</Nav.Link>
            </Link>

            <Link href="/" passHref legacyBehavior>
              <Nav.Link className="ms-5" onClick={logoutHandler}>
                Log out
              </Nav.Link>
            </Link>
          </Nav>
        </Navbar>
      )}
    </div>
  );
};

export default NavbarMenu;
