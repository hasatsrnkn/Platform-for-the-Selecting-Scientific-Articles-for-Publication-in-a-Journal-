import { Button, Col, Container, Row, Modal} from "react-bootstrap";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { API_GET_ONE_REVIEW, API_MAKE_FULL_REVIEW } from "../../pages/api/api";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";


const FullReviewForm = (props) => {
  const [topicImportance, setTopicImportance] = useState(10);
  const [scientificPracticalImpact, setScientificPracticalImpact] = useState(20);
  const [scientificContent, setScientificContent] = useState(20);
  const [originality, setOriginality] = useState(20);
  const [literature, setLiterature] = useState(20);
  const [presentation, setPresentation] = useState(10);
  const [include, setInclude] = useState(100);
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const userID = useSelector((state) => state.auth.userID);

  const router = useRouter();
  const [tokenLoaded, setTokenLoaded] = useState(false); // New state to track token retrieval


  const handleClose = () => {
    setShow(false);
    router.reload(window.location.pathname);
  };


  const submitHandler = (event) => {
    event.preventDefault();

    if (!((include == -50 || include == -100) && comment == "")) {
      fetch(API_MAKE_FULL_REVIEW, {
        method: "PUT",
        body: JSON.stringify({
          userId: props.userId,
          paperId: props.paperId,
          topicImportance: topicImportance,
          scientificContent: scientificContent,
          scientificPracticalImpact: scientificPracticalImpact,
          originality: originality,
          literature: literature,
          presentation: presentation,
          include: include,
          comment: comment,
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
    }
  };

  useEffect(() => {
    const fetchFullReview = async () => {
      if (!token) {
        // Token doesn't exist, handle the error condition
        router.push("/"); // Redirect to the login page or handle the error in a different way
        return;
      }

      if (!userID || !props.paperId) {
        return;
      }

      console.log(API_GET_ONE_REVIEW + userID + "/" + props.paperId);
      try {
        const response = await fetch(
          API_GET_ONE_REVIEW + userID + "/" + props.paperId,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

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
        if(data.review != null) {
          setTopicImportance(data.review.topicImportance);
          setScientificContent(data.review.scientificContent);
          setScientificPracticalImpact(data.review.scientificPracticalImpact);
          setComment(data.review.comment);
          setInclude(data.review.include);
          setLiterature(data.review.literature);
          setOriginality(data.review.originality);
          setPresentation(data.review.presentation);
        }
      
      } catch (err) {+
        alert(err.message);
      }
    };

    // Check if the token is loaded, if not, setTokenLoaded to true
    if (!tokenLoaded && token) {
      setTokenLoaded(true);
    }

    // If the token is loaded, fetch the profile data
    if (tokenLoaded) {
      fetchFullReview();
    }
  }, [token, tokenLoaded, userID, props.paperId] );

  return (
    <div className="d-flex justify-content-center align-items-center p-4">
      <Container
        style={{
          width: "45vw",
        }}
      >
        <Col className="mt-2 d-flex justify-content-center">
          <Col className="col-8 d-flex align-items-center">
            <h5>Topic's importance to Medical and Health Informatics</h5>
          </Col>
          <Col className="col-4">
            <Box sx={{ width: 100 }}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Value
                </InputLabel>
                <NativeSelect
                  onChange={(event) => {
                    event.preventDefault();
                    setTopicImportance(+event.target.value);
                  }}
                  value={topicImportance}
                >
                  <option value="10">10</option>
                  <option value="9">9</option>
                  <option value="8">8</option>
                  <option value="7">7</option>
                  <option value="6">6</option>
                  <option value="5">5</option>
                  <option value="4">4</option>
                  <option value="3">3</option>
                  <option value="2">2</option>
                  <option value="1">1</option>
                  <option value="0">0</option>
                </NativeSelect>
              </FormControl>
            </Box>
          </Col>
        </Col>
        <hr></hr>
        <Col className="mt-2 d-flex justify-content-center">
          <Col className="col-8 d-flex align-items-center">
            <h5>
              Scientific and/or practical impact of the paper to the topic
            </h5>
          </Col>
          <Col className="col-4">
            <Box sx={{ width: 100 }}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Value
                </InputLabel>
                <NativeSelect
                  onChange={(event) => {
                    event.preventDefault();
                    setScientificPracticalImpact(+event.target.value);
                  }}
                  value={scientificPracticalImpact}
                >
                  <option value="20">20</option>
                  <option value="18">18</option>
                  <option value="16">16</option>
                  <option value="14">14</option>
                  <option value="12">12</option>
                  <option value="10">10</option>
                  <option value="8">8</option>
                  <option value="6">6</option>
                  <option value="4">4</option>
                  <option value="2">2</option>
                  <option value="0">0</option>
                </NativeSelect>
              </FormControl>
            </Box>
          </Col>
        </Col>
        <hr></hr>
        <Col className="mt-2 d-flex justify-content-center">
          <Col className="col-8 d-flex align-items-center">
            <h5>Quality of scientific and/or technical content</h5>
          </Col>
          <Col className="col-4">
            <Box sx={{ width: 100 }}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Value
                </InputLabel>
                <NativeSelect
                  onChange={(event) => {
                    event.preventDefault();
                    setScientificContent(+event.target.value);
                  }}
                  value={scientificContent}
                >
                  <option value="20">20</option>
                  <option value="18">18</option>
                  <option value="16">16</option>
                  <option value="14">14</option>
                  <option value="12">12</option>
                  <option value="10">10</option>
                  <option value="8">8</option>
                  <option value="6">6</option>
                  <option value="4">4</option>
                  <option value="2">2</option>
                  <option value="0">0</option>
                </NativeSelect>
              </FormControl>
            </Box>
          </Col>
        </Col>
        <hr></hr>
        <Col className="mt-2 d-flex justify-content-center">
          <Col className="col-8 d-flex align-items-center">
            <h5>Originality and innovativeness</h5>
          </Col>
          <Col className="col-4">
            <Box sx={{ width: 100 }}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Value
                </InputLabel>
                <NativeSelect
                  onChange={(event) => {
                    event.preventDefault();
                    setOriginality(+event.target.value);
                  }}
                  value={originality}
                >
                  <option value="20">20</option>
                  <option value="18">18</option>
                  <option value="16">16</option>
                  <option value="14">14</option>
                  <option value="12">12</option>
                  <option value="10">10</option>
                  <option value="8">8</option>
                  <option value="6">6</option>
                  <option value="4">4</option>
                  <option value="2">2</option>
                  <option value="0">0</option>
                </NativeSelect>
              </FormControl>
            </Box>
          </Col>
        </Col>
        <hr></hr>
        <Col className="mt-2 d-flex justify-content-center">
          <Col className="col-8 d-flex align-items-center">
            <h5>Coverage of related literature</h5>
          </Col>
          <Col className="col-4">
            <Box sx={{ width: 100 }}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Value
                </InputLabel>
                <NativeSelect
                  onChange={(event) => {
                    event.preventDefault();
                    setLiterature(+event.target.value);
                  }}
                  value={literature}
                >
                  <option value="20">20</option>
                  <option value="18">18</option>
                  <option value="16">16</option>
                  <option value="14">14</option>
                  <option value="12">12</option>
                  <option value="10">10</option>
                  <option value="8">8</option>
                  <option value="6">6</option>
                  <option value="4">4</option>
                  <option value="2">2</option>
                  <option value="0">0</option>
                </NativeSelect>
              </FormControl>
            </Box>
          </Col>
        </Col>
        <hr></hr>
        <Col className="mt-2 d-flex justify-content-center">
          <Col className="col-8 d-flex align-items-center">
            <h5>Organisation and clarity of presentation</h5>
          </Col>
          <Col className="col-4">
            <Box sx={{ width: 100 }}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Value
                </InputLabel>
                <NativeSelect
                  onChange={(event) => {
                    event.preventDefault();
                    setPresentation(+event.target.value);
                  }}
                  value={presentation}
                >
                  <option value="10">10</option>
                  <option value="9">9</option>
                  <option value="8">8</option>
                  <option value="7">7</option>
                  <option value="6">6</option>
                  <option value="5">5</option>
                  <option value="4">4</option>
                  <option value="3">3</option>
                  <option value="2">2</option>
                  <option value="1">1</option>
                  <option value="0">0</option>
                </NativeSelect>
              </FormControl>
            </Box>
          </Col>
        </Col>
        <hr></hr>
        <Col className="mt-2 d-flex justify-content-center">
          <Col className="col-8 d-flex align-items-center">
            <h5>Include in Yearbook</h5>
          </Col>
          <Col className="col-4">
            <Box sx={{ width: 400 }}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Value
                </InputLabel>
                <NativeSelect
                  onChange={(event) => {
                    event.preventDefault();
                    setInclude(+event.target.value);
                  }}
                  value={include}
                >
                  <option value="100">Yes</option>
                  <option value="50">Maybe Yes</option>
                  <option value="0">
                    I do not feel competent for this paper
                  </option>
                  <option value="-50">Maybe No</option>
                  <option value="-100">No</option>
                </NativeSelect>
                <FormHelperText>
                  Yes: 100, Maybe Yes: 50, Maybe No: -50, No: -100
                </FormHelperText>
              </FormControl>
            </Box>
          </Col>
        </Col>
        <hr></hr>
        <Col className="mt-2">
          <Row>
            <h5>Your comment (required in case of 'maybe no' or 'no')</h5>
          </Row>
          <Row>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={4}
              value={comment}
              error={(include == -50 || include == -100) && comment == ""}
              onChange={(event) => {
                event.preventDefault();
                setComment(event.target.value);
              }}
            />
          </Row>
        </Col>
        <Col className="mt-2 d-flex justify-content-center">
          <Button size="lg" variant="success" onClick={submitHandler}>
            Submit
          </Button>
        </Col>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>
            <Row>You successfully submitted a review!</Row>
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

export default FullReviewForm;
