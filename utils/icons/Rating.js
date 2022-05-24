import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regStar } from "@fortawesome/free-regular-svg-icons";

function Rating({ ratingValue, tagClass }) {
  if (ratingValue === "1") {
    return (
      <div className={`${tagClass}__rating`}>
        <FontAwesomeIcon
          icon={solidStar}
          className={`${tagClass}__rating--icon`}
        />
        <FontAwesomeIcon
          icon={regStar}
          className={`${tagClass}__rating--icon`}
        />
        <FontAwesomeIcon
          icon={regStar}
          className={`${tagClass}__rating--icon`}
        />
        <FontAwesomeIcon
          icon={regStar}
          className={`${tagClass}__rating--icon`}
        />
        <FontAwesomeIcon
          icon={regStar}
          className={`${tagClass}__rating--icon`}
        />
      </div>
    );
  } else if (ratingValue === "2") {
    return (
      <div className={`${tagClass}__rating`}>
        <FontAwesomeIcon
          icon={solidStar}
          className={`${tagClass}__rating--icon`}
        />
        <FontAwesomeIcon
          icon={solidStar}
          className={`${tagClass}__rating--icon`}
        />
        <FontAwesomeIcon
          icon={regStar}
          className={`${tagClass}__rating--icon`}
        />
        <FontAwesomeIcon
          icon={regStar}
          className={`${tagClass}__rating--icon`}
        />
        <FontAwesomeIcon
          icon={regStar}
          className={`${tagClass}__rating--icon`}
        />
      </div>
    );
  } else if (ratingValue === "3") {
    return (
      <div className={`${tagClass}__rating`}>
        <FontAwesomeIcon
          icon={solidStar}
          className={`${tagClass}__rating--icon`}
        />
        <FontAwesomeIcon
          icon={solidStar}
          className={`${tagClass}__rating--icon`}
        />
        <FontAwesomeIcon
          icon={solidStar}
          className={`${tagClass}__rating--icon`}
        />
        <FontAwesomeIcon
          icon={regStar}
          className={`${tagClass}__rating--icon`}
        />
        <FontAwesomeIcon
          icon={regStar}
          className={`${tagClass}__rating--icon`}
        />
      </div>
    );
  } else if (ratingValue === "4") {
    return (
      <div className={`${tagClass}__rating`}>
        <FontAwesomeIcon
          icon={solidStar}
          className={`${tagClass}__rating--icon`}
        />
        <FontAwesomeIcon
          icon={solidStar}
          className={`${tagClass}__rating--icon`}
        />
        <FontAwesomeIcon
          icon={solidStar}
          className={`${tagClass}__rating--icon`}
        />
        <FontAwesomeIcon
          icon={solidStar}
          className={`${tagClass}__rating--icon`}
        />
        <FontAwesomeIcon
          icon={regStar}
          className={`${tagClass}__rating--icon`}
        />
      </div>
    );
  } else if (ratingValue === "5") {
    return (
      <div className={`${tagClass}__rating`}>
        <FontAwesomeIcon
          icon={solidStar}
          className={`${tagClass}__rating--icon`}
        />
        <FontAwesomeIcon
          icon={solidStar}
          className={`${tagClass}__rating--icon`}
        />
        <FontAwesomeIcon
          icon={solidStar}
          className={`${tagClass}__rating--icon`}
        />
        <FontAwesomeIcon
          icon={solidStar}
          className={`${tagClass}__rating--icon`}
        />
        <FontAwesomeIcon
          icon={solidStar}
          className={`${tagClass}__rating--icon`}
        />
      </div>
    );
  }
}

Rating.propTypes = {
  ratingValue: PropTypes.string.isRequired,
  tagClass: PropTypes.string.isRequired,
};

export default Rating;
