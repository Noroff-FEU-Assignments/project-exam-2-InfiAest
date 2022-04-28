import Image from "next/image";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import inspoImg from "../../images/inspo/utsikt-floien.jpg";
import useWindowSize from "../../hooks/useWindowSize";

function InspoCard() {
  const windowSize = useWindowSize();

  let image = <Image src={inspoImg} objectFit="cover" height="600" alt="" />;

  if (windowSize.width < 768) {
    image = <Image src={inspoImg} objectFit="cover" height="1000" alt="" />;
  }

  return (
    <div className="section-container">
      <Card className="inspo-card">
        {image}
        <Card.Body>
          <Card.Title>Haven't decided what to do in Bergen yet?</Card.Title>
          <Card.Text>
            Get comfy in one of these locations and make plans from there!
          </Card.Text>
          <div className="d-grid gap-2">
            <Button variant="primary" href={`accomodations`}>
              See all locations
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default InspoCard;
