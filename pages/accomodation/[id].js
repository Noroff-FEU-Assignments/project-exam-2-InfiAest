import Layout from "../../components/layout/general/Layout";
import Head from "../../components/layout/general/Head";
import Heading from "../../components/layout/headings/Heading";
import axios from "axios";
import {
  ACCOMODATION_PATH,
  BASE_URL,
  IMG_POPULATE_PATH,
} from "../../constants/api";
import Rating from "../../utils/icons/Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Tags from "../../utils/icons/Tags";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SectionWrapper from "../../components/layout/general/SectionWrapper";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import ReviewsForm from "../../components/forms/reviews/ReviewsForm";
import PageContainer from "../../components/layout/general/PageContainer";
import ReviewsCarousel from "../../components/accomodationAttributes/carousel/ReviewsCarousel";
import ImageCarousel from "../../components/accomodationAttributes/carousel/ImageCarousel";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Link from "next/link";
import { EnquiryModal } from "../../components/forms/enquiry/EnquiryModal";
import DeleteAccomodationButton from "../../components/admin/buttons/DeleteAccomodationButton";

export default function Accomodation({ accomodation }) {
  const details = accomodation.data.attributes;

  //split info paragraph into an array so it can be returned as a list
  var information = details.information;
  information = information.split(/\r?\n/);

  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [tags, setTags] = useState([]);

  function hideModal() {
    setShowModal(false);
  }

  useEffect(() => {
    setTags([
      { name: "Aircon", value: details.tags.Airconditioning },
      { name: "Breakfast included", value: details.tags.Breakfast_included },
      { name: "Free parking", value: details.tags.Free_parking },
      { name: "Heating", value: details.tags.Heating },
      { name: "Kitchen", value: details.tags.Kitchen },
      { name: "Kitchenette", value: details.tags.Kitchenette },
      { name: "Pets allowed", value: details.tags.Pets_allowed },
      { name: "Room service", value: details.tags.Room_service },
      { name: "Couples", value: details.tags.Suitable_for_couples },
      { name: "Families", value: details.tags.Suitable_for_families },
      { name: "Groups", value: details.tags.Suitable_for_groups },
      {
        name: "Single travellers",
        value: details.tags.Suitable_for_single_travellers,
      },
      { name: "Washer", value: details.tags.Washing_machine },
      { name: "WiFi", value: details.tags.WiFi },
      { name: "Dryer", value: details.tags.tumble_dryer },
    ]);
  }, []);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <Layout>
      <EnquiryModal
        showModal={showModal}
        cancel={hideModal}
        accomDetails={accomodation}
        checkinDate={startDate}
        checkoutDate={endDate}
      />
      <Head
        title={`Holidaze | ${details.name}`}
        description="Book a hotel, apartment or house in Bergen for your Holidaze."
      />
      <PageContainer>
        <Breadcrumb>
          <li className="breadcrumb__link">
            <Link href="/accomodation">Accomodation/</Link>
          </li>
          <Breadcrumb.Item active>{details.name}</Breadcrumb.Item>
        </Breadcrumb>
        <DeleteAccomodationButton id={accomodation.data.id} />
        <Row xs={1} lg={2} className="g-5">
          <Col>
            <div className="details__heading">
              <Heading size="1" content={details.name} />
              <Rating
                ratingValue={JSON.stringify(details.rating)}
                tagClass="details"
              />
            </div>
            <div className="details__location">
              <div>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="details__location--icon"
                />
                {details.location.street_address}
              </div>
              <Tags
                tagActive={true}
                content={details.accomodation_area}
                tagClass="details__location__tags"
              />
            </div>
          </Col>
          <Col>
            <div className="details__price">
              <div className="details__price--text">
                {details.price_per_night},- per night
              </div>
              <div className="d-grid gap-2">
                <Button variant="primary" onClick={() => setShowModal(true)}>
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
                  {tags.map((tag, index) => {
                    if (tag.value === true) {
                      return (
                        <span key={index}>
                          <Tags
                            tagActive={tag.value}
                            content={tag.name}
                            tagClass="details__tags"
                          />
                        </span>
                      );
                    }
                  })}
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
                <Button variant="primary" onClick={() => setShowModal(true)}>
                  Check availability
                </Button>
              </div>
            </SectionWrapper>
          </Col>
          <Col>
            <SectionWrapper>
              <Heading size="2" content="Extra Information" />
              <ul className="details__info">
                {information.map((info, i) => {
                  if (info.length > 0) {
                    return (
                      <li key={i} className="details__info--item">
                        <span>{info}</span>
                      </li>
                    );
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
