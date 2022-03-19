import React, { useState } from "react";
import { Nav, Modal, NavDropdown } from "react-bootstrap";
import AddressInfo from "./Subcomponents/AddressInfo";
import ArrearsInfo from "./Subcomponents/ArrearsInfo";
import CollegeInfo from "./Subcomponents/CollegeInfo";
import ContactInfo from "./Subcomponents/ContactInfo";
import DiplomaInfo from "./Subcomponents/DiplomaInfo";
import FatherInfo from "./Subcomponents/FatherInfo";
import GovtDetailsInfo from "./Subcomponents/GovtDetailsInfo";
import MotherInfo from "./Subcomponents/MotherInfo";
import OtherInfo from "./Subcomponents/OtherInfo";
import SemesterInfo from "./Subcomponents/SemesterInfo";
import TenthInfo from "./Subcomponents/TenthInfo";
import TwelfthInfo from "./Subcomponents/TwelfthInfo";
import "../../../style.css";
import { updateStudentProfile } from "../../helper/StudentApiCall";
import { isAuthenticated } from "../../../Auth/helper";
const StudentInfo = ({ show, onHide, student, setStudentData }) => {
  const data = isAuthenticated();
  const id = data.student._id;
  const token = data.token;

  const [next, setNext] = useState(0);

  const handleNext = () => {
    setNext(next + 1);
  };

  const handlePrev = () => {
    setNext(next - 1);
  };

  const OnEditSubmission = () => {
    updateStudentProfile(id, token, student)
      .then((data) => {
        setNext(0);
        return onHide();
      })
      .catch((err) => console.log(err));
  };

  const component = [
    <CollegeInfo
      handleNext={handleNext}
      handlePrev={handlePrev}
      student={student}
      setStudentData={setStudentData}
    />,
    <TenthInfo
      handleNext={handleNext}
      handlePrev={handlePrev}
      student={student}
      setStudentData={setStudentData}
    />,
    <TwelfthInfo
      handleNext={handleNext}
      handlePrev={handlePrev}
      student={student}
      setStudentData={setStudentData}
    />,
    <DiplomaInfo
      handleNext={handleNext}
      handlePrev={handlePrev}
      student={student}
      setStudentData={setStudentData}
    />,
    <SemesterInfo
      handleNext={handleNext}
      handlePrev={handlePrev}
      student={student}
      setStudentData={setStudentData}
    />,
    <ArrearsInfo
      handleNext={handleNext}
      handlePrev={handlePrev}
      student={student}
      setStudentData={setStudentData}
    />,
    <ContactInfo
      handleNext={handleNext}
      handlePrev={handlePrev}
      student={student}
      setStudentData={setStudentData}
    />,
    <GovtDetailsInfo
      handleNext={handleNext}
      handlePrev={handlePrev}
      student={student}
      setStudentData={setStudentData}
    />,
    <FatherInfo
      handleNext={handleNext}
      handlePrev={handlePrev}
      student={student}
      setStudentData={setStudentData}
    />,
    <MotherInfo
      handleNext={handleNext}
      handlePrev={handlePrev}
      student={student}
      setStudentData={setStudentData}
    />,
    <AddressInfo
      handleNext={handleNext}
      handlePrev={handlePrev}
      student={student}
      setStudentData={setStudentData}
    />,
    <OtherInfo
      onSubmit={OnEditSubmission}
      handlePrev={handlePrev}
      student={student}
      setStudentData={setStudentData}
    />,
  ];

  const title = [
    "College Details",
    "Tenth Details",
    "Twelfth Details",
    "Diploma Details",
    "Semester Details",
    "Arrear Details",
    "Contact Details",
    "Govt Details",
    "Father Details",
    "Mother Details",
    "Address Details",
    "Other Details",
  ];

  return (
    <Modal
      show={show}
      onHide={() => {
        onHide();
        setNext(0);
      }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="poppins-font"
    >
      <Modal.Header closeButton>
        <Modal.Title className="poppins-font text-center">
          Your {title[next]}
        </Modal.Title>
        <Nav>
          <NavDropdown id="collasible-nav-dropdown">
            {title.map((data, index) => (
              <NavDropdown.Item onClick={() => setNext(index)} key={index}>
                {data}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        </Nav>
      </Modal.Header>
      <Modal.Body>
        {component[next]}
        <div className="text-center">
          <button
            className="btn btn-link text-decoration-underline text-primary m-0 p-0"
            onClick={() => OnEditSubmission()}
          >
            Save and exit
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default StudentInfo;
