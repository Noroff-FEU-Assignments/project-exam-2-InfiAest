import Head from "../components/layout/general/Head";
import Layout from "../components/layout/general/Layout";
import Heading from "../components/layout/headings/Heading";
import ContactForm from "../components/forms/contact/ContactForm";

export default function Contact() {
  return (
    <Layout>
      <Head title="Holidaze Contact" />
      <div className="container">
        <Heading size="1" content="Contact us" />
        <ContactForm />
      </div>
    </Layout>
  );
}
