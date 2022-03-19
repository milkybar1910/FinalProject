import React, { useState } from "react";
import { Form } from "react-bootstrap";

const TextField = ({ details, setForms, forms }) => {
  const handleChange = (name) => (event) => {
    setForms({ ...forms, [name]: event.target.value });
  };

  return (
    <>
      <Form.Group controlId={details[0]["label"]} className="mb-3 poppins-font">
        <Form.Label as="div">{details[0]["label"]}</Form.Label>
        <Form.Control
          type={details[0]["type"]}
          className="py-2"
          placeholder={details[0]["placeholder"]}
          value={forms[details[0]["label"]] || ""}
          onChange={handleChange(details[0]["label"])}
          required
        />
        <Form.Control.Feedback type="invalid">
          {/* {errors["label"]} */}
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
};

export default TextField;
