import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  ACCOMODATION_PATH,
  BASE_URL,
  IMG_POPULATE_PATH,
} from "../constants/api";
import { useRouter } from "next/router";
import Layout from "../components/layout/general/Layout";
import Head from "../components/layout/general/Head";
import PageContainer from "../components/layout/general/PageContainer";
import Heading from "../components/layout/headings/Heading";
import Row from "react-bootstrap/Row";
import AccomodationCard from "../components/accomodationAttributes/cards/AccomodationCard";
import FilterAccomodations from "../components/forms/filterAccomodations/FilterAccomodations";
import DisplayMessage from "../components/messages/DisplayMessage";
import ResetFiltersButton from "../components/forms/filterAccomodations/buttons/ResetFiltersButton";
import Tags from "../utils/icons/Tags";

export default function Accomodation({ accomodations }) {
  const accoms = accomodations.data;
  const [filtered, setFiltered] = useState(accoms || []);
  const [queryString, setQueryString] = useState([]);
  const [minimumPrice, setMinimumPrice] = useState(0);
  const [maximumPrice, setMaximumPrice] = useState(5500);
  const [priceQueryString, setPriceQueryString] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedFiltersVisable, setSelectedFiltersVisable] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState([]);

  const router = useRouter();
  const query = router.query;
  const qsFilters = query.filters;
  let urlFilterOptions = "";

  useEffect(() => {
    const hotelButton = document.getElementsByName("Hotel");
    const ruralButton = document.getElementsByName("Rural");
    const apartmentButton = document.getElementsByName("Apartment");
    const cityButton = document.getElementsByName("City");
    if (query) {
      if (qsFilters === "Hotel") {
        urlFilterOptions = "filters[accomodation_type][$eq]=hotel";
        setSelectedFilters([...selectedFilters, `${qsFilters}`]);
        setSelectedFiltersVisable(true);
        hotelButton[0].checked = true;
      } else if (qsFilters === "Rural") {
        urlFilterOptions = "filters[accomodation_area][$eq]=rural";
        setSelectedFilters([...selectedFilters, `${qsFilters}`]);
        setSelectedFiltersVisable(true);
        ruralButton[0].checked = true;
      } else if (qsFilters === "Apartment") {
        urlFilterOptions = "filters[accomodation_type][$eq]=apartment";
        setSelectedFilters([...selectedFilters, `${qsFilters}`]);
        setSelectedFiltersVisable(true);
        apartmentButton[0].checked = true;
      } else if (qsFilters === "City") {
        urlFilterOptions = "filters[accomodation_area][$eq]=city";
        setSelectedFilters([...selectedFilters, `${qsFilters}`]);
        setSelectedFiltersVisable(true);
        cityButton[0].checked = true;
      } else {
        setSelectedFilters([]);
        setSelectedFiltersVisable(false);
      }
      const url = `${BASE_URL}${ACCOMODATION_PATH}?${urlFilterOptions}&populate=*`;
      async function loadFiltered() {
        try {
          const response = await axios.get(url);
          setFiltered(response.data.data);
        } catch (error) {
          console.log(error);
        }
      }
      loadFiltered();
    }
  }, []);

  function onSelectFilters(event) {
    const { value, checked, name } = event.target;

    if (checked) {
      setQueryString((prev) => [...prev, value]);
      setSelectedFilters((prev) => [...prev, name]);
      return { queryString, selectedFilters };
    } else {
      setQueryString((prev) => prev.filter((x) => x !== value));
      setSelectedFilters((prev) => prev.filter((x) => x !== name));
      return { queryString, selectedFilters };
    }
  }

  function setMaxPrice(event) {
    const value = event.target.value;
    setMaximumPrice(value);
    setSelectedPrice([{ min: minimumPrice, max: value }]);
    setPriceQueryString(
      `filters[price_per_night][$gte]=${minimumPrice}&filters[price_per_night][$lte]=${value}`
    );
  }
  function setMinPrice(event) {
    const value = event.target.value;
    setMinimumPrice(value);
    setSelectedPrice([{ min: value, max: maximumPrice }]);
    setPriceQueryString(
      `filters[price_per_night][$gte]=${value}&filters[price_per_night][$lte]=${maximumPrice}`
    );
  }

  function resetFilters() {
    setQueryString([]);
    setSelectedFilters([]);
    setMinimumPrice(0);
    setMaximumPrice(5500);
    setPriceQueryString([]);
    document
      .querySelectorAll("input[type=checkbox]")
      .forEach((el) => (el.checked = false));
    router.replace("/accomodation");
    setSelectedFiltersVisable(false);
    setFiltered(accoms);
    setSelectedPrice([]);
  }

  function filterOptions() {
    let url = "";
    if (priceQueryString.length > 0) {
      url = `https://holidaze-charlotte-lucas.herokuapp.com/api/accomodations?${queryString.join(
        "&"
      )}&${priceQueryString}&populate=*`;
    } else {
      url = `https://holidaze-charlotte-lucas.herokuapp.com/api/accomodations?${queryString.join(
        "&"
      )}&populate=*`;
    }

    async function loadAccomodations() {
      try {
        const response = await axios.get(url);
        setSelectedFiltersVisable(true);
        setFiltered(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    loadAccomodations();
  }

  return (
    <Layout>
      <Head
        title="Holidaze | Accomodations"
        description="Book a hotel, apartment or house in Bergen for your Holidaze."
      />
      <PageContainer>
        <Heading size="1" content="Accomodation" />
        <FilterAccomodations
          checkboxFilters={onSelectFilters}
          minPriceRangeFilter={setMinPrice}
          maxPriceRangeFilter={setMaxPrice}
          resetFilters={resetFilters}
          filterFunction={filterOptions}
          maxPrice={parseInt(maximumPrice)}
          minPrice={parseInt(minimumPrice)}
        />
        {(selectedFiltersVisable && selectedFilters.length > 0) ||
        (selectedFiltersVisable && selectedPrice.length > 0) ? (
          <div className="filters">
            <div className="filters__resetButton">
              <ResetFiltersButton
                resetFiltersFunction={resetFilters}
                variant="dark"
              >
                <Tags
                  tagActive={true}
                  content="Reset filters"
                  tagClass="filters__button__tags"
                />
              </ResetFiltersButton>
            </div>
            <div className="filters__chips">
              Selected filters:
              {selectedFilters.map((filter, index) => {
                return (
                  <span key={index} className="filters__chips--chip">
                    {filter}
                  </span>
                );
              })}
              {selectedPrice.map((price, index) => {
                return (
                  <span key={index} className="filters__chips--chip">
                    from {price.min},- kr to {price.max},- kr
                  </span>
                );
              })}
            </div>
          </div>
        ) : (
          <></>
        )}

        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {filtered ? (
            <>
              {filtered.length === 0 ? (
                <>
                  <DisplayMessage
                    variant="info"
                    heading="No results!"
                    message="Looks like you were a bit too specific, reset the filters and try again!"
                    alertClass="filters__alert"
                  />
                </>
              ) : (
                <>
                  <AccomodationCard attributes={filtered} />
                </>
              )}
            </>
          ) : (
            <>
              <AccomodationCard attributes={accoms} />
            </>
          )}
        </Row>
      </PageContainer>
    </Layout>
  );
}

export async function getStaticProps() {
  const url = BASE_URL + ACCOMODATION_PATH + IMG_POPULATE_PATH;
  let accomodations = [];
  try {
    const response = await axios.get(url);
    accomodations = response.data;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      accomodations: accomodations,
    },
  };
}

Accomodation.propTypes = {
  accomodations: PropTypes.object.isRequired,
};
