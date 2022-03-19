import React, { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { getToggleDetails, updateToggle } from "../../helper/Adminapicalls";

const FormControl = () => {
  const [toggle, setToggle] = useState({
    profile: false,
    internship: false,
    workshop: false,
    joboffer: false,
    course: false,
  });

  const handleToggleChange = (name, toggleValue) => {
    updateToggle({ [name]: !toggleValue })
      .then((data) => {
        setToggle({
          ...toggle,
          [name]: !toggleValue,
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const abortCtrl = new AbortController();
    const opts = { signal: abortCtrl.signal };
    getToggleDetails(opts)
      .then((data) => {
        Object.keys(data).forEach(function (key) {
          setToggle({
            ...toggle,
            course: data["course"],
            internship: data["internship"],
            workshop: data["workshop"],
            joboffer: data["joboffer"],
            profile: data["profile"],
          });
        });
      })

      .catch((err) => console.log(err));
    return () => abortCtrl.abort();
  }, []);

  return (
    <>
      <div className="text-center p-3">
        <Form.Check
          className="ms-lg-4"
          type="switch"
          id="custom-switch"
          label="Profile"
          onChange={() => handleToggleChange("profile", toggle["profile"])}
          checked={toggle["profile"]}
        />
      </div>
      <div className="text-center p-3">
        <Form.Check
          className="ms-lg-4"
          type="switch"
          id="custom-switch"
          label="Internship"
          checked={toggle["internship"]}
          onChange={() =>
            handleToggleChange("internship", toggle["internship"])
          }
        />
      </div>
      <div className="text-center p-3">
        <Form.Check
          className="ms-lg-4"
          type="switch"
          id="custom-switch"
          label="Workshop"
          checked={toggle["workshop"]}
          onChange={() => handleToggleChange("workshop", toggle["workshop"])}
        />
      </div>
      <div className="text-center p-3">
        <Form.Check
          className="ms-lg-4"
          type="switch"
          id="custom-switch"
          label="Courses"
          checked={toggle["course"]}
          onChange={() => handleToggleChange("course", toggle["course"])}
        />
      </div>
      <div className="text-center p-3">
        <Form.Check
          className="ms-lg-4"
          type="switch"
          id="custom-switch"
          label="Job Offer"
          checked={toggle["joboffer"]}
          onChange={() => handleToggleChange("joboffer", toggle["joboffer"])}
        />
      </div>
    </>
  );
};

export default FormControl;
