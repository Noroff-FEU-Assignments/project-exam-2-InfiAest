import Form from "react-bootstrap/Form";

export default function SearchForm() {
  return (
    <div className="form-container">
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            size="lg"
            placeholder="Search here"
            aria-label="search form"
            aria-describedby="basic-addon2"
          />
        </Form.Group>
      </Form>
    </div>
  );
}
