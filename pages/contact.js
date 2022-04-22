import Head from "../components/layout/Head";
import Layout from "../components/layout/Layout";
import ContactForm from "../components/forms/contact/ContactForm";

export default function Contact() {
  return (
    <Layout>
      <Head title="Holidaze Contact" />

      <div className="container">
        <h1>Contact page</h1>
        <ContactForm />
      </div>
    </Layout>
  );
}
