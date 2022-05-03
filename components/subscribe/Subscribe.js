import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Heading from "../layout/Heading";

export default function Subscribe() {
  return (
    <div className="section-container">
      <div
        style={{
          background: "#566D73",
          width: "100%",
          position: "relative",
          margin: "2rem auto",
          padding: "4rem 0",
          color: "white",
        }}
      >
        <div className="container">
          <Heading
            size="2"
            content="Want us to keep you updated with exciting new deals?"
          />
          <p>Subscribe to the Holidaze newsletter here</p>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control size="md" placeholder="email@emailaddress.com" />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="secondary" size="md" className="button" disabled>
                Sign up
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
