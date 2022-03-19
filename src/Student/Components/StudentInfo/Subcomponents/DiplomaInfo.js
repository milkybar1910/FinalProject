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

const DiplomaInfo = ({ student, handleNext, handlePrev, setStudentData }) => {
  const [loading, setLoading] = useState(false);

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setStudentData({ ...student, [name]: value });
  };

  const convertNum = (value) => {
    let num = parseFloat(value);
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return (Math.round(m) / 100) * Math.sign(num);
  };

  const next = (e) => {
    e.preventDefault();
    setLoading(true);
    setStudentData({
      ...student,
      "Diploma Percentage": convertNum(student["Diploma Percentage"]),
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
              <Col md={6} sm={12}>
                <Form.Group controlId="Diploma Percentage" className="mb-3">
                  <Form.Label className="mb-1">Percentage</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="number"
                    placeholder="10.00"
                    value={student["Diploma Percentage"]}
                    onChange={handleChange("Diploma Percentage")}
                    onWheel={(event) => event.currentTarget.blur()}
                  />
                </Form.Group>
              </Col>
              <Col md={6} sm={12}>
                <Form.Group
                  controlId="Diploma Specilazation OR Branch"
                  className="mb-3"
                >
                  <Form.Label className="mb-1">Branch</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder="Mechanical"
                    value={student["Diploma Specilazation OR Branch"]}
                    onChange={handleChange("Diploma Specilazation OR Branch")}
                  />
                </Form.Group>
              </Col>
              <Col sm={12}>
                <Form.Group controlId="Name Of Institute" className="mb-3">
                  <Form.Label className="mb-1">Institute Name</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder="JOHN'S POLYTECHNINC"
                    value={student["Name Of Institute"]}
                    onChange={handleChange("Name Of Institute")}
                  />
                </Form.Group>
              </Col>
              <Col md={6} sm={12}>
                <Form.Group
                  controlId="Diploma Year Of Passing"
                  className="mb-3"
                >
                  <Form.Label className="mb-1">Year Of Passing</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="number"
                    placeholder="2018"
                    value={student["Diploma Year Of Passing"]}
                    onChange={handleChange("Diploma Year Of Passing")}
                    onWheel={(event) => event.currentTarget.blur()}
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 4))
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6} sm={12}>
                <Form.Group
                  controlId="Diploma Graduating State"
                  className="mb-3"
                >
                  <Form.Label className="mb-1">Graduating State</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder="TAMIL NADU"
                    value={student["Diploma Graduating State"]}
                    onChange={handleChange("Diploma Graduating State")}
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

export default DiplomaInfo;
