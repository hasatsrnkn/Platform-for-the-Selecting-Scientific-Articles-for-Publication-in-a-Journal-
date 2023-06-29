import { useRouter } from "next/router";
import {
  Button,
  Col,
  Row,
  Popover,
  OverlayTrigger,
  Alert,
  Modal,
  Form,
} from "react-bootstrap";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { API_GET_PAPER, API_REVIEWER_PUT_BID_LEVEL } from "../../pages/api/api";

const ReviewerPaperElement = (props) => {
  const token = useSelector((state) => state.auth.token);
  const userID = useSelector((state) => state.auth.userID);
  const router = useRouter();
  const [bidLevel, setBidLevel] = useState(
    props.paperItems?.find((item) => item.paperIdPaper === props.id)?.bidLevel ?? 0
  );
  const [show, setShow] = useState(false);
  console.log(props.paperItems);

  const bidChangeHandler = (event) => {
    event.preventDefault();
    fetch(API_REVIEWER_PUT_BID_LEVEL + userID, {
      method: "PUT",
      body: JSON.stringify({
        bidLevel: bidLevel,
        paperId: props.id,
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
        handleClose();
        console.log("PUT request was successful!");
      })
      .catch((err) => {
        console.error("Error occurred during PUT request:", err);
      });
  };

  const handleClose = () => {
    setShow(false);
    router.reload(window.location.pathname);
  };

  const downloadHandler = (event) => {
    event.preventDefault();
    console.log(API_GET_PAPER + props.id);
    fetch(API_GET_PAPER + props.id, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/pdf",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.blob();
        } else {
          return res.blob().then((data) => {
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
        const url = window.URL.createObjectURL(data);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "paper.pdf");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        console.log("POST request was successful!");
      })
      .catch((err) => {
        console.error("Error occurred during POST request:", err);
      });
  };

  const getVariant = () => {
    if (bidLevel == 0) {
      return "light";
    } else if (bidLevel == -2) {
      return "danger";
    } else if (bidLevel == 2) {
      return "info";
    } else {
      return "success";
    }
  };

  const getMessage = () => {
    if (bidLevel == 0) {
      return "I prefer not to review it";
    } else if (bidLevel == -2) {
      return "I have a conflict of interest";
    } else if (bidLevel == 2) {
      return "I can review it";
    } else {
      return "I want to review this paper";
    }
  };

  return (
    <tr>
      <td></td>
      <td>{props.id}</td>
      <td>{props.title}</td>
      <td>{props.authors}</td>
      <td>{props.doi}</td>
      <td>{props.pmid}</td>
      <td>{props.journalName}</td>
      <td>{props.journalIssue}</td>
      <td>
        <OverlayTrigger
          trigger="click"
          key="left"
          placement="left"
          overlay={
            <Popover id={`popover-positioned-left`}>
              <Popover.Header as="h3">{`Abstract`}</Popover.Header>
              <Popover.Body>
                <strong>{props.abstract}</strong>
              </Popover.Body>
            </Popover>
          }
        >
          <Button variant="secondary">See Abstract</Button>
        </OverlayTrigger>
      </td>
      <td>
      <Link href={`/papers/reviews/${props.id}`} passHref legacyBehavior>
        <Button>See Reviews</Button>
        </Link>
      </td>
      <td>
        <Button variant="success" onClick={downloadHandler}>
          Download Paper
        </Button>
      </td>
      <td>
        <Col className="d-flex">
          <Alert variant={getVariant()}>
            {getMessage()}{" "}
            <Alert.Link onClick={(e) => setShow(true)}>Change</Alert.Link>
          </Alert>
        </Col>
      </td>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Change Bid Level</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Form>
              <Row>
                <Box sx={{ width: 500 }}>
                  <FormControl fullWidth>
                    <InputLabel
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      Bid Level
                    </InputLabel>
                    <NativeSelect
                      defaultValue={bidLevel}
                      onChange={(event) => {
                        event.preventDefault();
                        setBidLevel(+event.target.value);
                      }}
                    >
                      <option value="0">I prefer not to review it</option>

                      <option value="-2">I have a conflict of interest</option>

                      <option value="2">I can review it</option>

                      <option value="3">I want to review this paper</option>
                    </NativeSelect>
                  </FormControl>
                </Box>
              </Row>
              <Row>
                <Col className="col-8">
                  <Button
                    variant="success"
                    className="mt-3"
                    type="submit"
                    onClick={bidChangeHandler}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </tr>
  );
};

export default ReviewerPaperElement;
