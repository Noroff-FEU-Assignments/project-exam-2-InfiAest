import Layout from "../components/layout/general/Layout";
import Head from "../components/layout/general/Head";
import PageContainer from "../components/layout/general/PageContainer";
import Heading from "../components/layout/headings/Heading";
import Row from "react-bootstrap/Row";
import axios from "axios";
import {
  ACCOMODATION_PATH,
  BASE_URL,
  IMG_POPULATE_PATH,
} from "../constants/api";
import AccomodationCard from "../components/accomodationAttributes/cards/AccomodationCard";
import { useState } from "react";
import FilterAccomodations from "../components/forms/filterAccomodations/FilterAccomodations";
import DisplayMessage from "../components/messages/DisplayMessage";
import { useRouter } from "next/router";

export default function Accomodation(props) {
  const accomodations = props.accomodations.data;
  const [filtered, setFiltered] = useState(accomodations || []);
  const [queryString, setQueryString] = useState([]);
  const [minimumPrice, setMinimumPrice] = useState(0);
  const [maximumPrice, setMaximumPrice] = useState(5500);
  const [priceQueryString, setPriceQueryString] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedFiltersVisable, setSelectedFiltersVisable] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState("");

  const router = useRouter();
  const query = router.query;
  const qsFilters = query.filters;
  // console.log(qsFilters);

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
    setSelectedPrice(`from ${minimumPrice},- kr to ${value},- kr`);
    setPriceQueryString(
      `filters[price_per_night][$gte]=${minimumPrice}&filters[price_per_night][$lte]=${value}`
    );
  }
  function setMinPrice(event) {
    const value = event.target.value;
    setMinimumPrice(value);
    setSelectedPrice(`from ${value},- kr to ${maximumPrice},- kr`);
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
    router.replace("/accomodations");
    setSelectedFiltersVisable(false);
    setFiltered(accomodations);
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

    // console.log(url);
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
      <Head title="Holidaze Accomodations" />
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
        {selectedFiltersVisable ? (
          <div className="filters__chips">
            Selected filters:
            {selectedFilters.map((filter, index) => {
              return (
                <span key={index} className="filters__chip">
                  {filter}
                </span>
              );
            })}
            {selectedPrice.length > 0 ? (
              <span className="filters__chip">{selectedPrice}</span>
            ) : (
              <></>
            )}
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
              <AccomodationCard attributes={accomodations} />
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

    console.log(response.data);
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
