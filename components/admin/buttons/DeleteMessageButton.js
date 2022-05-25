import PropTypes from "prop-types";
import { useState } from "react";
import useAxios from "../../../hooks/useAxios";
import Button from "react-bootstrap/Button";
import { MESSAGES_PATH } from "../../../constants/api";
import { DisplayModal } from "../modal/DisplayModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function DeleteMessageButton({ id, getMessages }) {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const http = useAxios();
  const url = `${MESSAGES_PATH}/${id}`;

  function hideModal() {
    setShowModal(false);
  }

  async function deleteMessage() {
    try {
      await http.delete(url);
      setShowModal(false);
      getMessages();
    } catch (error) {
      setError(error);
    }
  }

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
            <FontAwesomeIcon icon={faTrash} className={"admin__delete--icon"} />
          )}
        </Button>
      </div>
      <DisplayModal
        showModal={showModal}
        cancel={hideModal}
        title="Delete"
        content="You sure you want to delete this message?"
        confirmed={deleteMessage}
      />
    </>
  );
}

export default DeleteMessageButton;

DeleteMessageButton.propTypes = {
  id: PropTypes.number.isRequired,
  getMessages: PropTypes.func.isRequired,
};
