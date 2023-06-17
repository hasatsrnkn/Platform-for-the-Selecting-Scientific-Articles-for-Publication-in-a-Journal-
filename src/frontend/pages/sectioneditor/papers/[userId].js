import NavbarMenu from "../../../components/UI/NavbarMenu";
import Link from "next/link";
import { Button, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const SectionEditorPapersPage = (props) => {
  const token = useSelector((state) => state.auth.token);
  const userID = useSelector((state) => state.auth.userID);
  const userType = useSelector((state) => state.auth.type);
  return (
    <div>
      <NavbarMenu></NavbarMenu>
      <div className="d-flex align-items-center justify-content-center">
        <Row>
        <Link className=""  href={`/${userType}/uploadpapers/${userID}`} passHref legacyBehavior>
            <Button size="lg" className="mt-4" variant="success">
              Upload Papers
            </Button>
          </Link>
        </Row>
      </div>
    </div>
  );
};

export default SectionEditorPapersPage;
