import PropTypes from "prop-types";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import DisplayMessage from "../../messages/DisplayMessage";
import Rating from "../../../utils/icons/Rating";

function ReviewsCarousel({ accomodationDetails }) {
  if (accomodationDetails.review.data.length === 0) {
    return (
      <DisplayMessage
        variant="info"
        alertClass="review__alert"
        heading="No reviews yet"
        message="If you've stayed here why don't you leave us a review? We appreciate all feedback we get!"
      />
    );
  } else {
    return (
      <Carousel variant="dark" interval={10000}>
        {accomodationDetails.review.data.map((rev) => {
          return (
            <Carousel.Item key={rev.id}>
              <Card className="reviewsCard">
                <Card.Body className="reviewsCard__body">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="reviewsCard__userIcon"
                  />
                  <Card.Title className="reviewsCard__title">
                    {rev.attributes.username}
                    <div>
                      <Rating
                        ratingValue={JSON.stringify(rev.attributes.rating)}
                        tagClass="reviewsCard"
                      />
                    </div>
                  </Card.Title>
                  <Card.Text>{rev.attributes.review}</Card.Text>
                </Card.Body>
              </Card>
            </Carousel.Item>
          );
        })}
      </Carousel>
    );
  }
}

export default ReviewsCarousel;

ReviewsCarousel.propTypes = {
  accomodationDetails: PropTypes.object.isRequired,
};
