import React, { Fragment, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { isAuthenticated } from "../../../Auth/helper";
import { getBatch, updateFields } from "../../helper/Adminapicalls";
import RangeField from "./Subcomponents/RangeField";
import SelectField from "./Subcomponents/SelectField";
import TextField from "./Subcomponents/TextField";

const ExtraForm = (props) => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [batch, setBatch] = useState([]);

  const { student, token } = isAuthenticated();

  const [formDetails, setFormDetails] = useState({
    "Form Name": "",
    Batch: "",
    Fields: [],
  });

  const [field, setField] = useState("");

  const handleChange = (name) => (event) => {
    let value = event.target.value;
    setFormDetails({ ...formDetails, [name]: value });
    if (!!errors[name])
      setErrors({
        ...errors,
        [name]: null,
      });
  };

  const findFormErrors = () => {
    let newErrors = {};

    if (!formDetails["Form Name"] || formDetails["Form Name"] === "")
      newErrors["Form Name"] = "Provide form name";

    if (
      !formDetails["Batch"] ||
      formDetails["Batch"] === "" ||
      formDetails["Batch"] === "Select"
    )
      newErrors["Batch"] = "Provide batch";
    return newErrors;
  };

  const handleFieldChange = (value) => {
    setFormDetails({
      ...formDetails,
      Fields: [
        ...formDetails["Fields"],
        {
          fieldName: field,
          details: [value],
        },
      ],
    });
    setField("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setLoading(false);
      setErrors(newErrors);
    } else {
      setLoading(false);
      updateFields(student._id, token, formDetails)
        .then((data) => {
          setFormDetails({
            "Form Name": "",
            Batch: "",
            Fields: [],
          });
          return props.onClick();
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    getBatch()
      .then((data) => {
        setBatch(data.batch);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container className="poppins-font mb-5 mt-4 mt-lg-0" fluid>
      <p className="text-center fs-6 fw-bold">Form Details</p>
      <Form>
        <Form.Group controlId="Name" className="mb-3">
          <Row className="mt-4">
            <Col xs={5}>
              <Form.Label
                className="bg-primary py-2 fs-6 text-white rounded text-center"
                as="div"
              >
                Name
              </Form.Label>
            </Col>
            <Col xs={7}>
              <Form.Control
                className="py-2"
                type="text"
                placeholder="Form Name"
                value={formDetails["Form Name"]}
                onChange={handleChange("Form Name")}
                isInvalid={!!errors["Form Name"]}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors["Form Name"]}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group controlId="Batch" className="mb-3">
          <Row className="mt-4">
            <Col xs={5}>
              <Form.Label
                className="bg-primary py-2 text-white rounded text-center"
                as="div"
              >
                Batch
              </Form.Label>
            </Col>
            <Col xs={7}>
              <Form.Select
                className="form-control py-2"
                isInvalid={!!errors["Batch"]}
                value={formDetails["Batch"]}
                onChange={handleChange("Batch")}
                required
              >
                <option value={"Batch"}>Batch</option>
                {batch.map((year, index) => {
                  return (
                    <option key={index} value={year}>
                      {year}
                    </option>
                  );
                })}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors["Batch"]}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Form.Group>

        <>
          {formDetails["Fields"].map((data, index) => {
            if (data["fieldName"] === "Text") {
              return (
                <Fragment key={index}>
                  {data.details.map((val, valIndex) => (
                    <Form.Group
                      controlId={val.label}
                      key={valIndex}
                      className="mb-3"
                    >
                      <Row className="mt-4">
                        <Col xs={5}>
                          <Form.Label
                            className="bg-primary py-2 fs-6 text-white rounded text-center"
                            as="div"
                          >
                            {val["label"]}
                          </Form.Label>
                        </Col>
                        <Col xs={7}>
                          <Form.Control
                            className="py-2"
                            type={val["type"]}
                            placeholder={val["placeholder"]}
                            required
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                  ))}
                </Fragment>
              );
            } else if (data["fieldName"] === "Select") {
              return (
                <Fragment key={index}>
                  {data.details.map((val, valIndex) => (
                    <Form.Group
                      controlId={val.label}
                      key={valIndex}
                      className="mb-3"
                    >
                      <Row className="mt-4">
                        <Col xs={5}>
                          <Form.Label
                            className="bg-primary py-2 fs-6 text-white rounded text-center"
                            as="div"
                          >
                            {val.label}
                          </Form.Label>
                        </Col>
                        <Col xs={7}>
                          <Form.Select className="form-control py-2" required>
                            <option value="Select">Select</option>
                            {val.options.map((option, index) => (
                              <option value={`${option}`} key={index}>
                                {option}
                              </option>
                            ))}
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            {errors["Title"]}
                          </Form.Control.Feedback>
                        </Col>
                      </Row>
                    </Form.Group>
                  ))}
                </Fragment>
              );
            }
          })}
        </>
        {formDetails["Fields"].length > 0 && (
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
                "Send Form"
              )}
            </Button>
          </div>
        )}
        <hr />
        <p className="text-center fs-6 fw-bold">Form Fields</p>
        <Form.Group controlId="Field" className="mb-md-4">
          <Row className="mt-4">
            <Col xs={5}>
              <Form.Label
                className="bg-primary py-2 text-white rounded text-center"
                as="div"
              >
                Field
              </Form.Label>
            </Col>
            <Col xs={7}>
              <Form.Select
                className="form-control py-2"
                value={field}
                onChange={(e) => setField(e.target.value)}
                required
              >
                <option value={"Field"}>Field</option>
                <option value={"Text"}>Text Field</option>
                <option value={"Select"}>DropDown Field</option>
                <option value={"Checkbox"}>CheckBoxes</option>
                <option value={"Range"}>Range Field</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors["Field"]}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Form.Group>
        {field === "Text" && (
          <TextField handleFieldChange={handleFieldChange} />
        )}
        {field === "Select" && (
          <SelectField handleFieldChange={handleFieldChange} />
        )}
        {field === "Range" && (
          <RangeField handleFieldChange={handleFieldChange} />
        )}
      </Form>
    </Container>
  );
};

export default ExtraForm;
