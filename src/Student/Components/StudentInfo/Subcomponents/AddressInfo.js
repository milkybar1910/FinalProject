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

const AddressInfo = ({ student, handleNext, handlePrev, setStudentData }) => {
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

    if (!student["Permanent Address"] || student["Permanent Address"] === "")
      newErrors["Permanent Address"] = "Provide your permanent address";

    if (
      !student["Permanent Address Line 1"] ||
      student["Permanent Address Line 1"] === ""
    )
      newErrors["Permanent Address Line 1"] =
        "Provide permanent address line 1";

    if (
      !student["Permanent Address Line 2"] ||
      student["Permanent Address Line 2"] === ""
    )
      newErrors["Permanent Address Line 2"] =
        "Provide the permanent address line 2";

    if (!student["Permanent City"] || student["Permanent City"] === "")
      newErrors["Permanent City"] = "Provide your permanent city";

    if (!student["State"] || student["State"] === "")
      newErrors["State"] = "Provide your state";

    if (!student["Postal Code"] || student["Postal Code"] === "")
      newErrors["Postal Code"] = "Provide your postal code";
    else if (student["Postal Code"].length !== 6)
      newErrors["Postal Code"] = "Invalid format";

    if (
      !student["Hostel OR Day Scholar"] ||
      student["Hostel OR Day Scholar"] === "" ||
      student["Hostel OR Day Scholar"] === "Select"
    )
      newErrors["Hostel OR Day Scholar"] = "Select appropriate Value";

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
                <Form.Group className="mb-3" controlId="Permanent Address">
                  <Form.Label>Permanent Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    value={student["Permanent Address"] || ""}
                    onChange={handleChange("Permanent Address")}
                    isInvalid={!!errors["Permanent Address"]}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors["Permanent Address"]}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Row className="col-12 col-md-6  d-flex flex-column">
                <Col xs={12}>
                  <Form.Group
                    controlId="Permanent Address Line 1"
                    className="mb-3"
                  >
                    <Form.Label>Line 1</Form.Label>
                    <Form.Control
                      type="text"
                      value={student["Permanent Address Line 1"] || ""}
                      onChange={handleChange("Permanent Address Line 1")}
                      isInvalid={!!errors["Permanent Address Line 1"]}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors["Permanent Address Line 1"]}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={12}>
                  <Form.Group controlId="Permanent Address Line 2">
                    <Form.Label>Line 2</Form.Label>
                    <Form.Control
                      type="text"
                      value={student["Permanent Address Line 2"] || ""}
                      onChange={handleChange("Permanent Address Line 2")}
                      isInvalid={!!errors["Permanent Address Line 2"]}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors["Permanent Address Line 2"]}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Col md={6} xs={12}>
                <Form.Group controlId="Permanent City" className="mb-3">
                  <Form.Label className="mb-1">Permanent City</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder="CHENNAI"
                    value={student["Permanent City"] || ""}
                    onChange={handleChange("Permanent City")}
                    isInvalid={!!errors["Permanent City"]}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors["Permanent City"]}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group controlId="State" className="mb-3">
                  <Form.Label className="mb-1">State</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder="TAMIL NADU"
                    value={student["State"] || ""}
                    onChange={handleChange("State")}
                    isInvalid={!!errors["State"]}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors["State"]}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group controlId="Postal Code" className="mb-3">
                  <Form.Label className="mb-1">Postal Code</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="number"
                    placeholder="628006"
                    value={student["Postal Code"] || ""}
                    onChange={handleChange("Postal Code")}
                    isInvalid={!!errors["Postal Code"]}
                    onWheel={(event) => event.currentTarget.blur()}
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 6))
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors["Postal Code"]}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} sm={12}>
                <Form.Group controlId="Hostel OR Day Scholar" className="mb-3">
                  <Form.Label className="mb-1">
                    Hostel Or Day Scholar
                  </Form.Label>
                  <Form.Select
                    className="form-control py-2"
                    required
                    onChange={handleChange("Hostel OR Day Scholar")}
                    value={student["Hostel OR Day Scholar"]}
                    isInvalid={!!errors["Hostel OR Day Scholar"]}
                  >
                    <option value={"Select"}>Select</option>
                    <option value={"Hostel"}>Hostel</option>
                    <option value={"Day Scholar"}>Day Scholar</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors["Hostel OR Day Scholar"]}
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

export default AddressInfo;
