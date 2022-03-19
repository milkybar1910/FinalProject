import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { isAuthenticated } from "../../Auth/helper";
import CertificationForm from "../Components/Certifications/CertificationForm";
import {
  getCourse,
  getInternship,
  getJobInfo,
  getStudentDetails,
  getWorkshop,
} from "../helper/StudentApiCall";
import InternshipCard from "../Components/Internship/InternshipCard";
import InternshipForm from "../Components/Internship/InternshipForm";
import CertificationCard from "../Components/Certifications/CertificationCard";
import WorkshopForm from "../Components/Workshops/WorkshopForm";
import WorkshopCard from "../Components/Workshops/WorkshopCard";
import JobOfferForm from "../Components/Job Offers/JobOfferForm";
import JobOfferCard from "../Components/Job Offers/JobOfferCard";
import HeaderCard from "../Components/Header/HeaderCard";
import Base from "../../Base";
import { getToggleDetails } from "../../Staff/helper/Adminapicalls";

const Profile = () => {
  const [reload, setReload] = useState({
    student: false,
    internship: false,
    workshop: false,
    joboffer: false,
  });

  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState({
    internship: false,
    certification: false,
    workshop: false,
    course: false,
    joboffer: false,
  });

  const [disabled, setDisabled] = useState({
    profile: false,
    internship: false,
    course: false,
    joboffer: false,
    workshop: false,
  });

  const [studentData, setStudentData] = useState([]);
  const [internshipInfo, setInternshipInfo] = useState([]);
  const [workshopInfo, setWorkshopInfo] = useState([]);
  const [courseInfo, setCourseInfo] = useState([]);
  const [jobInfo, setJobInfo] = useState([]);

  const fetchInternshipDetails = (studentID, token) => {
    setLoading(true);
    getInternship(studentID, token)
      .then((data) => {
        setLoading(false);
        setInternshipInfo(data);
      })
      .catch((err) => console.log(err));
  };

  //Workshop details are fetched from DB
  const fetchWorkshopDetails = (studentID, token) => {
    setLoading(true);
    getWorkshop(studentID, token)
      .then((data) => {
        setLoading(false);
        setWorkshopInfo(data);
      })
      .catch((err) => console.log(err));
  };

  //Course details are fetched from DB
  const fetchCourseDetails = (studentID, token) => {
    setLoading(true);
    getCourse(studentID, token)
      .then((data) => {
        setLoading(false);
        setCourseInfo(data);
      })
      .catch((err) => console.log(err));
  };

  //Job letter details are fetched from DB
  const fetchJobLetterDetails = (studentID, token) => {
    setLoading(true);
    getJobInfo(studentID, token)
      .then((data) => {
        setLoading(false);
        setJobInfo(data);
      })
      .catch((err) => console.log(err));
  };

  //Students details are fetched from DB
  const fetchStudentDetails = (studentID, token) => {
    setLoading(true);
    getStudentDetails(studentID, token)
      .then((data) => {
        setLoading(false);
        if (data?.error) {
          console.log(data.error);
        } else {
          setStudentData(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const { student, token } = isAuthenticated();
    fetchStudentDetails(student._id, token);

    return () => {
      setStudentData([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload.student]);

  useEffect(() => {
    const { student, token } = isAuthenticated();
    fetchInternshipDetails(student._id, token);

    return () => {
      setInternshipInfo([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload.internship]);

  useEffect(() => {
    const { student, token } = isAuthenticated();
    fetchWorkshopDetails(student._id, token);
    return () => {
      setWorkshopInfo([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload.workshop]);

  useEffect(() => {
    const { student, token } = isAuthenticated();
    fetchCourseDetails(student._id, token);
    return () => {
      setCourseInfo([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload.course]);

  useEffect(() => {
    const { student, token } = isAuthenticated();
    fetchJobLetterDetails(student._id, token);

    return () => setJobInfo([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload.joboffer]);

  useEffect(() => {
    const abortCtrl = new AbortController();
    const opts = { signal: abortCtrl.signal };
    getToggleDetails(opts)
      .then((data) => {
        Object.keys(data).forEach(function (key) {
          setDisabled({
            ...disabled,
            course: !data["course"],
            internship: !data["internship"],
            workshop: !data["workshop"],
            joboffer: !data["joboffer"],
            profile: !data["profile"],
          });
        });
      })

      .catch((err) => console.log(err));
    return () => abortCtrl.abort();
  }, []);

  return (
    <Base>
      <Container fluid="lg">
        <Row>
          <Col>
            <div className="text-body poppins-font">
              <Card className="rounded my-4 m-0 p-0">
                <Card.Body className="m-0 p-0">
                  <HeaderCard
                    student={studentData}
                    setStudentData={setStudentData}
                    disabled={disabled["profile"]}
                    reloadStudent={() =>
                      setReload({
                        ...reload,
                        student: !reload["student"],
                      })
                    }
                  />
                </Card.Body>
              </Card>
              <Card className="rounded my-4">
                <Card.Body>
                  <p className="fs-4 m-0">Internships</p>
                  <button
                    className="btn btn-link text-decoration-underline text-primary m-0 p-0"
                    onClick={() =>
                      setToggle({
                        ...toggle,
                        internship: !toggle.internship,
                      })
                    }
                    disabled={disabled["internship"]}
                  >
                    +Add Internship
                  </button>
                  <InternshipForm
                    show={toggle.internship}
                    onHide={() => {
                      setToggle({
                        ...toggle,
                        internship: !toggle.internship,
                      });
                      return setReload({
                        ...reload,
                        internship: !reload.internship,
                      });
                    }}
                  />
                  {internshipInfo.map((internship, index) => (
                    <InternshipCard
                      key={index}
                      internship={internship}
                      onReload={() =>
                        setReload({
                          ...reload,
                          internship: !reload.internship,
                        })
                      }
                    />
                  ))}
                </Card.Body>
              </Card>
              <Card className="rounded my-4 ">
                <Card.Body>
                  <p className="fs-4 m-0">Certifications</p>
                  <button
                    className="btn btn-link text-decoration-underline text-primary m-0 p-0"
                    onClick={() =>
                      setToggle({
                        ...toggle,
                        certification: !toggle.certification,
                      })
                    }
                    disabled={disabled["course"]}
                  >
                    +Add Certification
                  </button>
                  <CertificationForm
                    show={toggle.certification}
                    onHide={() => {
                      setToggle({
                        ...toggle,
                        certification: !toggle.certification,
                      });
                      return setReload({
                        ...reload,
                        course: !reload.course,
                      });
                    }}
                  />
                  {courseInfo.map((course, index) => (
                    <CertificationCard
                      key={index}
                      course={course}
                      onReload={() =>
                        setReload({
                          ...reload,
                          course: !reload.course,
                        })
                      }
                    />
                  ))}
                </Card.Body>
              </Card>
              <Card className="rounded my-4">
                <Card.Body>
                  <p className="fs-4 m-0">Workshops</p>
                  <button
                    className="btn btn-link text-decoration-underline text-primary m-0 p-0"
                    onClick={() =>
                      setToggle({
                        ...toggle,
                        workshop: !toggle.workshop,
                      })
                    }
                    disabled={disabled["workshop"]}
                  >
                    +Add Workshop
                  </button>
                  <WorkshopForm
                    show={toggle.workshop}
                    onHide={() => {
                      setToggle({
                        ...toggle,
                        workshop: !toggle.workshop,
                      });
                      return setReload({
                        ...reload,
                        workshop: !reload.workshop,
                      });
                    }}
                  />
                  {workshopInfo.map((workshop, index) => (
                    <WorkshopCard
                      key={index}
                      workshop={workshop}
                      onReload={() =>
                        setReload({
                          ...reload,
                          workshop: !reload.workshop,
                        })
                      }
                    />
                  ))}
                </Card.Body>
              </Card>
              <Card className="rounded my-4 mb-5">
                <Card.Body>
                  <p className="fs-4 m-0">Job Offers</p>
                  <button
                    className="btn btn-link text-decoration-underline text-primary m-0 p-0"
                    onClick={() =>
                      setToggle({
                        ...toggle,
                        joboffer: !toggle.joboffer,
                      })
                    }
                    disabled={disabled["joboffer"]}
                  >
                    +Add Job Offer
                  </button>
                  <JobOfferForm
                    show={toggle.joboffer}
                    onHide={() => {
                      setToggle({
                        ...toggle,
                        joboffer: !toggle.joboffer,
                      });
                      return setReload({
                        ...reload,
                        joboffer: !reload.joboffer,
                      });
                    }}
                  />
                  {jobInfo.map((jobOffer, index) => (
                    <JobOfferCard
                      key={index}
                      jobOffer={jobOffer}
                      onReload={() =>
                        setReload({
                          ...reload,
                          joboffer: !reload.joboffer,
                        })
                      }
                    />
                  ))}
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default Profile;
