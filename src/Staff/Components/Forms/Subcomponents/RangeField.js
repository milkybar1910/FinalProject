import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

const RangeField = () => {
  const [errors, setErrors] = useState({});
  const [details, setDetails] = useState({
    label: "",
    min: "",
    max: "",
    steps: "",
  });
  return (
    <>
      <Form.Group controlId="Label" className="mb-3">
        <Row className="mt-4">
          <Col xs={5}>
            <Form.Label
              className="bg-primary py-2 text-white rounded text-center"
              as="div"
              value={details["label"]}
            >
              Label
            </Form.Label>
          </Col>
          <Col xs={7}>
            <Form.Control type="text" className="py-2" placeholder="Value" />
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
            <Form.Control type="text" className="py-2" placeholder="Steps" />
            <Form.Control.Feedback type="invalid">
              {errors["steps"]}
            </Form.Control.Feedback>
          </Col>
        </Row>
      </Form.Group>
      <div className="d-grid gap-2 ">
        <Button variant="primary">Add Field</Button>
      </div>
    </>
  );
};

export default RangeField;
