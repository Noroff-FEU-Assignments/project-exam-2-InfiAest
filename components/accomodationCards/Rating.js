import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regStar } from "@fortawesome/free-regular-svg-icons";

function Rating({ ratingValue }) {
  if (ratingValue === "1") {
    return (
      <div>
        <FontAwesomeIcon icon={solidStar} />
        <FontAwesomeIcon icon={regStar} />
        <FontAwesomeIcon icon={regStar} />
        <FontAwesomeIcon icon={regStar} />
        <FontAwesomeIcon icon={regStar} />
      </div>
    );
  } else if (ratingValue === "2") {
    return (
      <div>
        <FontAwesomeIcon icon={solidStar} />
        <FontAwesomeIcon icon={solidStar} />
        <FontAwesomeIcon icon={regStar} />
        <FontAwesomeIcon icon={regStar} />
        <FontAwesomeIcon icon={regStar} />
      </div>
    );
  } else if (ratingValue === "3") {
    return (
      <div>
        <FontAwesomeIcon icon={solidStar} />
        <FontAwesomeIcon icon={solidStar} />
        <FontAwesomeIcon icon={solidStar} />
        <FontAwesomeIcon icon={regStar} />
        <FontAwesomeIcon icon={regStar} />
      </div>
    );
  } else if (ratingValue === "4") {
    return (
      <div>
        <FontAwesomeIcon icon={solidStar} />
        <FontAwesomeIcon icon={solidStar} />
        <FontAwesomeIcon icon={solidStar} />
        <FontAwesomeIcon icon={solidStar} />
        <FontAwesomeIcon icon={regStar} />
      </div>
    );
  } else if (ratingValue === "5") {
    return (
      <div>
        <FontAwesomeIcon icon={solidStar} />
        <FontAwesomeIcon icon={solidStar} />
        <FontAwesomeIcon icon={solidStar} />
        <FontAwesomeIcon icon={solidStar} />
        <FontAwesomeIcon icon={solidStar} />
      </div>
    );
  }
}

Rating.propTypes = {
  ratingValue: PropTypes.string.isRequired,
};

export default Rating;
