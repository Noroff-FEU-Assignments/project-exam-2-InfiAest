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
import PageContainer from "../components/layout/PageContainer";

export default function Accomodations(props) {
  // console.log(props.accomodations.data[0].attributes.tags);
  // const tags = props.accomodations.data[0].attributes.tags;

  // console.log(tags);

  return (
    <Layout>
      <Head title="Holidaze Accomodations" />

      <PageContainer>
        <Heading size="1" content="Accomodation" />
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {props.accomodations.data.map((accomodation) => {
            return (
              <Col key={accomodation.id}>
                <Card className="accomodationCard">
                  <Image
                    className="accomodationCard__img"
                    src={accomodation.attributes.images.data[0].attributes.url}
                    width="384"
                    height="384"
                    alt=""
                  />
                  <Card.Body className="accomodationCard__body">
                    <Card.Title className="accomodationCard__title">
                      {accomodation.attributes.name}
                    </Card.Title>
                    <Card.Subtitle
                      as="p"
                      className="accomodationCard__subtitle"
                    >
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className="accomodationCard__subtitle--icon"
                      />
                      {accomodation.attributes.location.street_address}
                    </Card.Subtitle>
                    <div className="accomodationCard__text">
                      <Rating
                        ratingValue={JSON.stringify(
                          accomodation.attributes.rating
                        )}
                        tagClass="accomodationCard"
                      />
                      <div className="accomodationCard__text--price">
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
                    <div className="accomodationCard__tags">
                      <Tags
                        tagActive={accomodation.attributes.tags.Airconditioning}
                        content="Aircon"
                        tagClass="accomodationCard__tags"
                      />
                      <Tags
                        tagActive={accomodation.attributes.tags.Pets_allowed}
                        content="Pets allowed"
                        tagClass="accomodationCard__tags"
                      />
                      <Tags
                        tagActive={
                          accomodation.attributes.tags.Suitable_for_couples
                        }
                        content="Couples"
                        tagClass="accomodationCard__tags"
                      />
                      <Tags
                        tagActive={
                          accomodation.attributes.tags.Suitable_for_families
                        }
                        content="Families"
                        tagClass="accomodationCard__tags"
                      />
                      <Tags
                        tagActive={
                          accomodation.attributes.tags.Suitable_for_groups
                        }
                        content="Groups"
                        tagClass="accomodationCard__tags"
                      />
                      <Tags
                        tagActive={
                          accomodation.attributes.tags
                            .Suitable_for_single_travellers
                        }
                        content="Single travellers"
                        tagClass="accomodationCard__tags"
                      />
                      <Tags
                        tagActive={accomodation.attributes.tags.WiFi}
                        content="WiFi"
                        tagClass="accomodationCard__tags"
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </PageContainer>
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
