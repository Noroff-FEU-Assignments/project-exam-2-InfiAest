import Head from "../components/layout/general/Head";
import Layout from "../components/layout/general/Layout";
import PageContainer from "../components/layout/general/PageContainer";
import Heading from "../components/layout/headings/Heading";
import SectionWrapper from "../components/layout/general/SectionWrapper";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Enquiries from "../components/admin/renderHtml/Enquiries";
import Messages from "../components/admin/renderHtml/Messages";
import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import AddNewAccomodationButton from "../components/admin/buttons/AddNewAccomodationButton";

export default function Admin() {
  const [auth] = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!auth) {
      return router.push("/");
    }
  }, []);

  return (
    <Layout>
      <Head
        title="Holidaze | Admin"
        description="Book a hotel, apartment or house in Bergen for your Holidaze."
      />

      <PageContainer>
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

          <AddNewAccomodationButton />
        </div>
        <SectionWrapper>
          <Tabs defaultActiveKey="enquiries" className="mb-3 adminTabs">
            <Tab
              eventKey="enquiries"
              title="Enquiries"
              className="adminTabs__tab"
              aria-label="Enquiries tab button"
            >
              <div>
                <Enquiries />
              </div>
            </Tab>
            <Tab
              eventKey="messages"
              title="Messages"
              className="adminTabs__tab"
              aria-label="Messages tab button"
            >
              <Messages />
            </Tab>
          </Tabs>
        </SectionWrapper>
      </PageContainer>
    </Layout>
  );
}
