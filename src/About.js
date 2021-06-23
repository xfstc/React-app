import { Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function About() {
  let history = useHistory();
  function handleClick() {
    history.push("/");
  }
  return (
    <div>
      <Card style={{ width: "100%" }}>
        <Card.Body>
          <Card.Title>About</Card.Title>
          <Card.Text>Some information about this website.</Card.Text>
          <Button variant="primary" onClick={handleClick}>
            Go Home
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
