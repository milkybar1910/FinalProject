import React, { useState } from "react";
import { Form } from "react-bootstrap";

const RangeField = ({ details, setForms, forms, index }) => {
  const handleChange = (name) => (event) => {
    setForms({ ...forms, [name]: event.target.value });
  };

  return (
    <>
      <Form.Group controlId={details[0]["label"]} className="mb-3 poppins-font">
        <Form.Label as="div">{details[0]["label"]}</Form.Label>
        <div className="d-flex">
          <input
            className="form-range py-2 align-self-center"
            type="range"
            min={details[0]["min"]}
            max={details[0]["max"]}
            step={details[0]["steps"]}
            onChange={handleChange(details[0]["label"])}
            onInput={(e) => {
              document.getElementById("siva" + index).innerHTML =
                e.target.value;
            }}
          />
          <span
            id={"siva" + index}
            className="font-weight-bold google-font  mx-2 align-self-center"
          >
            {details[0]["min"]}
          </span>
        </div>
        <Form.Control.Feedback type="invalid">
          {/* {errors["label"]} */}
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
};

export default RangeField;
