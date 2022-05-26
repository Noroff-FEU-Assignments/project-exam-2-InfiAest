import * as yup from "yup";

export const ENQUIRY_FORM_SCHEMA = yup.object().shape({
  accomodation_name: yup.string().required(),
  accomodation_image: yup.string(),
  accomodation: yup.number().required(),
  first_name: yup.string().required("Please enter your first name"),
  last_name: yup.string().required("Please enter your last name"),
  email_address: yup
    .string()
    .required("Please enter your email address")
    .email("Please enter a valid email address"),
  check_in_date: yup
    .date()
    .typeError("Select check-in date")
    .default(() => new Date())
    .required("Please select your chosen dates"),
  checkout_date: yup
    .date()
    .typeError("Select checkout date")
    .min(yup.ref("check_in_date"), "end date can't be before the start date")
    .required("Please select your chosen dates"),
  guests: yup
    .number()
    .oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    .required("Please select number of guests"),
  message: yup
    .string()
    .required("Please enter a message")
    .min(20, "Your message should be at least 20 characters"),
});
