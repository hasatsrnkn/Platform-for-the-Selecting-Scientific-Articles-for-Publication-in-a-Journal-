import { ListGroup } from "react-bootstrap";
import BestPaperElement from "./BestPaperElement";
import { Table } from "react-bootstrap";
const BestPaperList = (props) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th></th>
          <th>ID</th>
          <th>Title</th>
          <th>Average</th>
        </tr>
      </thead>
      <tbody>
        {props.papers.map((paper) => {
          return (
            <BestPaperElement
              id={paper.paper.idPaper}
              average={paper.average}
              title={paper.paper.title}
            ></BestPaperElement>
          );
        })}
      </tbody>
    </Table>
  );
};

export default BestPaperList;
