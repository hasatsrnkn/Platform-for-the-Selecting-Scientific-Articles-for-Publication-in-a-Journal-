import { ListGroup } from "react-bootstrap";
import ReviewElement from "./ReviewElement";

const ReviewList = (props) => {
  console.log(props.reviews);
  return (
    <div>
      {props.reviews[0] && (
        <h2 className="text-center">
          Reviews of {props.reviews[0].paper.title}
        </h2>
      )}
      {!props.reviews[0] && <h2>No Review</h2>}
      <div className="d-flex justify-content-center">
      <ListGroup className="mt-2 d-flex justify-content-center">
        {props.reviews.map((review) => {
          return (
            <ReviewElement
              idReview={review.idReview}
              fullReview={review.fullReview}
              include={review.include}
              literature={review.literature}
              originality={review.originality}
              presentation={review.presentation}
              scientificContent={review.scientificContent}
              comment={review.comment}
              scientificPracticalImpact={review.scientificPracticalImpact}
              topicImportance={review.topicImportance}
              user={review.user}
            ></ReviewElement>
          );
        })}
      </ListGroup>
      </div>
    </div>
  );
};

export default ReviewList;
