import PropTypes from "prop-types";
import AuthContext from "../../../context/AuthContext";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import useAxios from "../../../hooks/useAxios";
import Button from "react-bootstrap/Button";
import { ACCOMODATION_PATH } from "../../../constants/api";
import { DisplayModal } from "../modal/DisplayModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function DeleteAccomodationButton({ id }) {
  const [auth] = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const http = useAxios();
  const url = `${ACCOMODATION_PATH}/${id}`;
  const router = useRouter();

  function hideModal() {
    setShowModal(false);
  }

  async function deleteAccomodation() {
    try {
      await http.delete(url);
      setShowModal(false);
    } catch (error) {
      setError(error);
    } finally {
      return router.push("/admin");
    }
  }

  if (!auth) {
    return "";
  } else {
    return (
      <>
        <div className="admin__delete">
          <Button
            variant="dark"
            className="admin__delete--button"
            onClick={() => setShowModal(true)}
          >
            {error ? (
              "Error"
            ) : (
              <FontAwesomeIcon
                icon={faTrash}
                className={"admin__delete--icon"}
              />
            )}
          </Button>
        </div>
        <DisplayModal
          showModal={showModal}
          cancel={hideModal}
          title="Delete"
          content="You sure you want to delete this Accomodation?"
          confirmed={deleteAccomodation}
        />
      </>
    );
  }
}

export default DeleteAccomodationButton;

DeleteAccomodationButton.propTypes = {
  id: PropTypes.number.isRequired,
};
