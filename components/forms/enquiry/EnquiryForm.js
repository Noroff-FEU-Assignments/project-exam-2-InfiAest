import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL } from "../../../constants/api";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DisplayMessage from "../../messages/DisplayMessage";
import GuestNumberOptions from "./GuestNumberOptions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const url = BASE_URL + "holidaze-enquiries";

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

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
    .string()
    .required("Please select your desired check-in date"),
  checkout_date: yup
    .string()
    .required("Please select your desired checkout date"),
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
    console.log(dates);
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

    console.log(data);

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
            <div className="hid">
              <Form.Control
                type="text"
                value={accomodationImage}
                {...register("accomodation_image")}
                readOnly
              />
            </div>
            <Form.Control
              type="text"
              value={accomodationId}
              {...register("accomodation")}
              readOnly
            />
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
              <Form.Label>Select check-in and checkout dates</Form.Label>
              <div className="form__datePicker">
                <DatePicker
                  selected={startDate}
                  onChange={onChange}
                  startDate={startDate}
                  endDate={endDate}
                  excludeDateIntervals={[
                    {
                      start: new Date("2022, 5, 11"),
                      end: new Date("2022, 5, 17"),
                    },
                  ]}
                  dateFormat="yyyy/MM/dd"
                  minDate={new Date()}
                  selectsRange
                  selectsDisabledDaysInRange={false}
                  fixedHeight={true}
                  inline
                />
              </div>
              <div className="hid">
                <Form.Control
                  type="text"
                  value={formatDate(startDate)}
                  placeholder="Enter your desired check-in date yyyy-mm-dd"
                  {...register("check_in_date")}
                  readOnly
                />
              </div>
              <div className="hid">
                <Form.Control
                  type="text"
                  value={formatDate(endDate)}
                  placeholder="Enter your desired checkout date yyyy-mm-dd"
                  {...register("checkout_date")}
                  readOnly
                />
              </div>

              {errors.check_in_date && (
                <span>{errors.check_in_date.message}</span>
              )}

              {errors.checkout_date && (
                <span>{errors.checkout_date.message}</span>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Number of guests</Form.Label>
              <Form.Select defaultValue={null} {...register("guests")}>
                <GuestNumberOptions maximumGuests={maximumGuests} />
              </Form.Select>
              {errors.guests && <span>{errors.guests.message}</span>}
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
