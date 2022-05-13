import useAxios from "../../../hooks/useAxios";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DisplayMessage from "../../messages/DisplayMessage";
import Heading from "../../layout/Heading";
import { ENQUIRIES_PATH, IMG_POPULATE_PATH } from "../../../constants/api";

function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const http = useAxios();

  useEffect(() => {
    async function getEnquiries() {
      try {
        const response = await http.get(
          `${ENQUIRIES_PATH}${IMG_POPULATE_PATH}`
        );
        setEnquiries(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getEnquiries();
  }, []);

  function formatDate(input) {
    var datePart = input.match(/\d+/g),
      year = datePart[0],
      month = datePart[1],
      day = datePart[2];

    return day + "/" + month + "/" + year;
  }

  if (enquiries.length === 0) {
    return (
      <DisplayMessage
        variant="dark"
        heading="No enquiries to show yet!"
        enquiry="Looks like you're all up to date with the enquiries. Come back later!"
      />
    );
  } else {
    return (
      <>
        <Row xs={1} className="g-3">
          {enquiries.map((enquiry) => {
            let checkInDate = formatDate(enquiry.attributes.check_in_date);
            let checkoutDate = formatDate(enquiry.attributes.checkout_date);

            const createdAt = new Date(
              enquiry.attributes.createdAt
            ).toLocaleString();

            return (
              <Col key={enquiry.id}>
                <Card className="adminCard" onClick={handleShow}>
                  <Card.Body className="adminCard__body">
                    <Card.Title as="h4" className="adminCard__title">
                      {enquiry.attributes.accomodation_name}
                    </Card.Title>
                    <div className="adminCard__inner">
                      <Card.Text className="adminCard__text">
                        {enquiry.attributes.first_name}{" "}
                        {enquiry.attributes.last_name},{" "}
                        {enquiry.attributes.guests} guests, {checkInDate}-
                        {checkoutDate}
                      </Card.Text>
                      <Image
                        className="adminCard__image"
                        src={enquiry.attributes.accomodation_image}
                        width="80"
                        height="80"
                        alt={enquiry.attributes.accomodation_name}
                      />
                    </div>

                    <div className="adminCard__date">
                      Requested at: {createdAt}
                    </div>
                  </Card.Body>
                </Card>

                <Modal
                  show={show}
                  onHide={handleClose}
                  animation={true}
                  size="lg"
                  centered
                >
                  <Modal.Header closeButton>
                    <Modal.Title>
                      accomodation: {enquiry.attributes.accomodation_name}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Heading
                      size="6"
                      content={`customer name: ${enquiry.attributes.first_name} ${enquiry.attributes.last_name} (${enquiry.attributes.email_address})`}
                    />
                    <div>total guests: {enquiry.attributes.guests}</div>
                    <div>
                      dates: {checkInDate} - {checkoutDate}
                    </div>
                    <div>message: {enquiry.attributes.message}</div>

                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      Requested at: {createdAt}
                    </div>
                  </Modal.Body>

                  <Modal.Footer>
                    <Button variant="info" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Col>
            );
          })}
        </Row>
      </>
    );
  }
}

export default Enquiries;
