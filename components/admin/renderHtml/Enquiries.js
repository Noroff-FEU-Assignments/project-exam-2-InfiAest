import useAxios from "../../../hooks/useAxios";
import { useEffect, useState } from "react";
import {
  ENQUIRIES_PATH,
  IMG_POPULATE_PATH,
  SORT_PATH,
} from "../../../constants/api";
import Accordion from "react-bootstrap/Accordion";
import Image from "next/image";
import DisplayMessage from "../../messages/DisplayMessage";
import { formatDate } from "../../common/FormatDate";
import DeleteEnquiryButton from "../buttons/DeleteEnquiryButton";
import { placeholderImg } from "../../../constants/placeholderImg";

function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const http = useAxios();

  const getEnquiries = async function () {
    try {
      const response = await http.get(
        `${ENQUIRIES_PATH}${IMG_POPULATE_PATH}${SORT_PATH}`
      );
      setEnquiries(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEnquiries();
  }, []);

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

            let accomImg = "";
            let imgAlt = "";

            if (enquiry.attributes.accomodation_image.length === 0) {
              accomImg = placeholderImg;
              imgAlt = "";
            } else {
              accomImg = enquiry.attributes.accomodation_image;
              imgAlt = enquiry.attributes.accomodation_name;
            }

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
                  <div className="adminAccordion__image">
                    <Image
                      className="adminAccordion__img"
                      src={accomImg}
                      width="115"
                      height="115"
                      alt={imgAlt}
                    />
                    <DeleteEnquiryButton
                      id={enquiry.id}
                      getEnquiries={getEnquiries}
                    />
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </>
    );
  }
}

export default Enquiries;
