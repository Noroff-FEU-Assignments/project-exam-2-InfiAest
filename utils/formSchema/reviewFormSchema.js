import * as yup from "yup";

export const REVIEW_FORM_SCHEMA = yup.object().shape({
  username: yup.string().required("Enter name or anon if preferred"),
  rating: yup.number().required("Please select a rating"),
  review: yup
    .string()
    .required("Please write a review")
    .min(20, "Your review should be at least 20 characters"),
  reviews: yup.number().required(),
});
