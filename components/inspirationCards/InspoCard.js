import Image from "next/image";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import inspoImg from "../../images/inspo/utsikt-floien.jpg";
import useWindowSize from "../../hooks/useWindowSize";
import SectionWrapper from "../layout/general/SectionWrapper";
import Link from "next/link";

function InspoCard() {
  const windowSize = useWindowSize();

  let image = (
    <Image
      src={inspoImg}
      objectFit="cover"
      height="600"
      alt="Late night image taken from part way up mount Floien looking down at the fish market"
      priority="true"
      className="inspoCard__image"
      placeholder="blur"
    />
  );

  if (windowSize.width < 768) {
    image = (
      <Image
        src={inspoImg}
        objectFit="cover"
        height="1000"
        alt="Late night image taken from part way up mount Floien looking down at the fish market"
        className="inspoCard__image"
        placeholder="blur"
      />
    );
  }

  return (
    <SectionWrapper>
      <Card className="inspoCard">
        {image}

        <Card.Body className="inspoCard__body">
          <Card.Title as="h2">
            Haven't decided what to do in Bergen yet?
          </Card.Title>
          <Card.Text>
            Get comfy in one of these locations and make plans from there!
          </Card.Text>
          <div className="d-grid gap-2">
            <Link href="/accomodation">
              <Button variant="primary">See all locations</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </SectionWrapper>
  );
}

export default InspoCard;
