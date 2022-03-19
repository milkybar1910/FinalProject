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
import { createInternship } from "../../helper/StudentApiCall";

const InternshipForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  //Internship Object
  const [internshipInfo, setInternshipInfo] = useState({
    "Job Name": "",
    "Organization Name": "",
    Duration: "",
    Location: "",
    From: "",
    Certificate: "",
    To: "",
    formData: new FormData(),
  });

  const { student, token } = isAuthenticated();

  //Destructing the Object
  const { formData } = internshipInfo;

  const findFormErrors = () => {
    const newErrors = {};

    if (!internshipInfo["Job Name"] || internshipInfo["Job Name"] === "")
      newErrors["Job Name"] = "Provide your job name";

    if (
      !internshipInfo["Organization Name"] ||
      internshipInfo["Organization Name"] === ""
    )
      newErrors["Organization Name"] = "Provide your organization name";

    if (!internshipInfo["Duration"] || internshipInfo["Duration"] === "")
      newErrors["Duration"] = "Provide the duration";

    if (!internshipInfo["Location"] || internshipInfo["Location"] === "")
      newErrors["Location"] = "Provide location";

    if (!internshipInfo["From"] || internshipInfo["From"] === "")
      newErrors["From"] = "Provide From date";

    if (!internshipInfo["To"] || internshipInfo["To"] === "")
      newErrors["To"] = "Provide To date";

    if (!internshipInfo["Certificate"] || internshipInfo["Certificate"] === "")
      newErrors["Certificate"] = "Provide the certificate";

    return newErrors;
  };

  //handling input
  const handleChange = (name) => (event) => {
    const value = event.target.value;
    if (name === "To" || name === "From") {
      formData.set(name, Moment(value).format("DD/MM/YYYY"));
    } else formData.set(name, value);
    setInternshipInfo({ ...internshipInfo, [name]: value });
    if (!!errors[name])
      setErrors({
        ...errors,
        [name]: null,
      });
  };

  const handleCompressedUpload = (e) => {
    const image = e.target.files[0];
    setInternshipInfo({ ...internshipInfo, Certificate: e.target.value });
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

  //Handling form submission
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
      createInternship(student._id, token, formData)
        .then((data) => {
          if (data?.error) {
            setLoading(false);
            setErrors(data.error);
          } else {
            setLoading(false);
            setInternshipInfo({
              ...internshipInfo,
              "Job Name": "",
              "Organization Name": "",
              Duration: "",
              Location: "",
              From: "",
              Certificate: "",
              To: "",
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
        setInternshipInfo({
          "Job Name": "",
          "Organization Name": "",
          Duration: "",
          Location: "",
          From: "",
          Certificate: "",
          To: "",
          formData: new FormData(),
        });
        setErrors({});
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title className="poppins-font text-center">
          Internships
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row className="open-sans">
            <Col>
              <Form onSubmit={onSubmit} className="p-4">
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="JobTitle" className="mb-3">
                      <Form.Label className="mb-1 ">Job Title</Form.Label>
                      <Form.Control
                        className="py-2"
                        type="text"
                        placeholder="Software Developer"
                        required
                        value={internshipInfo["Job Name"]}
                        onChange={handleChange("Job Name")}
                        isInvalid={!!errors["Job Name"]}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors["Job Name"]}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="OrganizationName" className="mb-3">
                      <Form.Label className="mb-1 ">
                        Organization Name
                      </Form.Label>
                      <Form.Control
                        className="py-2"
                        type="text"
                        placeholder="CISCO"
                        required
                        value={internshipInfo["Organization Name"]}
                        onChange={handleChange("Organization Name")}
                        isInvalid={!!errors["Organization Name"]}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors["Organization Name"]}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6} sm={12}>
                    <Form.Group controlId="Duration" className="mb-3">
                      <Form.Label className="mb-1 ">Duration</Form.Label>
                      <Form.Control
                        className="py-2"
                        type="text"
                        placeholder="1 month"
                        required
                        value={internshipInfo["Duration"]}
                        onChange={handleChange("Duration")}
                        isInvalid={!!errors["Duration"]}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors["Duration"]}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6} sm={12}>
                    <Form.Group controlId="Location" className="mb-3">
                      <Form.Label className="mb-1 ">Location</Form.Label>
                      <Form.Control
                        className="py-2"
                        type="text"
                        placeholder="Chennai"
                        required
                        value={internshipInfo["Location"]}
                        onChange={handleChange("Location")}
                        isInvalid={!!errors["Location"]}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors["Location"]}
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
                        value={internshipInfo["From"]}
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
                        value={internshipInfo["To"]}
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
                    value={internshipInfo["Certificate"]}
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

export default InternshipForm;
