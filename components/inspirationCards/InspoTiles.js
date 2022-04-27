import Image from "next/image";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import headerImg from "../../images/bryggen-header-img.jpg";

function InspoTiles() {
  return (
    <Row xs={1} sm={2} md={4} className="g-4">
      <Col>
        <Card className="cards">
          <Image src={headerImg} width="384" height="250" alt="" />
          <Card.Body>
            <Card.Title>City centre</Card.Title>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className="cards">
          <Image src={headerImg} width="384" height="250" alt="" />
          <Card.Body>
            <Card.Title>Rural</Card.Title>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className="cards">
          <Image src={headerImg} width="384" height="250" alt="" />
          <Card.Body>
            <Card.Title>Apartments</Card.Title>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className="cards">
          <Image src={headerImg} width="384" height="250" alt="" />
          <Card.Body>
            <Card.Title>Hotels</Card.Title>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default InspoTiles;
