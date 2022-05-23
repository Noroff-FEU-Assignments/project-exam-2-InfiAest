import PropTypes from "prop-types";
import { useAccordionButton } from "react-bootstrap";
import Button from "react-bootstrap/Button";

function ResetFiltersButton({ resetFiltersFunction, children, eventKey }) {
  const toggleAccordion = useAccordionButton(eventKey, () => {
    resetFiltersFunction();
  });
  return (
    <Button variant="light" onClick={toggleAccordion}>
      {children}
    </Button>
  );
}

export default ResetFiltersButton;

ResetFiltersButton.propTypes = {
  resetFiltersFunction: PropTypes.func.isRequired,
};
