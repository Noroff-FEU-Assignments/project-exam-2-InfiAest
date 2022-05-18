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

export default function Accomodations(props) {
  const accomodations = props.accomodations.data;
  const [filtered, setFiltered] = useState(accomodations || []);
  const [queryString, setQueryString] = useState([]);
  const [minimumPrice, setMinimumPrice] = useState(0);
  const [maximumPrice, setMaximumPrice] = useState(5500);
  const [priceQueryString, setPriceQueryString] = useState([]);

  function onSelectFilters(event) {
    const { value, checked } = event.target;

    if (checked) {
      setQueryString((prev) => [...prev, value]);
      return queryString;
    } else {
      setQueryString((prev) => prev.filter((x) => x !== value));
      return queryString;
    }
  }
  // console.log(queryString.join("&"));
  function setMaxPrice(event) {
    // console.log(event.target.value);
    const value = event.target.value;
    setMaximumPrice(value);
    setPriceQueryString(
      `filters[price_per_night][$gte]=${minimumPrice}&filters[price_per_night][$lte]=${value}`
    );
  }
  function setMinPrice(event) {
    // console.log(event.target.value);
    const value = event.target.value;
    setMinimumPrice(value);
    setPriceQueryString(
      `filters[price_per_night][$gte]=${value}&filters[price_per_night][$lte]=${maximumPrice}`
    );
  }
  // console.log(priceQueryString);

  function resetFilters() {
    setQueryString([]);
    setMinimumPrice(0);
    setMaximumPrice(5500);
    setPriceQueryString([]);
    document
      .querySelectorAll("input[type=checkbox]")
      .forEach((el) => (el.checked = false));
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
        // console.log(response.data.data);
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
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {filtered ? (
            <>
              <AccomodationCard attributes={filtered} />
            </>
          ) : (
            <>
              <AccomodationCard attributes={accomodations} />
            </>
          )}
          {/* <AccomodationCard attributes={props.accomodations.data} /> */}
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
