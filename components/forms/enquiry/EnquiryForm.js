import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL, ENQUIRIES_PATH } from "../../../constants/api";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DisplayMessage from "../../messages/DisplayMessage";
import GuestNumberOptions from "./formOptions/GuestNumberOptions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import formatDate from "../../common/FormatDate";

const url = BASE_URL + ENQUIRIES_PATH;

const schema = yup.object().shape({
  accomodation_name: yup.string().required(),
  accomodation_image: yup.string().required(),
  accomodation: yup.number().required(),
  first_name: yup.string().required("Please enter your first name"),
  last_name: yup.string().required("Please enter your last name"),
  email_address: yup
    .string()
    .required("Please enter an email address")
    .email("Please enter a valid email address"),
  check_in_date: yup
    .date()
    .default(() => new Date())
    .required("Please select your chosen dates"),
  checkout_date: yup
    .date()
    .min(yup.ref("check_in_date"), "end date can't be before the start date")
    .required("Please select your chosen dates"),
  guests: yup
    .number()
    .oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    .required("Please select number of guests"),
  message: yup.string().required("Please enter a message"),
});

export default function EnquiryForm({
  accomodationId,
  accomodationName,
  accomodationImage,
  maximumGuests,
  checkinDate,
  checkoutDate,
}) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [startDate, setStartDate] = useState(checkinDate || null);
  const [endDate, setEndDate] = useState(checkoutDate || null);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

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

    try {
      const response = await axios.post(
        url,
        {
          data: {
            accomodation_name: data.accomodation_name,
            accomodation_image: data.accomodation_image,
            first_name: data.first_name,
            last_name: data.last_name,
            email_address: data.email_address,
            check_in_date: data.check_in_date,
            checkout_date: data.checkout_date,
            guests: data.guests,
            message: data.message,
            accomodation: data.accomodation,
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
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {serverError && (
          <DisplayMessage
            variant="danger"
            heading="Oh something is wrong!"
            message={serverError}
          />
        )}
        {submitted ? (
          <DisplayMessage
            variant="success"
            heading="Yippee!"
            message={`Your enquiry for a stay at ${accomodationName} has been sent successfully`}
          />
        ) : (
          <fieldset disabled={submitting}>
            <Form.Group className="mb-3" controlId="formBasicAccomodationName">
              <Form.Label>Accomodation name</Form.Label>
              <Form.Control
                type="text"
                value={accomodationName}
                {...register("accomodation_name")}
                readOnly
              />
              {errors.accomodation_name && (
                <span>{errors.accomodation_name.message}</span>
              )}
            </Form.Group>
            <div className="inputHidden">
              <Form.Control
                type="text"
                value={accomodationImage}
                {...register("accomodation_image")}
                readOnly
              />
            </div>
            <div className="inputHidden">
              <Form.Control
                type="text"
                value={accomodationId}
                {...register("accomodation")}
                readOnly
              />
            </div>
            <Row xs={1} lg={2}>
              <Col lg={6}>
                <Form.Group className="mb-3" controlId="formBasicUserName">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your first name"
                    {...register("first_name")}
                  />
                  {errors.first_name && (
                    <span>{errors.first_name.message}</span>
                  )}
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group className="mb-3" controlId="formBasicLastName">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter last name"
                    {...register("last_name")}
                  />
                  {errors.last_name && <span>{errors.last_name.message}</span>}
                </Form.Group>
              </Col>
            </Row>
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
            <Row xs={1} lg={2}>
              <Col lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Select check-in and checkout dates</Form.Label>
                  <div className="form__datePicker">
                    <DatePicker
                      selected={startDate}
                      onChange={onChange}
                      startDate={startDate}
                      endDate={endDate}
                      excludeDateIntervals={[
                        {
                          start: new Date("11, 6, 2022"),
                          end: new Date("11, 6, 2022"),
                        },
                      ]}
                      dateFormat="dd/MM/yyyy"
                      minDate={new Date()}
                      selectsRange
                      selectsDisabledDaysInRange={false}
                      fixedHeight={true}
                      withPortal
                    />
                  </div>
                  {errors.check_in_date && (
                    <span>{errors.check_in_date.message}</span>
                  )}
                  {errors.checkout_date && (
                    <span>{errors.checkout_date.message}</span>
                  )}
                  <div className="inputHidden">
                    <Form.Control
                      type="text"
                      value={formatDate(startDate)}
                      {...register("check_in_date")}
                      readOnly
                    />
                  </div>
                  <div className="inputHidden">
                    <Form.Control
                      type="text"
                      value={formatDate(endDate)}
                      {...register("checkout_date")}
                      readOnly
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Number of guests</Form.Label>
                  <Form.Select defaultValue={null} {...register("guests")}>
                    <GuestNumberOptions maximumGuests={maximumGuests} />
                  </Form.Select>
                  {errors.guests && <span>{errors.guests.message}</span>}
                </Form.Group>
              </Col>
            </Row>

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
              <Button variant="primary" className="form__button" type="submit">
                {submitting ? "Sending message..." : "Send"}
              </Button>
            </div>
          </fieldset>
        )}
      </Form>
    </>
  );
}

EnquiryForm.propTypes = {
  accomodationId: PropTypes.number.isRequired,
  accomodationName: PropTypes.string.isRequired,
  accomodationImage: PropTypes.string.isRequired,
  maximumGuests: PropTypes.string.isRequired,
  checkinDate: PropTypes.instanceOf(Date),
  checkoutDate: PropTypes.instanceOf(Date),
};
