import Image from "next/image";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import cityImg from "../../images/inspo/city-centre.jpg";
import ruralImg from "../../images/inspo/rural.jpg";
import hotelImg from "../../images/inspo/hotel.jpg";
import apartmentImg from "../../images/inspo/apartment.jpg";
import SectionWrapper from "../layout/general/SectionWrapper";
import Link from "next/link";

function InspoTiles() {
  const images = [
    { src: cityImg, label: "City centre" },
    { src: ruralImg, label: "Rural" },
    { src: hotelImg, label: "Hotel" },
    { src: apartmentImg, label: "Apartments" },
  ];

  return (
    <SectionWrapper>
      <Row xs={1} sm={2} md={4} className="g-4">
        {images.map((image, index) => {
          return (
            <Col key={index}>
              <Link href="/accomodations" className="card__link">
                <Card className="inspoTile">
                  <Image
                    src={image.src}
                    objectFit="cover"
                    height="500"
                    alt={`${image.label} image`}
                    className="inspoTile__image"
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
