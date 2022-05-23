import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL, MESSAGES_PATH } from "../../../constants/api";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DisplayMessage from "../../messages/DisplayMessage";
import { useRouter } from "next/router";
import { CONTACT_FORM_SCHEMA } from "../../../utils/formSchema/conactFormSchema";

const url = BASE_URL + MESSAGES_PATH;

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState(null);
  const router = useRouter();

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

    console.log(data);

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
      console.log("response", response.data);
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
          <Form.Group className="mb-4" controlId="formBasicUserName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your first name"
              {...register("first_name")}
            />
            {errors.first_name && (
              <span className="formError">{errors.first_name.message}</span>
            )}
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicLastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              {...register("last_name")}
            />
            {errors.last_name && (
              <span className="formError">{errors.last_name.message}</span>
            )}
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...register("email_address")}
            />
            {errors.email_address && (
              <span className="formError">{errors.email_address.message}</span>
            )}
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicSubject">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              autoComplete="nope"
              type="text"
              placeholder="Enter a subject"
              {...register("subject")}
            />
            {errors.subject && (
              <span className="formError">{errors.subject.message}</span>
            )}
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicTextArea">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Please write your message here"
              {...register("message")}
            />
            {errors.message && (
              <span className="formError">{errors.message.message}</span>
            )}
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
