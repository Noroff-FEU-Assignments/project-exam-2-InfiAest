import Head from "../components/layout/general/Head";
import Layout from "../components/layout/general/Layout";
import Heading from "../components/layout/headings/Heading";
import PageContainer from "../components/layout/general/PageContainer";
import ContactForm from "../components/forms/contact/ContactForm";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function Contact() {
  return (
    <Layout>
      <Head
        title="Holidaze | Contact"
        description="Book a hotel, apartment or house in Bergen for your Holidaze."
      />
      <PageContainer>
        <Heading size="1" content="Contact us" />
        <Row xs={1} md={2} className="g-5">
          <Col>
            <div className="contact__info">
              <Heading
                size="2"
                customClass="contact__header"
                content="Find us here..."
              />
              <div className="contact__link">
                <FontAwesomeIcon
                  className="contact__link--icon"
                  icon={faPhone}
                />
                <div className="contact__link--name">+47 123 45 678</div>
              </div>

              <div className="contact__link">
                <FontAwesomeIcon
                  className="contact__link--icon"
                  icon={faLocationDot}
                />
                <div className="contact__link--name">
                  Torgallmenningen 6, Bergen 5003
                </div>
              </div>

              <a
                href=""
                aria-label="Link to Holidaze facebook page"
                className="contact__link"
              >
                <FontAwesomeIcon
                  className="contact__link--icon"
                  icon={faFacebookSquare}
                />
                <span className="contact__link--name">
                  @HolidazeBGO on Facebook
                </span>
              </a>

              <a
                href=""
                aria-label="Link to Holidaze instagram page"
                className="contact__link"
              >
                <FontAwesomeIcon
                  className="contact__link--icon"
                  icon={faInstagram}
                />
                <span className="contact__link--name">
                  @HolidazeBGO on Instagram
                </span>
              </a>
            </div>
          </Col>
          <Col>
            <Heading
              size="2"
              customClass="contact__header"
              content="Or send us a message and we'll get back to you as soon as we can!"
            />
            <ContactForm />
          </Col>
        </Row>
      </PageContainer>
    </Layout>
  );
}
