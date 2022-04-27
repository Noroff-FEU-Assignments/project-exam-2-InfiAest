import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import useAxios from "../../../hooks/useAxios";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DisplayMessage from "../../messages/DisplayMessage";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const schema = yup.object().shape({
  name: yup.string().required("Please enter the accomodation name"),
  location: yup.string().required("Please enter the address"),
  price_per_night: yup.number().required("Please enter the price per night"),
  rating: yup
    .number()
    .oneOf([1, 2, 3, 4, 5])
    .required("Please select the rating"),
  images: yup
    .mixed()
    .required("Please select up to 3 images")
    .test("type", "Maximum 3 images allowed", (value) => {
      return value && value.length <= 3;
    }),
  description: yup
    .string()
    .required("Please enter a description of the accomodation"),
  amenities: yup.array(
    yup.object({ key: yup.number().required(), label: yup.string().required() })
  ),
  tags: yup.array(
    yup.object({ key: yup.number().required(), label: yup.string().required() })
  ),
  information: yup
    .string()
    .required("Please enter information about the accomodation"),
});

const AddAccomodationForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [image1, setImage1] = useState(false);
  const [image2, setimage2] = useState(false);
  const [image3, setimage3] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagsInputValue, setTagsInputValue] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [amenitiesInputValue, setAmenitiesInputValue] = useState("");

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

  const handleTagsKeyPress = (event) => {
    if (event.key === "Enter") {
      setTags((tags) => [
        ...tags,
        { key: tags.length + 1, label: `${event.target.value}` },
      ]);
      setTagsInputValue("");
    }
  };

  const handleTagsInput = (e) => {
    setTagsInputValue(e.target.value);
  };

  const handleTagDelete = (chipsToDelete) => () => {
    setTags((chips) => chips.filter((chip) => chip.key !== chipsToDelete.key));
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setAmenities((amenity) => [
        ...amenities,
        { key: amenity.length + 1, label: event.target.value },
      ]);
      setAmenitiesInputValue("");
    }
  };

  const handleUserInput = (e) => {
    setAmenitiesInputValue(e.target.value);
  };

  const handleAmenitiyDelete = (chipsToDelete) => () => {
    setAmenities((chips) =>
      chips.filter((chip) => chip.key !== chipsToDelete.key)
    );
  };

  const http = useAxios();

  async function onSubmit(data) {
    setSubmitting(true);
    setServerError(null);

    const postData = {
      name: data.name,
      location: data.location,
      price_per_night: data.price_per_night,
      rating: data.rating,
      description: data.description,
      amenities: data.amenities,
      tags: data.tags,
      information: data.information,
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
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the accomodation address"
              {...register("location")}
            />
            {errors.location && <span>{errors.location.message}</span>}
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
          <Form.Group className="mb-3" controlId="formBasicamenities">
            <Form.Label>amenities</Form.Label>
            <Form.Control
              type="text"
              placeholder="press enter to add each amenity"
              onKeyPress={handleKeyPress}
              value={amenitiesInputValue}
              onChange={handleUserInput}
            />
            <Form.Control
              className="hidden"
              type="text"
              value={JSON.stringify(amenities)}
              readOnly
              {...register("amenities")}
            />
            <Stack direction="row" spacing={1}>
              {amenities.map((amenity) => (
                <Chip
                  key={amenity.key}
                  label={amenity.label}
                  onDelete={handleAmenitiyDelete(amenity)}
                />
              ))}
            </Stack>
            {errors.amenities && <span>{errors.amenities.message}</span>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicTags">
            <Form.Label>Tags</Form.Label>
            <Form.Control
              type="text"
              placeholder="press enter to add each tag"
              onKeyPress={handleTagsKeyPress}
              value={tagsInputValue}
              onChange={handleTagsInput}
            />

            <Form.Control
              className="hidden"
              type="text"
              value={JSON.stringify(tags)}
              readOnly
              {...register("tags")}
            />
            <Stack direction="row" spacing={1}>
              {tags.map((tag) => (
                <Chip
                  key={tag.key}
                  label={tag.label}
                  onDelete={handleTagDelete(tag)}
                />
              ))}
            </Stack>
            {errors.tags && <span>{errors.tags.message}</span>}
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
