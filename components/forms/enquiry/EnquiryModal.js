import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import EnquiryForm from "./EnquiryForm";

export const EnquiryModal = ({
  showModal,
  cancel,
  accomDetails,
  checkinDate,
  checkoutDate,
}) => {
  let accomImg = "";
  if (accomDetails.data.attributes.images.data === null) {
    accomImg = "";
  } else {
    accomImg = accomDetails.data.attributes.images.data[0].attributes.url;
  }
  return (
    <Modal
      show={showModal}
      onHide={cancel}
      size="lg"
      backdrop="static"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Enquiry for: {accomDetails.data.attributes.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EnquiryForm
          accomodationName={accomDetails.data.attributes.name}
          maximumGuests={accomDetails.data.attributes.maximum_guests}
          accomodationImage={accomImg}
          accomodationId={accomDetails.data.id}
          checkinDate={checkinDate ? checkinDate : undefined}
          checkoutDate={checkoutDate ? checkoutDate : undefined}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={cancel}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

EnquiryModal.propTypes = {
  showModal: PropTypes.bool,
  cancel: PropTypes.func,
  accomDetails: PropTypes.object,
  checkinDate: PropTypes.any,
  checkoutDate: PropTypes.any,
};
