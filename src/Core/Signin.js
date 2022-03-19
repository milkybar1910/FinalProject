import React, { useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { authenticate, isAuthenticated, signin } from "../Auth/helper";
import ForgotPasswordForm from "./Components/ForgotPasswordForm";

const Signin = () => {
  const [values, setValues] = useState({
    "Primary Email ID": "",
    password: "",
    didRedirect: false,
  });

  const [forgotPass, setForgotPass] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { student } = isAuthenticated();

  //storing the state value
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
    if (!!errors[name])
      setErrors({
        ...errors,
        [name]: null,
      });
  };

  //signin button is clicked
  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setLoading(false);
      setErrors(newErrors);
    } else {
      signin({
        "Primary Email ID": values["Primary Email ID"],
        password: values["password"],
      })
        .then((data) => {
          if (data?.error) {
            setErrors(data.error);
            setLoading(false);
          } else {
            authenticate(data, () => {
              setValues({
                ...values,
                didRedirect: true,
              });
              // performRedirect();
              setLoading(false);
            });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const findFormErrors = () => {
    const newErrors = {};

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

    return newErrors;
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
          <Form.Group controlId="Email" className="mb-3">
            <Form.Label className="mb-1">Email</Form.Label>
            <Form.Control
              className="py-2"
              type="email"
              placeholder="joseph@gmail.com"
              value={values["Primary Email ID"]}
              onChange={handleChange("Primary Email ID")}
              isInvalid={!!errors["Primary Email ID"]}
              autoComplete="off"
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors["Primary Email ID"]}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="Password" className="mb-3">
            <Form.Label className="mb-1">Password</Form.Label>
            <Form.Control
              className="py-2"
              type="password"
              onChange={handleChange("password")}
              value={values["password"]}
              isInvalid={!!errors["password"]}
              autoComplete="off"
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors["password"]}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-grid gap-2">
            <Button
              variant="primary"
              type="submit"
              size="lg"
              className="fs-6"
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
                "SIGN IN"
              )}
            </Button>
          </div>
          <p
            className=" text-center text-decoration-underline mt-1 fs-6"
            onClick={() => setForgotPass(true)}
            style={{ cursor: "pointer" }}
          >
            Forgot Password?
          </p>
          <ForgotPasswordForm
            show={forgotPass}
            onHide={() => setForgotPass(false)}
          />
        </Col>
      </Row>
      {isAuthenticated() &&
        values["didRedirect"] &&
        student &&
        student.role === 1 && <Navigate to="/admin/Home" />}
      {isAuthenticated() &&
        values["didRedirect"] &&
        student &&
        student.role === 0 && <Navigate to="/student/Home" />}
    </Form>
  );
};

export default Signin;
