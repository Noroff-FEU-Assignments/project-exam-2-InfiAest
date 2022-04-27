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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regStar } from "@fortawesome/free-regular-svg-icons";
import {
  faWifi,
  faPaw,
  faSnowflake,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

export default function Accomodations(props) {
  console.log(props.accomodations.data);
  return (
    <Layout>
      <Head title="Holidaze Accomodations" />

      <div className="container">
        <Heading size="1" content="Accomodation" />
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {props.accomodations.data.map((accomodation) => {
            let rating = `${accomodation.attributes.rating}`;
            if (accomodation.attributes.rating === 1) {
              rating = (
                <span>
                  <FontAwesomeIcon icon={solidStar} />
                  <FontAwesomeIcon icon={regStar} />
                  <FontAwesomeIcon icon={regStar} />
                  <FontAwesomeIcon icon={regStar} />
                  <FontAwesomeIcon icon={regStar} />
                </span>
              );
            } else if (accomodation.attributes.rating === 2) {
              rating = (
                <span>
                  <FontAwesomeIcon icon={solidStar} />
                  <FontAwesomeIcon icon={solidStar} />
                  <FontAwesomeIcon icon={regStar} />
                  <FontAwesomeIcon icon={regStar} />
                  <FontAwesomeIcon icon={regStar} />
                </span>
              );
            } else if (accomodation.attributes.rating === 3) {
              rating = (
                <span>
                  <FontAwesomeIcon icon={solidStar} />
                  <FontAwesomeIcon icon={solidStar} />
                  <FontAwesomeIcon icon={solidStar} />
                  <FontAwesomeIcon icon={regStar} />
                  <FontAwesomeIcon icon={regStar} />
                </span>
              );
            } else if (accomodation.attributes.rating === 4) {
              rating = (
                <span>
                  <FontAwesomeIcon icon={solidStar} />
                  <FontAwesomeIcon icon={solidStar} />
                  <FontAwesomeIcon icon={solidStar} />
                  <FontAwesomeIcon icon={solidStar} />
                  <FontAwesomeIcon icon={regStar} />
                </span>
              );
            } else if (accomodation.attributes.rating === 5) {
              rating = (
                <span>
                  <FontAwesomeIcon icon={solidStar} />
                  <FontAwesomeIcon icon={solidStar} />
                  <FontAwesomeIcon icon={solidStar} />
                  <FontAwesomeIcon icon={solidStar} />
                  <FontAwesomeIcon icon={solidStar} />
                </span>
              );
            }
            return (
              <Col key={accomodation.id}>
                <Card>
                  <Image
                    src={accomodation.attributes.images.data[0].attributes.url}
                    width="384"
                    height="384"
                    alt=""
                  />
                  <Card.Body>
                    <Card.Title>{accomodation.attributes.name}</Card.Title>
                    <Card.Subtitle>
                      {accomodation.attributes.location}
                    </Card.Subtitle>
                    <Card.Text>
                      <span>{rating}</span>
                      <span>{accomodation.attributes.price_per_night},-</span>
                    </Card.Text>
                    <div className="d-grid gap-2">
                      <Button
                        variant="primary"
                        href={`detail/${accomodation.id}`}
                      >
                        See more
                      </Button>
                    </div>
                    <div className="card-tags-container">
                      {accomodation.attributes.tags.map((tag) => {
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
                      })}
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
