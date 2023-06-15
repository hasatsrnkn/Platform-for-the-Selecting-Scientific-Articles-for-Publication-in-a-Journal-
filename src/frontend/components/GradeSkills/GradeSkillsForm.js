import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { useState, useEffect } from "react";
import { Button, Container, Row, Table, Modal } from "react-bootstrap";
import {
  API_REVIEWER_GRADE,
  API_REVIEWER_GET_GRADES,
} from "../../pages/api/api";
import { useRouter } from "next/router";

const GradeSkillsForm = (props) => {
  const token = useSelector((state) => state.auth.token);
  const userID = useSelector((state) => state.auth.userID);
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [grades, setGrades] = useState(null);
  const [tokenLoaded, setTokenLoaded] = useState(false); // New state to track token retrieval

  const [grade1, setGrade1] = useState(0);
  const [grade2, setGrade2] = useState(0);
  const [grade3, setGrade3] = useState(0);
  const [grade4, setGrade4] = useState(0);
  const [grade5, setGrade5] = useState(0);
  const [grade6, setGrade6] = useState(0);
  const [grade7, setGrade7] = useState(0);
  const [grade8, setGrade8] = useState(0);
  const [grade9, setGrade9] = useState(0);
  const [grade10, setGrade10] = useState(0);
  const [grade11, setGrade11] = useState(0);
  const [grade12, setGrade12] = useState(0);
  const [grade13, setGrade13] = useState(0);

  const handleClose = () => {
    setShow(false);
    router.reload(window.location.pathname);
  };

  const grade1Handler = (event) => {
    setGrade1(+event.target.value);
    console.log("grade1 changed");
  };

  const grade2Handler = (event) => {
    setGrade2(+event.target.value);
    console.log("grade2 changed");
  };

  const grade3Handler = (event) => {
    setGrade3(+event.target.value);
    console.log("grade3 changed");
  };

  const grade4Handler = (event) => {
    setGrade4(+event.target.value);
    console.log("grade4 changed");
  };

  const grade5Handler = (event) => {
    setGrade5(+event.target.value);
    console.log("grade5 changed");
  };

  const grade6Handler = (event) => {
    setGrade6(+event.target.value);
    console.log("grade6 changed");
  };

  const grade7Handler = (event) => {
    setGrade7(+event.target.value);
    console.log("grade7 changed");
  };

  const grade8Handler = (event) => {
    setGrade8(+event.target.value);
    console.log("grade8 changed");
  };

  const grade9Handler = (event) => {
    setGrade9(+event.target.value);
    console.log("grade9 changed");
  };

  const grade10Handler = (event) => {
    setGrade10(+event.target.value);
    console.log("grade10 changed");
  };

  const grade11Handler = (event) => {
    setGrade11(+event.target.value);
    console.log("grade11 changed");
  };

  const grade12Handler = (event) => {
    setGrade12(+event.target.value);
    console.log("grade12 changed");
  };

  const grade13Handler = (event) => {
    setGrade13(+event.target.value);
    console.log("grade13 changed");
  };

  
  

  useEffect(() => {
    const fetchProfileData = async () => {
      console.log(API_REVIEWER_GET_GRADES + userID);

      if (!token) {
        // Token doesn't exist, handle the error condition
        router.push("/"); // Redirect to the login page or handle the error in a different way
        return;
      }

      try {
        const response = await fetch(API_REVIEWER_GET_GRADES + userID, {
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
        setGrades([
          {
            name: "Bioinformatics and Translational Informatics",
            grade: data.grade.grade1,
            gradeHandler: grade1Handler,
          },
          {
            name: "Consumer Health Informatics",
            grade: data.grade.grade2,
            gradeHandler: grade2Handler,
          },
          {
            name: "Cancer Informatics",
            grade: data.grade.grade3,
            gradeHandler: grade3Handler,
          },
          {
            name: "Clinical Information Systems",
            grade: data.grade.grade4,
            gradeHandler: grade4Handler,
          },
          {
            name: "Clinical Research Informatics",
            grade: data.grade.grade5,
            gradeHandler: grade5Handler,
          },
          {
            name: "Decision Support",
            grade: data.grade.grade6,
            gradeHandler: grade6Handler,
          },
          {
            name: "Human Factors and Organizational Issues",
            grade: data.grade.grade7,
            gradeHandler: grade7Handler,
          },
          {
            name: "Health Information Exchange",
            grade: data.grade.grade8,
            gradeHandler: grade8Handler,
          },
          {
            name: "Knowledge Representation and Management",
            grade: data.grade.grade9,
            gradeHandler: grade9Handler,
          },
          {
            name: "Natural Language Processing",
            grade: data.grade.grade10,
            gradeHandler: grade10Handler,
          },
          {
            name: "Public Health and Epidemiology Informatics",
            grade: data.grade.grade11,
            gradeHandler: grade11Handler,
          },
          {
            name: "Sensor, Signal and Imaging Informatics",
            grade: data.grade.grade12,
            gradeHandler: grade12Handler,
          },
          {
            name: "Informatics for One Health",
            grade: data.grade.grade13,
            gradeHandler: grade13Handler,
          },
        ])
        setGrade1(data.grade.grade1);
        setGrade2(data.grade.grade2);
        setGrade3(data.grade.grade3);
        setGrade4(data.grade.grade4);
        setGrade5(data.grade.grade5);
        setGrade6(data.grade.grade6);
        setGrade7(data.grade.grade7);
        setGrade8(data.grade.grade8);
        setGrade9(data.grade.grade9);
        setGrade10(data.grade.grade10);
        setGrade11(data.grade.grade11);
        setGrade12(data.grade.grade12);
        setGrade13(data.grade.grade13);
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
    event.preventDefault();
    fetch(API_REVIEWER_GRADE + userID, {
      method: "PUT",
      body: JSON.stringify({
        userId: userID,
        grade1: grade1,
        grade2: grade2,
        grade3: grade3,
        grade4: grade4,
        grade5: grade5,
        grade6: grade6,
        grade7: grade7,
        grade8: grade8,
        grade9: grade9,
        grade10: grade10,
        grade11: grade11,
        grade12: grade12,
        grade13: grade13,
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

  if (!tokenLoaded) {
    return <div>Loading...</div>; // Show a loading indicator while retrieving the token
  }

  if (grades === null) {
    return <div>Loading...</div>; // Show a loading indicator while fetching user data
  }

  return (
    <div className="mt-3">
      <h1 className="text-center">Skills</h1>
      <h3 className="text-center">0 means "not competent at all"</h3>
      <h3 className="text-center">10 means "expert"</h3>
      <div className="d-flex justify-content-center align-items-center p-5">
        <Container
          style={{
            width: "40vw",
          }}
        >
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th width="600" className="text-center">
                  Section
                </th>
                <th
                  width="300"
                  style={{ width: "5vw" }}
                  className="text-center"
                >
                  Grade
                </th>
              </tr>
            </thead>
            <tbody>

              {grades.map((eachSection) => {
                return (
                  <tr key={grades.name}>
                    <td className="text-center">{eachSection.name}</td>
                    <td className="d-flex justify-content-center align-items-center">
                      <Box sx={{ width: 100 }}>
                        <FormControl fullWidth>
                          <InputLabel
                            variant="standard"
                            htmlFor="uncontrolled-native"
                          >
                            Grade
                          </InputLabel>
                          <NativeSelect
                            defaultValue={eachSection.grade}
                            onChange={eachSection.gradeHandler}
                          >
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                          </NativeSelect>
                        </FormControl>
                      </Box>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </div>
      <div className="d-flex justify-content-center align-items-center mb-3">
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
            <Row>You successfully changed your skills!</Row>
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

export default GradeSkillsForm;
