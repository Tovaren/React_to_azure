import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { Button, Modal, Form as BSForm, Container, Row, Col, Card} from 'react-bootstrap';

function App() {
  const [text, setText] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [file, setFile] = useState(null);
  const [submittedData, setSubmittedData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const options = ["Instalace softwaru", "Výměna hardwaru", "Nákup SW/HW", "Vyřešní ticketu", "Analýza problému"];

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      alert('Prosím, vyplňte pole "Popis činnnosti".');
      return;
    }
    const date = new Date();
    const data = { text, selectedOption, file, date: date.toDateString(), time: date.getHours() };
    setSubmittedData([...submittedData, data]);

    const blob = new Blob([JSON.stringify(data)], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "data.txt");

    setShowModal(false);
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          {submittedData.map((data, index) => (
            <Card bg="light" text="dark" style={{ width: '18rem', marginTop: '10px' }} key={index}>
              <Card.Header>{data.date} - {data.time} hodin</Card.Header>
              <Card.Body>
                <Card.Title>Popis činnosti: {data.text}</Card.Title>
                <Card.Text>Činnost: {data.selectedOption}</Card.Text>
                <Card.Text>Příloha: {data.file.name}</Card.Text>
              </Card.Body>
            </Card>
          ))}

          <Button variant="primary" onClick={() => setShowModal(true)} style={{ marginTop: '10px' }}>
            Zadat výkaz
          </Button>

          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Pracovní výkazy</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <BSForm onSubmit={handleSubmit}>
                <BSForm.Group controlId="formText">
                  <BSForm.Label>Popis práce:</BSForm.Label>
                  <BSForm.Control as="textarea" rows={3} value={text} onChange={(e) => setText(e.target.value)} />
                </BSForm.Group>
                <BSForm.Group controlId="formSelect">
                  <BSForm.Label>Vyberte možnost:</BSForm.Label>
                  <BSForm.Control as="select" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                    {options.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </BSForm.Control>
                </BSForm.Group>
                <BSForm.Group controlId="formFile">
                  <BSForm.Label>Přiložte soubor:</BSForm.Label>
                  <BSForm.Control type="file" onChange={handleFileChange} />
                </BSForm.Group><br></br>
                <Button variant="primary" type="Odeslat">Odeslat</Button>
              </BSForm>
            </Modal.Body>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
