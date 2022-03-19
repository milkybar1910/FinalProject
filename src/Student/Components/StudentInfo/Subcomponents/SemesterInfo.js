import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";

const SemesterInfo = ({ student, handleNext, handlePrev, setStudentData }) => {
  const [loading, setLoading] = useState(false);

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setStudentData({
      ...student,
      [name]: value,
    });
  };

  const convertNum = (value) => {
    let num = parseFloat(value);
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return (Math.round(m) / 100) * Math.sign(num);
  };

  const next = (e) => {
    setLoading(true);
    e.preventDefault();
    setStudentData({
      ...student,
      "Sem 1 GPA": convertNum(student["Sem 1 GPA"]),
      "Sem 2 GPA": convertNum(student["Sem 2 GPA"]),
      "Sem 3 GPA": convertNum(student["Sem 3 GPA"]),
      "Sem 4 GPA": convertNum(student["Sem 4 GPA"]),
      "Sem 5 GPA": convertNum(student["Sem 5 GPA"]),
      "Sem 6 GPA": convertNum(student["Sem 6 GPA"]),
      "Sem 7 GPA": convertNum(student["Sem 7 GPA"]),
      "Sem 8 GPA": convertNum(student["Sem 8 GPA"]),
      "Overall CGPA": convertNum(student["Overall CGPA"]),
    });
    setLoading(false);
    handleNext();
  };
  const prev = (e) => {
    e.preventDefault();
    handlePrev();
  };

  return (
    <Container>
      <Row className="poppins-font">
        <Col>
          <Form className="p-4">
            <Row>
              <Col md={4} xs={6}>
                <Form.Group controlId="Sem 1 GPA" className="mb-3">
                  <Form.Label className="mb-1">GPA 1</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="number"
                    placeholder="8.05"
                    value={student["Sem 1 GPA"]}
                    onChange={handleChange("Sem 1 GPA")}
                    onWheel={(event) => event.currentTarget.blur()}
                  />
                </Form.Group>
              </Col>

              <Col md={4} xs={6}>
                <Form.Group controlId="Sem 2 GPA" className="mb-3">
                  <Form.Label className="mb-1">GPA 2</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="number"
                    placeholder="9.21"
                    value={student["Sem 2 GPA"]}
                    onChange={handleChange("Sem 2 GPA")}
                    onWheel={(event) => event.currentTarget.blur()}
                  />
                </Form.Group>
              </Col>

              <Col md={4} xs={6}>
                <Form.Group controlId="Sem 3 GPA" className="mb-3">
                  <Form.Label className="mb-1">GPA 3</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="number"
                    placeholder="7.21"
                    value={student["Sem 3 GPA"]}
                    onChange={handleChange("Sem 3 GPA")}
                    onWheel={(event) => event.currentTarget.blur()}
                  />
                </Form.Group>
              </Col>

              <Col md={4} xs={6}>
                <Form.Group controlId="Sem 4 GPA" className="mb-3">
                  <Form.Label className="mb-1">GPA 4</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="number"
                    placeholder="8.91"
                    value={student["Sem 4 GPA"]}
                    onChange={handleChange("Sem 4 GPA")}
                    onWheel={(event) => event.currentTarget.blur()}
                  />
                </Form.Group>
              </Col>

              <Col md={4} xs={6}>
                <Form.Group controlId="Sem 5 GPA" className="mb-3">
                  <Form.Label className="mb-1">GPA 5</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="number"
                    placeholder="6.61"
                    value={student["Sem 5 GPA"]}
                    onChange={handleChange("Sem 5 GPA")}
                    onWheel={(event) => event.currentTarget.blur()}
                  />
                </Form.Group>
              </Col>

              <Col md={4} xs={6}>
                <Form.Group controlId="Sem 6 GPA" className="mb-3">
                  <Form.Label className="mb-1">GPA 6</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="number"
                    placeholder="9.01"
                    value={student["Sem 6 GPA"]}
                    onChange={handleChange("Sem 6 GPA")}
                    onWheel={(event) => event.currentTarget.blur()}
                  />
                </Form.Group>
              </Col>

              <Col md={4} xs={6}>
                <Form.Group controlId="Sem 7 GPA" className="mb-3">
                  <Form.Label className="mb-1">GPA 7</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="number"
                    placeholder="10.00"
                    value={student["Sem 7 GPA"]}
                    onChange={handleChange("Sem 7 GPA")}
                    onWheel={(event) => event.currentTarget.blur()}
                  />
                </Form.Group>
              </Col>

              <Col md={4} xs={6}>
                <Form.Group controlId="Sem 8 GPA" className="mb-3">
                  <Form.Label className="mb-1">GPA 8</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="number"
                    placeholder="9.21"
                    value={student["Sem 8 GPA"]}
                    onChange={handleChange("Sem 8 GPA")}
                    onWheel={(event) => event.currentTarget.blur()}
                  />
                </Form.Group>
              </Col>

              <Col md={4} xs={6}>
                <Form.Group controlId="Overall CGPA" className="mb-3">
                  <Form.Label className="mb-1">Overall CGPA</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="number"
                    placeholder="8.01"
                    value={student["Overall CGPA"]}
                    onChange={handleChange("Overall CGPA")}
                    onWheel={(event) => event.currentTarget.blur()}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-grid gap-2">
              <ButtonGroup aria-label="Basic example">
                <Button
                  variant="primary"
                  type="submit"
                  onClick={prev}
                  disabled={loading}
                  className="me-2"
                >
                  Previous
                </Button>

                <Button
                  variant="primary"
                  type="submit"
                  onClick={next}
                  disabled={loading}
                  className="ms-2"
                >
                  {loading ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="text-center"
                    />
                  ) : (
                    "Next"
                  )}
                </Button>
              </ButtonGroup>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SemesterInfo;
