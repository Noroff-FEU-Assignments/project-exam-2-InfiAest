import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "next/image";
import Button from "react-bootstrap/Button";
import Rating from "../icons/Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import AccomodationCardTags from "./AccomodationCardTags";
import { useRouter } from "next/router";
import { placeholderImg } from "../../../constants/placeholderImg";

function AccomodationCard({ attributes }) {
  const router = useRouter();
  return (
    <>
      {attributes.map((accomodation) => {
        return (
          <Col key={accomodation.id}>
            <Card className="accomodationCard">
              <Image
                className="accomodationCard__image"
                src={accomodation.attributes.images.data[0].attributes.url}
                width="384"
                height="384"
                alt={
                  accomodation.attributes.images.data[0].attributes
                    .alternativeText
                }
                placeholder="blur"
                blurDataURL={placeholderImg}
              />
              <Card.Body className="accomodationCard__body">
                <Card.Title className="accomodationCard__title">
                  {accomodation.attributes.name}
                </Card.Title>
                <Card.Subtitle as="p" className="accomodationCard__subtitle">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="accomodationCard__subtitle--icon"
                  />
                  {accomodation.attributes.location.street_address}
                </Card.Subtitle>
                <div className="accomodationCard__text">
                  <Rating
                    ratingValue={JSON.stringify(accomodation.attributes.rating)}
                    tagClass="accomodationCard"
                  />
                  <div className="accomodationCard__text--price">
                    {accomodation.attributes.price_per_night},-
                  </div>
                </div>
                <div className="d-grid gap-2">
                  <Button
                    variant="primary"
                    onClick={() =>
                      router.push(`/accomodation/${accomodation.id}`)
                    }
                  >
                    See more
                  </Button>
                </div>

                <AccomodationCardTags
                  aircon={accomodation.attributes.tags.Airconditioning}
                  pets={accomodation.attributes.tags.Pets_allowed}
                  couples={accomodation.attributes.tags.Suitable_for_couples}
                  families={accomodation.attributes.tags.Suitable_for_families}
                  groups={accomodation.attributes.tags.Suitable_for_groups}
                  single={
                    accomodation.attributes.tags.Suitable_for_single_travellers
                  }
                  wifi={accomodation.attributes.tags.WiFi}
                />
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </>
  );
}

export default AccomodationCard;

AccomodationCard.propTypes = {
  attributes: PropTypes.array.isRequired,
};
