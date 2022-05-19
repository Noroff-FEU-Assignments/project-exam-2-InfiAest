import Layout from "../../components/layout/general/Layout";
import Head from "../../components/layout/general/Head";
import Heading from "../../components/layout/headings/Heading";
import axios from "axios";
import {
  ACCOMODATION_PATH,
  BASE_URL,
  IMG_POPULATE_PATH,
} from "../../constants/api";
import Rating from "../../components/accomodationAttributes/icons/Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";

import Tags from "../../components/accomodationAttributes/icons/Tags";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SectionWrapper from "../../components/layout/general/SectionWrapper";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import EnquiryForm from "../../components/forms/enquiry/EnquiryForm";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import ReviewsForm from "../../components/forms/reviews/ReviewsForm";
import PageContainer from "../../components/layout/general/PageContainer";
import ReviewsCarousel from "../../components/accomodationAttributes/carousel/ReviewsCarousel";
import ImageCarousel from "../../components/accomodationAttributes/carousel/ImageCarousel";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export default function Accomodation({ accomodation }) {
  const details = accomodation.data.attributes;

  //split info paragraph into an array so it can be returned as a list
  var information = details.information;
  information = information.split(/\r?\n/);

  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Layout>
      <Modal
        show={show}
        onHide={handleClose}
        animation={true}
        size="lg"
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Want to make a booking?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EnquiryForm
            accomodationName={details.name}
            maximumGuests={details.maximum_guests}
            accomodationImage={details.images.data[0].attributes.url}
            checkinDate={startDate}
            checkoutDate={endDate}
            accomodationId={accomodation.data.id}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Head title={details.name} />
      <PageContainer>
        <Breadcrumb>
          <Breadcrumb.Item href="/accomodation" className="breadcrumb__link">
            Accomodation
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{details.name}</Breadcrumb.Item>
        </Breadcrumb>
        <Row xs={1} lg={2} className="g-3">
          <Col>
            <div className="details__heading">
              <Heading size="1" content={details.name} />
              <Rating
                ratingValue={JSON.stringify(details.rating)}
                tagClass="details"
              />
            </div>
            <div className="details__location">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="details__location--icon"
              />
              {details.location.street_address}
            </div>
          </Col>
          <Col>
            <div className="details__price">
              <div className="details__price--text">
                {details.price_per_night},- per night
              </div>
              <div className="d-grid gap-2">
                <Button variant="primary" onClick={handleShow}>
                  Check availability
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        <SectionWrapper>
          <Row xs={1} lg={2} className="g-5">
            <Col>
              <ImageCarousel accomodationImages={details.images} />
            </Col>
            <Col>
              <Heading size="2" content="Description" />
              <p>{details.description}</p>

              <SectionWrapper>
                <Heading size="2" content="Amenities" />
                <div className="details__tags">
                  <Tags
                    tagActive={details.tags.Airconditioning}
                    content="Aircon"
                    tagClass="details__tags"
                  />
                  <Tags
                    tagActive={details.tags.Breakfast_included}
                    content="Breakfast included"
                    tagClass="details__tags"
                  />
                  <Tags
                    tagActive={details.tags.Free_parking}
                    content="Free parking"
                    tagClass="details__tags"
                  />
                  <Tags
                    tagActive={details.tags.Heating}
                    content="Heating"
                    tagClass="details__tags"
                  />
                  <Tags
                    tagActive={details.tags.Kitchen}
                    content="Kitchen"
                    tagClass="details__tags"
                  />
                  <Tags
                    tagActive={details.tags.Kitchenette}
                    content="Kitchenette"
                    tagClass="details__tags"
                  />
                  <Tags
                    tagActive={details.tags.Pets_allowed}
                    content="Pets allowed"
                    tagClass="details__tags"
                  />
                  <Tags
                    tagActive={details.tags.Room_service}
                    content="Room Service"
                    tagClass="details__tags"
                  />
                  <Tags
                    tagActive={details.tags.Suitable_for_couples}
                    content="Couples"
                    tagClass="details__tags"
                  />
                  <Tags
                    tagActive={details.tags.Suitable_for_families}
                    content="Families"
                    tagClass="details__tags"
                  />
                  <Tags
                    tagActive={details.tags.Suitable_for_groups}
                    content="Groups"
                    tagClass="details__tags"
                  />
                  <Tags
                    tagActive={details.tags.Suitable_for_single_travellers}
                    content="Single travellers"
                    tagClass="details__tags"
                  />
                  <Tags
                    tagActive={details.tags.Washing_machine}
                    content="Washer"
                    tagClass="details__tags"
                  />
                  <Tags
                    tagActive={details.tags.WiFi}
                    content="WiFi"
                    tagClass="details__tags"
                  />
                  <Tags
                    tagActive={details.tags.tumble_dryer}
                    content="Dryer"
                    tagClass="details__tags"
                  />
                </div>
              </SectionWrapper>
            </Col>
          </Row>
        </SectionWrapper>

        <Row xs={1} md={2} className="g-5">
          <Col>
            <SectionWrapper>
              <Heading size="2" content="Availability" />
              <DatePicker
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                excludeDateIntervals={[
                  {
                    start: new Date("11, 6, 2022"),
                    end: new Date("11, 6, 2022"),
                  },
                ]}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                selectsRange
                selectsDisabledDaysInRange={false}
                fixedHeight={true}
                inline
              />
              <div className="d-grid gap-2">
                <Button variant="primary" onClick={handleShow}>
                  Check availability
                </Button>
              </div>
            </SectionWrapper>
          </Col>
          <Col>
            <SectionWrapper>
              <Heading size="2" content="Extra Information" />
              <ul>
                {information.map((info, i) => {
                  if (info.length > 0) {
                    return <li key={i}>{info}</li>;
                  }
                })}
              </ul>
            </SectionWrapper>
          </Col>
        </Row>

        <Row xs={1} md={2} className="g-5">
          <Col>
            <SectionWrapper>
              <Heading size="2" content="Reviews" />
              <ReviewsCarousel accomodationDetails={details} />
            </SectionWrapper>
          </Col>
          <Col>
            <SectionWrapper>
              <ReviewsForm accomodationId={accomodation.data.id} />
            </SectionWrapper>
          </Col>
        </Row>
      </PageContainer>
    </Layout>
  );
}

export async function getStaticPaths() {
  const url = BASE_URL + ACCOMODATION_PATH + IMG_POPULATE_PATH;

  try {
    const response = await axios.get(url);
    console.log(response.data);
    const accomodations = response.data;

    const paths = accomodations.data.map((accomodation) => ({
      params: { id: accomodation.id.toString() },
    }));

    console.log(paths);

    return { paths: paths, fallback: false };
  } catch (error) {
    console.log(error);
  }
}

export async function getStaticProps({ params }) {
  const url =
    BASE_URL + `${ACCOMODATION_PATH}/${params.id}${IMG_POPULATE_PATH}`;

  let accomodation = null;

  try {
    const response = await axios.get(url);
    accomodation = response.data;
  } catch (error) {
    console.log(error);
  }

  return {
    props: { accomodation: accomodation },
  };
}
