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
                        href={`accomodation/${accomodation.id}`}
                      >
                        See more
                      </Button>
                    </div>
                    <div className="card__tags--container">
                      <Tags
                        tagActive={accomodation.attributes.tags.Airconditioning}
                        content="Aircon"
                        tagClass="card__tags"
                      />
                      {/* <Tags
                        tagActive={
                          accomodation.attributes.tags.Breakfast_included
                        }
                        content="Breakfast included"
                         tagClass="card__tags"
                      /> */}
                      {/* <Tags
                        tagActive={accomodation.attributes.tags.Free_parking}
                        content="Free parking"
                         tagClass="card__tags"
                      /> */}
                      {/* <Tags
                        tagActive={accomodation.attributes.tags.Heating}
                        content="Heating"
                         tagClass="card__tags"
                      /> */}
                      {/* <Tags
                        tagActive={accomodation.attributes.tags.Kitchen}
                        content="Kitchen"
                         tagClass="card__tags"
                      /> */}
                      {/* <Tags
                        tagActive={accomodation.attributes.tags.Kitchenette}
                        content="Kitchenette"
                         tagClass="card__tags"
                      /> */}
                      <Tags
                        tagActive={accomodation.attributes.tags.Pets_allowed}
                        content="Pets allowed"
                        tagClass="card__tags"
                      />
                      {/* <Tags
                        tagActive={accomodation.attributes.tags.Room_service}
                        content="Room Service"
                         tagClass="card__tags"
                      /> */}
                      <Tags
                        tagActive={
                          accomodation.attributes.tags.Suitable_for_couples
                        }
                        content="Couples"
                        tagClass="card__tags"
                      />
                      <Tags
                        tagActive={
                          accomodation.attributes.tags.Suitable_for_families
                        }
                        content="Families"
                        tagClass="card__tags"
                      />
                      <Tags
                        tagActive={
                          accomodation.attributes.tags.Suitable_for_groups
                        }
                        content="Groups"
                        tagClass="card__tags"
                      />
                      <Tags
                        tagActive={
                          accomodation.attributes.tags
                            .Suitable_for_single_travellers
                        }
                        content="Single travellers"
                        tagClass="card__tags"
                      />
                      {/* <Tags
                        tagActive={accomodation.attributes.tags.Washing_machine}
                        content="Washer"
                         tagClass="card__tags--item"
                      /> */}
                      <Tags
                        tagActive={accomodation.attributes.tags.WiFi}
                        content="WiFi"
                        tagClass="card__tags"
                      />
                      {/* <Tags
                        tagActive={accomodation.attributes.tags.tumble_dryer}
                        content="Dryer"
                         tagClass="card__tags"
                      /> */}
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
