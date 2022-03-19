import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import "../../../style.css";
import "./Header.css";
import ProfilePhotoChanger from "./ProfilePhotoChanger";
import StudentInfo from "../StudentInfo/StudentInfo";
import {
  getCoverpic,
  getProfilepic,
  isAuthenticated,
} from "../../../Auth/helper";
import { API } from "../../../backend";
import CoverPhotoChanger from "./CoverPhotoChanger";

const HeaderCard = ({ student, setStudentData, reloadStudent, disabled }) => {
  const data = isAuthenticated();
  let ID = data.student._id;
  const PROFILEPICURL = `${API}/student/profilephoto/${ID}`;
  const COVERPICURL = `${API}/student/coverphoto/${ID}`;

  const [toggle, setToggle] = useState({
    profile: false,
  });
  const [changePic, setChangePic] = useState({
    coverPhoto: false,
    profilePhoto: false,
  });

  const [defaultCoverPicView, setDefaultCoverPicView] = useState(false);
  const [defaultProfilePicView, setDefaultProfilePicView] = useState(false);

  const fetchCoverPicDetails = (id) => {
    return getCoverpic(id).then((data) => {
      if (data?.error) {
        setDefaultCoverPicView(true);
      } else {
        setDefaultCoverPicView(false);
      }
    });
  };

  const fetchProfilePicDetails = (id) => {
    getProfilepic(id).then((data) => {
      if (data?.error) {
        setDefaultProfilePicView(true);
      } else {
        setDefaultProfilePicView(false);
      }
    });
  };

  useEffect(() => {
    const data = isAuthenticated();
    fetchProfilePicDetails(data.student._id);
  }, [changePic["profilePhoto"]]);

  useEffect(() => {
    const data = isAuthenticated();
    fetchCoverPicDetails(data.student._id);
  }, [changePic["coverPhoto"]]);

  return (
    <Container className="mh-100 m-0 p-0">
      <div className="cover-img-container ">
        <Image
          key={Date.now()}
          rounded={true}
          src={
            defaultCoverPicView
              ? require("../../../assets/cover.jpg")
              : COVERPICURL
          }
          alt="loading..."
          className="coverphoto mb-2"
          onClick={() =>
            setChangePic({
              ...changePic,
              coverPhoto: true,
            })
          }
        />
        <CoverPhotoChanger
          COVERPICURL={COVERPICURL}
          defaultView={defaultCoverPicView}
          show={changePic["coverPhoto"]}
          onHide={() => {
            return setChangePic({
              ...changePic,
              coverPhoto: false,
            });
          }}
        />
        <Image
          src={
            defaultProfilePicView
              ? require("../../../assets/defaultProPic.jpg")
              : PROFILEPICURL + `?${Date.now()}`
          }
          alt="loading..."
          roundedCircle={true}
          className="profilepic"
          onClick={() => {
            setChangePic({
              ...changePic,
              profilePhoto: true,
            });
          }}
        />

        <ProfilePhotoChanger
          PROFILEPICURL={PROFILEPICURL}
          defaultView={defaultProfilePicView}
          show={changePic["profilePhoto"]}
          onHide={() => {
            return setChangePic({
              ...changePic,
              profilePhoto: false,
            });
          }}
        />
      </div>
      <Container className="mt-5 mx-1 mb-2">
        <p className="text-capitalize poppins-font fs-3 m-0">
          {student["Full Name"] ? student["Full Name"] : "Default User"}
        </p>
        <p className="fs-6 m-0 poppins-font">{student["Register Number"]} </p>
        <p className="fs-6 m-0 poppins-font">{student["Year Of Admission"]} </p>
        <button
          className="btn btn-link text-decoration-underline text-primary m-0 p-0"
          onClick={() =>
            setToggle({
              ...toggle,
              profile: !toggle.profile,
            })
          }
          disabled={disabled}
        >
          Edit Profile
        </button>
        <StudentInfo
          student={student}
          show={toggle.profile}
          setStudentData={setStudentData}
          onHide={() => {
            setToggle({
              ...toggle,
              profile: !toggle.profile,
            });
            return reloadStudent();
          }}
        />
      </Container>
    </Container>
  );
};

export default HeaderCard;
