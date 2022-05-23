import * as yup from "yup";

export const CONTACT_FORM_SCHEMA = yup.object().shape({
  first_name: yup.string().required("Please enter your first name"),
  last_name: yup.string().required("Please enter your last name"),
  email_address: yup
    .string()
    .required("Please enter an email address")
    .email("Please enter a valid email address"),
  subject: yup
    .string()
    .required("Please enter a subject")
    .min(5, "The subject should be at least 5 characters"),
  message: yup
    .string()
    .required("Please enter a message")
    .min(20, "Your message should be at least 20 characters"),
});
