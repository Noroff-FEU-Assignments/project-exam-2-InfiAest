import Image from "next/image";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import cityImg from "../../images/inspo/city-centre.jpg";
import ruralImg from "../../images/inspo/rural.jpg";
import hotelImg from "../../images/inspo/hotel.jpg";
import apartmentImg from "../../images/inspo/apartment.jpg";
import SectionWrapper from "../layout/SectionWrapper";

function InspoTiles() {
  return (
    <SectionWrapper>
      <Row xs={1} sm={2} md={4} className="g-4">
        <Col>
          <a href="" className="card__link">
            <Card className="inspoTile">
              <Image
                src={cityImg}
                objectFit="cover"
                height="500"
                alt=""
                className="inspoTile__image"
              />
              <Card.Body>
                <Card.Title>City centre</Card.Title>
              </Card.Body>
            </Card>
          </a>
        </Col>
        <Col>
          <a href="" className="card__link">
            <Card className="inspoTile">
              <Image
                src={ruralImg}
                objectFit="cover"
                height="500"
                alt=""
                className="inspoTile__image"
              />
              <Card.Body>
                <Card.Title>Rural</Card.Title>
              </Card.Body>
            </Card>
          </a>
        </Col>
        <Col>
          <a href="" className="card__link">
            <Card className="inspoTile">
              <Image
                src={apartmentImg}
                objectFit="cover"
                height="500"
                alt=""
                className="inspoTile__image"
              />
              <Card.Body>
                <Card.Title>Apartments</Card.Title>
              </Card.Body>
            </Card>
          </a>
        </Col>
        <Col>
          <a href="" className="card__link">
            <Card className="inspoTile">
              <Image
                src={hotelImg}
                objectFit="cover"
                height="500"
                alt=""
                className="inspoTile__image"
              />
              <Card.Body>
                <Card.Title>Hotels</Card.Title>
              </Card.Body>
            </Card>
          </a>
        </Col>
      </Row>
    </SectionWrapper>
  );
}

export default InspoTiles;
