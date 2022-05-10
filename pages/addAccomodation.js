import Heading from "../components/layout/Heading";
import Layout from "../components/layout/Layout";
import Head from "../components/layout/Head";
import AddAccomodationForm from "../components/forms/accomodations/AddAccomodationForm";
import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";

function addAccomodation() {
  const [auth] = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!auth) {
      return router.push("/");
    }
  }, []);

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
