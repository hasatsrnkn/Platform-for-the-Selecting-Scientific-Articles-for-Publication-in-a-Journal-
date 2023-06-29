import { Row } from "react-bootstrap";
import BestPaperList from "./BestPaperList";

const SectionBestPaperList = (props) => {

  return (
    <div>
      <Row className="text-center">
        {props.page == 1 && (
          <h2>Bioinformatics and Translational Informatics</h2>
        )}
        {props.page == 2 && <h2>Consumer Health Informatics</h2>}
        {props.page == 3 && <h2>Cancer Informatics</h2>}
        {props.page == 4 && <h2>Clinical Information Systems</h2>}
        {props.page == 5 && <h2>Clinical Research Informatics</h2>}
        {props.page == 6 && <h2>Decision Support</h2>}
        {props.page == 7 && <h2>Human Factors and Organizational Issues</h2>}
        {props.page == 8 && <h2>Health Information Exchange</h2>}
        {props.page == 9 && <h2>Knowledge Representation and Management</h2>}
        {props.page == 10 && <h2>Natural Language Processing</h2>}
        {props.page == 11 && (
          <h2>Public Health and Epidemiology Informatics</h2>
        )}
        {props.page == 12 && <h2>Sensor, Signal and Imaging Informatics</h2>}
        {props.page == 13 && <h2>Informatics for One Health</h2>}
      </Row>
      <Row>
        {props.papers && (
          <BestPaperList
            papers={props.papers.filter(
              (paper) => paper.paper.idSection === props.page
            )}
          ></BestPaperList>
        )}
      </Row>
    </div>
  );
};
export default SectionBestPaperList;
