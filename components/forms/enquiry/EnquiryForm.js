import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL } from "../../../constants/api";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DisplayMessage from "../../messages/DisplayMessage";

const url = BASE_URL + "holidaze-enquiries";

function formatDate(date) {
  return new Date(date).toLocaleDateString();
}

const schema = yup.object().shape({
  accomodation_name: yup
    .string()
    .required("Please enter the accomodation name"),
  first_name: yup.string().required("Please enter your first name"),
  last_name: yup.string().required("Please enter your last name"),
  email_address: yup
    .string()
    .required("Please enter an email address")
    .email("Please enter a valid email address"),
  check_in_date: yup
    .string()
    .required("Please enter your desired check-in date yyyy-mm-dd"),
  checkout_date: yup
    .string()
    .required("Please enter your desired checkout date yyyy-mm-dd"),
  guests: yup
    .number()
    .oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    .required("Please select number of guests"),
  message: yup.string().required("Please enter a message"),
});

export default function EnquiryForm() {
  const [submitting, setSubmitting] = useState(false);
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
            accomodation_name: data.accomodation_name,
            first_name: data.first_name,
            last_name: data.last_name,
            email_address: data.email_address,
            check_in_date: data.check_in_date,
            checkout_date: data.checkout_date,
            guests: data.guests,
            message: data.message,
          },
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("response", response.data);
    } catch (error) {
      console.log("error", error);
      setServerError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} className="mt-5 mb-5">
        {serverError && (
          <DisplayMessage
            variant="danger"
            heading="Oh something is wrong!"
            message={serverError}
          />
        )}
        <fieldset disabled={submitting}>
          <Form.Group className="mb-3" controlId="formBasicAccomodationName">
            <Form.Label>Accomodation name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your accomodation name"
              {...register("accomodation_name")}
            />
            {errors.accomodation_name && (
              <span>{errors.accomodation_name.message}</span>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicUserName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your first name"
              {...register("first_name")}
            />
            {errors.first_name && <span>{errors.first_name.message}</span>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              {...register("last_name")}
            />
            {errors.last_name && <span>{errors.last_name.message}</span>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...register("email_address")}
            />
            {errors.email_address && (
              <span>{errors.email_address.message}</span>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Number of guests</Form.Label>
            <Form.Select defaultValue={null} {...register("guests")}>
              <option value=""></option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </Form.Select>
            {errors.guests && <span>{errors.guests.message}</span>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckin">
            <Form.Label>Check-in date</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your desired check-in date yyyy-mm-dd"
              {...register("check_in_date")}
            />
            {errors.check_in_date && (
              <span>{errors.check_in_date.message}</span>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckout">
            <Form.Label>Checkout date</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your desired checkout date yyyy-mm-dd"
              {...register("checkout_date")}
            />
            {errors.checkout_date && (
              <span>{errors.checkout_date.message}</span>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicTextArea">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Please write your message here"
              {...register("message")}
            />
            {errors.message && <span>{errors.message.message}</span>}
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="submit">
              {submitting ? "Sending message..." : "Send"}
            </Button>
          </div>
        </fieldset>
      </Form>
    </>
  );
}
