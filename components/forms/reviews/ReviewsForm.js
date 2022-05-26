import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  BASE_URL,
  IMG_POPULATE_PATH,
  REVIEWS_PATH,
} from "../../../constants/api";
import { REVIEW_FORM_SCHEMA } from "../../../utils/formSchema/reviewFormSchema";
import { useRouter } from "next/router";
import Heading from "../../layout/headings/Heading";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DisplayMessage from "../../messages/DisplayMessage";
import FormError from "../../messages/FormError";

const url = BASE_URL + REVIEWS_PATH + IMG_POPULATE_PATH;

function ReviewsForm({ accomodationId }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [messageCount, setMessageCount] = useState(0);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(REVIEW_FORM_SCHEMA),
  });
  async function onSubmit(data) {
    setSubmitting(true);
    setServerError(null);

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
      setSubmitted(true);
    } catch (error) {
      console.log("error", error);
      setServerError(error.toString());
    } finally {
      setSubmitting(false);
      router.push(`/accomodation/${accomodationId}`);
    }
  }
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} className="mb-5">
        <Heading size="3" content="Leave a review:" />
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
              message="Your review has been sent successfully. Thanks a lot, we really appreciate it!"
              alertClass="review__alert"
            />
          </>
        ) : (
          <fieldset disabled={submitting}>
            <div className="inputHidden">
              <Form.Control
                type="text"
                value={accomodationId}
                {...register("reviews")}
                readOnly
              />
            </div>
            <Row xs={2} md={1} lg={2}>
              <Col xs={8} lg={9}>
                <Form.Group className="mb-4">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    {...register("username")}
                  />
                  {errors.username && (
                    <FormError message={errors.username.message} />
                  )}
                </Form.Group>
              </Col>
              <Col xs={4} lg={3}>
                <Form.Group className="mb-4">
                  <Form.Label>Rating</Form.Label>
                  <Form.Select {...register("rating")}>
                    <option value={5}>5</option>
                    <option value={4}>4</option>
                    <option value={3}>3</option>
                    <option value={2}>2</option>
                    <option value={1}>1</option>
                  </Form.Select>
                  {errors.rating && (
                    <FormError message={errors.rating.message} />
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4">
              <Form.Label>
                Comment
                <span
                  className={
                    messageCount >= 20 || messageCount === 0
                      ? "form__text__counter"
                      : "form__text__counter form__text__counter--error"
                  }
                >
                  {messageCount}/20
                </span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onKeyUp={(e) => setMessageCount(e.target.value.length)}
                placeholder="Please write your review here"
                {...register("review")}
              />
              {errors.review && <FormError message={errors.review.message} />}
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
