import Image from "next/image";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { images } from "../../utils/tileImages/tileImages";
import SectionWrapper from "../layout/general/SectionWrapper";
import Link from "next/link";

function InspoTiles() {
  return (
    <SectionWrapper>
      <Row xs={1} sm={2} md={4} className="g-4">
        {images.map((image, index) => {
          return (
            <Col key={index}>
              <Link
                href={{
                  pathname: "/accomodation",
                  query: { filters: `${image.qs}` },
                }}
                className="inspoTile__link"
              >
                <Card className="inspoTile__card">
                  <Image
                    src={image.src}
                    objectFit="cover"
                    height="500"
                    alt={`${image.label} image`}
                    className="inspoTile__card__image"
                    placeholder="blur"
                  />
                  <Card.Body>
                    <Card.Title>{image.label}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </SectionWrapper>
  );
}

export default InspoTiles;
