import Heading from "../components/layout/Heading";
import Layout from "../components/layout/Layout";
import Head from "../components/layout/Head";
import AddAccomodationForm from "../components/forms/accomodation/AddAccomodationForm";

function addAccomodation() {
  return (
    <Layout>
      <Head title="Holidaze Add accomodation" />
      <div className="container">
        <Heading size="1" content="Add new accomodation" />
        <AddAccomodationForm />
      </div>
    </Layout>
  );
}

export default addAccomodation;
