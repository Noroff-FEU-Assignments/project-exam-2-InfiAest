import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Heading from "../layout/headings/Heading";
import SectionWrapper from "../layout/general/SectionWrapper";
import PageContainer from "../layout/general/PageContainer";

export default function Subscribe() {
  return (
    <SectionWrapper>
      <div className="subscribe">
        <PageContainer>
          <Heading
            size="3"
            content="Want us to keep you updated with exciting new deals?"
            customClass="subscribe__heading"
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
        </PageContainer>
      </div>
    </SectionWrapper>
  );
}
