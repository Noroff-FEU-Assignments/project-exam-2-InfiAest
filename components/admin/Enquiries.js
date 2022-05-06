import useAxios from "../../hooks/useAxios";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);

  const http = useAxios();

  useEffect(() => {
    async function getEnquiries() {
      try {
        const response = await http.get("holidaze-enquiries");
        // console.log(response.data.data);
        setEnquiries(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getEnquiries();
  }, []);

  function formatDate(input) {
    var datePart = input.match(/\d+/g),
      year = datePart[0].substring(2),
      month = datePart[1],
      day = datePart[2];

    return day + "/" + month + "/" + year;
  }

  if (enquiries.length === 0) {
    return <div>No enquiries to show yet!</div>;
  } else {
    return (
      <>
        <Row xs={1} className="g-3">
          {enquiries.map((item) => {
            let checkInDate = formatDate(item.attributes.check_in_date);
            let checkoutDate = formatDate(item.attributes.checkout_date);

            const createdAt = new Date(
              item.attributes.createdAt
            ).toLocaleString();

            return (
              <Col key={item.id}>
                <Card>
                  <Card.Body>
                    <Card.Title>{item.attributes.accomodation_name}</Card.Title>
                    <Card.Text>
                      {item.attributes.first_name} {item.attributes.last_name},{" "}
                      {item.attributes.guests} guests, {checkInDate}-
                      {checkoutDate}
                    </Card.Text>
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      Requested at: {createdAt}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </>
    );
  }
}

export default Enquiries;
