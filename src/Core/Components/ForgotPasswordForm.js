import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { forgotPassword } from "../../Auth/helper";

const ForgotPasswordForm = (props) => {
  // forgot Password
  const [forgotPass, setForgotPass] = useState({
    password: "",
    confirmPassword: "",
    "Primary Email ID": "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChangeForgotPass = (name) => (event) => {
    setForgotPass({ ...forgotPass, [name]: event.target.value });
    if (!!errors[name])
      setErrors({
        ...errors,
        [name]: null,
      });
  };

  const findFormErrors = () => {
    const newErrors = {};

    if (
      !forgotPass["Primary Email ID"] ||
      forgotPass["Primary Email ID"] === ""
    )
      newErrors["Primary Email ID"] = "Please provide your email";
    else if (
      !/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g.test(
        forgotPass["Primary Email ID"]
      )
    )
      newErrors["Primary Email ID"] = "Invalid email";
    if (!forgotPass["password"] || forgotPass["password"] === "")
      newErrors["password"] = "Please provide your password";
    if (!forgotPass["confirmPassword"] || forgotPass["confirmPassword"] === "")
      newErrors["confirmPassword"] = "Please confirm your password";
    if (forgotPass["confirmPassword"] !== forgotPass["password"])
      newErrors["confirmPassword"] = "Password doesn't match";
    return newErrors;
  };

  const forgotPassSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setLoading(false);
      setErrors(newErrors);
    } else {
      forgotPassword(forgotPass)
        .then((data) => {
          if (data.error) {
            setLoading(false);
            setErrors(data.error);
          } else {
            setLoading(false);
            setForgotPass({
              ...forgotPass,
              password: "",
              confirmPassword: "",
              "Primary Email ID": "",
            });
            props.onHide();
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="poppins-font text-center">
          Forgot Password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row className="poppins-font">
            <Col>
              <Form onSubmit={forgotPassSubmit} className="p-4">
                <>
                  <Col>
                    <Form.Group controlId="Email" className="mb-3">
                      <Form.Label className="mb-1 ">Email</Form.Label>
                      <Form.Control
                        className="py-2"
                        type="email"
                        placeholder="joseph@gmail.com"
                        required
                        value={forgotPass["Primary Email ID"]}
                        onChange={handleChangeForgotPass("Primary Email ID")}
                        isInvalid={!!errors["Primary Email ID"]}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors["Primary Email ID"]}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group controlId="password" className="mb-3">
                      <Form.Label className="mb-1 ">Password</Form.Label>
                      <Form.Control
                        className="py-2"
                        type="password"
                        required
                        value={forgotPass["password"]}
                        onChange={handleChangeForgotPass("password")}
                        isInvalid={!!errors["password"]}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors["password"]}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="confirmPassword" className="mb-3">
                      <Form.Label className="mb-1 ">
                        Confirm Password
                      </Form.Label>
                      <Form.Control
                        className="py-2"
                        type="password"
                        required
                        value={forgotPass["confirmPassword"]}
                        onChange={handleChangeForgotPass("confirmPassword")}
                        isInvalid={!!errors["confirmPassword"]}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors["confirmPassword"]}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </>

                <div className="d-grid gap-2">
                  <Button
                    className="fs-6"
                    variant="primary"
                    type="submit"
                    size="lg"
                    onClick={forgotPassSubmit}
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
                      "Change Password"
                    )}
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default ForgotPasswordForm;
