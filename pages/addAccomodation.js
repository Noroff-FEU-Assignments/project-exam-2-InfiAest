import Heading from "../components/layout/headings/Heading";
import Layout from "../components/layout/general/Layout";
import Head from "../components/layout/general/Head";
import AddAccomodationForm from "../components/admin/forms/AddAccomodationForm";
import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import PageContainer from "../components/layout/general/PageContainer";
import Breadcrumb from "react-bootstrap/Breadcrumb";

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
      <PageContainer>
        <Breadcrumb>
          <Breadcrumb.Item href="/admin" className="breadcrumb__link">
            Admin
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Add accomodation</Breadcrumb.Item>
        </Breadcrumb>
        <Heading size="1" content="Add new accomodation" />
        <AddAccomodationForm />
      </PageContainer>
    </Layout>
  );
}

export default addAccomodation;
