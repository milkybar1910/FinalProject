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

const OtherInfo = ({ student, onSubmit, handlePrev, setStudentData }) => {
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

    if (
      !student["Languages Known"] ||
      student["Languages Known"] === "" ||
      student["Languages Known"] === "Select"
    )
      newErrors["Languages Known"] = "Provide the languages you know";

    if (
      !student["Is Higher Studies"] ||
      student["Is Higher Studies"] === "" ||
      student["Is Higher Studies"] === "Select"
    )
      newErrors["Is Higher Studies"] = "Select appropriate value";

    if (
      !student["Is POP2 Training"] ||
      student["Is POP2 Training"] === "" ||
      student["Is Higher Studies"] === "Select"
    )
      newErrors["Is POP2 Training"] = "Select appropriate value";

    if (
      !student["Future Skills"] ||
      student["Future Skills"] === "" ||
      student["Is Higher Studies"] === "Select"
    )
      newErrors["Future Skills"] = "Select appropriate value";

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
      onSubmit();
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
                <Form.Group controlId="BEC Status" className="mb-3">
                  <Form.Label className="mb-1">BEC Status</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder="VANTAGE"
                    value={student["BEC Status"] || ""}
                    onChange={handleChange("BEC Status")}
                  />
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group controlId="BEC Grade" className="mb-3">
                  <Form.Label className="mb-1">BEC Grade</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder="COUNCIL OF EUROPE LEVEL B2"
                    value={student["BEC Grade"] || ""}
                    onChange={handleChange("BEC Grade")}
                  />
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group controlId="Languages Known" className="mb-3">
                  <Form.Label className="mb-1">Languages Known</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder="TAMIL,ENGLISH,HINDI..."
                    value={student["Languages Known"] || ""}
                    onChange={handleChange("Languages Known")}
                    isInvalid={!!errors["Languages Known"]}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors["Languages Known"]}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group controlId="Skill Set" className="mb-3">
                  <Form.Label className="mb-1">Skill Set</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder="REACT JS,ANGULAR JS,ML,DL,IOT,..."
                    value={student["Skill Set"] || ""}
                    onChange={handleChange("Skill Set")}
                  />
                </Form.Group>
              </Col>
              <Col md={6} sm={12}>
                <Form.Group controlId="Is Higher Studies" className="mb-3">
                  <Form.Label className="mb-1">Higher Studies?</Form.Label>
                  <Form.Select
                    className="form-control py-2"
                    required
                    onChange={handleChange("Is Higher Studies")}
                    value={student["Is Higher Studies"]}
                    isInvalid={!!errors["Is Higher Studies"]}
                  >
                    <option value={"Select"}>Select</option>
                    <option value={"Yes"}>Yes</option>
                    <option value={"No"}>No</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors["Is Higher Studies"]}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} sm={12}>
                <Form.Group controlId="Is POP2 Training" className="mb-3">
                  <Form.Label className="mb-1">Need POP2 Training?</Form.Label>
                  <Form.Select
                    className="form-control py-2"
                    required
                    onChange={handleChange("Is POP2 Training")}
                    value={student["Is POP2 Training"]}
                    isInvalid={!!errors["Is POP2 Training"]}
                  >
                    <option value={"Select"}>Select</option>
                    <option value={"Yes"}>Yes</option>
                    <option value={"No"}>No</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors["Is POP2 Training"]}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} sm={12}>
                <Form.Group controlId="Future Skills" className="mb-3">
                  <Form.Label className="mb-1">Future Skills</Form.Label>
                  <Form.Select
                    className="form-control py-2"
                    required
                    onChange={handleChange("Future Skills")}
                    value={student["Future Skills"]}
                    isInvalid={!!errors["Future Skills"]}
                  >
                    <option value={"Select"}>Select</option>
                    <option value={"Yes"}>Yes</option>
                    <option value={"No"}>No</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors["Future Skills"]}
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
                    "Submit"
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

export default OtherInfo;
