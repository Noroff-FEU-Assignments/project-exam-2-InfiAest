import useAxios from "../../../hooks/useAxios";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import DisplayMessage from "../../messages/DisplayMessage";
import { ENQUIRIES_PATH, IMG_POPULATE_PATH } from "../../../constants/api";
import { Accordion } from "react-bootstrap";

function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);

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
        <Accordion flush className="adminAccordion">
          {enquiries.map((enquiry, index) => {
            let checkInDate = formatDate(enquiry.attributes.check_in_date);
            let checkoutDate = formatDate(enquiry.attributes.checkout_date);

            const createdAt = new Date(
              enquiry.attributes.createdAt
            ).toLocaleString();

            return (
              <Accordion.Item eventKey={index} key={enquiry.id}>
                <Accordion.Header>
                  <div className="adminAccordion__header">
                    <span className="adminAccordion__header--name">
                      {enquiry.attributes.accomodation_name}
                    </span>
                    <span className="adminAccordion__header--date">
                      <span className="adminAccordion__header--label">
                        Requested:
                      </span>{" "}
                      {createdAt}
                    </span>
                  </div>
                </Accordion.Header>
                <Accordion.Body className="adminAccordion__body">
                  <div className="adminAccordion__body--text">
                    <div>
                      <span className="adminAccordion__body--label">
                        Name:{" "}
                      </span>
                      {enquiry.attributes.first_name}{" "}
                      {enquiry.attributes.last_name}
                    </div>
                    <div>
                      <span className="adminAccordion__body--label">
                        Number of guests:{" "}
                      </span>
                      {enquiry.attributes.guests} people
                    </div>
                    <div>
                      <span className="adminAccordion__body--label">
                        Requested dates:{" "}
                      </span>
                      {checkInDate}-{checkoutDate}
                    </div>
                    <div>
                      <span className="adminAccordion__body--label">
                        Message:{" "}
                      </span>
                      {enquiry.attributes.message}
                    </div>
                  </div>
                  <Image
                    className="adminAccordion__image"
                    src={enquiry.attributes.accomodation_image}
                    width="80"
                    height="80"
                    alt={enquiry.attributes.accomodation_name}
                  />
                </Accordion.Body>
              </Accordion.Item>
              // <Col key={enquiry.id}>
              //   <Card className="adminCard">
              //     <Card.Body className="adminCard__body">
              //       <Card.Title as="h4" className="adminCard__title">
              //         {enquiry.attributes.accomodation_name}
              //       </Card.Title>
              //       <div className="adminCard__inner">
              //         <Card.Text className="adminCard__text">
              //           {enquiry.attributes.first_name}{" "}
              //           {enquiry.attributes.last_name},{" "}
              //           {enquiry.attributes.guests} guests, {checkInDate}-
              //           {checkoutDate}
              //         </Card.Text>
              //         <Image
              //           className="adminCard__image"
              //           src={enquiry.attributes.accomodation_image}
              //           width="80"
              //           height="80"
              //           alt={enquiry.attributes.accomodation_name}
              //         />
              //       </div>

              //       <div className="adminCard__date">
              //         Requested at: {createdAt}
              //       </div>
              //     </Card.Body>
              //   </Card>
              // </Col>
            );
          })}
        </Accordion>
      </>
    );
  }
}

export default Enquiries;
