import { Container, Alert } from "react-bootstrap";
import NavBar from "./components/NavBar"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Container>
        <Alert variant="primary" className="mt-2 text-center">
          Select an Image to encrypt!
        </Alert>
      </Container>
    </div>
  )
}

export default App
