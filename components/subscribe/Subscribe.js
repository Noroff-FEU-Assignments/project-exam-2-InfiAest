import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Heading from "../layout/headings/Heading";
import SectionWrapper from "../layout/general/SectionWrapper";
import Container from "react-bootstrap/Container";

export default function Subscribe() {
  return (
    <SectionWrapper>
      <div className="subscribe">
        <Container>
          <Heading
            size="2"
            content="Want us to keep you updated with exciting new deals?"
          />
          <p>Subscribe to the Holidaze newsletter here</p>
          <div>
            <Form.Group className="mb-3">
              <Form.Control
                size="md"
                type="email"
                placeholder="email@emailaddress.com"
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="secondary" size="md" disabled>
                Sign up
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </SectionWrapper>
  );
}
