import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxios from "../../../hooks/useAxios";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DisplayMessage from "../../messages/DisplayMessage";
import { ACCOMODATION_PATH } from "../../../constants/api";
import { tagData } from "../../../utils/tagData/tagData";
import Tags from "../../../utils/icons/Tags";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ADD_ACCOMODATION_FORM_SCHEMA } from "../../../utils/formSchema/addAccomFormSchema";
import FormError from "../../messages/FormError";

const AddAccomodationForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [image1, setImage1] = useState(false);
  const [image2, setimage2] = useState(false);
  const [image3, setimage3] = useState(false);
  const [descriptionCount, setDescriptionCount] = useState(0);
  const [infoCount, setInfoCount] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ADD_ACCOMODATION_FORM_SCHEMA),
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

    let formData = new FormData();
    formData.append("files.images", image1);
    formData.append("files.images", image2);
    formData.append("files.images", image3);
    formData.append("data", JSON.stringify(postData));

    try {
      const response = await http.post(ACCOMODATION_PATH, formData);
      setSubmitted(true);
    } catch (error) {
      console.log("error", error);
      setServerError(error.toString());
    } finally {
      setSubmitting(false);
      setTimeout(() => {
        setSubmitted(false);
        document.getElementById("addAccomForm").reset();
      }, 3000);
    }
  }

  return (
    <>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        id="addAccomForm"
        className="mt-5 mb-5 addForm"
      >
        <fieldset disabled={submitting}>
          <Row xs={1} lg={2}>
            <Col lg={9}>
              <Row xs={1} md={2}>
                <Col md={6}>
                  <Form.Group className="mb-4">
                    <Form.Label>Accomodation name</Form.Label>
                    <Form.Control
                      autoComplete="nope"
                      type="text"
                      placeholder="Enter the accomodation name"
                      {...register("name")}
                    />
                    {errors.name && <FormError message={errors.name.message} />}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-4">
                    <Form.Label>Rating</Form.Label>
                    <Form.Select defaultValue={null} {...register("rating")}>
                      <option value=""></option>
                      <option value="1">1 star</option>
                      <option value="2">2 stars</option>
                      <option value="3">3 stars</option>
                      <option value="4">4 stars</option>
                      <option value="5">5 stars</option>
                    </Form.Select>
                    {errors.rating && (
                      <FormError message={errors.rating.message} />
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row xs={1} md={2}>
                <Col md={6}>
                  <Form.Group className="mb-4">
                    <Form.Label>Street name and number</Form.Label>
                    <Form.Control
                      autoComplete="nope"
                      type="text"
                      placeholder="Streetname 22"
                      {...register("street_address")}
                    />
                    {errors.street_address && (
                      <FormError message={errors.street_address.message} />
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-4">
                    <Form.Label>Zip code and city</Form.Label>
                    <Form.Control
                      autoComplete="nope"
                      type="text"
                      placeholder="5002 Bergen"
                      {...register("zip_code")}
                    />
                    {errors.zip_code && (
                      <FormError message={errors.zip_code.message} />
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <Row xs={1} md={2}>
                <Col md={6}>
                  <Form.Group className="mb-4">
                    <Form.Label>Location type</Form.Label>
                    <Form.Select
                      defaultValue={null}
                      {...register("accomodation_area")}
                    >
                      <option value=""></option>
                      <option value="city">City</option>
                      <option value="mountainside">Mountainside</option>
                      <option value="sea">Sea</option>
                      <option value="rural">Rural</option>
                    </Form.Select>
                    {errors.accomodation_area && (
                      <FormError message={errors.accomodation_area.message} />
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-4">
                    <Form.Label>Accomodation type</Form.Label>
                    <Form.Select
                      defaultValue={null}
                      {...register("accomodation_type")}
                    >
                      <option value=""></option>
                      <option value="hotel">Hotel</option>
                      <option value="apartment">Apartment</option>
                      <option value="studio">Studio</option>
                      <option value="bungalow">Bungalow</option>
                      <option value="house">House</option>
                    </Form.Select>
                    {errors.accomodation_type && (
                      <FormError message={errors.accomodation_type.message} />
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-4">
                    <Form.Label>Max. number of guests</Form.Label>
                    <Form.Select
                      defaultValue={null}
                      {...register("maximum_guests")}
                    >
                      <option value=""></option>
                      <option value="one">1 person</option>
                      <option value="two">2 people</option>
                      <option value="three">3 people</option>
                      <option value="four">4 people</option>
                      <option value="five">5 people</option>
                      <option value="six">6 people</option>
                      <option value="seven">7 people</option>
                      <option value="eight">8 people</option>
                      <option value="nine">9 people</option>
                      <option value="ten">10 people</option>
                    </Form.Select>
                    {errors.maximum_guests && (
                      <FormError message={errors.maximum_guests.message} />
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-4">
                    <Form.Label>Price per night</Form.Label>
                    <Form.Control
                      autoComplete="nope"
                      type="text"
                      placeholder="1234"
                      {...register("price_per_night")}
                    />
                    {errors.price_per_night && (
                      <FormError message={errors.price_per_night.message} />
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-4">
                <Form.Label>
                  Description
                  <span
                    className={
                      descriptionCount >= 20 || descriptionCount === 0
                        ? "form__text__counter"
                        : "form__text__counter form__text__counter--error"
                    }
                  >
                    {descriptionCount}/20
                  </span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  onKeyUp={(e) => setDescriptionCount(e.target.value.length)}
                  placeholder="General description of the accomodation"
                  {...register("description")}
                />

                {errors.description && (
                  <FormError message={errors.description.message} />
                )}
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-4">
                <Form.Label>Images</Form.Label>
                <Form.Control
                  type="file"
                  {...register("images")}
                  onChange={handleInputChange}
                  multiple
                />
                {errors.images && <FormError message={errors.images.message} />}
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>
                  Extra information
                  <span
                    className={
                      infoCount >= 20 || infoCount === 0
                        ? "form__text__counter"
                        : "form__text__counter form__text__counter--error"
                    }
                  >
                    {infoCount}/20
                  </span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  onKeyUp={(e) => setInfoCount(e.target.value.length)}
                  placeholder="Information about house rules, check-in/out etc. Separate the information by starting a new line with no fullstop/period."
                  {...register("information")}
                />
                {errors.information && (
                  <FormError message={errors.information.message} />
                )}
              </Form.Group>
            </Col>
            <Col lg={3}>
              <Form.Group>
                <Form.Label>Amenities</Form.Label>
                <div className="mb-4">
                  <div className="addForm__amenities">
                    {tagData.map((tag, index) => {
                      return (
                        <div className="filters__checkbox" key={index}>
                          <Form.Check.Label className="filters__checkbox--label">
                            <Form.Check.Input
                              className="filters__checkbox--input"
                              type="checkbox"
                              name={tag.tagName}
                              {...register(`${tag.registerValue}`)}
                            />
                            <span
                              className="filters__checkbox--span"
                              style={{ borderRadius: "10px" }}
                            >
                              <Tags
                                tagActive={true}
                                content={tag.tagLabel}
                                tagClass="filters__tags"
                              />
                            </span>
                          </Form.Check.Label>
                        </div>
                      );
                    })}
                  </div>
                  {errors.amenities__checkboxes && (
                    <FormError message={errors.amenities__checkboxes.message} />
                  )}
                </div>
              </Form.Group>
            </Col>
          </Row>

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
              message={`Your new accomodation has been created successfully`}
            />
          ) : (
            ""
          )}

          <div className="d-grid gap-2">
            <Button variant="primary" className="form__button" type="submit">
              {submitting ? "Adding..." : "Add accomodation"}
            </Button>
          </div>
        </fieldset>
      </Form>
    </>
  );
};

export default AddAccomodationForm;
