import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../../../Auth/helper";
import { getBatch } from "../../helper/Adminapicalls";
import axios from "axios";
import { API } from "../../../backend";
import { saveAs } from "file-saver";
import exportFromJSON from "export-from-json";
import { Button, Form } from "react-bootstrap";
import "./Batch.css";

const Batch = () => {
  const { student, token } = isAuthenticated();

  const [percentCompleted, setPercentCompleted] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [errors, setErrors] = useState({});

  const [details, setDetails] = useState({
    Batch: "",
    Data: "",
  });

  const [batch, setBatch] = useState([]);

  const exportType = "csv";

  const findFormErrors = () => {
    const newErrors = {};
    if (
      !details["Batch"] ||
      details["Batch"] === "" ||
      details["Batch"] === "Batch"
    )
      newErrors["Batch"] = "Select any batch";

    if (
      !details["Data"] ||
      details["Data"] === "" ||
      details["Data"] === "Data"
    )
      newErrors["Data"] = "Select any Data";

    return newErrors;
  };

  //handling input
  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setDetails({ ...details, [name]: value });
    if (!!errors[name])
      setErrors({
        ...errors,
        [name]: null,
      });
  };

  const downloadDetails = async (type, year) => {
    setIsDownloading(true);
    await axios({
      url: `${API}/${type}/year/${student._id}/${year}`,
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      responseType: type === "Student" ? "" : "blob",
      onDownloadProgress: (progressEvent) => {
        setPercentCompleted(
          Math.round((progressEvent.loaded * 100) / progressEvent.total)
        ); // you can use this to show user percentage of file downloaded
      },
    }).then(({ data }) => {
      if (type === "Student") {
        let fileName = "PLACEMENT DETAILS";
        exportFromJSON({ data, fileName, exportType });
        setTimeout(() => {
          setPercentCompleted(0);
          setIsDownloading(false);
        }, 500);
      } else {
        saveAs(window.URL.createObjectURL(new Blob([data])), `${type}.zip`);
        setTimeout(() => {
          setPercentCompleted(0);
          setIsDownloading(false);
        }, 500);
      }
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      return downloadDetails(details["Data"], details["Batch"]);
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
    <Form className="container">
      {isDownloading && (
        <div className="progress my-3">
          <div
            className="progress-bar progress-bar-striped progress-bar-animated "
            role="progressbar"
            style={{ width: `${percentCompleted}%` }}
            aria-valuenow={percentCompleted}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      )}
      <Form.Group controlId="Batch" className="mb-3">
        <Form.Select
          className="form-control py-2"
          required
          // value={details["Batch"]}
          isInvalid={!!errors["Batch"]}
          onChange={handleChange("Batch")}
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
      </Form.Group>
      <Form.Group controlId="Data" className="mb-3">
        <Form.Select
          className="form-control py-2"
          required
          isInvalid={!!errors["Data"]}
          onChange={handleChange("Data")}
        >
          <option value={"Data"}>Data</option>
          <option value={"Student"}>Student</option>
          <option value={"Internship"}>Internship</option>
          <option value={"Workshop"}>Workshop</option>
          <option value={"Course"}>Courses</option>
          <option value={"Joboffer"}>Job Offer</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors["Data"]}
        </Form.Control.Feedback>
      </Form.Group>

      <div className="text-center d-grid mb-4">
        <Button variant="primary" onClick={onSubmit}>
          Download
        </Button>
      </div>
    </Form>
  );
};

export default Batch;
