import ProfileInfo from "../../../components/Profile/ProfileInfo";
import NavbarMenu from "../../../components/UI/NavbarMenu";
import { API_ASSIGN_PAPERS_TO_EDITORAL, API_ASSIGN_REVIEWERS_BY_ALGO, API_PROFILE, API_SEND_REMINDER } from "../../api/api";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Row, ButtonGroup, Col, Modal } from "react-bootstrap";
import Link from "next/link";

const SelectionAssistantEditorProfilePage = (props) => {
  const token = useSelector((state) => state.auth.token);
  const userID = useSelector((state) => state.auth.userID);
  const userType = useSelector((state) => state.auth.type);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [tokenLoaded, setTokenLoaded] = useState(false); // New state to track token retrieval
  const [show, setShow] = useState(false);
  const [show2,setShow2] = useState(false);

  const handleClose = () => {
    setShow(false);
    router.reload(window.location.pathname);
  };

  const handleClose2 = () => {
    setShow2(false);
    router.reload(window.location.pathname);
  };


  useEffect(() => {
    const fetchProfileData = async () => {
      console.log(API_PROFILE + userID);

      if (!token) {
        // Token doesn't exist, handle the error condition
        router.push("/"); // Redirect to the login page or handle the error in a different way
        return;
      }

      try {
        console.log(userID);
        const response = await fetch(API_PROFILE + userID, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        if (!response.ok) {
          const data = await response.json();
          let errorMessage = "Authentication failed!";
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          alert(errorMessage);
          throw new Error(errorMessage);
        }

        const data = await response.json();
        setUser({
          name: data.user.name,
          surname: data.user.surname,
          email: data.user.email,
          type: data.user.role,
          username: data.user.username,
          id: data.user.idUser,
          organizations: data.user.organizations,
          organizationItems: data.organizationItems,
        });
        console.log(data);
      } catch (err) {
        alert(err.message);
      }
    };

    // Check if the token is loaded, if not, setTokenLoaded to true
    if (!tokenLoaded && token) {
      setTokenLoaded(true);
    }

    // If the token is loaded, fetch the profile data
    if (tokenLoaded) {
      fetchProfileData();
    }
  }, [token, userID, tokenLoaded]);

  if (!tokenLoaded) {
    return <div>Loading...</div>; // Show a loading indicator while retrieving the token
  }

  if (user === null) {
    return <div>Not authenticated</div>; // Show a loading indicator while fetching user data
  }

  const assignPapersToEditoral = (event) => {
    event.preventDefault();
    fetch(API_ASSIGN_PAPERS_TO_EDITORAL, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.message;
            }
            alert(data.message);
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        // Handle the successful response
        setShow(true);
        console.log("PUT request was successful!");
      })
      .catch((err) => {
        console.error("Error occurred during PUT request:", err);
      });
  }

  const assignAutoHandler = (event) => {
    console.log("click");
    event.preventDefault();
    fetch(API_ASSIGN_REVIEWERS_BY_ALGO, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.message;
            }
            alert(data.message);
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        // Handle the successful response
        setShow(true);
        console.log("PUT request was successful!");
      })
      .catch((err) => {
        console.error("Error occurred during PUT request:", err);
      });
  };

  const sendReminderHandler = (event) => {
    event.preventDefault();
   
    fetch(API_SEND_REMINDER, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
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
        setShow2(true);
        console.log("POST request was successful!", data);
      })
      .catch((err) => {
        console.error("Error occurred during POST request:", err);
      });
  }

  return (
    <div className="overflow-hidden">
      <NavbarMenu></NavbarMenu>

      <Row className="d-flex justify-content-center ">
        <Col className="d-flex justify-content-center mt-3">
          <ProfileInfo
            name={user.name}
            surname={user.surname}
            email={user.email}
            type={user.type}
            id={user.id}
            username={user.username}
            organizations={user.organizations}
            organizationItems={user.organizationItems}
            isAuth={true}
          ></ProfileInfo>
        </Col>
      </Row>

      <Col className="d-flex align-items-center justify-content-center">
        <Row>
          <ButtonGroup>
            <Link
              className=""
              href="/selectionassistanteditor/userslist"
              passHref
              legacyBehavior
            >
              <Button size="lg" className="mt-4 " variant="info">
                Go To Users List
              </Button>
            </Link>
            <Link
              className=""
              href={`/${userType}/assignsectioneditors/${userID}`}
              passHref
              legacyBehavior
            >
              <Button size="lg" className="mt-4" variant="primary">
                Assign Section Editors
              </Button>
            </Link>
            <Link
              className=""
              href={`/${userType}/assignchiefeditors/${userID}`}
              passHref
              legacyBehavior
            >
              <Button size="lg" className="mt-4" variant="info">
                Assign Chief Editors
              </Button>
            </Link>
            <Button
              size="lg"
              className="mt-4"
              variant="primary"
              onClick={assignAutoHandler}
            >
              Assign Sections to Reviewers
            </Button>
            <Link
              className=""
              href={`/${userType}/assignreviewers/papers/${userID}`}
              passHref
              legacyBehavior
            >
              <Button size="lg" className="mt-4" variant="info">
                Assign Papers to Reviewers
              </Button>
            </Link>
            <Button
              size="lg"
              className="mt-4"
              variant="primary"
              onClick={assignPapersToEditoral}
            >
              Assign Papers to Editoral Board
            </Button>
            <Button
              size="lg"
              className="mt-4"
              variant="info"
              onClick={sendReminderHandler}
            >
              Send Reminders
            </Button>
            <Link
              className=""
              href={`/${userType}/bestpapers/${userID}`}
              passHref
              legacyBehavior
            >
              <Button size="lg" className="mt-4" variant="primary">
                See Best Papers
              </Button>
            </Link>
          </ButtonGroup>
        </Row>
      </Col>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>
            <Row>You successfully assigned</Row>
          </h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>
            <Row>You successfully sent reminders</Row>
          </h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default SelectionAssistantEditorProfilePage;
