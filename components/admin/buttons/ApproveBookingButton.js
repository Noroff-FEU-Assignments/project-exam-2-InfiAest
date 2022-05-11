import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../constants/api";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useAxios from "../../../hooks/useAxios";
import DisplayMessage from "../../messages/DisplayMessage";

const schema = yup.object().shape({
  booked_dates: yup.array().of(
    yup.object().shape({
      booking_id: yup.number().required(),
      check_in_date: yup.string().required(),
      checkout_date: yup.string().required(),
    })
  ),
});

function ApproveBookingButton({
  accomodationId,
  checkinDate,
  checkoutDate,
  bookingId,
}) {
  const [approving, setApproving] = useState(false);
  const [approved, setApproved] = useState(false);
  const [serverError, setServerError] = useState(null);

  const http = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function putBookedDates(data) {
    const postData = {
      booked_dates: data.booked_dates,
    };
    console.log(postData);
    try {
      const response = await http.put(
        `accomodations/${accomodationId}?populate=*`,
        {
          data: {
            booked_dates: [
              {
                booking_id: data.booking_id,
                check_in_date: data.check_in_date,
                checkout_date: data.checkout_date,
              },
            ],
          },
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response.data);
      setApproved(true);
    } catch (error) {
      console.log(error);
      setServerError(error.toString());
    } finally {
      setApproving(false);
    }
  }

  return (
    <Form onSubmit={handleSubmit(putBookedDates)}>
      {serverError && (
        <DisplayMessage
          variant="danger"
          heading="Oh something is wrong!"
          message={serverError}
        />
      )}
      {approved ? (
        <div>approved</div>
      ) : (
        <>
          <div className="hidden">
            <Form.Control
              type="text"
              value={bookingId}
              {...register("booking_id")}
              readOnly
            />
            {errors.booking_id && <span>{errors.booking_id.message}</span>}
          </div>
          <div className="hidden">
            <Form.Control
              type="text"
              value={checkinDate}
              {...register("check_in_date")}
              readOnly
            />
            {errors.check_in_date && (
              <span>{errors.check_in_date.message}</span>
            )}
          </div>
          <div className="hidden">
            <Form.Control
              type="text"
              value={checkoutDate}
              {...register("checkout_date")}
              readOnly
            />
            {errors.checkout_date && (
              <span>{errors.checkout_date.message}</span>
            )}
          </div>
          <Button variant="primary" type="submit">
            {approving ? "Confirming dates" : "Approve booking"}
          </Button>
        </>
      )}
    </Form>
  );
}

export default ApproveBookingButton;

ApproveBookingButton.propTypes = {
  accomodationId: PropTypes.number.isRequired,
  checkinDate: PropTypes.string.isRequired,
  checkoutDate: PropTypes.string.isRequired,
  bookingId: PropTypes.number.isRequired,
};
