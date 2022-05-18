import PropTypes from "prop-types";
import SectionWrapper from "../../layout/general/SectionWrapper";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import FilterButton from "./buttons/FilterButton";
import ResetFiltersButton from "./buttons/ResetFiltersButton";
import Tags from "../../accomodationAttributes/icons/Tags";
import Rating from "../../accomodationAttributes/icons/Rating";

const accomTypes = [
  { label: "House", value: "filters[accomodation_type][$eq]=house" },
  { label: "Studio", value: "filters[accomodation_type][$eq]=studio" },
  { label: "Hotel", value: "filters[accomodation_type][$eq]=hotel" },
  { label: "Apartment", value: "filters[accomodation_type][$eq]=apartment" },
  { label: "Bungalow", value: "filters[accomodation_type][$eq]=bungalow" },
];
const accomRatings = [
  { label: "1", value: "filters[rating][$eq]=1" },
  { label: "2", value: "filters[rating][$eq]=2" },
  { label: "3", value: "filters[rating][$eq]=3" },
  { label: "4", value: "filters[rating][$eq]=4" },
  { label: "5", value: "filters[rating][$eq]=5" },
];
const accomAmenities = [
  {
    label: "Tumble dryer",
    value: "filters[tags][tumble_dryer][$eq]=true",
    icon: "Dryer",
  },
  {
    label: "Kitchenette",
    value: "filters[tags][Kitchenette][$eq]=true",
    icon: "Kitchenette",
  },
  {
    label: "Room service",
    value: "filters[tags][Room_service][$eq]=true",
    icon: "Room service",
  },
  {
    label: "Airconditioning",
    value: "filters[tags][Airconditioning][$eq]=true",
    icon: "Aircon",
  },
  {
    label: "Free parking",
    value: "filters[tags][Free_parking][$eq]=true",
    icon: "Free parking",
  },
  {
    label: "Washing Machine",
    value: "filters[tags][Washing_machine][$eq]=true",
    icon: "Washer",
  },
  {
    label: "Heating",
    value: "filters[tags][Heating][$eq]=true",
    icon: "Heating",
  },
  {
    label: "Pets allowed",
    value: "filters[tags][Pets_allowed][$eq]=true",
    icon: "Pets allowed",
  },
  { label: "WiFi", value: "filters[tags][WiFi][$eq]=true", icon: "WiFi" },
  {
    label: "Suitable for single travellers",
    value: "filters[tags][Suitable_for_single_travellers][$eq]=true",
    icon: "Single travellers",
  },
  {
    label: "Suitable for couples",
    value: "filters[tags][Suitable_for_couples][$eq]=true",
    icon: "Couples",
  },
  {
    label: "Suitable for families",
    value: "filters[tags][Suitable_for_families][$eq]=true",
    icon: "Families",
  },
  {
    label: "Suitable for groups",
    value: "filters[tags][Suitable_for_groups][$eq]=true",
    icon: "Groups",
  },
  {
    label: "Kitchen",
    value: "filters[tags][Kitchen][$eq]=true",
    icon: "Kitchen",
  },
  {
    label: "Breakfast included",
    value: "filters[tags][Breakfast_included][$eq]=true",
    icon: "Breakfast included",
  },
];

function FilterAccomodations({
  checkboxFilters,
  minPriceRangeFilter,
  maxPriceRangeFilter,
  resetFilters,
  filterFunction,
  maxPrice,
  minPrice,
}) {
  return (
    <SectionWrapper>
      <Accordion className="filters">
        <Accordion.Item eventKey="0">
          <Accordion.Header className="filters__header">
            Filters
          </Accordion.Header>
          <Accordion.Body>
            <Accordion flush className="filters__innerAccordion">
              <Accordion.Item eventKey="1">
                <Accordion.Header
                  as="h3"
                  className="filters__innerAccordion__header"
                >
                  Accomodation type
                </Accordion.Header>
                <Accordion.Body>
                  {accomTypes.map((type, index) => {
                    return (
                      <div className="filters__checkbox" key={index}>
                        <Form.Check.Label className="filters__checkbox--label">
                          <Form.Check>
                            <Form.Check.Input
                              className="filters__checkbox--input"
                              type="checkbox"
                              value={type.value}
                              onChange={checkboxFilters}
                            />
                            <span className="filters__checkbox--span">
                              <Tags
                                tagActive={true}
                                content={type.label}
                                tagClass="filters__tags"
                              />
                            </span>
                          </Form.Check>
                        </Form.Check.Label>
                      </div>
                    );
                  })}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header as="h4">Price per night</Accordion.Header>
                <Accordion.Body>
                  <div className="filters__form__range">
                    <div>
                      <Form.Label className="filters__form__range--label">
                        <div>Min.</div>
                        <div>{minPrice},- kr</div>
                      </Form.Label>
                      <Form.Range
                        min={0}
                        max={maxPrice}
                        step={100}
                        value={minPrice}
                        onChange={minPriceRangeFilter}
                      />
                    </div>
                    <div>
                      <Form.Label className="filters__form__range--label">
                        <div>Max.</div>
                        <div>{maxPrice},- kr</div>
                      </Form.Label>
                      <Form.Range
                        min={minPrice}
                        max={5500}
                        step={100}
                        value={maxPrice}
                        onChange={maxPriceRangeFilter}
                      />
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header as="h4">Rating</Accordion.Header>
                <Accordion.Body>
                  {accomRatings.map((rating, index) => {
                    return (
                      <div className="filters__checkbox" key={index}>
                        <Form.Check.Label className="filters__checkbox--label">
                          <Form.Check>
                            <Form.Check.Input
                              className="filters__checkbox--input"
                              type="checkbox"
                              value={rating.value}
                              onChange={checkboxFilters}
                            />
                            <span className="filters__checkbox--span">
                              <Rating
                                ratingValue={rating.label}
                                tagClass="filters"
                              />
                            </span>
                          </Form.Check>
                        </Form.Check.Label>
                      </div>
                    );
                  })}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header as="h4">Amenities</Accordion.Header>
                <Accordion.Body>
                  {accomAmenities.map((amenity, index) => {
                    return (
                      <div className="filters__checkbox" key={index}>
                        <Form.Check.Label className="filters__checkbox--label">
                          <Form.Check>
                            <Form.Check.Input
                              className="filters__checkbox--input"
                              type="checkbox"
                              value={amenity.value}
                              onChange={checkboxFilters}
                            />
                            <span className="filters__checkbox--span">
                              <Tags
                                tagActive={true}
                                content={amenity.icon}
                                tagClass="filters__tags"
                              />
                            </span>
                          </Form.Check>
                        </Form.Check.Label>
                      </div>
                    );
                  })}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <div className="d-grid gap-2">
              <FilterButton filterFunction={filterFunction}>
                <Tags
                  tagActive={true}
                  content="Filter accomodations"
                  tagClass="filterButton__tags"
                />
              </FilterButton>
              <ResetFiltersButton resetFiltersFunction={resetFilters}>
                <Tags
                  tagActive={true}
                  content="Reset filters"
                  tagClass="filterButton__tags"
                />
              </ResetFiltersButton>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </SectionWrapper>
  );
}

export default FilterAccomodations;

FilterAccomodations.propTypes = {
  checkboxFilters: PropTypes.func.isRequired,
  minPriceRangeFilter: PropTypes.func.isRequired,
  maxPriceRangeFilter: PropTypes.func.isRequired,
  resetFilters: PropTypes.func.isRequired,
  filterFunction: PropTypes.func.isRequired,
  minPrice: PropTypes.number.isRequired,
  maxPrice: PropTypes.number.isRequired,
};
