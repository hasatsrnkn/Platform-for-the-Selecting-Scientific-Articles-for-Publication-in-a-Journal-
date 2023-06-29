import { ListGroup } from "react-bootstrap";

const BestPaperElement = (props) => {
  return (
    <tr>
      <td></td>
      <td>{props.id}</td>
      <td>{props.title}</td>
      <td>{props.average}</td>
    </tr>
  );
};

export default BestPaperElement;
