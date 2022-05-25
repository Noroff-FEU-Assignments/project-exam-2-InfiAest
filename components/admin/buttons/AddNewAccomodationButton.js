import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function AddNewAccomodationButton() {
  const router = useRouter();
  function handleAddButton() {
    return router.push("/addAccomodation");
  }

  return (
    <Button variant="outline-primary" onClick={handleAddButton}>
      <FontAwesomeIcon icon={faPlus} height="1.2rem" /> New accomodation
    </Button>
  );
}

export default AddNewAccomodationButton;
