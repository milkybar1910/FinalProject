import React, { useState } from "react";
import { Form, Row, Col, Button, Spinner } from "react-bootstrap";

const RangeField = ({ handleFieldChange }) => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    label: "",
    min: "",
    max: "",
    steps: "",
  });

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setDetails({ ...details, [name]: value });
    if (!!errors[name])
      setErrors({
        ...errors,
        [name]: null,
      });
  };

  const findFormErrors = () => {
    let newErrors = {};

    if (!details["label"] || details["label"] === "")
      newErrors["label"] = "Provide label";
    if (!details["min"] || details["min"] === "")
      newErrors["min"] = "Provide Min Value";
    if (!details["max"] || details["max"] === "")
      newErrors["max"] = "Provide Max Value";
    if (!details["steps"] || details["steps"] === "")
      newErrors["steps"] = "Provide steps";

    return newErrors;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setLoading(false);
      setErrors(newErrors);
    } else {
      setLoading(false);
      return handleFieldChange(details);
    }
  };

  return (
    <>
      <Form.Group controlId="Label" className="mb-3">
        <Row className="mt-4">
          <Col xs={5}>
            <Form.Label
              className="bg-primary py-2 text-white rounded text-center"
              as="div"
            >
              Label
            </Form.Label>
          </Col>
          <Col xs={7}>
            <Form.Control
              type="text"
              className="py-2"
              placeholder="Value"
              value={details["label"]}
              onChange={handleChange("label")}
              isInvalid={!!errors["label"]}
            />
            <Form.Control.Feedback type="invalid">
              {errors["label"]}
            </Form.Control.Feedback>
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="Minimum Value" className="mb-3">
        <Row className="mt-4">
          <Col xs={5}>
            <Form.Label
              className="bg-primary py-2 text-white rounded text-center"
              as="div"
            >
              Min
            </Form.Label>
          </Col>
          <Col xs={7}>
            <Form.Control
              type="text"
              className="py-2"
              placeholder="Minimum Value"
              value={details["min"]}
              onChange={handleChange("min")}
              isInvalid={!!errors["min"]}
            />
            <Form.Control.Feedback type="invalid">
              {errors["min"]}
            </Form.Control.Feedback>
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="Maximum Value" className="mb-3">
        <Row className="mt-4">
          <Col xs={5}>
            <Form.Label
              className="bg-primary py-2 text-white rounded text-center"
              as="div"
            >
              Max
            </Form.Label>
          </Col>
          <Col xs={7}>
            <Form.Control
              type="text"
              className="py-2"
              placeholder="Maximum Value"
              value={details["max"]}
              onChange={handleChange("max")}
              isInvalid={!!errors["max"]}
            />
            <Form.Control.Feedback type="invalid">
              {errors["max"]}
            </Form.Control.Feedback>
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="Steps" className="mb-3">
        <Row className="mt-4">
          <Col xs={5}>
            <Form.Label
              className="bg-primary py-2 text-white rounded text-center"
              as="div"
            >
              Steps
            </Form.Label>
          </Col>
          <Col xs={7}>
            <Form.Control
              type="text"
              className="py-2"
              placeholder="Steps"
              value={details["steps"]}
              onChange={handleChange("steps")}
              isInvalid={!!errors["min"]}
            />
            <Form.Control.Feedback type="invalid">
              {errors["steps"]}
            </Form.Control.Feedback>
          </Col>
        </Row>
      </Form.Group>
      <div className="d-grid gap-2 ">
        <Button
          variant="primary"
          type="submit"
          onClick={onSubmit}
          disabled={loading}
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
            "Add Field"
          )}
        </Button>
      </div>
    </>
  );
};

export default RangeField;
