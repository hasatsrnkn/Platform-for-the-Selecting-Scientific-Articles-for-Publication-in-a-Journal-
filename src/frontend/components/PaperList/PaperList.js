import { Table } from "react-bootstrap";
import PaperElement from "./PaperElement";
const PaperList = (props) => {
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
          <th>idJournal</th>
          <th>idJournalIssue</th>
          <th>See Abstract</th>
          <th>See Reviews</th>
          <th>Download Paper</th>
        </tr>
      </thead>
      <tbody>
        {props.papers.map((paper) => {
          return (
            <PaperElement
              key={paper.idPaper}
              id={paper.idPaper}
              title={paper.title}
              authors={paper.authors}
              doi={paper.doi}
              pmid={paper.pmid}
              abstract={paper.abstract}
              idJournal={paper.idJournal}
              idJournalIssue={paper.idJournalIssue}
            ></PaperElement>
          );
        })}
      </tbody>
    </Table>
  );
};

export default PaperList;
