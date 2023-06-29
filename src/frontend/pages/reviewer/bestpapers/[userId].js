import NavbarMenu from "../../../components/UI/NavbarMenu";
import Link from "next/link";
import { Button, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PaperList from "../../../components/PaperList/PaperList";
import { API_GET_SECTIONS_BEST_PAPERS, API_GET_SECTION_PAPERS } from "../../api/api";
import BestPaperList from "../../../components/BestPapersList/BestPaperList";

const ReviewerBestPapersPage = (props) => {
  const token = useSelector((state) => state.auth.token);
  const userID = useSelector((state) => state.auth.userID);
  const userType = useSelector((state) => state.auth.type);
  const [papers, setPapers] = useState(null);
  const [tokenLoaded, setTokenLoaded] = useState(false); // New state to track token retrieval
  const router = useRouter();

  useEffect(() => {
    const fetchAllPapers = async () => {
      console.log(API_GET_SECTIONS_BEST_PAPERS+userID);

      if (!token) {
        // Token doesn't exist, handle the error condition
        router.push("/"); // Redirect to the login page or handle the error in a different way
        return;
      }

      try {
        console.log(userID);
        const response = await fetch(API_GET_SECTIONS_BEST_PAPERS + userID, {
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
  }, [token, userID, tokenLoaded]);

  return (
    <div className="overflow-hidden ">
      <NavbarMenu></NavbarMenu>

      <Row>{papers && <BestPaperList papers={papers}></BestPaperList>}</Row>
    </div>
  );
};

export default ReviewerBestPapersPage;
