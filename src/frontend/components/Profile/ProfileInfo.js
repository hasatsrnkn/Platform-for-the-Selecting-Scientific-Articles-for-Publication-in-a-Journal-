import {
  Card,
  Col,
  Row,
  Button,
  Modal,
  Form,
  ListGroup,
} from "react-bootstrap";
import Link from "next/link";

import { useState, useEffect } from "react";
import EditOrganizations from "./EditOrganizations";
import { API_GET_ALL_ORGANIZATIONS } from "../../pages/api/api";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import EditProfile from "./EditProfile";

const ProfileInfo = (props) => {
  const nameSurname = props.name + " " + props.surname;

  const token = useSelector((state) => state.auth.token);
  const router = useRouter();
  const [tokenLoaded, setTokenLoaded] = useState(false); // New state to track token retrieval
  const [organizations, setOrganizations] = useState(null);

  useEffect(() => {
    const fetchOrganizations = async () => {
      console.log(API_GET_ALL_ORGANIZATIONS);

      if (!token) {
        // Token doesn't exist, handle the error condition
        router.push("/"); // Redirect to the login page or handle the error in a different way
        return;
      }

      try {
        const response = await fetch(API_GET_ALL_ORGANIZATIONS, {
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
        setOrganizations(data.organizations);
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
      fetchOrganizations();
    }
  }, [token, tokenLoaded]);

  if (!tokenLoaded) {
    return <div>Loading...</div>; // Show a loading indicator while retrieving the token
  }

  if (organizations === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Card style={{ width: "40rem" }}>
        <Card.Header className="text-center" as="h5">
          {props.type}{" "}
        </Card.Header>
        <Card.Body>
          <Card.Title className="text-center">
            <h1>{nameSurname}</h1>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted text-center">
            {props.username}
          </Card.Subtitle>
          <Row className="text-center">
            <strong>ID: {props.id}</strong>
          </Row>
          <Row className="text-center">
            <strong>Main E-Mail: {props.email} </strong>
          </Row>
          <hr></hr>
          {props.organizations && (
            <ListGroup className="list-group-flush text-center">
              {props.organizations.map((organization) => {
                return (
                  <ListGroup.Item key={organization.idOrganization}>
                    {props.organizationItems.map((organizationItem) => {
                      if (
                        organizationItem.organizationIdOrganization ==
                        organization.idOrganization
                      ) {
                        return (
                          <>
                            {" "}
                            {organization.name} :{" "}
                            {organizationItem.organizationEmail}
                          </>
                        );
                      }
                    })}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          )}
          {props.isAuth && (
            <Row>
              <Col className="d-flex justify-content-start">
                <EditProfile
                  email={props.email}
                  name={props.name}
                  surname={props.surname}
                ></EditProfile>
              </Col>
              <Col className="d-flex justify-content-end">
                <EditOrganizations
                  organizations={props.organizations}
                  organizationItems={props.organizationItems}
                  allOrganizations={organizations}
                ></EditOrganizations>
              </Col>
            </Row>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProfileInfo;
