import ProfileInfo from "../../components/Profile/ProfileInfo";
import NavbarMenu from "../../components/UI/NavbarMenu";
import { API_PROFILE } from "../api/api";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Row, Col } from "react-bootstrap";

const ProfilePage = (props) => {
  const token = useSelector((state) => state.auth.token);
  const router = useRouter();
  const userID = router.query.userId;
  const [user, setUser] = useState(null);
  const [tokenLoaded, setTokenLoaded] = useState(false); // New state to track token retrieval

  useEffect(() => {
    const fetchProfileData = async () => {
      console.log(API_PROFILE + userID);

      if (!token) {
        // Token doesn't exist, handle the error condition
        router.push("/"); // Redirect to the login page or handle the error in a different way
        return;
      }

      try {
        console.log(userID);
        const response = await fetch(API_PROFILE + userID, {
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
        setUser({
          name: data.user.name,
          surname: data.user.surname,
          email: data.user.email,
          type: data.user.role,
          username: data.user.username,
          id: data.user.idUser,
          organizations: data.user.organizations,
          organizationItems: data.organizationItems,
        });
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

  if (!tokenLoaded) {
    return <div>Loading...</div>; // Show a loading indicator while retrieving the token
  }

  if (user === null) {
    return <div>Not authenticated</div>; // Show a loading indicator while fetching user data
  }

  return (
    <div className="overflow-hidden ">
      <NavbarMenu></NavbarMenu>
    
        <Row className="d-flex justify-content-center ">
        <Col className="d-flex  justify-content-center">
          <ProfileInfo
            name={user.name}
            surname={user.surname}
            email={user.email}
            type={user.type}
            id={user.id}
            username={user.username}
            organizations={user.organizations}
            organizationItems= {user.organizationItems}
            isAuth = {false}
          ></ProfileInfo>
           </Col>
        </Row>
     
    </div>
  );
};

export default ProfilePage;
