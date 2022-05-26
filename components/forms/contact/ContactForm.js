import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { CONTACT_FORM_SCHEMA } from "../../../utils/formSchema/conactFormSchema";
import { BASE_URL, MESSAGES_PATH } from "../../../constants/api";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DisplayMessage from "../../messages/DisplayMessage";
import FormError from "../../messages/FormError";

const url = BASE_URL + MESSAGES_PATH;

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [subjectCount, setSubjectCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CONTACT_FORM_SCHEMA),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setServerError(null);

    try {
      const response = await axios.post(
        url,
        {
          data: {
            first_name: data.first_name,
            last_name: data.last_name,
            email_address: data.email_address,
            subject: data.subject,
            message: data.message,
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
      setTimeout(() => {
        setSubmitted(false);
        document.getElementById("contactForm").reset();
      }, 3000);
    }
  }

  return (
    <>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        id="contactForm"
        className="mt-5 mb-5 contactForm"
      >
        {serverError && (
          <DisplayMessage
            variant="danger"
            heading="Oh something is wrong!"
            message={serverError}
          />
        )}

        <fieldset disabled={submitting}>
          <Form.Group className="mb-4">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your first name"
              {...register("first_name")}
            />
            {errors.first_name && (
              <FormError message={errors.first_name.message} />
            )}
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              {...register("last_name")}
            />
            {errors.last_name && (
              <FormError message={errors.last_name.message} />
            )}
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...register("email_address")}
            />
            {errors.email_address && (
              <FormError message={errors.email_address.message} />
            )}
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>
              Subject
              <span
                className={
                  subjectCount >= 5 || subjectCount === 0
                    ? "form__text__counter"
                    : "form__text__counter form__text__counter--error"
                }
              >
                {subjectCount}/5
              </span>
            </Form.Label>
            <Form.Control
              autoComplete="nope"
              type="text"
              onKeyUp={(e) => setSubjectCount(e.target.value.length)}
              placeholder="Enter a subject"
              {...register("subject")}
            />
            {errors.subject && <FormError message={errors.subject.message} />}
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>
              Message
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
              placeholder="Please write your message here"
              {...register("message")}
            />
            {errors.message && <FormError message={errors.message.message} />}
          </Form.Group>

          {submitted ? (
            <DisplayMessage
              variant="success"
              heading="Yippee!"
              message={`Your message has been sent successfully`}
            />
          ) : (
            ""
          )}

          <div className="d-grid gap-2">
            <Button variant="primary" className="form__button" type="submit">
              {submitting ? "Sending message..." : "Send"}
            </Button>
          </div>
        </fieldset>
      </Form>
    </>
  );
}
