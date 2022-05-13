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

export default function Accomodations(props) {
  return (
    <Layout>
      <Head title="Holidaze Accomodations" />
      <PageContainer>
        <Heading size="1" content="Accomodation" />
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          <AccomodationCard attributes={props.accomodations.data} />
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
