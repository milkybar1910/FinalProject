import React, { Fragment, useState } from "react";
import { Form, Row, Col, Button, Spinner } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
const SelectField = ({ handleFieldChange }) => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [option, setOption] = useState("");

  const [details, setDetails] = useState({
    label: "",
    options: [],
  });

  const findFormErrors = () => {
    let newErrors = {};

    if (!details["label"] || details["label"] === "")
      newErrors["label"] = "Provide label";
    if (option !== "") newErrors["option"] = "Make sure to add";
    else if (details["options"].length === 0)
      newErrors["option"] = "Empty options";
    return newErrors;
  };

  const handleChange = (option) => {
    if (!option || option === "")
      setErrors({ ...errors, option: "Value is empty" });
    else {
      setDetails({ ...details, options: [...details["options"], option] });
      setOption("");
    }
    if (!!errors["option"])
      setErrors({
        ...errors,
        option: null,
      });
  };

  const deleteOption = (optionIndex) => {
    setDetails({
      ...details,
      options: details["options"].filter((data, i) => i !== optionIndex),
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
              onChange={(e) =>
                setDetails({ ...details, label: e.target.value })
              }
              isInvalid={!!errors["label"]}
            />
            <Form.Control.Feedback type="invalid">
              {errors["label"]}
            </Form.Control.Feedback>
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="Option" className="mb-3">
        <Row className="mt-4">
          <Col xs={5}>
            <Form.Label
              className="bg-primary py-2 text-white rounded text-center"
              as="div"
            >
              Option
            </Form.Label>
          </Col>
          <Col xs={6}>
            <Form.Control
              type="text"
              className="py-2"
              placeholder="Options"
              value={option}
              onChange={(e) => {
                setOption(e.target.value);
                if (!!errors["option"])
                  setErrors({
                    ...errors,
                    option: null,
                  });
              }}
              isInvalid={!!errors["option"]}
            />
            <Form.Control.Feedback type="invalid">
              {errors["option"]}
            </Form.Control.Feedback>
          </Col>
          <Col xs={1} className="d-flex m-0 p-0">
            <div
              className="text-primary align-self-center"
              onClick={() => handleChange(option)}
            >
              +
            </div>
          </Col>
        </Row>
      </Form.Group>
      <Row>
        {details["options"].map((data, index) => {
          return (
            <Fragment key={index}>
              <Col xs={9} className="mb-3">
                <div className="py-2 rounded text-center text-white bg-primary">
                  {data}
                </div>
              </Col>
              <Col xs={2} className="mb-3">
                <Button
                  variant="dark"
                  className="py-2"
                  onClick={() => deleteOption(index)}
                >
                  <BsTrash />
                </Button>
              </Col>
            </Fragment>
          );
        })}
      </Row>
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

export default SelectField;
