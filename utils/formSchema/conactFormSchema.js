import * as yup from "yup";

export const CONTACT_FORM_SCHEMA = yup.object().shape({
  first_name: yup.string().required("Please enter your first name"),
  last_name: yup.string().required("Please enter your last name"),
  email_address: yup
    .string()
    .required("Please enter an email address")
    .email("Please enter a valid email address"),
  subject: yup.string().required("Please enter a subject"),
  message: yup.string().required("Please enter a message"),
});
