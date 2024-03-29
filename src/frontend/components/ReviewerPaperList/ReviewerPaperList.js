import { Table } from "react-bootstrap";
import ReviewerPaperElement from "./ReviewerPaperElement";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Row from "react-bootstrap";
import { API_REVIEWER_GET_ALL_PAPERITEMS } from "../../pages/api/api";

const ReviewerPaperList = (props) => {
  const token = useSelector((state) => state.auth.token);
  const userID = useSelector((state) => state.auth.userID);
  const [paperItems, setPaperItems] = useState(null);
  const [tokenLoaded, setTokenLoaded] = useState(false); // New state to track token retrieval
  const router = useRouter();

  useEffect(() => {
    const fetchAllPapers = async () => {
      if (!token) {
        // Token doesn't exist, handle the error condition
        router.push("/"); // Redirect to the login page or handle the error in a different way
        return;
      }

      try {
        const response = await fetch(API_REVIEWER_GET_ALL_PAPERITEMS + userID, {
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
        setPaperItems(data.paperItems);
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
    <Table striped bordered hover>
      <thead>
        <tr>
          <th></th>
          <th>ID</th>
          <th>Title</th>
          <th>Authors</th>
          <th>DOI</th>
          <th>PMID</th>
          <th>Journal Name</th>
          <th>Journal Issue</th>
          <th>See Abstract</th>
          <th>See Reviews</th>
          <th>Download</th>
          <th>Bid Status</th>
        </tr>
      </thead>
      <tbody>
      {paperItems &&
          props.papers.map((paper) => (
            <ReviewerPaperElement
              key={paper.idPaper}
              id={paper.idPaper}
              title={paper.title}
              authors={paper.authors}
              doi={paper.doi}
              pmid={paper.pmid}
              abstract={paper.abstract}
              journalName={paper.journalName}
              journalIssue={paper.journalIssue}
              paperItems={paperItems}
            />
          ))}
      </tbody>
    </Table>
  );
};

export default ReviewerPaperList;
