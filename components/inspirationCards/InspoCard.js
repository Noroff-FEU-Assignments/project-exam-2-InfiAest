import Image from "next/image";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import headerImg from "../../images/bryggen-header-img.jpg";

function InspoCard() {
  return (
    <Card>
      <Image src={headerImg} alt="" />
      <Card.Body>
        <Card.Title>Haven't decided what to do in Bergen yet?</Card.Title>
        <Card.Text>
          Get comfy in one of these locations and make plans from there!
        </Card.Text>
        <Button variant="primary">See all locations</Button>
      </Card.Body>
    </Card>
  );
}

export default InspoCard;
