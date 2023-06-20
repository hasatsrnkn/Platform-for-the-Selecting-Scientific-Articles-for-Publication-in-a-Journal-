import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { useRouter } from "next/router";
import { Button, Modal, Row, Dropdown, DropdownButton } from "react-bootstrap";
import { useEffect, useState } from "react";
import Link from "next/link";
import { API_CHANGE_ROLE, API_DELETE_ACCOUNT } from "../../pages/api/api";
import { useSelector } from "react-redux";

const UserElement = (props) => {
  const [newRole, setNewRole] = useState();
  const token = useSelector((state) => state.auth.token);
  const userID = useSelector((state) => state.auth.userID);

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const router = useRouter();

  const roleHandler = (event) => {
    setNewRole(event.target.value);
    console.log(newRole);
  };

  const deleteAccountHandler = (event) => {
    event.preventDefault();
    console.log(API_DELETE_ACCOUNT + props.id);
    fetch(API_DELETE_ACCOUNT + props.id, {
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
        console.log("POST request was successful!", data);
        setShow2(true);
      })
      .catch((err) => {
        console.error("Error occurred during PUT request:", err);
      });
  };

  const handleClose = () => {
    setShow(false);
    router.reload(window.location.pathname);
  };

  const handleClose2 = () => {
    setShow2(false);
    router.reload(window.location.pathname);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    fetch(API_CHANGE_ROLE, {
      method: "PUT",
      body: JSON.stringify({
        userId: props.id,
        role: newRole,
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
    <tr>
      <td></td>
      <td>{props.id}</td>
      <td>{props.name}</td>
      <td>{props.surname}</td>
      <td>{props.username}</td>
      <td>{props.email}</td>
      <td>{props.role}</td>
      <td>
        <Link
          className=""
          href={`/profile/${props.id}`} //değiştir
          passHref
          legacyBehavior
        >
          <Button variant="success me-5">Profile</Button>
        </Link>
      </td>
      <td>
        <Box sx={{ width: 100 }}>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              New Role
            </InputLabel>
            <NativeSelect defaultValue={props.role} onChange={roleHandler}>
              <option value="selectionassistanteditor">SAE</option>
              <option value="reviewer">Reviewer</option>
              <option value="chiefeditor">CE</option>
              <option value="sectioneditor">SE</option>
              <option value="vicepresident">VP</option>
            </NativeSelect>
          </FormControl>
        </Box>
      </td>
      <td>
        <Button variant="success me-5" onClick={submitHandler}>
          Submit
        </Button>
      </td>
      <td>
        {userID != props.id && (
          <DropdownButton
            id="dropdown-item-button"
            title="Delete Account"
            variant="danger"
          >
            <Dropdown.ItemText>
              <strong>Are you sure?</strong>
            </Dropdown.ItemText>
            <Dropdown.Item as="button" onClick={deleteAccountHandler}>
              Yes
            </Dropdown.Item>
            <Dropdown.Item as="button">No</Dropdown.Item>
          </DropdownButton>
        )}
      </td>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>
            <Row>You successfully changed a role!</Row>
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
            <Row>You successfully deleted an account!</Row>
          </h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </tr>
  );
};

export default UserElement;
