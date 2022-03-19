import React, { Fragment, useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { isAuthenticated } from "../../Auth/helper";
import Menu from "../../template/Menu";
import NotificationWrapper from "../Components/Notifications/NotificationWrapper";
import {
  getNotifications,
  getStudentForNotifications,
} from "../helper/StudentApiCall";

const Notification = () => {
  const [formDetails, setFormDetails] = useState([]);
  const [flip, setFlip] = useState("reload");

  useEffect(() => {
    const { student, token } = isAuthenticated();
    let mounted = true;
    const getNotified = (studentPropertiesColumn) => {
      return getNotifications(student["Year Of Admission"])
        .then((data) => {
          let result = data.result.filter((data) => {
            return !studentPropertiesColumn.includes(data._id);
          });
          if (mounted) {
            return setFormDetails(result);
          }
        })
        .catch((err) => console.log(err));
    };

    async function StudentNotification() {
      let studentCols = await getStudentForNotifications(
        student._id,
        token
      ).then((data) => data);
      return getNotified(studentCols);
    }
    StudentNotification();
  }, [flip]);

  const handleReload = () =>
    flip === "reload" ? setFlip("reload1") : setFlip("reload");
  return (
    <>
      <Menu className="d-lg-none" />
      {formDetails.length !== 0 ? (
        formDetails.map((data, index) => (
          <Fragment key={index}>
            <NotificationWrapper
              formDetails={[data]}
              onReloadForm={handleReload}
            />
          </Fragment>
        ))
      ) : (
        <>
          <Image
            className="img-fluid"
            src={require("../../assets/NoNotification.png")}
          />
          <p className="text-center fs-6">No Notifications Found</p>
        </>
      )}
    </>
  );
};

export default Notification;
