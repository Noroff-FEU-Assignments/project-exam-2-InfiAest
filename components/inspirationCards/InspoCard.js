import Image from "next/image";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import inspoImg from "../../images/inspo/utsikt-floien.jpg";
import useWindowSize from "../../hooks/useWindowSize";
import Heading from "../layout/headings/Heading";
import SectionWrapper from "../layout/general/SectionWrapper";
import { useRouter } from "next/router";

function InspoCard() {
  const windowSize = useWindowSize();
  const router = useRouter();

  let image = (
    <Image
      src={inspoImg}
      objectFit="cover"
      height="600"
      alt=""
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
        alt=""
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
          <Heading
            size="3"
            content="Haven't decided what to do in Bergen yet?"
          />
          <Card.Text>
            Get comfy in one of these locations and make plans from there!
          </Card.Text>
          <div className="d-grid gap-2">
            <Button
              variant="primary"
              onClick={() => router.push("/accomodation")}
            >
              See all locations
            </Button>
          </div>
        </Card.Body>
      </Card>
    </SectionWrapper>
  );
}

export default InspoCard;
