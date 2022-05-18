import PropTypes from "prop-types";
import { useAccordionButton } from "react-bootstrap";
import Button from "react-bootstrap/Button";

function FilterButton({ filterFunction, children, eventKey }) {
  const toggleAccordion = useAccordionButton(eventKey, () => {
    filterFunction();
  });
  return (
    <Button variant="light" onClick={toggleAccordion}>
      {children}
    </Button>
  );
}

export default FilterButton;

FilterButton.propTypes = {
  filterFunction: PropTypes.func.isRequired,
};
