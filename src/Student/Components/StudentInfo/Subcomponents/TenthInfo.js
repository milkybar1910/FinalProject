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

const TenthInfo = ({ student, handleNext, handlePrev, setStudentData }) => {
  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setStudentData({ ...student, [name]: value });

    if (!!errors[name])
      setErrors({
        ...errors,
        [name]: null,
      });
  };

  const findFormErrors = () => {
    const newErrors = {};

    if (!student["Tenth Percentage"] || student["Tenth Percentage"] === "")
      newErrors["Tenth Percentage"] = "Provide the percentage";

    if (
      !student["Tenth Board Of Study"] ||
      student["Tenth Board Of Study"] === ""
    )
      newErrors["Tenth Board Of Study"] = "Provide the board of study";

    if (
      !student["Tenth Medium Of Study"] ||
      student["Tenth Medium Of Study"] === ""
    )
      newErrors["Tenth Medium Of Study"] = "Provide the medium of study";

    if (
      !student["Tenth Year Of Passing"] ||
      student["Tenth Year Of Passing"] === ""
    )
      newErrors["Tenth Year Of Passing"] = "Provide the year of passing";
    else if (!/^\d{4}/.test(student["Tenth Year Of Passing"])) {
      newErrors["Tenth Year Of Passing"] = "Invalid format";
    }

    if (!student["Tenth School Name"] || student["Tenth School Name"] === "")
      newErrors["Tenth School Name"] = "Provide the school name";

    if (
      !student["Tenth Graduating State"] ||
      student["Tenth Graduating State"] === ""
    )
      newErrors["Tenth Graduating State"] = "Provide the graduating state";

    return newErrors;
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
      ["Tenth Percentage"]: convertNum(student["Tenth Percentage"]),
    });
    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setLoading(false);
      setErrors(newErrors);
    } else handleNext();
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
                <Form.Group controlId="Tenth Percentage" className="mb-3">
                  <Form.Label className="mb-1">Percentage</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="number"
                    placeholder="88.63"
                    required
                    onChange={handleChange("Tenth Percentage")}
                    value={student["Tenth Percentage"] || ""}
                    onWheel={(event) => event.currentTarget.blur()}
                    isInvalid={!!errors["Tenth Percentage"]}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors["Tenth Percentage"]}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col lg={4} md={6} sm={12}>
                <Form.Group controlId="Tenth Board Of Study" className="mb-3">
                  <Form.Label className="mb-1">Board Of Study</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder="STATE BOARD"
                    required
                    value={student["Tenth Board Of Study"] || ""}
                    onChange={handleChange("Tenth Board Of Study")}
                    isInvalid={!!errors["Tenth Board Of Study"]}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors["Tenth Board Of Study"]}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col lg={4} md={6} sm={12}>
                <Form.Group controlId="Tenth Medium Of Study" className="mb-3">
                  <Form.Label className="mb-1">Medium Of Study</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder="ENGLISH"
                    required
                    value={student["Tenth Medium Of Study"] || ""}
                    onChange={handleChange("Tenth Medium Of Study")}
                    isInvalid={!!errors["Tenth Medium Of Study"]}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors["Tenth Medium Of Study"]}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={12} md={6} lg={12}>
                <Form.Group controlId="Tenth School Name" className="mb-3">
                  <Form.Label className="mb-1">School Name</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder="ST.THOMAS MATRICULATION HIGHER SECONDARY SCHOOL"
                    required
                    value={student["Tenth School Name"] || ""}
                    onChange={handleChange("Tenth School Name")}
                    isInvalid={!!errors["Tenth School Name"]}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors["Tenth School Name"]}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} sm={12}>
                <Form.Group controlId="Tenth Year Of Passing" className="mb-3">
                  <Form.Label className="mb-1">Year Of Passing</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="number"
                    placeholder="2018"
                    required
                    value={student["Tenth Year Of Passing"] || ""}
                    onChange={handleChange("Tenth Year Of Passing")}
                    isInvalid={!!errors["Tenth Year Of Passing"]}
                    onWheel={(event) => event.currentTarget.blur()}
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 4))
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors["Tenth Year Of Passing"]}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} sm={12}>
                <Form.Group controlId="Tenth Graduating State" className="mb-3">
                  <Form.Label className="mb-1">Graduating State</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder="TAMIL NADU"
                    required
                    value={student["Tenth Graduating State"] || ""}
                    onChange={handleChange("Tenth Graduating State")}
                    isInvalid={!!errors["Tenth Graduating State"]}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors["Tenth Graduating State"]}
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

export default TenthInfo;
