import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export const DisplayModal = ({
  showModal,
  cancel,
  title,
  content,
  confirmed,
  size,
}) => {
  return (
    <Modal show={showModal} onHide={cancel} size={size} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <div className="modal__footer">
        <Button
          variant="primary"
          onClick={cancel}
          className="modal__footer__button"
        >
          Cancel
        </Button>
        <Button
          variant="dark"
          onClick={confirmed}
          className="modal__footer__button"
        >
          Confirm
        </Button>
      </div>
    </Modal>
  );
};

DisplayModal.propTypes = {
  showModal: PropTypes.bool,
  cancel: PropTypes.func,
  title: PropTypes.string,
  content: PropTypes.string,
  confirmed: PropTypes.func,
  size: PropTypes.string,
};
