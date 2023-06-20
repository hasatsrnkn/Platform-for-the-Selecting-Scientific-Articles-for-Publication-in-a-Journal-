import { Button, ButtonGroup, ButtonToolbar, Row, Col } from "react-bootstrap";
import NavbarMenu from "../../../components/UI/NavbarMenu";
import { useState, useEffect } from "react";
import SectionPaperList from "../../../components/PaperList/SectionPaperList";
import { API_GET_ALL_PAPERS } from "../../api/api";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const SelectionAssistantEditorPapersPage = (props) => {
  const token = useSelector((state) => state.auth.token);
  const [papers, setPapers] = useState(null);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const [tokenLoaded, setTokenLoaded] = useState(false); // New state to track token retrieval

  const handlePageChange = (newPage) => {
    setPage(newPage);
    console.log(papers);
  };

  useEffect(() => {
    const fetchAllPapers = async () => {
      console.log(API_GET_ALL_PAPERS);

      if (!token) {
        // Token doesn't exist, handle the error condition
        router.push("/"); // Redirect to the login page or handle the error in a different way
        return;
      }

      try {
        const response = await fetch(API_GET_ALL_PAPERS, {
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
        setPapers(data.papers);
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
      fetchAllPapers();
    }
  }, [token, tokenLoaded]);

  return (
    <div className="overflow-hidden">
      <NavbarMenu></NavbarMenu>
      <Row>
        <SectionPaperList page={page} papers={papers}></SectionPaperList>
      </Row>
      <Row className="d-flex justify-content-center align-items-center fixed-bottom mb-4 ">
        <Col className="d-flex justify-content-center align-items-center">
          <ButtonToolbar aria-label="Toolbar with button groups">
            <ButtonGroup className="me-2" aria-label="First group" size="lg">
              <Button onClick={() => handlePageChange(1)} active={page === 1}>
                1
              </Button>
              <Button onClick={() => handlePageChange(2)} active={page === 2}>
                2
              </Button>
              <Button onClick={() => handlePageChange(3)} active={page === 3}>
                3
              </Button>
              <Button onClick={() => handlePageChange(4)} active={page === 4}>
                4
              </Button>
              <Button onClick={() => handlePageChange(5)} active={page === 5}>
                5
              </Button>
              <Button onClick={() => handlePageChange(6)} active={page === 6}>
                6
              </Button>
              <Button onClick={() => handlePageChange(7)} active={page === 7}>
                7
              </Button>
              <Button onClick={() => handlePageChange(8)} active={page === 8}>
                8
              </Button>
              <Button onClick={() => handlePageChange(9)} active={page === 9}>
                9
              </Button>
              <Button onClick={() => handlePageChange(10)} active={page === 10}>
                10
              </Button>
              <Button onClick={() => handlePageChange(11)} active={page === 11}>
                11
              </Button>
              <Button onClick={() => handlePageChange(12)} active={page === 12}>
                12
              </Button>
              <Button onClick={() => handlePageChange(13)} active={page === 13}>
                13
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Col>
      </Row>
    </div>
  );
};

export default SelectionAssistantEditorPapersPage;
