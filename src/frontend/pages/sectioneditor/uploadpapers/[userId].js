import { Container } from "react-bootstrap";
import NavbarMenu from "../../../components/UI/NavbarMenu";
import UploadFileForm from "../../../components/UploadFile/UploadFileForm";

const UploadPapersPage = (props) => {
  return (
    <div>
      <NavbarMenu></NavbarMenu>
      <div className="d-flex justify-content-center align-items-center p-5">
        <Container
          style={{
            width: "40vw",
          }}
        >
          <UploadFileForm></UploadFileForm>
        </Container>
      </div>
    </div>
  );
};

export default UploadPapersPage;
