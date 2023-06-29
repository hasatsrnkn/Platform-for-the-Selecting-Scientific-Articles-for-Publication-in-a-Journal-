import { Card, ListGroup, Row } from "react-bootstrap";

const ReviewElement = (props) => {
  const getInclude = (include) => {
    if (include == 100) {
      return "Yes";
    } else if (include == 50) {
      return "Maybe Yes";
    } else if (include == -50) {
      return "Maybe No";
    } else if (include == -100) {
      return "No";
    } else {
      return "I do not feel competent for this paper";
    }
  };
  return (
    <ListGroup.Item key={props.idPaper}>
      <Card style={{ width: "40rem" }}>
        <Card.Header className="text-center" as="h5">
          {"Review ID: "} {props.idReview}
        </Card.Header>
        <Card.Body>
          <Card.Title className="text-center">
            {props.user.name} {props.user.surname}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted text-center">
            {props.user.username}
          </Card.Subtitle>
          {props.fullReview && (
            <div className="ms-2">
              <hr></hr>
              <Row className="mt-2">
                Topic's importance to Medical and Health Informatics :{" "}
                {props.topicImportance}/10
              </Row>
              <Row className="mt-2">
                Scientific and/or practical impact of the paper to the topic :{" "}
                {props.scientificPracticalImpact}/20
              </Row>
              <Row className="mt-2">
                Quality of scientific and/or technical content:{" "}
                {props.scientificContent}/20
              </Row>
              <Row className="mt-2">
                Originality and innovativeness: {props.originality}/20
              </Row>
              <Row className="mt-2">
                Coverage of related literature: {props.literature}/20
              </Row>
              <Row className="mt-2">
                Organisation and clarity of presentation: {props.presentation}
                /10
              </Row>
            </div>
          )}
          <hr></hr>
          <div className="ms-2">
            <Row className="mt-2">
              Include in Yearbook: {getInclude(props.include)}
            </Row>
          </div>
          <hr></hr>
          {props.comment && (
            <div className="ms-2">
              <Row
                className="mt-2 overflow-auto"
                style={{ maxHeight: "100px" }}
              >
                Comment: {props.comment}
              </Row>
            </div>
          )}
        </Card.Body>
      </Card>
    </ListGroup.Item>
  );
};

export default ReviewElement;
