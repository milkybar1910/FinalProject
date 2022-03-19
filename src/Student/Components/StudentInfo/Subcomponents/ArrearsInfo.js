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
    let newError = {};
    if (
      !student["Is History Of Arrears"] ||
      student["Is History Of Arrears"] === "" ||
      student["Is History Of Arrears"] === "Select"
    )
      newError["Is History Of Arrears"] = "Select the appropriate value";

    return newError;
  };

  const next = (e) => {
    setLoading(true);
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
              <Col md={6} lg={4} xs={12}>
                <Form.Group
                  controlId="Number Of Arrears Sem 1"
                  className="mb-3"
                >
                  <Form.Label className="mb-1">Arrears ~ Sem 1</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="number"
                    placeholder="0"
                    value={student["Number Of Arrears Sem 1"]}
                    onChange={handleChange("Number Of Arrears Sem 1")}
                  />
                </Form.Group>
              </Col>
              <Col md={6} lg={4} xs={12}>
                <Form.Group
                  controlId="Number Of Arrears Sem 2"
                  className="mb-3"
                >
                  <Form.Label className="mb-1">Arrears ~ Sem 2</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="number"
                    placeholder="2"
                    value={student["Number Of Arrears Sem 2"]}
                    onChange={handleChange("Number Of Arrears Sem 2")}
                  />
                </Form.Group>
              </Col>
              <Col md={6} lg={4} xs={12}>
                <Form.Group
                  controlId="Number Of Arrears Sem 3"
                  className="mb-3"
                >
                  <Form.Label className="mb-1">Arrears ~ Sem 3</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="number"
                    placeholder="2"
                    value={student["Number Of Arrears Sem 3"]}
                    onChange={handleChange("Number Of Arrears Sem 3")}
                  />
                </Form.Group>
              </Col>
              <Col md={6} lg={4} xs={12}>
                <Form.Group
                  controlId="Number Of Arrears Sem 4"
                  className="mb-3"
                >
                  <Form.Label className="mb-1">Arrears ~ Sem 4</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="number"
                    placeholder="3"
                    value={student["Number Of Arrears Sem 4"]}
                    onChange={handleChange("Number Of Arrears Sem 4")}
                  />
                </Form.Group>
              </Col>
              <Col md={6} lg={4} xs={12}>
                <Form.Group
                  controlId="Number Of Arrears Sem 5"
                  className="mb-3"
                >
                  <Form.Label className="mb-1">Arrears ~ Sem 5</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="number"
                    placeholder="5"
                    value={student["Number Of Arrears Sem 5"]}
                    onChange={handleChange("Number Of Arrears Sem 5")}
                  />
                </Form.Group>
              </Col>
              <Col md={6} lg={4} xs={12}>
                <Form.Group
                  controlId="Number Of Arrears Sem 6"
                  className="mb-3"
                >
                  <Form.Label className="mb-1">Arrears ~ Sem 6</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="number"
                    placeholder="1"
                    value={student["Number Of Arrears Sem 6"]}
                    onChange={handleChange("Number Of Arrears Sem 6")}
                  />
                </Form.Group>
              </Col>
              <Col md={6} lg={4} xs={12}>
                <Form.Group
                  controlId="Number Of Arrears Sem 7"
                  className="mb-3"
                >
                  <Form.Label className="mb-1">Arrears ~ Sem 7</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="number"
                    placeholder="2"
                    value={student["Number Of Arrears Sem 7"]}
                    onChange={handleChange("Number Of Arrears Sem 7")}
                  />
                </Form.Group>
              </Col>
              <Col md={6} lg={4} xs={12}>
                <Form.Group
                  controlId="Number Of Arrears Sem 8"
                  className="mb-3"
                >
                  <Form.Label className="mb-1">Arrears ~ Sem 8</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="number"
                    placeholder="0"
                    value={student["Number Of Arrears Sem 8"]}
                    onChange={handleChange("Number Of Arrears Sem 8")}
                  />
                </Form.Group>
              </Col>
              <Col md={6} lg={4} xs={12}>
                <Form.Group
                  controlId="Total Number Of Standing Arrears"
                  className="mb-3"
                >
                  <Form.Label className="mb-1">
                    Total Standing Arrears
                  </Form.Label>
                  <Form.Control
                    className="py-2"
                    type="number"
                    placeholder="0"
                    value={student["Total Number Of Standing Arrears"]}
                    onChange={handleChange("Total Number Of Standing Arrears")}
                  />
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group controlId="Is History Of Arrears" className="mb-3">
                  <Form.Label className="mb-1">History Of Arrears?</Form.Label>
                  <Form.Select
                    className="form-control py-2"
                    required
                    onChange={handleChange("Is History Of Arrears")}
                    value={student["Is History Of Arrears"]}
                    required
                    isInvalid={!!errors["Is History Of Arrears"]}
                  >
                    <option value={"Select"}>Select</option>
                    <option value={"Yes"}>Yes</option>
                    <option value={"No"}>No</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors["Is History Of Arrears"]}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group
                  controlId="Number Of History Of Arrears"
                  className="mb-3"
                >
                  <Form.Label className="mb-1">
                    No Of History Of Arrears
                  </Form.Label>
                  <Form.Control
                    className="py-2"
                    type="number"
                    placeholder="0"
                    value={student["Number Of History Of Arrears"]}
                    onChange={handleChange("Number Of History Of Arrears")}
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

export default SemesterInfo;
