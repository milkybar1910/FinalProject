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
import { createWorkshop } from "../../helper/StudentApiCall";

const WorkshopForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  //Internship Object
  const [workshopInfo, setWorkshopInfo] = useState({
    "Course Name": "",
    "Organization Name": "",
    Duration: "",
    Certificate: "",
    "From Date": "",
    "To Date": "",
    Certificate: "",
    formData: new FormData(),
  });

  const { student, token } = isAuthenticated();

  //Destructing the Object
  const { formData } = workshopInfo;

  const findFormErrors = () => {
    const newErrors = {};

    if (!workshopInfo["Course Name"] || workshopInfo["Course Name"] === "")
      newErrors["Course Name"] = "Provide the workshop name";

    if (
      !workshopInfo["Organization Name"] ||
      workshopInfo["Organization Name"] === ""
    )
      newErrors["Organization Name"] = "Provide the Organization name";

    if (!workshopInfo["Duration"] || workshopInfo["Duration"] === "")
      newErrors["Duration"] = "Provide the duration";

    if (!workshopInfo["From Date"] || workshopInfo["From Date"] === "")
      newErrors["From Date"] = "Provide From date";

    if (!workshopInfo["To Date"] || workshopInfo["To Date"] === "")
      newErrors["To Date"] = "Provide To date";

    if (!workshopInfo["Certificate"] || workshopInfo["Certificate"] === "")
      newErrors["Certificate"] = "Provide the certificate";

    return newErrors;
  };

  //handling input
  const handleChange = (name) => (event) => {
    const value = event.target.value;
    if (name === "To Date" || name === "From Date") {
      formData.set(name, Moment(value).format("DD/MM/YYYY"));
    } else formData.set(name, value);
    setWorkshopInfo({ ...workshopInfo, [name]: value });
    if (!!errors[name])
      setErrors({
        ...errors,
        [name]: null,
      });
  };

  const handleCompressedUpload = (e) => {
    const image = e.target.files[0];
    setWorkshopInfo({ ...workshopInfo, Certificate: e.target.value });
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
      createWorkshop(student._id, token, formData)
        .then((data) => {
          if (data?.error) {
            setLoading(false);
            setErrors(data.error);
          } else {
            setLoading(false);
            setWorkshopInfo({
              ...workshopInfo,
              "Course Name": "",
              "Organization Name": "",
              Duration: "",
              Certificate: "",
              "From Date": "",
              "To Date": "",
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
        setWorkshopInfo({
          "Course Name": "",
          "Organization Name": "",
          Duration: "",
          Certificate: "",
          "From Date": "",
          "To Date": "",
          formData: new FormData(),
        });
        setErrors({});
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title className="poppins-font text-center">
          Workshops
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row className="open-sans">
            <Col>
              <Form onSubmit={onSubmit} className="p-4">
                <Row>
                  <Col>
                    <Form.Group controlId="WorkshopTitle" className="mb-3">
                      <Form.Label className="mb-1 ">Workshop Title</Form.Label>
                      <Form.Control
                        className="py-2"
                        type="text"
                        placeholder="Android Development"
                        required
                        value={workshopInfo["Course Name"]}
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
                    <Form.Group controlId="OrganizationName" className="mb-3">
                      <Form.Label className="mb-1 ">
                        Organization Name
                      </Form.Label>
                      <Form.Control
                        className="py-2"
                        type="text"
                        placeholder="CISCO"
                        required
                        value={workshopInfo["Organization Name"]}
                        onChange={handleChange("Organization Name")}
                        isInvalid={!!errors["Organization Name"]}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors["Organization Name"]}
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
                        value={workshopInfo["Duration"]}
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
                        onChange={handleChange("From Date")}
                        value={workshopInfo["From Date"]}
                        isInvalid={!!errors["From Date"]}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors["From Date"]}
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
                        onChange={handleChange("To Date")}
                        value={workshopInfo["To Date"]}
                        isInvalid={!!errors["To Date"]}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors["To Date"]}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="Certificate" className="mb-3">
                  <Form.Label className="mb-1 ">
                    Certificate
                    <span className="badge text-dark ml-2 pe-2">1MB</span>
                  </Form.Label>
                  <Form.Control
                    className="py-2"
                    type="file"
                    required
                    placeholder="choose a file"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleCompressedUpload}
                    value={workshopInfo["Certificate"]}
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

export default WorkshopForm;
