import PropTypes from "prop-types";
import SectionWrapper from "../../layout/general/SectionWrapper";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import FilterButton from "./buttons/FilterButton";
import ResetFiltersButton from "./buttons/ResetFiltersButton";
import Tags from "../../../utils/icons/Tags";
import Rating from "../../../utils/icons/Rating";
import {
  accomAmenities,
  accomAreas,
  accomRatings,
  accomTypes,
} from "../../../utils/filterOptions/filterOptions";

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
                          <Form.Check.Input
                            className="filters__checkbox--input"
                            type="checkbox"
                            value={type.value}
                            onClick={checkboxFilters}
                            name={type.label}
                          />
                          <span className="filters__checkbox--span">
                            <Tags
                              tagActive={true}
                              content={type.label}
                              tagClass="filters__tags"
                            />
                          </span>
                        </Form.Check.Label>
                      </div>
                    );
                  })}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header
                  as="h3"
                  className="filters__innerAccordion__header"
                >
                  Location type
                </Accordion.Header>
                <Accordion.Body>
                  {accomAreas.map((area, index) => {
                    return (
                      <div className="filters__checkbox" key={index}>
                        <Form.Check.Label className="filters__checkbox--label">
                          <Form.Check.Input
                            className="filters__checkbox--input"
                            type="checkbox"
                            value={area.value}
                            onChange={checkboxFilters}
                            name={area.label}
                          />
                          <span className="filters__checkbox--span">
                            <Tags
                              tagActive={true}
                              content={area.label}
                              tagClass="filters__tags"
                            />
                          </span>
                        </Form.Check.Label>
                      </div>
                    );
                  })}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header as="h3">Price per night</Accordion.Header>
                <Accordion.Body>
                  <div className="filters__form__range">
                    <div>
                      <Form.Label className="filters__form__range--label">
                        <div>Min.</div>
                        <div>{minPrice},- kr</div>
                      </Form.Label>
                      <Form.Range
                        min={0}
                        max={5000}
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
              <Accordion.Item eventKey="4">
                <Accordion.Header as="h3">Rating</Accordion.Header>
                <Accordion.Body>
                  {accomRatings.map((rating, index) => {
                    return (
                      <div className="filters__checkbox" key={index}>
                        <Form.Check.Label className="filters__checkbox--label">
                          <Form.Check.Input
                            className="filters__checkbox--input"
                            type="checkbox"
                            value={rating.value}
                            onChange={checkboxFilters}
                            name={`${rating.label} stars`}
                          />
                          <span className="filters__checkbox--span">
                            <Rating
                              ratingValue={rating.label}
                              tagClass="filters"
                            />
                          </span>
                        </Form.Check.Label>
                      </div>
                    );
                  })}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="5">
                <Accordion.Header as="h3">Amenities</Accordion.Header>
                <Accordion.Body>
                  {accomAmenities.map((amenity, index) => {
                    return (
                      <div className="filters__checkbox" key={index}>
                        <Form.Check.Label className="filters__checkbox--label">
                          <Form.Check.Input
                            className="filters__checkbox--input"
                            type="checkbox"
                            value={amenity.value}
                            onChange={checkboxFilters}
                            name={amenity.label}
                          />
                          <span className="filters__checkbox--span">
                            <Tags
                              tagActive={true}
                              content={amenity.icon}
                              tagClass="filters__tags"
                            />
                          </span>
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
                  tagClass="filters__button__tags"
                />
              </FilterButton>
              <ResetFiltersButton
                resetFiltersFunction={resetFilters}
                variant="light"
              >
                <Tags
                  tagActive={true}
                  content="Reset filters"
                  tagClass="filters__button__tags"
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
