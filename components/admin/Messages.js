import useAxios from "../../hooks/useAxios";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Messages() {
  const [messages, setMessages] = useState([]);

  const http = useAxios();

  useEffect(() => {
    async function getMessages() {
      try {
        const response = await http.get("holidaze-contacts");
        // console.log(response.data.data);
        setMessages(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getMessages();
  }, []);

  if (messages.length === 0) {
    return <div>No messages to show yet!</div>;
  } else {
    return (
      <>
        <Row xs={1} className="g-3">
          {messages.map((item) => {
            const createdAt = new Date(
              item.attributes.createdAt
            ).toLocaleString();

            return (
              <Col key={item.id}>
                <Card>
                  <Card.Body>
                    <Card.Title>{item.attributes.subject}</Card.Title>
                    <Card.Subtitle>
                      {item.attributes.first_name} {item.attributes.last_name}
                    </Card.Subtitle>
                    <Card.Text>{item.attributes.message}</Card.Text>
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      Recieved at: {createdAt}
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

export default Messages;
