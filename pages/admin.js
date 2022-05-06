import Head from "../components/layout/Head";
import Layout from "../components/layout/Layout";
import Heading from "../components/layout/Heading";
import SectionWrapper from "../components/layout/SectionWrapper";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Enquiries from "../components/admin/Enquiries";
import Messages from "../components/admin/Messages";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Admin() {
  const [auth] = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!auth) {
      return router.push("/");
    }
  }, []);

  function handleAddButton() {
    return router.push("/addAccomodation");
  }

  return (
    <Layout>
      <Head title="Holidaze Admin" />

      <div className="container">
        <div
          className="admin__heading"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            flexWrap: "wrap",
          }}
        >
          <Heading size="1" content="Admin dashboard" />

          <Button
            variant="outline-info"
            onClick={handleAddButton}
            style={{ height: "max-content" }}
          >
            <FontAwesomeIcon icon={faPlus} height="20px" /> New accomodation
          </Button>
        </div>
        <SectionWrapper>
          <Tabs defaultActiveKey="enquiries" className="mb-3">
            <Tab eventKey="enquiries" title="Enquiries">
              <div>
                <Enquiries />
              </div>
            </Tab>
            <Tab eventKey="messages" title="Messages">
              <Messages />
            </Tab>
          </Tabs>
        </SectionWrapper>
      </div>
    </Layout>
  );
}
