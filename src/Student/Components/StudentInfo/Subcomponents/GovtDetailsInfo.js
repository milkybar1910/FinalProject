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

const GovtDetailsInfo = ({
  student,
  handleNext,
  handlePrev,
  setStudentData,
}) => {
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

    if (!student["Nationality"] || student["Nationality"] === "")
      newErrors["Nationality"] = "Provide your nationality";

    if (
      !student["Sports Quota"] ||
      student["Sports Quota"] === "" ||
      student["Sports Quota"] === "Select"
    )
      newErrors["Sports Quota"] = "Select your sports quota";

    return newErrors;
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
                <Form.Group controlId="PAN Number" className="mb-3">
                  <Form.Label className="mb-1">PAN Number</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder="FBJPR4355A"
                    value={student["PAN Number"]}
                    onChange={handleChange("PAN Number")}
                  />
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group controlId="Nationality" className="mb-3">
                  <Form.Label className="mb-1">Nationality</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder="INDIAN"
                    value={student["Nationality"] || ""}
                    onChange={handleChange("Nationality")}
                    isInvalid={!!errors["Nationality"]}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors["Nationality"]}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group controlId="Indian Passport Number" className="mb-3">
                  <Form.Label className="mb-1">
                    Indian Passport Number
                  </Form.Label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder="U8257858"
                    value={student["Indian Passport Number"]}
                    onChange={handleChange("Indian Passport Number")}
                  />
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group controlId="Aadhaar Number" className="mb-3">
                  <Form.Label className="mb-1">Aadhaar Number</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder="223608299796"
                    value={student["Aadhaar Number"]}
                    onChange={handleChange("Aadhaar Number")}
                  />
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group controlId="Gap In Education" className="mb-3">
                  <Form.Label className="mb-1">Gap In Education</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="number"
                    placeholder="0"
                    value={student["Gap In Education"]}
                    onChange={handleChange("Gap In Education")}
                  />
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group controlId="Sports Quota" className="mb-3">
                  <Form.Label className="mb-1">Sports Quota</Form.Label>
                  <Form.Select
                    className="form-control py-2"
                    onChange={handleChange("Sports Quota")}
                    value={student["Sports Quota"]}
                    isInvalid={!!errors["Sports Quota"]}
                    required
                  >
                    <option value={"Select"}>Select</option>
                    <option value={"Yes"}>Yes</option>
                    <option value={"No"}>No</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors["Sports Quota"]}
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

export default GovtDetailsInfo;
