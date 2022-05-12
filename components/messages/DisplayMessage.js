import Alert from "react-bootstrap/Alert";

export default function DisplayMessage(props) {
  return (
    <Alert variant={props.variant} className={props.alertClass}>
      <Alert.Heading>{props.heading}</Alert.Heading>
      <p>{props.message}</p>
    </Alert>
  );
}
