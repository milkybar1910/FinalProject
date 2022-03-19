import React, { useState } from "react";
import { Form, Row, Col, Button, Spinner } from "react-bootstrap";

const TextField = ({ handleFieldChange }) => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    type: "",
    label: "",
    placeholder: "",
  });

  const findFormErrors = () => {
    let newErrors = {};
    if (
      !details["type"] ||
      details["type"] === "" ||
      details["type"] === "Type"
    )
      newErrors["type"] = "Select type";
    if (!details["label"] || details["label"] === "")
      newErrors["label"] = "Provide label";
    if (!details["placeholder"] || details["placeholder"] === "")
      newErrors["placeholder"] = "Provide placeholder";

    return newErrors;
  };

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setDetails({ ...details, [name]: value });
    if (!!errors[name])
      setErrors({
        ...errors,
        [name]: null,
      });
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
      <Form.Group controlId="Type" className="mb-3">
        <Row className="mt-4">
          <Col xs={5}>
            <Form.Label
              className="bg-primary py-2 text-white rounded text-center"
              as="div"
            >
              Type
            </Form.Label>
          </Col>
          <Col xs={7}>
            <Form.Select
              className="form-control py-2"
              value={details["type"]}
              onChange={handleChange("type")}
              isInvalid={!!errors["type"]}
              required
            >
              <option value={"Type"}>Type</option>
              <option value={"text"}>Text</option>
              <option value={"email"}>Email</option>
              <option value={"number"}>Number</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors["type"]}
            </Form.Control.Feedback>
          </Col>
        </Row>
      </Form.Group>
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
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors["label"]}
            </Form.Control.Feedback>
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="Placeholder" className="mb-3">
        <Row className="mt-4">
          <Col xs={5}>
            <Form.Label
              className="bg-primary py-2 text-white rounded text-center"
              as="div"
            >
              Describe
            </Form.Label>
          </Col>
          <Col xs={7}>
            <Form.Control
              type="text"
              className="py-2"
              placeholder="Description"
              value={details["placeholder"]}
              onChange={handleChange("placeholder")}
              isInvalid={!!errors["placeholder"]}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors["placeholder"]}
            </Form.Control.Feedback>
          </Col>
        </Row>
      </Form.Group>

      <div className="d-grid gap-2">
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

export default TextField;
