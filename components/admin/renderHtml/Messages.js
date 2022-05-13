import useAxios from "../../../hooks/useAxios";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DisplayMessage from "../../messages/DisplayMessage";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Heading from "../../layout/Heading";
import { MESSAGES_PATH } from "../../../constants/api";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const http = useAxios();

  useEffect(() => {
    async function getMessages() {
      try {
        const response = await http.get(MESSAGES_PATH);
        setMessages(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getMessages();
  }, []);

  if (messages.length === 0) {
    return (
      <DisplayMessage
        variant="dark"
        heading="No messages to show yet!"
        message="Looks like you're all up to date with the messages. Come back later!"
      />
    );
  } else {
    return (
      <>
        <Row xs={1} className="g-3">
          {messages.map((message) => {
            const createdAt = new Date(
              message.attributes.createdAt
            ).toLocaleString();
            const messagePreview = message.attributes.message.slice(0, 80);

            return (
              <Col key={message.id}>
                <Card className="adminCard" onClick={handleShow}>
                  <Card.Body className="adminCard__body">
                    <Card.Title as="h4" className="adminCard__title">
                      {message.attributes.subject}
                    </Card.Title>
                    <Card.Subtitle>
                      {message.attributes.first_name}{" "}
                      {message.attributes.last_name}
                    </Card.Subtitle>
                    <Card.Text className="adminCard__text">
                      {messagePreview}...
                    </Card.Text>
                    <div className="adminCard__date">
                      Recieved at: {createdAt}
                    </div>
                  </Card.Body>
                </Card>

                <Modal
                  show={show}
                  onHide={handleClose}
                  animation={true}
                  size="lg"
                  centered
                >
                  <Modal.Header closeButton>
                    <Modal.Title>
                      subject: {message.attributes.subject}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Heading
                      size="6"
                      content={`from: ${message.attributes.first_name} ${message.attributes.last_name} (${message.attributes.email_address})`}
                    />
                    {message.attributes.message}
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      Recieved at: {createdAt}
                    </div>
                  </Modal.Body>

                  <Modal.Footer>
                    <Button variant="info" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Col>
            );
          })}
        </Row>
      </>
    );
  }
}

export default Messages;
