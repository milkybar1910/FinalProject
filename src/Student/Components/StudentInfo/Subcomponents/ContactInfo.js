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

const ContactInfo = ({ student, handleNext, handlePrev, setStudentData }) => {
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
    const newErrors = {};

    if (!student["Primary Number"] || student["Primary Number"] === "")
      newErrors["Primary Number"] = "Provide your primary number";
    else if (student["Primary Number"].length !== 10)
      newErrors["Primary Number"] = "Invalid format";

    if (!student["Emergency Number"] || student["Emergency Number"] === "")
      newErrors["Emergency Number"] = "Provide the emergency number";
    else if (student["Emergency Number"].length !== 10)
      newErrors["Emergency Number"] = "Invalid format";
    else if (student["Emergency Number"] === student["Primary Number"])
      newErrors["Emergency Number"] = "Provide another number";

    if (!student["Alternate Email ID"] || student["Alternate Email ID"] === "")
      newErrors["Alternate Email ID"] = "Provide your alternate email ID";
    else if (student["Primary Email ID"] === student["Alternate Email ID"])
      newErrors["Alternate Email ID"] = "Provide your alternate email ID";

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
                <Form.Group controlId="Land Line Number" className="mb-3">
                  <Form.Label className="mb-1">Land Line Number</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="number"
                    placeholder="7513200000"
                    value={student["Land Line Number"]}
                    onChange={handleChange("Land Line Number")}
                    onWheel={(event) => event.currentTarget.blur()}
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 10))
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group controlId="Primary Number" className="mb-3">
                  <Form.Label className="mb-1">Primary Number</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="number"
                    placeholder="7871835412"
                    value={student["Primary Number"] || ""}
                    onChange={handleChange("Primary Number")}
                    required
                    isInvalid={!!errors["Primary Number"]}
                    onWheel={(event) => event.currentTarget.blur()}
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 10))
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors["Primary Number"]}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group controlId="Emergency Number" className="mb-3">
                  <Form.Label className="mb-1">Emergency Number</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="number"
                    placeholder="9487735412"
                    value={student["Emergency Number"] || ""}
                    onChange={handleChange("Emergency Number")}
                    isInvalid={!!errors["Emergency Number"]}
                    required
                    onWheel={(event) => event.currentTarget.blur()}
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 10))
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors["Emergency Number"]}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group controlId="Primary Email ID" className="mb-3">
                  <Form.Label className="mb-1">Primary Email ID</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="email"
                    placeholder="joseph@gmail.com"
                    value={student["Primary Email ID"]}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group controlId="Alternate Email ID" className="mb-3">
                  <Form.Label className="mb-1">Alternate Email ID</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="email"
                    placeholder="avis@gmail.com"
                    value={student["Alternate Email ID"] || ""}
                    onChange={handleChange("Alternate Email ID")}
                    isInvalid={!!errors["Alternate Email ID"]}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors["Alternate Email ID"]}
                  </Form.Control.Feedback>
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

export default ContactInfo;
