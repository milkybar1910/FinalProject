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

const MotherInfo = ({ student, handleNext, handlePrev, setStudentData }) => {
  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const handleChange = (name) => (event) => {
    const value = event.target.value;

    setStudentData({
      ...student,
      [name]: value,
    });
    if (!!errors[name])
      setErrors({
        ...errors,
        [name]: null,
      });
  };
  const findFormErrors = () => {
    let newErrors = {};
    if (student["Mother Mobile Number"].length !== 10)
      newErrors["Mother Mobile Number"] = "Invalid format";
    return newErrors;
  };
  const next = (e) => {
    e.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setLoading(false);
      setErrors(newErrors);
    } else {
      setLoading(false);
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
              <Col md={6} xs={12}>
                <Form.Group controlId="Mother Name" className="mb-3">
                  <Form.Label className="mb-1">Name</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder="S AKSHAYA"
                    value={student["Mother Name"]}
                    onChange={handleChange("Mother Name")}
                  />
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group controlId="Mother Designation" className="mb-3">
                  <Form.Label className="mb-1">Designation</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder="Home Maker"
                    value={student["Mother Designation"]}
                    onChange={handleChange("Mother Designation")}
                  />
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group controlId="Mother Organization" className="mb-3">
                  <Form.Label className="mb-1">Organization</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder="TNEB"
                    value={student["Mother Organization"]}
                    onChange={handleChange("Mother Organization")}
                  />
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group controlId="Mother Mobile Number" className="mb-3">
                  <Form.Label className="mb-1">Mobile Number</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder="7871835412"
                    value={student["Mother Mobile Number"]}
                    onChange={handleChange("Mother Mobile Number")}
                    isInvalid={!!errors["Mother Mobile Number"]}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors["Father Mobile Number"]}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group controlId="Mother Mail ID" className="mb-3">
                  <Form.Label className="mb-1">Mail ID</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="email"
                    placeholder="meena@gmail.com "
                    value={student["Mother Mail ID"]}
                    onChange={handleChange("Mother Mail ID")}
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
                    "Previous"
                  )}
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

export default MotherInfo;
