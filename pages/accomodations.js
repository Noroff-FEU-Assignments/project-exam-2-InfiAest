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
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { Button } from "react-bootstrap";

export default function Accomodations(props) {
  const accomodations = props.accomodations.data;
  const [filtered, setFiltered] = useState([]);
  const [queryString, setQueryString] = useState([]);

  // function onChange(event) {
  //   // console.log(event.target.value);
  //   let url = "";
  //   if (event.target.value === "all") {
  //     setFiltered(accomodations);
  //   } else {
  //     url = `https://holidaze-charlotte-lucas.herokuapp.com/api/accomodations?filters[accomodation_type][$eq]=${event.target.value}&populate=*`;
  //     async function loadAccomodations() {
  //       try {
  //         const response = await axios.get(url);
  //         // console.log(response.data.data);
  //         setFiltered(response.data.data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //     loadAccomodations();
  //   }
  // }

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

  function filterOptions() {
    const url = `https://holidaze-charlotte-lucas.herokuapp.com/api/accomodations?${queryString.join(
      "&"
    )}&populate=*`;
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
        Filter by:
        <Form>
          {/* <Form.Select defaultValue="all" onChange={onChange}>
            <option value="all">All</option>
            <option value="hotel">Hotel</option>
            <option value="apartment">Apartment</option>
            <option value="bungalow">Bungalow</option>
            <option value="studio">Studio</option>
            <option value="house">House</option>
          </Form.Select> */}
          <Form.Check
            type="checkbox"
            value="filters[accomodation_type][$eq]=house"
            label="house"
            onChange={onSelectFilters}
          />
          <Form.Check
            type="checkbox"
            value="filters[accomodation_type][$eq]=studio"
            label="studio"
            onChange={onSelectFilters}
          />
          <Form.Check
            type="checkbox"
            value="filters[accomodation_type][$eq]=hotel"
            label="hotel"
            onChange={onSelectFilters}
          />
          <Form.Check
            type="checkbox"
            value="filters[accomodation_type][$eq]=bungalow"
            label="bungalow"
            onChange={onSelectFilters}
          />
          <Form.Check
            type="checkbox"
            value="filters[accomodation_type][$eq]=apartment"
            label="apartment"
            onChange={onSelectFilters}
          />
        </Form>
        <Button onClick={filterOptions}>Filter</Button>
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {filtered.length > 0 ? (
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
