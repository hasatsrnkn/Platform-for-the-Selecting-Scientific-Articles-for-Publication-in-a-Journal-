import NavbarMenu from "../../../components/UI/NavbarMenu";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { API_ALL_SECTION_EDITORS } from "../../api/api";
import SectionEditorList from "../../../components/SectionEditorList/SectionEditorList";

const SelectionAssistantEditorAssignSectionEditorsPage = (props) => {
  const token = useSelector((state) => state.auth.token);
  const userID = useSelector((state) => state.auth.userID);
  const [users, setUsers] = useState(null);
  const router = useRouter();
  const [tokenLoaded, setTokenLoaded] = useState(false); // New state to track token retrieval

  useEffect(() => {
    const fetchProfileData = async () => {
      console.log(API_ALL_SECTION_EDITORS);

      if (!token) {
        // Token doesn't exist, handle the error condition
        router.push("/"); // Redirect to the login page or handle the error in a different way
        return;
      }

      try {
        console.log(userID);
        const response = await fetch(API_ALL_SECTION_EDITORS, {
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
        setUsers(data.users);
        console.log(data.users);
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

  return (
    <div>
      <NavbarMenu></NavbarMenu>
      {users && users.length > 0 ? (
        <SectionEditorList users={users} />
      ) : (
        <h1>No users</h1>
      )}
    </div>
  );
};

export default SelectionAssistantEditorAssignSectionEditorsPage;
