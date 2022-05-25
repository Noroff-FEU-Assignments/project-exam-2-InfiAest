import PropTypes from "prop-types";

function FormError({ message }) {
  return <span className="formError">{message}</span>;
}

export default FormError;

FormError.propTypes = {
  message: PropTypes.string.isRequired,
};
