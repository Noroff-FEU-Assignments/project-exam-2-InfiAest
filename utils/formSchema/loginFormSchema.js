import * as yup from "yup";

export const LOGIN_FORM_SCHEMA = yup.object().shape({
  identifier: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
});
