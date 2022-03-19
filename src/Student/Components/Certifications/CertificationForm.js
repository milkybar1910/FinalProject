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
import "../../../style.css";
import Moment from "moment";
import Compressor from "compressorjs";
import { isAuthenticated } from "../../../Auth/helper";
import { createCourse } from "../../helper/StudentApiCall";

const CertificationForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [courseInfo, setCourseInfo] = useState({
    "Course Name": "",
    "Platform Name": "",
    Duration: "",
    To: "",
    From: "",
    Certificate: "",
    formData: new FormData(),
  });

  const { student, token } = isAuthenticated();

  const { formData } = courseInfo;

  const findFormErrors = () => {
    const newErrors = {};

    if (!courseInfo["Course Name"] || courseInfo["Course Name"] === "")
      newErrors["Course Name"] = "Provide the course name";

    if (!courseInfo["Platform Name"] || courseInfo["Platform Name"] === "")
      newErrors["Platform Name"] = "Provide the platform name";

    if (!courseInfo["Duration"] || courseInfo["Duration"] === "")
      newErrors["Duration"] = "Provide the duration";

    if (!courseInfo["From"] || courseInfo["From"] === "")
      newErrors["From"] = "Provide From date";

    if (!courseInfo["To"] || courseInfo["To"] === "")
      newErrors["To"] = "Provide To date";

    if (!courseInfo["Certificate"] || courseInfo["Certificate"] === "")
      newErrors["Certificate"] = "Provide the certificate";

    return newErrors;
  };

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    if (name === "To" || name === "From") {
      formData.set(name, Moment(value).format("DD/MM/YYYY"));
    } else formData.set(name, value);
    setCourseInfo({ ...courseInfo, [name]: value });
    if (!!errors[name])
      setErrors({
        ...errors,
        [name]: null,
      });
  };

  const handleCompressedUpload = (e) => {
    const image = e.target.files[0];
    setCourseInfo({ ...courseInfo, Certificate: e.target.value });
    if (image.size > 1048576)
      setErrors({
        ...errors,
        Certificate: "Certificate size too big!",
      });
    else if (
      image.type !== "image/png" &&
      image.type !== "image/jpg" &&
      image.type !== "image/jpeg"
    )
      setErrors({
        ...errors,
        Certificate: "File format not supported",
      });
    else
      new Compressor(image, {
        quality: 0.5,
        success: (compressedResult) => {
          formData.set("Certificate", compressedResult);
        },
      });

    if (!!errors["Certificate"])
      setErrors({
        ...errors,
        Certificate: null,
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
      formData.set("user", student._id);
      formData.set("Batch", student["Year Of Admission"]);
      formData.set("Register Number", student["Register Number"]);
      createCourse(student._id, token, formData)
        .then((data) => {
          if (data?.error) {
            setLoading(false);
            setErrors(data.error);
          } else {
            setLoading(false);
            setCourseInfo({
              ...courseInfo,
              "Course Name": "",
              "Platform Name": "",
              Duration: "",
              To: "",
              From: "",
              Certificate: "",
              formData: new FormData(),
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
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onExit={() => {
        setCourseInfo({
          "Course Name": "",
          "Platform Name": "",
          Duration: "",
          To: "",
          From: "",
          Certificate: "",
          formData: new FormData(),
        });
        setErrors({});
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title className="poppins-font text-center">
          Certifications
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row className="open-sans">
            <Col>
              <Form onSubmit={onSubmit} className="p-4">
                <Row>
                  <Col>
                    <Form.Group controlId="JobTitle" className="mb-3">
                      <Form.Label className="mb-1 ">Job Title</Form.Label>
                      <Form.Control
                        className="py-2"
                        type="text"
                        placeholder="Android Development"
                        required
                        value={courseInfo["Course Name"]}
                        onChange={handleChange("Course Name")}
                        isInvalid={!!errors["Course Name"]}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors["Course Name"]}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6} sm={12}>
                    <Form.Group controlId="PlatformName" className="mb-3">
                      <Form.Label className="mb-1 ">Platform Name</Form.Label>
                      <Form.Control
                        className="py-2"
                        type="text"
                        placeholder="CISCO"
                        required
                        value={courseInfo["Platform Name"]}
                        onChange={handleChange("Platform Name")}
                        isInvalid={!!errors["Platform Name"]}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors["Platform Name"]}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6} sm={12}>
                    <Form.Group controlId="Duration" className="mb-3">
                      <Form.Label className="mb-1 ">Duration</Form.Label>
                      <Form.Control
                        className="py-2"
                        type="text"
                        placeholder="1 month"
                        required
                        value={courseInfo["Duration"]}
                        onChange={handleChange("Duration")}
                        isInvalid={!!errors["Duration"]}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors["Duration"]}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group controlId="FromDate" className="mb-3">
                      <Form.Label className="mb-1 ">From Date</Form.Label>
                      <Form.Control
                        className="py-2"
                        type="date"
                        pattern="\d{2}-\d{2}-\d{2}"
                        required
                        onChange={handleChange("From")}
                        value={courseInfo["From"]}
                        isInvalid={!!errors["From"]}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors["From"]}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="ToDate" className="mb-3">
                      <Form.Label className="mb-1 ">To Date</Form.Label>
                      <Form.Control
                        className="py-2"
                        type="date"
                        required
                        onChange={handleChange("To")}
                        value={courseInfo["To"]}
                        isInvalid={!!errors["To"]}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors["To"]}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="Certificate" className="mb-3">
                  <Form.Label className="mb-1 ">
                    Certificate
                    <span className="badge text-dark ml-2 p-2">1MB</span>
                  </Form.Label>
                  <Form.Control
                    className="py-2"
                    type="file"
                    required
                    placeholder="choose a file"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleCompressedUpload}
                    value={courseInfo["Certificate"]}
                    isInvalid={!!errors["Certificate"]}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors["Certificate"]}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid gap-2">
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
                      "Upload"
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

export default CertificationForm;
