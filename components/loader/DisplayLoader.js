import PropTypes from "prop-types";
import Spinner from "react-bootstrap/Spinner";

function DisplayLoader({ isVisible, spinnerName }) {
  return (
    <Spinner
      animation="border"
      className={isVisible ? `${spinnerName}` : `${spinnerName}--hidden`}
    />
  );
}

export default DisplayLoader;

DisplayLoader.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  spinnerName: PropTypes.string.isRequired,
};
