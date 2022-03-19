import React from "react";
import { Form } from "react-bootstrap";

const SelectField = ({ details, setForms, forms }) => {
  const handleChange = (name) => (event) => {
    setForms({ ...forms, [name]: event.target.value });
  };

  return (
    <>
      <Form.Group controlId={`${details[0]["label"]}`} className="mb-3">
        <Form.Label className="mb-1">{details[0]["label"]}</Form.Label>
        <Form.Select
          className="form-control py-2"
          required
          onChange={handleChange(details[0]["label"])}
        >
          <option value="Select">Select</option>
          {details[0]["options"].map((data, index) => (
            <option key={index} value={data}>
              {data}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {/* {errors["On Campus Or Off Campus"]} */}
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
};

export default SelectField;
