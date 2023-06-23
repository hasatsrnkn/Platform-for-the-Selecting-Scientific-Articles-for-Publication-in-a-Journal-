import { useState, useEffect } from "react";
import { Button, Container, Row, Table, Modal, Alert } from "react-bootstrap";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { API_ASSIGN_PAPERS_BY_ALGO } from "../../pages/api/api";

const AssignPapersToReviewers = (props) => {
  const token = useSelector((state) => state.auth.token);
  const userID = useSelector((state) => state.auth.userID);
  const [tokenLoaded, setTokenLoaded] = useState(false); // New state to track token retrieval
  const router = useRouter();
  const [show, setShow] = useState(false);

  
  const handleClose = () => {
    setShow(false);
    router.reload(window.location.pathname);
  };

  const getAlertVariant = (paperID, userID) => {
    const paperItem = props.paperItems.find(
      (item) => item.userIdUser === userID && item.paperIdPaper === paperID
    );

    if (paperItem) {
      if (paperItem.bidLevel == -2) {
        return "danger";
      } else if (paperItem.bidLevel == 0) {
        return "light";
      } else if (paperItem.bidLevel == 2) {
        return "info";
      } else {
        return "success";
      }
    } else {
      return "light";
    }
  };

  const getAssignedMessage = (paperID, userID) => {
    const paperItem = props.paperItems.find(
      (item) => item.userIdUser === userID && item.paperIdPaper === paperID
    );

    if (paperItem) {
      if (paperItem.assigned) {
        return "*";
      } else {
        return "";
      }
    } else {
      return "";
    }
  };

  const assignAutoHandler = (event) => {
    console.log("click");
    event.preventDefault();
    fetch(API_ASSIGN_PAPERS_BY_ALGO, {
      method: "PUT",
      body: JSON.stringify({
        sectionId: props.page,
      }),
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

  return (
    <div>
      <p className="ms-2">
        In the table below the assigned papers are marked by "*". The colors are
        as follows:
      </p>
      <p className="text-success ms-2">I want to review this paper</p>
      <p className="text-info ms-2">I can review it</p>
      <p className="ms-2">I prefer not to review it</p>
      <p className="text-danger ms-2">I have a conflict of interest</p>
      <Button className="ms-2" onClick={assignAutoHandler}>
        Make Paper Assignment
      </Button>
      <Table striped bordered size="sm" className="mt-2 mb-5">
        <thead>
          <tr>
            <th>Submission</th>
            {props.users
              .filter((user) => user.reviewer.idSection === props.page)
              .map((eachReviewer) => {
                return (
                  <th key={eachReviewer.idUser}>
                    {eachReviewer.name} {eachReviewer.surname}
                  </th>
                );
              })}
          </tr>
        </thead>
        <tbody className="">
          {props.papers
            .filter((paper) => paper.idSection === props.page)
            .map((eachPaper) => {
              return (
                <tr>
                  <td>{eachPaper.idPaper}</td>
                  {props.users
                    .filter((user) => user.reviewer.idSection === props.page)
                    .map((eachReviewer) => {
                      const alertVariant = getAlertVariant(
                        eachPaper.idPaper,
                        eachReviewer.idUser
                      );
                      const assignedMessage = getAssignedMessage(
                        eachPaper.idPaper,
                        eachReviewer.idUser
                      );
                      return (
                        <td key={`${eachPaper.idPaper}-${eachReviewer.userID}`}>
                          <Alert variant={alertVariant} className="text-center">
                            {assignedMessage}
                          </Alert>
                        </td>
                      );
                    })}
                </tr>
              );
            })}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>
            <Row>You successfully assigned papers to reviewers!</Row>
          </h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AssignPapersToReviewers;
