import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { useRouter } from "next/router";
import { Button, Modal, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import Link from "next/link";
import { API_CHANGE_SECTION_EDITOR_SECTION } from "../../pages/api/api";
import { useSelector } from "react-redux";

const SectionEditorElement = (props) => {
  const [newSection, setNewSection] = useState();
  const token = useSelector((state) => state.auth.token);
  const [show, setShow] = useState(false);
  const router = useRouter();

  const sectionHandler = (event) => {
    setNewSection(+event.target.value);
    console.log(newSection);
  };

  const handleClose = () => {
    setShow(false);
    router.reload(window.location.pathname)
  };

  const submitHandler = (event) => {
    event.preventDefault();
    fetch(API_CHANGE_SECTION_EDITOR_SECTION, {
      method: "PUT",
      body: JSON.stringify({
        userId: props.id,
        sectionId: newSection,
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
      <td>{props.section ? props.section.name : ""}</td>
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
              New Section
            </InputLabel>
            <NativeSelect
              defaultValue={props.section ? props.section.idSection : "1"}
              onChange={sectionHandler}
            >
              <option value="1">
                Bioinformatics and Translational Informatics
              </option>
              <option value="2">Consumer Health Informatics</option>
              <option value="3">Cancer Informatics</option>
              <option value="4">Clinical Information Systems</option>
              <option value="5">Clinical Research Informatics</option>
              <option value="6">Decision Support</option>
              <option value="7">Human Factors and Organizational Issues</option>
              <option value="8">Health Information Exchange</option>
              <option value="9">Knowledge Representation and Management</option>
              <option value="10">Natural Language Processing</option>
              <option value="11">
                Public Health and Epidemiology Informatics
              </option>
              <option value="12">Sensor, Signal and Imaging Informatics</option>
              <option value="13">Informatics for One Health</option>
            </NativeSelect>
          </FormControl>
        </Box>
      </td>
      <td>
        <Button variant="success me-5" onClick={submitHandler} >
          Submit
        </Button>
      </td>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>
            <Row>You successfully changed the section!</Row>
          </h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </tr>
  );
};

export default SectionEditorElement;
