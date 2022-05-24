import PropTypes from "prop-types";
import Link from "next/link";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "next/image";
import Button from "react-bootstrap/Button";
import Rating from "../../../utils/icons/Rating";
import AccomodationCardTags from "./cardTags/AccomodationCardTags";
import { placeholderImg } from "../../../constants/placeholderImg";
import Tags from "../../../utils/icons/Tags";

function AccomodationCard({ attributes }) {
  return (
    <>
      {attributes.map((accomodation) => {
        const area = `${accomodation.attributes.accomodation_area}`;
        const accomodationArea = area.charAt(0).toUpperCase() + area.slice(1);

        return (
          <Col key={accomodation.id}>
            <Link href={`/accomodation/${accomodation.id}`}>
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
                <Tags
                  tagActive={true}
                  content={accomodationArea}
                  tagClass="accomodationCard__areaTag"
                />
                <Card.Body className="accomodationCard__body">
                  <Card.Title className="accomodationCard__title">
                    {accomodation.attributes.name}
                  </Card.Title>
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
                    <Link href={`/accomodation/${accomodation.id}`}>
                      <Button variant="primary">See more</Button>
                    </Link>
                  </div>

                  <AccomodationCardTags
                    aircon={accomodation.attributes.tags.Airconditioning}
                    pets={accomodation.attributes.tags.Pets_allowed}
                    couples={accomodation.attributes.tags.Suitable_for_couples}
                    families={
                      accomodation.attributes.tags.Suitable_for_families
                    }
                    groups={accomodation.attributes.tags.Suitable_for_groups}
                    single={
                      accomodation.attributes.tags
                        .Suitable_for_single_travellers
                    }
                    wifi={accomodation.attributes.tags.WiFi}
                  />
                </Card.Body>
              </Card>
            </Link>
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
