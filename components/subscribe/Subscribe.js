import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Heading from "../layout/Heading";

export default function Subscribe() {
  return (
    <div
      style={{
        background: "#566D73",
        width: "100%",
        position: "relative",
        margin: "2rem auto",
        padding: "4rem 0",
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
            <Form.Control
              size="lg"
              placeholder="Enter email address here"
              aria-label="subscribe form"
              aria-describedby="basic-addon2"
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="primary" size="lg">
              Sign up
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
