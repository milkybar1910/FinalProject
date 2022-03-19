import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import Moment from "moment";

const CollegeInfo = ({ student, handleNext, handlePrev, setStudentData }) => {
  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    if (name === "DOB III") {
      setStudentData({
        ...student,
        "DOB I": Moment(value).format("DD/MM/YYYY"),
        "DOB II": Moment(value).format("MM/DD/YYYY"),
        "DOB III": Moment(value).format("YYYY-MM-DD"),
      });
    } else {
      setStudentData({ ...student, [name]: value });
    }

    if (!!errors[name])
      setErrors({
        ...errors,
        [name]: null,
      });
  };

  const findFormErrors = () => {
    const newErrors = {};

    if (!student["Roll Number"] || student["Roll Number"] === "")
      newErrors["Roll Number"] = "Provide your roll number";
    else if (!/^\d{2}[A-Z]{2}\d{4}/.test(student["Roll Number"])) {
      newErrors["Roll Number"] = "Invalid format";
    }

    if (
      !student["Title"] ||
      student["Title"] === "" ||
      student["Title"] === "Select"
    )
      newErrors["Title"] = "Select your title";

    if (
      !student["Gender"] ||
      student["Gender"] === "" ||
      student["Gender"] === "Select"
    )
      newErrors["Gender"] = "Provide the gender";

    if (!student["Full Name"] || student["Full Name"] === "")
      newErrors["Full Name"] = "Provide your full name";

    if (!student["First Name"] || student["First Name"] === "")
      newErrors["First Name"] = "Provide your first name";

    if (!student["DOB III"] || student["DOB III"] === "")
      newErrors["DOB III"] = "Provide your DOB";

    if (
      !student["Section"] ||
      student["Section"] === "" ||
      student["Section"] === "Select"
    )
      newErrors["Section"] = "Provide your section";

    return newErrors;
  };

  const next = (e) => {
    e.preventDefault();
    setLoading(true);
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setLoading(false);
      setErrors(newErrors);
    } else {
      setLoading(false);
      handleNext();
    }
  };

  return (
    <Container>
      <Row className="poppins-font">
        <Col>
          <Form className="p-4">
            <Row>
              <Col md={4} sm={12}>
                <Form.Group controlId="RollNumber" className="mb-3">
                  <Form.Label className="mb-1 ">Roll Number</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder="18IT1209"
                    required
                    value={student["Roll Number"] || ""}
                    onChange={handleChange("Roll Number")}
                    isInvalid={!!errors["Roll Number"]}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors["Roll Number"]}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4} sm={12}>
                <Form.Group controlId="Title" className="mb-3">
                  <Form.Label className="mb-1">Title</Form.Label>
                  <Form.Select
                    className="form-control py-2"
                    required
                    onChange={handleChange("Title")}
                    value={student["Title"]}
                    isInvalid={!!errors["Title"]}
                  >
                    <option value={"Select"}>Select</option>
                    <option value={"Mr."}>Mr.</option>
                    <option value={"Mrs."}>Mrs.</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors["Title"]}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4} sm={12}>
                <Form.Group controlId="Gender" className="mb-3">
                  <Form.Label className="mb-1">Gender</Form.Label>
                  <Form.Select
                    className="form-control py-2"
                    required
                    onChange={handleChange("Gender")}
                    value={student["Gender"]}
                    isInvalid={!!errors["Gender"]}
                  >
                    <option value={"Select"}>Select</option>
                    <option value={"Male"}>Male</option>
                    <option value={"Female"}>Female</option>
                    <option value={"Other"}>Other</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors["Gender"]}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <Form.Group controlId="FullName" className="mb-3">
                  <Form.Label className="mb-1">Full Name</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder="AROKIYA SHELTON"
                    value={student["Full Name"] || ""}
                    onChange={handleChange("Full Name")}
                    isInvalid={!!errors["Full Name"]}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors["Full Name"]}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6} sm={12}>
                <Form.Group controlId="FirstName" className="mb-3">
                  <Form.Label className="mb-1">First Name</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder="AROKIYA"
                    value={student["First Name"] || ""}
                    onChange={handleChange("First Name")}
                    isInvalid={!!errors["First Name"]}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors["First Name"]}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} sm={12}>
                <Form.Group controlId="LastName" className="mb-3">
                  <Form.Label className="mb-1">Last Name</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="text"
                    placeholder="SHELTON"
                    onChange={handleChange("Last Name")}
                    value={student["Last Name"] || ""}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6} sm={12}>
                <Form.Group controlId="DOBIII" className="mb-3">
                  <Form.Label className="mb-1">DOB</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="date"
                    onChange={handleChange("DOB III")}
                    value={student["DOB III"] || ""}
                    isInvalid={!!errors["DOB III"]}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors["DOB III"]}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} sm={12}>
                <Form.Group controlId="Section" className="mb-3">
                  <Form.Label className="mb-1">Section</Form.Label>
                  <Form.Select
                    className="form-control py-2"
                    required
                    onChange={handleChange("Section")}
                    value={student["Section"]}
                    isInvalid={!!errors["Section"]}
                  >
                    <option value={"Select"}>Select</option>
                    <option value={"A"}>A</option>
                    <option value={"B"}>B</option>
                    <option value={"C"}>C</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors["Section"]}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-grid gap-2">
              <ButtonGroup aria-label="Basic example">
                <Button
                  variant="primary"
                  type="submit"
                  onClick={next}
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
                    "Next"
                  )}
                </Button>
              </ButtonGroup>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CollegeInfo;
