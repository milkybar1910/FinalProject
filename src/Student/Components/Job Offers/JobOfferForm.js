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
import { createJob } from "../../helper/StudentApiCall";

const JobOfferForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  //Internship Object
  const [jobOfferInfo, setJobOfferInfo] = useState({
    "Job Title": "",
    "Organization Name": "",
    Salary: "",
    Location: "",
    "Date Of Joining": "",
    "On Campus Or Off Campus": "",
    formData: new FormData(),
  });

  const { student, token } = isAuthenticated();

  //Destructing the Object
  const { formData } = jobOfferInfo;

  const findFormErrors = () => {
    const newErrors = {};

    if (!jobOfferInfo["Job Title"] || jobOfferInfo["Job Title"] === "")
      newErrors["Job Title"] = "Provide your job title";

    if (
      !jobOfferInfo["Organization Name"] ||
      jobOfferInfo["Organization Name"] === ""
    )
      newErrors["Organization Name"] = "Provide your organization name";

    if (!jobOfferInfo["Salary"] || jobOfferInfo["Salary"] === "")
      newErrors["Salary"] = "Provide the salary";
    if (!jobOfferInfo["Location"] || jobOfferInfo["Location"] === "")
      newErrors["Location"] = "Provide the location";

    if (
      !jobOfferInfo["Date Of Joining"] ||
      jobOfferInfo["Date Of Joining"] === ""
    )
      newErrors["Date Of Joining"] = "Provide date of joining";

    if (
      !jobOfferInfo["On Campus Or Off Campus"] ||
      jobOfferInfo["On Campus Or Off Campus"] === ""
    )
      newErrors["On Campus Or Off Campus"] = "Select the appropriate value";

    if (!jobOfferInfo["Certificate"] || jobOfferInfo["Certificate"] === "")
      newErrors["Certificate"] = "Provide the certificate";

    return newErrors;
  };

  //handling input
  const handleChange = (name) => (event) => {
    const value = event.target.value;
    if (name === "Date Of Joining") {
      formData.set(name, Moment(value).format("DD/MM/YYYY"));
    } else formData.set(name, value);

    setJobOfferInfo({ ...jobOfferInfo, [name]: value });
    if (!!errors[name])
      setErrors({
        ...errors,
        [name]: null,
      });
  };

  const handleCompressedUpload = (e) => {
    const image = e.target.files[0];
    setJobOfferInfo({ ...jobOfferInfo, Certificate: e.target.value });
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

  // Handling form submission
  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setLoading(false);
      setErrors(newErrors);
      console.log(newErrors);
    } else {
      formData.set("user", student._id);
      formData.set("Batch", student["Year Of Admission"]);
      formData.set("Register Number", student["Register Number"]);
      createJob(student._id, token, formData)
        .then((data) => {
          if (data?.error) {
            setLoading(false);
            setErrors(data.error);
          } else {
            setLoading(false);
            setJobOfferInfo({
              ...jobOfferInfo,
              "Job Title": "",
              "Organization Name": "",
              Salary: "",
              "Date Of Joining": "",
              "On Campus Or Off Campus": "",
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
      onExit={() =>
        setJobOfferInfo({
          "Job Title": "",
          "Organization Name": "",
          Salary: "",
          "Date Of Joining": "",
          "On Campus Or Off Campus": "",
          Certificate: "",
          formData: new FormData(),
        })
      }
    >
      <Modal.Header closeButton>
        <Modal.Title className="poppins-font text-center">
          Job Offers
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row className="open-sans">
            <Col>
              <Form noValidate onSubmit={onSubmit} className="p-4">
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="JobTitle" className="mb-3">
                      <Form.Label className="mb-1 ">Job Title</Form.Label>
                      <Form.Control
                        className="py-2"
                        type="text"
                        placeholder="Software Developer"
                        required
                        value={jobOfferInfo["Job Title"]}
                        onChange={handleChange("Job Title")}
                        isInvalid={!!errors["Job Title"]}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors["Job Title"]}
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
                        value={jobOfferInfo["Organization Name"]}
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
                    <Form.Group controlId="Salary" className="mb-3">
                      <Form.Label className="mb-1 ">Salary</Form.Label>
                      <Form.Control
                        className="py-2"
                        type="text"
                        placeholder="7L"
                        required
                        value={jobOfferInfo["Salary"]}
                        onChange={handleChange("Salary")}
                        isInvalid={!!errors["Salary"]}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors["Salary"]}
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
                        value={jobOfferInfo["Location"]}
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
                  <Col md={6}>
                    <Form.Group controlId="Data Of Joining" className="mb-3">
                      <Form.Label className="mb-1 ">Data Of Joining</Form.Label>
                      <Form.Control
                        className="py-2"
                        type="date"
                        pattern="\d{2}-\d{2}-\d{2}"
                        required
                        onChange={handleChange("Date Of Joining")}
                        value={jobOfferInfo["Date Of Joining"]}
                        isInvalid={!!errors["Date Of Joining"]}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors["Data Of Joining"]}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group
                      controlId="On Campus Or Off Campus"
                      className="mb-3"
                    >
                      <Form.Label className="mb-1 ">Hiring Method</Form.Label>
                      <Form.Select
                        className="form-control py-2"
                        required
                        onChange={handleChange("On Campus Or Off Campus")}
                        value={jobOfferInfo["On Campus Or Off Campus"]}
                        isInvalid={!!errors["On Campus Or Off Campus"]}
                      >
                        <option value={"On Campus"}>On Campus</option>
                        <option value={"Off Campus"}>Off Campus</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors["On Campus Or Off Campus"]}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="Certificate" className="mb-3">
                  <Form.Label className="mb-1 ">Certificate</Form.Label>
                  <Form.Control
                    className="py-2"
                    type="file"
                    required
                    placeholder="choose a file"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleCompressedUpload}
                    value={jobOfferInfo["Certificate"]}
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

export default JobOfferForm;
