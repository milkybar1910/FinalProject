import React, { useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { authenticate, signin, signup } from "../Auth/helper";

const Signup = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    "Register Number": "",
    "Primary Email ID": "",
    password: "",
    "Year Of Admission": "",
    "Confirm Password": "",
    didRedirect: false,
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
    if (!!errors[name])
      setErrors({
        ...errors,
        [name]: null,
      });
  };

  const findFormErrors = () => {
    const newErrors = {};

    if (!values["Register Number"] || values["Register Number"] === "")
      newErrors["Register Number"] = "Provide your register number";
    else if (values["Register Number"].length !== 12)
      newErrors["Register Number"] = "Invalid register number";

    if (!values["Primary Email ID"] || values["Primary Email ID"] === "")
      newErrors["Primary Email ID"] = "Provide your email";
    else if (
      !/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g.test(
        values["Primary Email ID"]
      )
    )
      newErrors["Primary Email ID"] = "Invalid email";
    if (!values["password"] || values["password"] === "")
      newErrors["password"] = "Provide your password";
    if (!values["Confirm Password"] || values["Confirm Password"] === "")
      newErrors["Confirm Password"] = "Confirm your password";
    if (values["Confirm Password"] !== values["password"])
      newErrors["Confirm Password"] = "Password doesn't match";

    return newErrors;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
    } else {
      signup({
        "Register Number": values["Register Number"],
        "Primary Email ID": values["Primary Email ID"],
        password: values["password"],
        "Year Of Admission":
          "20" + values["Register Number"][4] + values["Register Number"][5],
      })
        .then((data) => {
          if (data.error) {
            setErrors(data.error);
            setLoading(false);
          } else {
            signin({
              "Primary Email ID": data["Primary Email ID"],
              password: values["password"],
            }).then((data) => {
              setTimeout(() => {
                authenticate(data, () => {
                  setValues({
                    ...values,
                    didRedirect: true,
                  });
                  setLoading(false);
                });
              }, 1000);
            });
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <Form onSubmit={onSubmit}>
      <Row className="mb-3 poppins-font">
        <Col
          sm={{
            offset: 4,
            span: 4,
          }}
          md={{
            offset: 4,
            span: 4,
          }}
        >
          <Form.Group controlId="Register Name" className="mb-3">
            <Form.Label className="mb-1">Register Number</Form.Label>
            <Form.Control
              className="py-2"
              type="text"
              placeholder="312418205087"
              value={values["Register Number"]}
              onChange={handleChange("Register Number")}
              isInvalid={!!errors["Register Number"]}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors["Register Number"]}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="Email" className="mb-3">
            <Form.Label className="mb-1">Email</Form.Label>
            <Form.Control
              className="py-2 "
              type="email"
              placeholder="joseph@gmail.com"
              value={values["Primary Email ID"]}
              onChange={handleChange("Primary Email ID")}
              isInvalid={!!errors["Primary Email ID"]}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors["Primary Email ID"]}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="Password" className="mb-3">
            <Form.Label className="mb-1">Password</Form.Label>
            <Form.Control
              className="py-2 "
              type="password"
              value={values.password}
              onChange={handleChange("password")}
              isInvalid={!!errors["password"]}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors["password"]}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="Confirm Password" className="mb-3">
            <Form.Label className="mb-1">Confirm Password</Form.Label>
            <Form.Control
              className="py-2 "
              type="password"
              value={values["Confirm Password"]}
              onChange={handleChange("Confirm Password")}
              isInvalid={!!errors["Confirm Password"]}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors["Confirm Password"]}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-grid gap-2">
            <Button
              className="fs-6"
              variant="primary"
              type="submit"
              size="lg"
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
                "SIGN UP"
              )}
            </Button>
          </div>
        </Col>
      </Row>
      {values["didRedirect"] && <Navigate to="/student/Profile" />}
    </Form>
  );
};

export default Signup;
