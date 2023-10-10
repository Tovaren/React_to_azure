import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { Button, Modal, Form as BSForm, Container, Row, Col } from 'react-bootstrap';

function App() {
  const [text, setText] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [file, setFile] = useState(null);
  const [submittedData, setSubmittedData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const options = ["Sign", "Instalace", "Odinstalace", "Výměna", "Předání"];

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      alert('Prosím, vyplňte pole "Popis práce".');
      return;
    }
    const date = new Date();
    const data = { text, selectedOption, file, date: date.toDateString(), time: date.getHours() };
    setSubmittedData([...submittedData, data]);

    // Uložení dat do souboru txt pomocí file-saver
    const blob = new Blob([JSON.stringify(data)], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "data.txt");

    // Zavření modálního okna
    setShowModal(false);
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          {/* Zobrazení odeslaných dat */}
          {submittedData.map((data, index) => (
            <div key={index}>
              <p>Text: {data.text}</p>
              <p>Vybraná možnost: {data.selectedOption}</p>
              <p>Soubor: {data.file.name}</p>
              <p>Datum a čas odeslání: {data.date}, {data.time} hodin</p>
            </div>
          ))}

          {/* Tlačítko pro otevření modálního okna */}
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Zadat nový výkaz
          </Button>

          {/* Modální okno s formulářem */}
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton = "Zavřít">
              <Modal.Title>Výkaz práce</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <BSForm onSubmit={handleSubmit}>
                <BSForm.Group controlId="formText">
                  <BSForm.Label>Popis provedené práce:</BSForm.Label>
                  <BSForm.Control type="text" value={text} onChange={(e) => setText(e.target.value)} />
                </BSForm.Group>
                <BSForm.Group controlId="formSelect">
                  <BSForm.Label>Vyberte činnost:</BSForm.Label>
                  <BSForm.Control as="select" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                    {options.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </BSForm.Control>
                </BSForm.Group>
                <BSForm.Group controlId="formFile">
                  <BSForm.Label>Přiložte přílohu:</BSForm.Label>
                  <BSForm.Control type="file" onChange={handleFileChange} />
                </BSForm.Group>
                <Button variant="primary" type="submit">Odeslat</Button>
              </BSForm>
            </Modal.Body>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
