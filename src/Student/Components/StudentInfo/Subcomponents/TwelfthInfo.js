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

const TwelfthInfo = ({ student, handleNext, handlePrev, setStudentData }) => {
  const [errors, setErrors] = useState({});
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

  const findFormErrors = () => {
    let newError = {};
    if (
      !student["Twelfth Year Of Passing"] ||
      student["Twelfth Year Of Passing"] === ""
    ) {
      newError["Twelfth Year Of Passing"] =
        "Provide the twelth year of passing";
    } else if (student["Twelfth Year Of Passing"].length !== 4) {
      newError["Twelfth Year Of Passing"] = "Invalid format";
    }
    return newError;
  };

  const next = (e) => {
    e.preventDefault();
    setLoading(true);
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setLoading(false);
      setErrors(newErrors);
    } else {
      setLoading(false);
      setStudentData({
        ...student,
        "Twelfth Percentage": convertNum(student["Twelfth Percentage"]),
      });
      handleNext();
    }
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
              <Col lg={4} md={6} sm={12}>
                <Form.Group controlId="Twelfth Percentage" className="mb-3">
                  <Form.Label className="mb-1">Percentage</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="number"
                    placeholder="96.25"
                    value={student["Twelfth Percentage"]}
                    onChange={handleChange("Twelfth Percentage")}
                    onWheel={(event) => event.currentTarget.blur()}
                  />
                </Form.Group>
              </Col>
              <Col lg={4} md={6} sm={12}>
                <Form.Group controlId="Twelfth Board Of Study" className="mb-3">
                  <Form.Label className="mb-1">Board Of Study</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder="STATE BOARD"
                    value={student["Twelfth Board Of Study"]}
                    onChange={handleChange("Twelfth Board Of Study")}
                  />
                </Form.Group>
              </Col>
              <Col lg={4} md={6} sm={12}>
                <Form.Group
                  controlId="Twelfth Medium Of Study"
                  className="mb-3"
                >
                  <Form.Label className="mb-1">Medium Of Study</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder="ENGLISH"
                    value={student["Twelfth Medium Of Study"]}
                    onChange={handleChange("Twelfth Medium Of Study")}
                  />
                </Form.Group>
              </Col>
              <Col sm={12} md={6} lg={12}>
                <Form.Group controlId="Twelfth School Name" className="mb-3">
                  <Form.Label className="mb-1">School Name</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder="ST.THOMAS MATRICULATION HIGHER SECONDARY SCHOOL"
                    value={student["Twelfth School Name"]}
                    onChange={handleChange("Twelfth School Name")}
                  />
                </Form.Group>
              </Col>
              <Col md={6} sm={12}>
                <Form.Group
                  controlId="Twelfth Year Of Passing"
                  className="mb-3"
                >
                  <Form.Label className="mb-1">Year Of Passing</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="number"
                    placeholder="2018"
                    value={student["Twelfth Year Of Passing"]}
                    onChange={handleChange("Twelfth Year Of Passing")}
                    onWheel={(event) => event.currentTarget.blur()}
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 4))
                    }
                    isInvalid={!!errors["Twelfth Year Of Passing"]}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors["Twelfth Year Of Passing"]}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} sm={12}>
                <Form.Group
                  controlId="Twelfth Graduating State"
                  className="mb-3"
                >
                  <Form.Label className="mb-1">Graduating State</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder="TAMIL NADU"
                    value={student["Twelfth Graduating State"]}
                    onChange={handleChange("Twelfth Graduating State")}
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

export default TwelfthInfo;
