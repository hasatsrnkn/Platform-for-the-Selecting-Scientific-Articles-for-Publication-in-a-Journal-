import { Form, Row, Col, Button, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { API_POST_PAPER, API_GET_SECTION_ID } from "../../pages/api/api";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

const UploadFileForm = (props) => {
  const userType = useSelector((state) => state.auth.type);
  const userID = useSelector((state) => state.auth.userID);
  const token = useSelector((state) => state.auth.token);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [doi, setDoi] = useState("");
  const [pmid, setPmid] = useState("");
  const [journalName, setJournalName] = useState("");
  const [journalIssue, setJournalIssue] = useState("");
  const [abstract, setAbstract] = useState("");
  const [file, setFile] = useState(null);
  const [sectionId, setSectionId] = useState("");

  const [titleIsInvalid, setTitleIsInvalid] = useState(false);
  const [authorsIsInvalid, setAuthorsIsInvalid] = useState(false);
  const [doiIsInvalid, setDoiIsInvalid] = useState(false);
  const [pmidIsInvalid, setPmidIsInvalid] = useState(false);
  const [journalNameIsInvalid, setJournalNameIsInvalid] = useState(false);
  const [journalIssueIsInvalid, setJournalIssueIsInvalid] = useState(false);
  const [abstractIsInvalid, setAbstractIsInvalid] = useState(false);
  const [fileIsInvalid, setFileIsInvalid] = useState(false);
  const [tokenLoaded, setTokenLoaded] = useState(false); // New state to track token retrieval
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    router.reload(window.location.pathname);
  };
  const titleHandler = (event) => {
    setTitle(event.target.value);
    setTitleIsInvalid(false);
  };

  const authorsHandler = (event) => {
    setAuthors(event.target.value);
    setAuthorsIsInvalid(false);
  };

  const doiHandler = (event) => {
    setDoi(event.target.value);
    setDoiIsInvalid(false);
  };

  const pmidHandler = (event) => {
    setPmid(event.target.value);
    setPmidIsInvalid(false);
  };

  const journalNameHandler = (event) => {
    setJournalName(event.target.value);
    setJournalNameIsInvalid(false);
  };

  const journalIssueHandler = (event) => {
    setJournalIssue(event.target.value);
    setJournalIssueIsInvalid(false);
  };

  const abstractHandler = (event) => {
    setAbstract(event.target.value);
    setAbstractIsInvalid(false);
  };

  const fileHandler = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    setFileIsInvalid(false);
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      console.log(API_GET_SECTION_ID + userID);

      if (!token) {
        // Token doesn't exist, handle the error condition
        router.push("/"); // Redirect to the login page or handle the error in a different way
        return;
      }

      try {
        console.log(userID);
        const response = await fetch(API_GET_SECTION_ID + userID, {
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
        console.log("section id is " + data.sectionId);
        setSectionId(data.sectionId);
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

  const submitHandler = (event) => {
    if (
      title == "" ||
      authors == "" ||
      doi == "" ||
      pmid == "" ||
      journalName == "" ||
      journalIssue == "" ||
      abstract == "" ||
      file == null
    ) {
      if (title == "") {
        setTitleIsInvalid(true);
      }
      if (authors == "") {
        setAuthorsIsInvalid(true);
      }
      if (doi == "") {
        setDoiIsInvalid(true);
      }
      if (pmid == "") {
        setPmidIsInvalid(true);
      }
      if (journalName == "") {
        setJournalNameIsInvalid(true);
      }
      if (journalIssue == "") {
        setJournalIssueIsInvalid(true);
      }
      if (abstract == "") {
        setAbstractIsInvalid(true);
      }
      if (file == null) {
        setFileIsInvalid(true);
      }
    } else {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("authors", authors);
      formData.append("doi", doi);
      formData.append("pmid", pmid);
      formData.append("journalName", journalName);
      formData.append("journalIssue", journalIssue);
      formData.append("abstract", abstract);
      formData.append("paperFile", file);
      formData.append("idSection", sectionId);
      console.log(formData);
      fetch(API_POST_PAPER, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Post failed!";

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
          setShow(true);
        })
        .catch((error) => {
          // Handle any errors that occurred during the request
          console.error("Error occurred during POST request:", error);
        });
    }
  };

  return (
    <div>
      {sectionId && (
        <div>
          <Form enctype="multipart/form-data">
            <Row className="mt-3">
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  id="title"
                  name="title"
                  type="text"
                  onChange={titleHandler}
                  isInvalid={titleIsInvalid}
                ></Form.Control>
              </Form.Group>
            </Row>
            <Row className="mt-3">
              <Form.Group>
                <Form.Label>Authors</Form.Label>
                <Form.Control
                  id="authors"
                  name="authors"
                  type="text"
                  onChange={authorsHandler}
                  isInvalid={authorsIsInvalid}
                ></Form.Control>
                <Form.Text className="text-muted">
                  Please separate authors by comma ","
                </Form.Text>
              </Form.Group>
            </Row>
            <Row className="mt-3">
              <Col className="col-6">
                <Form.Group>
                  <Form.Label>DOI</Form.Label>
                  <Form.Control
                    id="doi"
                    name="doi"
                    type="text"
                    onChange={doiHandler}
                    isInvalid={doiIsInvalid}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col className="col-6">
                <Form.Group>
                  <Form.Label>PMID</Form.Label>
                  <Form.Control
                    id="pmid"
                    name="pmid"
                    type="text"
                    onChange={pmidHandler}
                    isInvalid={pmidIsInvalid}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col className="col-6">
                <Form.Group>
                  <Form.Label>Journal Name</Form.Label>
                  <Form.Control
                    id="idJournal"
                    name="idJournal"
                    type="text"
                    onChange={journalNameHandler}
                    isInvalid={journalNameIsInvalid}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col className="col-6">
                <Form.Group>
                  <Form.Label>Journal Issue</Form.Label>
                  <Form.Control
                    id="idJournalIssue"
                    name="idJournalIssue"
                    type="text"
                    onChange={journalIssueHandler}
                    isInvalid={journalIssueIsInvalid}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-3">
              <Form.Group>
                <Form.Label>Abstract</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  onChange={abstractHandler}
                  isInvalid={abstractIsInvalid}
                />
              </Form.Group>
            </Row>

            <Row className="mt-3">
              <Form.Group controlId="paperFile" className="mb-3">
                <Form.Label>PDF of the paper</Form.Label>
                <Form.Control
                  type="file"
                  name="paperFile"
                  accept=".pdf"
                  onChange={fileHandler}
                  isInvalid={fileIsInvalid}
                />
              </Form.Group>
            </Row>
          </Form>
          <div className="d-flex justify-content-center align-items-center p-2">
            <Button size="lg" variant="success" onClick={submitHandler}>
              Submit
            </Button>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h5>
                <Row>You successfully uploaded a file!</Row>
              </h5>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
      {!sectionId && (<h2>You are not assigned to any section yet</h2>)}
    </div>
  );
};
export default UploadFileForm;
