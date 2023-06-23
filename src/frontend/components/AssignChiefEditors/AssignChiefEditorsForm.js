import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { useState, useEffect } from "react";
import { Button, Container, Row, Table, Modal } from "react-bootstrap";
import { useRouter } from "next/router";
import { API_GET_ALL_SECTIONS, API_PUT_CHIEF_EDITOR_SECTION } from "../../pages/api/api";

const AssignChiefEditorsForm = (props) => {
  const token = useSelector((state) => state.auth.token);
  const userID = useSelector((state) => state.auth.userID);
  const [tokenLoaded, setTokenLoaded] = useState(false); // New state to track token retrieval
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [sections, setSections] = useState(null);

  const [chiefEditorId1, setChiefEditorId1] = useState(props.users[0].id);
  const [chiefEditorId2, setChiefEditorId2] = useState(props.users[0].id);
  const [chiefEditorId3, setChiefEditorId3] = useState(props.users[0].id);
  const [chiefEditorId4, setChiefEditorId4] = useState(props.users[0].id);
  const [chiefEditorId5, setChiefEditorId5] = useState(props.users[0].id);
  const [chiefEditorId6, setChiefEditorId6] = useState(props.users[0].id);
  const [chiefEditorId7, setChiefEditorId7] = useState(props.users[0].id);
  const [chiefEditorId8, setChiefEditorId8] = useState(props.users[0].id);
  const [chiefEditorId9, setChiefEditorId9] = useState(props.users[0].id);
  const [chiefEditorId10, setChiefEditorId10] = useState(props.users[0].id);
  const [chiefEditorId11, setChiefEditorId11] = useState(props.users[0].id);
  const [chiefEditorId12, setChiefEditorId12] = useState(props.users[0].id);
  const [chiefEditorId13, setChiefEditorId13] = useState(props.users[0].id);

  const handleClose = () => {
    setShow(false);
    router.reload(window.location.pathname);
  };


  const chiefEditor1Handler = (event) => {
    setChiefEditorId1(+event.target.value);
    console.log("grade1 changed");
  };

  const chiefEditor2Handler = (event) => {
    setChiefEditorId2(+event.target.value);
    console.log("grade2 changed");
  };

  const chiefEditor3Handler = (event) => {
    setChiefEditorId3(+event.target.value);
    console.log("grade3 changed");
  };

  const chiefEditor4Handler = (event) => {
    setChiefEditorId4(+event.target.value);
    console.log("grade4 changed");
  };

  const chiefEditor5Handler = (event) => {
    setChiefEditorId5(+event.target.value);
    console.log("grade5 changed");
  };

  const chiefEditor6Handler = (event) => {
    setChiefEditorId6(+event.target.value);
    console.log("grade6 changed");
  };

  const chiefEditor7Handler = (event) => {
    setChiefEditorId7(+event.target.value);
    console.log("grade7 changed");
  };

  const chiefEditor8Handler = (event) => {
    setChiefEditorId8(+event.target.value);
    console.log("grade8 changed");
  };

  const chiefEditor9Handler = (event) => {
    setChiefEditorId9(+event.target.value);
    console.log("grade9 changed");
  };

  const chiefEditor10Handler = (event) => {
    setChiefEditorId10(+event.target.value);
    console.log("grade10 changed");
  };

  const chiefEditor11Handler = (event) => {
    setChiefEditorId11(+event.target.value);
    console.log("grade11 changed");
  };

  const chiefEditor12Handler = (event) => {
    setChiefEditorId12(+event.target.value);
    console.log("grade12 changed");
  };

  const chiefEditor13Handler = (event) => {
    setChiefEditorId13(+event.target.value);
    console.log("grade13 changed");
  };

  useEffect(() => {
    const fetchGradeSkills = async () => {
      console.log(API_GET_ALL_SECTIONS);

      if (!token) {
        // Token doesn't exist, handle the error condition
        router.push("/"); // Redirect to the login page or handle the error in a different way
        return;
      }

      try {
        const response = await fetch(API_GET_ALL_SECTIONS, {
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
        setSections([
          {
            name: "Bioinformatics and Translational Informatics",
            chiefEditorId: data.sections[0].idChiefEditor,
            chiefEditorHandler: chiefEditor1Handler,
          },
          {
            name: "Consumer Health Informatics",
            chiefEditorId: data.sections[1].idChiefEditor,
            chiefEditorHandler: chiefEditor2Handler,
          },
          {
            name: "Cancer Informatics",
            chiefEditorId: data.sections[2].idChiefEditor,
            chiefEditorHandler: chiefEditor3Handler,
          },
          {
            name: "Clinical Information Systems",
            chiefEditorId: data.sections[3].idChiefEditor,
            chiefEditorHandler: chiefEditor4Handler,
          },
          {
            name: "Clinical Research Informatics",
            chiefEditorId: data.sections[4].idChiefEditor,
            chiefEditorHandler: chiefEditor5Handler,
          },
          {
            name: "Decision Support",
            chiefEditorId: data.sections[5].idChiefEditor,
            chiefEditorHandler: chiefEditor6Handler,
          },
          {
            name: "Human Factors and Organizational Issues",
            chiefEditorId: data.sections[6].idChiefEditor,
            chiefEditorHandler: chiefEditor7Handler,
          },
          {
            name: "Health Information Exchange",
            chiefEditorId: data.sections[7].idChiefEditor,
            chiefEditorHandler: chiefEditor8Handler,
          },
          {
            name: "Knowledge Representation and Management",
            chiefEditorId: data.sections[8].idChiefEditor,
            chiefEditorHandler: chiefEditor9Handler,
          },
          {
            name: "Natural Language Processing",
            chiefEditorId: data.sections[9].idChiefEditor,
            chiefEditorHandler: chiefEditor10Handler,
          },
          {
            name: "Public Health and Epidemiology Informatics",
            chiefEditorId: data.sections[10].idChiefEditor,
            chiefEditorHandler: chiefEditor11Handler,
          },
          {
            name: "Sensor, Signal and Imaging Informatics",
            chiefEditorId: data.sections[11].idChiefEditor,
            chiefEditorHandler: chiefEditor12Handler,
          },
          {
            name: "Informatics for One Health",
            chiefEditorId: data.sections[12].idChiefEditor,
            chiefEditorHandler: chiefEditor13Handler,
          },
        ]);
        if (data.sections[0].idChiefEditor) {
          setChiefEditorId1(data.sections[0].idChiefEditor);
        }
        if (data.sections[1].idChiefEditor) {
          setChiefEditorId2(data.sections[1].idChiefEditor);
        }
        if (data.sections[2].idChiefEditor) {
          setChiefEditorId3(data.sections[2].idChiefEditor);
        }
        if (data.sections[3].idChiefEditor) {
          setChiefEditorId4(data.sections[3].idChiefEditor);
        }
        if (data.sections[4].idChiefEditor) {
          setChiefEditorId5(data.sections[4].idChiefEditor);
        }
        if (data.sections[5].idChiefEditor) {
          setChiefEditorId6(data.sections[5].idChiefEditor);
        }
        if (data.sections[6].idChiefEditor) {
          setChiefEditorId7(data.sections[6].idChiefEditor);
        }
        if (data.sections[7].idChiefEditor) {
          setChiefEditorId8(data.sections[7].idChiefEditor);
        }
        if (data.sections[8].idChiefEditor) {
          setChiefEditorId9(data.sections[8].idChiefEditor);
        }
        if (data.sections[9].idChiefEditor) {
          setChiefEditorId10(data.sections[9].idChiefEditor);
        }
        if (data.sections[10].idChiefEditor) {
          setChiefEditorId11(data.sections[10].idChiefEditor);
        }
        if (data.sections[11].idChiefEditor) {
          setChiefEditorId12(data.sections[11].idChiefEditor);
        }
        if (data.sections[12].idChiefEditor) {
          setChiefEditorId13(data.sections[12].idChiefEditor);
        }
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
      fetchGradeSkills();
    }
  }, [token, userID, tokenLoaded]);

  const submitHandler = (event) => {
    event.preventDefault();
    fetch(API_PUT_CHIEF_EDITOR_SECTION, {
      method: "PUT",
      body: JSON.stringify({
        chiefEditorId1: chiefEditorId1,
        chiefEditorId2: chiefEditorId2,
        chiefEditorId3: chiefEditorId3,
        chiefEditorId4: chiefEditorId4,
        chiefEditorId5: chiefEditorId5,
        chiefEditorId6: chiefEditorId6,
        chiefEditorId7: chiefEditorId7,
        chiefEditorId8: chiefEditorId8,
        chiefEditorId9: chiefEditorId9,
        chiefEditorId10: chiefEditorId10,
        chiefEditorId11: chiefEditorId11,
        chiefEditorId12: chiefEditorId12,
        chiefEditorId13: chiefEditorId13,
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

  if (sections === null) {
    return <div>Loading...</div>; // Show a loading indicator while fetching user data
  }

  return (
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
              <th width="300" style={{ width: "5vw" }} className="text-center">
                Chief Editor
              </th>
            </tr>
          </thead>
          <tbody>
            {sections.map((eachSection) => {
              const selectedUser = props.users.find(
                (user) => user.id === eachSection.idChiefEditor
              );
              return (
                <tr key={eachSection.name}>
                  <td className="text-center">{eachSection.name}</td>
                  <td className="d-flex justify-content-center align-items-center">
                    <Box sx={{ width: 150 }}>
                      <FormControl fullWidth>
                        <InputLabel
                          variant="standard"
                          htmlFor="uncontrolled-native"
                        >
                          Chief Editor
                        </InputLabel>
                        <NativeSelect
                          defaultValue={
                          eachSection.chiefEditorId
                          }
                          onChange={eachSection.chiefEditorHandler}
                        >
                          <option value={props.users[0].id}>
                            {props.users[0].user.name}{" "}
                            {props.users[0].user.surname}
                          </option>
                          {props.users[1] && (
                            <option value={props.users[1].id}>
                              {props.users[1].user.name}{" "}
                              {props.users[1].user.surname}
                            </option>
                          )}
                        </NativeSelect>
                      </FormControl>
                    </Box>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <div className="d-flex justify-content-center align-items-center mb-3">
          <Button size="lg" variant="success" onClick={submitHandler}>
            Submit
          </Button>
        </div>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>
            <Row>You successfully changed sections' chief editors!</Row>
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

export default AssignChiefEditorsForm;
