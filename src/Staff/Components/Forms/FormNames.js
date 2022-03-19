import exportFromJSON from "export-from-json";
import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { BsDownload } from "react-icons/bs";
import { FaFileDownload, FaRegTrashAlt } from "react-icons/fa";
import NoNotification from "../../../assets/NoNotification";
import { isAuthenticated } from "../../../Auth/helper";
import {
  deleteForms,
  getFormsNameInAdmin,
  searchForm,
} from "../../helper/Adminapicalls";

const FormNames = (props) => {
  const { student, token } = isAuthenticated();
  const [reload, setReload] = useState(false);
  const [formDetails, setFormDetails] = useState([]);

  const exportType = "csv";

  const formDownload = (id, year, formName) => {
    searchForm(id, year).then((data) => {
      let fileName = formName;
      exportFromJSON({ data, fileName, exportType });
    });
  };

  const deleteForm = (id, year) => {
    deleteForms(id, year).then((data) => {
      if (data?.error) {
        console.log(data.error);
      } else {
        console.log("Sus");
        setReload(!reload);
      }
    });
  };

  useEffect(() => {
    let mounted = true;
    getFormsNameInAdmin()
      .then((data) => {
        if (!data) {
          console.log("error");
        } else {
          if (mounted) setFormDetails(data.result);
        }
      })
      .catch((err) => console.log(err));
    return () => (mounted = false);
  }, [reload]);
  useEffect(() => {
    let mounted = true;
    getFormsNameInAdmin()
      .then((data) => {
        if (!data) {
          console.log("error");
        } else {
          if (mounted) setFormDetails(data.result);
        }
      })
      .catch((err) => console.log(err));
    return () => (mounted = false);
  }, [props.reRender]);

  return (
    <Container>
      {formDetails.length !== 0 ? (
        formDetails.map((data) => (
          <Row className="my-3 align-items-center" key={data._id}>
            <Col>
              <p className="text-capitalize fs-6  my-auto">
                {data["Form Name"]}
              </p>
            </Col>
            <Col>
              <Button
                variant="outline-primary"
                className="mx-2 px-2"
                onClick={() =>
                  formDownload(data._id, data.Batch, data["Form Name"])
                }
              >
                <BsDownload />
              </Button>

              <Button
                variant="outline-danger"
                className="m-0 px-2"
                onClick={() => deleteForm(data._id, data.Batch)}
              >
                <FaRegTrashAlt />
              </Button>
            </Col>
          </Row>
        ))
      ) : (
        <div className="text-center mb-3">
          <img
            src={require("../../../assets/NoNotification.png")}
            alt=""
            className="img-fluid"
          />
          No forms posted
        </div>
      )}
    </Container>
  );
};

export default FormNames;
