import ReviewList from "../../../components/ReviewList/ReviewList";
import NavbarMenu from "../../../components/UI/NavbarMenu";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { API_GET_ALL_REVIEWS_OF_A_PAPER } from "../../api/api";

const AllReviewsOfAPaperPage = (props) => {
  const router = useRouter();
  const { paperId } = router.query;
  const token = useSelector((state) => state.auth.token);
  const [reviews, setReviews] = useState(null);
  const [tokenLoaded, setTokenLoaded] = useState(false); // New state to track token retrieval

  useEffect(() => {
    const fetchReviews = async () => {
      console.log(API_GET_ALL_REVIEWS_OF_A_PAPER + paperId);

      if (!token) {
        // Token doesn't exist, handle the error condition
        router.push("/"); // Redirect to the login page or handle the error in a different way
        return;
      }

      try {
        const response = await fetch(API_GET_ALL_REVIEWS_OF_A_PAPER + paperId, {
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
        setReviews(data.reviews);
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
      fetchReviews();
    }
  }, [token, paperId, tokenLoaded]);

  if (!tokenLoaded) {
    return <div>Loading...</div>; // Show a loading indicator while retrieving the token
  }

  if (reviews === null) {
    return <div>Not authenticated</div>; // Show a loading indicator while fetching user data
  }
  return (
    <div>
      <NavbarMenu></NavbarMenu>
      <ReviewList reviews={reviews}></ReviewList>
    </div>
  );
};

export default AllReviewsOfAPaperPage;
