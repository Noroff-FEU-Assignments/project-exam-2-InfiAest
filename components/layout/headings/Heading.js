import PropTypes from "prop-types";

function Heading({ size = "1", content, customClass }) {
  const VariableHeading = `h${size}`;

  return <VariableHeading className={customClass}>{content}</VariableHeading>;
}

Heading.propTypes = {
  size: PropTypes.string,
  content: PropTypes.string.isRequired,
  customClass: PropTypes.string,
};

export default Heading;
