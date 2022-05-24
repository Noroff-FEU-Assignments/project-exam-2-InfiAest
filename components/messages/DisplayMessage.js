import Alert from "react-bootstrap/Alert";

export default function DisplayMessage({
  variant,
  alertClass,
  heading,
  message,
}) {
  return (
    <Alert variant={variant} className={alertClass}>
      <Alert.Heading>{heading}</Alert.Heading>
      <p>{message}</p>
    </Alert>
  );
}
