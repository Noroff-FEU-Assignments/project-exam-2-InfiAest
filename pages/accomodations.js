import Head from "../components/layout/Head";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { BASE_URL } from "../constants/api";
import Image from "next/image";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Heading from "../components/layout/Heading";
import Rating from "../components/accomodationCards/Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Tags from "../components/accomodationCards/Tags";

export default function Accomodations(props) {
  // console.log(props.accomodations.data[0].attributes.tags);
  // const tags = props.accomodations.data[0].attributes.tags;

  // console.log(tags);

  return (
    <Layout>
      <Head title="Holidaze Accomodations" />

      <div className="container">
        <Heading size="1" content="Accomodation" />
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {props.accomodations.data.map((accomodation) => {
            return (
              <Col key={accomodation.id}>
                <Card className="accomodation-card">
                  <Image
                    className="accomodation-card-img"
                    src={accomodation.attributes.images.data[0].attributes.url}
                    width="384"
                    height="384"
                    alt=""
                  />
                  <Card.Body>
                    <Card.Title>{accomodation.attributes.name}</Card.Title>
                    <Card.Subtitle>
                      <FontAwesomeIcon icon={faLocationDot} />
                      {accomodation.attributes.location.street_address}
                    </Card.Subtitle>
                    <div className="card__text--container">
                      <Rating
                        ratingValue={JSON.stringify(
                          accomodation.attributes.rating
                        )}
                      />
                      <div className="card__text--price">
                        {accomodation.attributes.price_per_night},-
                      </div>
                    </div>
                    <div className="d-grid gap-2">
                      <Button
                        variant="primary"
                        href={`accomodations/${accomodation.id}`}
                      >
                        See more
                      </Button>
                    </div>
                    <div className="card__tags--container">
                      <Tags
                        tagActive={accomodation.attributes.tags.Airconditioning}
                        content="Aircon"
                      />
                      <Tags
                        tagActive={
                          accomodation.attributes.tags.Breakfast_included
                        }
                        content="Breakfast included"
                      />
                      {/* <Tags
                        tagActive={accomodation.attributes.tags.Free_parking}
                        content="Free parking"
                      /> */}
                      {/* <Tags
                        tagActive={accomodation.attributes.tags.Heating}
                        content="Heating"
                      /> */}
                      {/* <Tags
                        tagActive={accomodation.attributes.tags.Kitchen}
                        content="Kitchen"
                      /> */}
                      {/* <Tags
                        tagActive={accomodation.attributes.tags.Kitchenette}
                        content="Kitchenette"
                      /> */}
                      <Tags
                        tagActive={accomodation.attributes.tags.Pets_allowed}
                        content="Pets allowed"
                      />
                      {/* <Tags
                        tagActive={accomodation.attributes.tags.Room_service}
                        content="Room Service"
                      /> */}
                      <Tags
                        tagActive={
                          accomodation.attributes.tags.Suitable_for_couples
                        }
                        content="Couples"
                      />
                      <Tags
                        tagActive={
                          accomodation.attributes.tags.Suitable_for_families
                        }
                        content="Families"
                      />
                      <Tags
                        tagActive={
                          accomodation.attributes.tags.Suitable_for_groups
                        }
                        content="Groups"
                      />
                      <Tags
                        tagActive={
                          accomodation.attributes.tags
                            .Suitable_for_single_travellers
                        }
                        content="Single travellers"
                      />
                      {/* <Tags
                        tagActive={accomodation.attributes.tags.Washing_machine}
                        content="Washer"
                      /> */}
                      <Tags
                        tagActive={accomodation.attributes.tags.WiFi}
                        content="WiFi"
                      />
                      {/* <Tags
                        tagActive={accomodation.attributes.tags.tumble_dryer}
                        content="Dryer"
                      /> */}

                      {/* {accomodation.attributes.tags.map((tag) => {
                        let tagIcon = "";
                        if (tag.label === "Wifi") {
                          tagIcon = (
                            <span>
                              <FontAwesomeIcon icon={faWifi} />
                            </span>
                          );
                        } else if (tag.label === "Dogs Allowed") {
                          tagIcon = (
                            <span>
                              <FontAwesomeIcon icon={faPaw} />
                            </span>
                          );
                        } else if (tag.label === "Suitable for couples") {
                          tagIcon = (
                            <span>
                              <FontAwesomeIcon icon={faUserGroup} />
                            </span>
                          );
                        } else if (tag.label === "Airconditioned") {
                          tagIcon = (
                            <span>
                              <FontAwesomeIcon icon={faSnowflake} />
                            </span>
                          );
                        }
                        return (
                          <span key={tag.key} className="card-tag">
                            {tagIcon}
                            {tag.label}
                          </span>
                        );
                      })} */}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const url = BASE_URL + "accomodations?populate=*";
  let accomodations = [];
  try {
    const response = await axios.get(url);

    console.log(response.data);
    accomodations = response.data;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      accomodations: accomodations,
    },
  };
}
