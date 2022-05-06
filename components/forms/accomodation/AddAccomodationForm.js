import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import useAxios from "../../../hooks/useAxios";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DisplayMessage from "../../messages/DisplayMessage";

const schema = yup.object().shape({
  name: yup.string().required("Please enter the accomodation name"),
  street_address: yup.string().required("Please enter street name and number"),
  zip_code: yup.string().required("Please enter the zip code and city name"),
  price_per_night: yup.number().required("Please enter the price per night"),
  rating: yup
    .number()
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
    .required("Please enter a description of the accomodation"),
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
    .required("Please enter information about the accomodation"),
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

const AddAccomodationForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [image1, setImage1] = useState(false);
  const [image2, setimage2] = useState(false);
  const [image3, setimage3] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleInputChange = (event) => {
    setImage1(event.target.files[0]);
    setimage2(event.target.files[1]);
    setimage3(event.target.files[2]);
  };

  const http = useAxios();

  async function onSubmit(data) {
    setSubmitting(true);
    setServerError(null);

    const postData = {
      name: data.name,
      location: {
        street_address: data.street_address,
        zip_code: data.zip_code,
      },
      price_per_night: data.price_per_night,
      rating: data.rating,
      description: data.description,
      tags: {
        WiFi: data.WiFi,
        Kitchen: data.Kitchen,
        Kitchenette: data.Kitchenette,
        Free_parking: data.Free_parking,
        Washing_machine: data.Washing_machine,
        tumble_dryer: data.tumble_dryer,
        Airconditioning: data.Airconditioning,
        Heating: data.Heating,
        Pets_allowed: data.Pets_allowed,
        Suitable_for_single_travellers: data.Suitable_for_single_travellers,
        Suitable_for_couples: data.Suitable_for_couples,
        Suitable_for_families: data.Suitable_for_families,
        Suitable_for_groups: data.Suitable_for_groups,
        Breakfast_included: data.Breakfast_included,
        Room_service: data.Room_service,
      },
      information: data.information,
      accomodation_type: data.accomodation_type,
      maximum_guests: data.maximum_guests,
      accomodation_area: data.accomodation_area,
    };

    console.log(postData);
    let formData = new FormData();
    formData.append("files.images", image1);
    formData.append("files.images", image2);
    formData.append("files.images", image3);
    formData.append("data", JSON.stringify(postData));

    try {
      const response = await http.post("accomodations", formData);
      console.log("Response", response.data);
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
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Accomodation name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the accomodation name"
              {...register("name")}
            />
            {errors.name && <span>{errors.name.message}</span>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicLocation">
            <Form.Label>Street name and number</Form.Label>
            <Form.Control
              type="text"
              placeholder="streetname 22"
              {...register("street_address")}
            />
            {errors.street_address && (
              <span>{errors.street_address.message}</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicLocation">
            <Form.Label>Zip code and city</Form.Label>
            <Form.Control
              type="text"
              placeholder="5002 Bergen"
              {...register("zip_code")}
            />
            {errors.zip_code && <span>{errors.zip_code.message}</span>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPrice">
            <Form.Label>Price per night</Form.Label>
            <Form.Control
              type="text"
              placeholder="123.44"
              {...register("price_per_night")}
            />
            {errors.price_per_night && (
              <span>{errors.price_per_night.message}</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Rating</Form.Label>
            <Form.Select defaultValue={null} {...register("rating")}>
              <option value=""></option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Select>
            {errors.rating && <span>{errors.rating.message}</span>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Accomodation type</Form.Label>
            <Form.Select defaultValue={null} {...register("accomodation_type")}>
              <option value=""></option>
              <option value="hotel">hotel</option>
              <option value="apartment">apartment</option>
              <option value="studio">studio</option>
              <option value="bungalow">bungalow</option>
              <option value="house">house</option>
            </Form.Select>
            {errors.accomodation_type && (
              <span>{errors.accomodation_type.message}</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Location type</Form.Label>
            <Form.Select defaultValue={null} {...register("accomodation_area")}>
              <option value=""></option>
              <option value="city">city</option>
              <option value="mountainside">mountainside</option>
              <option value="sea">sea</option>
              <option value="rural">rural</option>
            </Form.Select>
            {errors.accomodation_area && (
              <span>{errors.accomodation_area.message}</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Maximum number of guests</Form.Label>
            <Form.Select defaultValue={null} {...register("maximum_guests")}>
              <option value=""></option>
              <option value="one">1</option>
              <option value="two">2</option>
              <option value="three">3</option>
              <option value="four">4</option>
              <option value="five">5</option>
              <option value="six">6</option>
              <option value="seven">7</option>
              <option value="eight">8</option>
              <option value="nine">9</option>
              <option value="ten">10</option>
            </Form.Select>
            {errors.maximum_guests && (
              <span>{errors.maximum_guests.message}</span>
            )}
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Images</Form.Label>
            <Form.Control
              type="file"
              {...register("images")}
              onChange={handleInputChange}
              multiple
            />
            {errors.images && <span>{errors.images.message}</span>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicTextArea">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Please write the description here"
              {...register("description")}
            />
            {errors.description && <span>{errors.description.message}</span>}
          </Form.Group>

          <Form.Group>
            <Form.Label>Amenities</Form.Label>
            <div className="mb-3">
              <Form.Check
                inline
                name="Wifi"
                label="Wifi"
                type="checkbox"
                {...register("WiFi")}
              />
              <Form.Check
                inline
                label="Kitchen"
                name="Kitchen"
                type="checkbox"
                {...register("Kitchen")}
              />
              <Form.Check
                inline
                label="Kitchenette"
                name="Kitchenette"
                type="checkbox"
                {...register("Kitchenette")}
              />
              <Form.Check
                inline
                label="Free Parking"
                name="Free_parking"
                type="checkbox"
                {...register("Free_parking")}
              />
              <Form.Check
                inline
                label="Washing machine"
                name="Washing_machine"
                type="checkbox"
                {...register("Washing_machine")}
              />
              <Form.Check
                inline
                label="Tumble dryer"
                name="tumble_dryer"
                type="checkbox"
                {...register("tumble_dryer")}
              />
              <Form.Check
                inline
                label="Airconditioning"
                name="Airconditioning"
                type="checkbox"
                {...register("Airconditioning")}
              />
              <Form.Check
                inline
                label="Heating"
                name="Heating"
                type="checkbox"
                {...register("Heating")}
              />
              <Form.Check
                inline
                label="Pets Allowed"
                name="Pets_allowed"
                type="checkbox"
                {...register("Pets_allowed")}
              />
              <Form.Check
                inline
                label="Suitable for single travellers"
                name="Suitable_for_single_travellers"
                type="checkbox"
                {...register("Suitable_for_single_travellers")}
              />
              <Form.Check
                inline
                label="Suitable for couples"
                name="Suitable_for_couples"
                type="checkbox"
                {...register("Suitable_for_couples")}
              />
              <Form.Check
                inline
                label="Suitable for families"
                name="Suitable_for_families"
                type="checkbox"
                {...register("Suitable_for_families")}
              />
              <Form.Check
                inline
                label="Suitable_for_groups"
                name="Suitable_for_groups"
                type="checkbox"
                {...register("Suitable_for_groups")}
              />
              <Form.Check
                inline
                label="Breakfast included"
                name="Breakfast_included"
                type="checkbox"
                {...register("Breakfast_included")}
              />
              <Form.Check
                inline
                label="Room service"
                name="Room_service"
                type="checkbox"
                {...register("Room_service")}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicTextArea">
            <Form.Label>Extra information</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Please write information here"
              {...register("information")}
            />
            {errors.information && <span>{errors.information.message}</span>}
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
};

export default AddAccomodationForm;
