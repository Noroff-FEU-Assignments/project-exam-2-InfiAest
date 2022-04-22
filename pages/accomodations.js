import EnquiryForm from "../components/forms/enquiry/EnquiryForm";
import Head from "../components/layout/Head";
import Layout from "../components/layout/Layout";

export default function Accomodations() {
  return (
    <Layout>
      <Head title="Holidaze Accomodations" />

      <div className="container">
        <h1>Accomodations page</h1>
        <EnquiryForm />
      </div>
    </Layout>
  );
}
