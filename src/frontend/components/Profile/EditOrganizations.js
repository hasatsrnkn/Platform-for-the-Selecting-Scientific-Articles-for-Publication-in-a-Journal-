import { Col, Row, Button, Modal, Form } from "react-bootstrap";
import Fab from "@mui/material/Fab";
import { useState } from "react";
import SchoolIcon from "@mui/icons-material/School";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {
  API_POST_NEW_ORGANIZATION,
  API_UPDATE_EMAILS,
} from "../../pages/api/api";
import { useRouter } from "next/router";

const EditOrganizations = (props) => {
  const [show, setShow] = useState(false);

  const userID = useSelector((state) => state.auth.userID);
  const token = useSelector((state) => state.auth.token);
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [newOrganizationName, setNewOrganizationName] = useState("");
  const [newOrganizationCountry, setNewOrganizationCountry] = useState("");
  const [newOrganizationEmail, setNewOrganizationEmail] = useState("");

  const handleClose = () => {
    setShow(false);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const changeEmailsHandler = (event) => {
    event.preventDefault();
    const changedEmails = [];

    // Iterate over the organizationItems and check for changes in email
    props.organizationItems.forEach((organizationItem) => {
      const organizationId = organizationItem.organizationIdOrganization;
      const currentEmail = organizationItem.organizationEmail;
      const newEmail = document.getElementById(`email-${organizationId}`).value;

      if (currentEmail !== newEmail) {
        changedEmails.push({
          organizationId,
          organizationName: props.organizations.find(
            (org) => org.idOrganization === organizationId
          ).name,
          currentEmail,
          newEmail,
        });
      }
    });

    // Use the changedEmails array as needed (e.g., send it to the server, log it, etc.)
    console.log(changedEmails);

    fetch(API_UPDATE_EMAILS, {
      method: "PUT",
      body: JSON.stringify({ changedEmails: changedEmails, userId: userID }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Email update failed!";
            setSuccessMessage("");
            setErrorMessage(data.message);
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        // Handle the successful response
        console.log("Emails updated successfully!", data);
        setErrorMessage("");
        setSuccessMessage("Emails updated successfully!");
        setTimeout(() => {
          router.reload(window.location.pathname);
        }, 2000);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error("Error occurred during email update:", error);
      });
  };

  const editOrganizationHandler = (event) => {
    event.preventDefault();
    setShow(true);
  };

  const addNewOrganizatinoHandler = (event) => {
    event.preventDefault();
    console.log(newOrganizationName);
    console.log(newOrganizationCountry);
    console.log(newOrganizationEmail);
    fetch(API_POST_NEW_ORGANIZATION, {
      method: "POST",
      body: JSON.stringify({
        userId: userID,
        organizationName: newOrganizationName,
        organizationCountry: newOrganizationCountry,
        organizationEmail: newOrganizationEmail,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Post failed!";
            setSuccessMessage("");
            setErrorMessage(data.message);
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        // Handle the successful response
        console.log("POST request was successful!", data);
        setErrorMessage("");
        setSuccessMessage("Added the organization successfully!");
        setTimeout(() => {
          router.reload(window.location.pathname);
        }, 2000);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error("Error occurred during POST request:", error);
      });
  };

  return (
    <div>
      <Fab aria-label="edit" onClick={editOrganizationHandler}>
        <SchoolIcon fontSize="large"></SchoolIcon>
      </Fab>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Edit Organizations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {props.organizations && (
              <Form>
                {props.organizations.map((organization) => {
                  return (
                    <Row key={organization.idOrganization}>
                      {props.organizationItems.map((organizationItem) => {
                        if (
                          organizationItem.organizationIdOrganization ==
                          organization.idOrganization
                        ) {
                          return (
                            <>
                              <Col className="col-6">
                                <Form.Group>
                                  <Form.Label>Organization Name</Form.Label>
                                  <Form.Control
                                    id={organization.idOrganization}
                                    name="organizationName"
                                    type="text"
                                    defaultValue={organization.name}
                                    disabled
                                    readOnly
                                  ></Form.Control>
                                </Form.Group>
                              </Col>
                              <Col className="col-6">
                                <Form.Group>
                                  <Form.Label>Email</Form.Label>
                                  <Form.Control
                                    id={`email-${organization.idOrganization}`}
                                    name="email"
                                    type="email"
                                    defaultValue={
                                      organizationItem.organizationEmail
                                    }
                                    required
                                  ></Form.Control>
                                </Form.Group>
                              </Col>
                            </>
                          );
                        }
                      })}
                    </Row>
                  );
                })}
                {props.organizations.length != 0 && (
                  <Button
                    type="submit"
                    variant="success"
                    className="mt-2"
                    onClick={changeEmailsHandler}
                  >
                    Submit
                  </Button>
                )}
              </Form>
            )}

            <Form>
              <Row className="mt-3">
                <strong>Add Organization</strong>
              </Row>
              <Row className="mt-2">
                <Col className="col-6">
                  <Autocomplete
                    id="add-organization-name"
                    freeSolo
                    onChange={(event, value) => setNewOrganizationName(value)}
                    options={Array.from(
                      new Set(
                        props.allOrganizations.map(
                          (organization) => organization.name
                        )
                      )
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        label="Organization"
                        onChange={({ target }) =>
                          setNewOrganizationName(target.value)
                        }
                      />
                    )}
                  />
                </Col>
                <Col className="col-6">
                  <Autocomplete
                    id="add-organization-country"
                    freeSolo
                    
                    options={Array.from(
                      new Set(
                        props.allOrganizations.map(
                          (organization) => organization.country
                        )
                      )
                    )}
                    onChange={(event, value) =>
                      setNewOrganizationCountry(value)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        label="Country"
                        onChange={({ target }) =>
                          setNewOrganizationCountry(target.value)
                        }
                      />
                    )}
                  />
                </Col>
              </Row>
              <Row>
                <Col className="col-12 mt-3">
                  <TextField
                    id="add-organization-email"
                    label="Your E-mail"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={({ target }) =>
                      setNewOrganizationEmail(target.value)
                    }
                  />
                </Col>
              </Row>
              <Button
                variant="success"
                className="mt-2"
                onClick={addNewOrganizatinoHandler}
              >
                Submit
              </Button>
            </Form>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <div className="me-3 text-danger">{errorMessage}</div>
          <div className="me-3 text-success">{successMessage}</div>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditOrganizations;
