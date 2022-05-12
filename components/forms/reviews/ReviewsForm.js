import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL } from "../../../constants/api";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DisplayMessage from "../../messages/DisplayMessage";
import Heading from "../../layout/Heading";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const url = BASE_URL + "reviews?populate=*";

const schema = yup.object().shape({
  username: yup.string().required("Please enter your username"),
  rating: yup
    .number()
    .oneOf([1, 2, 3, 4, 5])
    .required("Please select a rating"),
  review: yup.string().required("Please enter review"),
  reviews: yup.number().required(),
});

function ReviewsForm({ accomodationId }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  async function onSubmit(data) {
    setSubmitting(true);
    setServerError(null);

    console.log(data);

    try {
      const response = await axios.post(
        url,
        {
          data: {
            username: data.username,
            rating: data.rating,
            review: data.review,
            reviews: data.reviews,
          },
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("response", response.data);
      setSubmitted(true);
    } catch (error) {
      console.log("error", error);
      setServerError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} className="mb-5">
        <Heading size="6" content="Leave a review:" />
        {serverError && (
          <DisplayMessage
            variant="danger"
            heading="Oh something is wrong!"
            message={serverError}
          />
        )}
        {submitted ? (
          <>
            <DisplayMessage
              variant="success"
              heading="Yippee!"
              message={`Your review has been sent successfully`}
            />
          </>
        ) : (
          <fieldset disabled={submitting}>
            <div className="hidden">
              <Form.Control
                type="text"
                value={accomodationId}
                {...register("reviews")}
                readOnly
              />
            </div>
            <Row xs={2} md={1} lg={2} className="g-3">
              <Col xs={10} lg={9}>
                <Form.Group className="mb-3" controlId="formBasicUserName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your username"
                    {...register("username")}
                  />
                  {errors.username && <span>{errors.username.message}</span>}
                </Form.Group>
              </Col>
              <Col xs={2} lg={3}>
                <Form.Group className="mb-3" controlId="formBasicLastName">
                  <Form.Label>Rating</Form.Label>
                  <Form.Select defaultValue={null} {...register("rating")}>
                    <option value="">-</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Form.Select>
                  {errors.last_name && <span>{errors.last_name.message}</span>}
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formBasicTextArea">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Please write your review here"
                {...register("review")}
              />
              {errors.review && <span>{errors.review.message}</span>}
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="dark" className="form__button" type="submit">
                {submitting ? "Sending review..." : "Send"}
              </Button>
            </div>
          </fieldset>
        )}
      </Form>
    </>
  );
}

export default ReviewsForm;

ReviewsForm.propTypes = {
  accomodationId: PropTypes.number.isRequired,
};
