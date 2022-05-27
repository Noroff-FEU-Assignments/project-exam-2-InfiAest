import * as yup from "yup";

let ADD_FORM_SCHEMA = yup.object().shape({
  name: yup.string().required("Please enter the accomodation name"),
  street_address: yup.string().required("Please enter street name and number"),
  zip_code: yup.string().required("Please enter the zip code and city name"),
  price_per_night: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be greater than zero")
    .required("Please enter the price per night"),
  rating: yup
    .number()
    .typeError("Please select a number from the list")
    .oneOf([1, 2, 3, 4, 5])
    .required("Please select the rating"),
  images: yup
    .mixed()
    .required("Please select 3 images")
    .test("type", "You must select 3 images", (value) => {
      return value && value.length === 3;
    }),
  description: yup
    .string()
    .required("Please enter a description of the accomodation")
    .min(20, "Description should be at least 20 characters"),
  WiFi: yup.boolean(),
  Kitchen: yup.boolean(),
  Kitchenette: yup.boolean(),
  Free_parking: yup.boolean(),
  Washing_machine: yup.boolean(),
  tumble_dryer: yup.boolean(),
  Airconditioning: yup.boolean(),
  Heating: yup.boolean(),
  Pets_allowed: yup.boolean(),
  Suitable_for_single_travellers: yup.boolean(),
  Suitable_for_couples: yup.boolean(),
  Suitable_for_families: yup.boolean(),
  Suitable_for_groups: yup.boolean(),
  Breakfast_included: yup.boolean(),
  Room_service: yup.boolean(),
  information: yup
    .string()
    .required(
      "Please enter extra information such as check-in/out times, house rules etc"
    )
    .min(20, "Information should be at least 20 characters"),
  accomodation_type: yup
    .string()
    .required("Please select the accomodation type"),
  maximum_guests: yup
    .string()
    .required("Please select the maximum number of guests"),
  accomodation_area: yup
    .string()
    .required("Please select the accomodation location type"),
});

export const ADD_ACCOMODATION_FORM_SCHEMA = ADD_FORM_SCHEMA.test(
  "amenityCheckboxTest",
  null,
  (obj) => {
    if (
      obj.Wifi ||
      obj.Kitchen ||
      obj.Kitchette ||
      obj.Free_parking ||
      obj.Washing_machine ||
      obj.tumble_dryer ||
      obj.Airconditioning ||
      obj.Heating ||
      obj.Pets_allowed ||
      obj.Suitable_for_single_travellers ||
      obj.Suitable_for_couples ||
      obj.Suitable_for_families ||
      obj.Suitable_for_groups ||
      obj.Breakfast_included ||
      obj.Room_service
    ) {
      return true;
    }
    return new yup.ValidationError(
      "Please select at least one amenity",
      null,
      "amenities__checkboxes"
    );
  }
);
