import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import RenderForm from "./Subcomponents/RenderForm";

const NotificationWrapper = (props) => {
  const [show, setShow] = useState({});
  const { formDetails } = props;
  useEffect(() => {
    formDetails.map((data, index) => {
      setShow({ ...show, [data["Form Name"]]: false });
    });
  }, []);

  return (
    <div className="poppins-font my-4 my-lg-3">
      {formDetails.map((data, index) => (
        <Fragment key={index}>
          <div
            className="ms-4"
            onClick={() =>
              setShow({
                ...show,
                [data["Form Name"]]: !show[data["Form Name"]],
              })
            }
          >
            <div className="fs-5">{data["Form Name"]}</div>
            <div className="text-muted fs-6">
              ~ posted on {moment(data["createdAt"]).format("ll")}
            </div>
          </div>
          <hr />
          <RenderForm
            details={data["Fields"]}
            show={show[data["Form Name"]]}
            formname={data["Form Name"]}
            formid={data["_id"]}
            onHide={() =>
              setShow({
                ...show,
                [data["Form Name"]]: !show[data["Form Name"]],
              })
            }
            onReload={() => props.onReloadForm()}
          />
        </Fragment>
      ))}
    </div>
  );
};

export default NotificationWrapper;
