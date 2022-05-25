import useAxios from "../../../hooks/useAxios";
import { useEffect, useState } from "react";
import { MESSAGES_PATH, SORT_PATH } from "../../../constants/api";
import Accordion from "react-bootstrap/Accordion";
import DisplayMessage from "../../messages/DisplayMessage";
import DeleteMessageButton from "../buttons/DeleteMessageButton";

function Messages() {
  const [messages, setMessages] = useState([]);
  const http = useAxios();

  const getMessages = async function () {
    try {
      const response = await http.get(`${MESSAGES_PATH}?${SORT_PATH}`);
      setMessages(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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
        <Accordion flush className="adminAccordion">
          {messages.map((message, index) => {
            const createdAt = new Date(
              message.attributes.createdAt
            ).toLocaleString();

            return (
              <Accordion.Item eventKey={index} key={message.id}>
                <Accordion.Header>
                  <div className="adminAccordion__header">
                    <span className="adminAccordion__header--name">
                      {message.attributes.subject}
                    </span>
                    <span className="adminAccordion__header--date">
                      <span className="adminAccordion__header--label">
                        Recieved:
                      </span>{" "}
                      {createdAt}
                    </span>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <div>
                    <span className="adminAccordion__body--label">Name: </span>
                    {message.attributes.first_name}{" "}
                    {message.attributes.last_name}
                  </div>
                  <div>
                    <span className="adminAccordion__body--label">
                      Email address:{" "}
                    </span>
                    {message.attributes.email_address}
                  </div>
                  <div>
                    <span className="adminAccordion__body--label">
                      Message:{" "}
                    </span>
                    {message.attributes.message}
                  </div>
                  <DeleteMessageButton
                    id={message.id}
                    getMessages={getMessages}
                  />
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </>
    );
  }
}

export default Messages;
