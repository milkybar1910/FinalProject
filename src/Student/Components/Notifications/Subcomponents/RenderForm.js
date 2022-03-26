import React, { useEffect, useState } from "react";
import { Container, Modal, Row, Col, Button, Form } from "react-bootstrap";
import TextField from "./TextField";
import SelectField from "./SelectField";
import { DynamicUpdateStudent } from "../../../helper/StudentApiCall";
import { isAuthenticated } from "../../../../Auth/helper";
import RangeField from "./RangeField";

const RenderForm = (props) => {
  const { student } = isAuthenticated();
  const [forms, setForms] = useState({
    "Form Name": props.formname,
    _id: props.formid,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    DynamicUpdateStudent(student._id, forms)
      .then((data) => {
        props.onReload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal
      show={props.show}
      onHide={() => props.onHide()}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="poppins-font text-center">
          {props.formname}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Row className="open-sans">
            <Col>
              <Form>
                <Row>
                  {props.details.map((data, index) => {
                    if (data.fieldName === "Text")
                      return (
                        <Col md={6} key={index}>
                          <TextField
                            details={data.details}
                            setForms={setForms}
                            forms={forms}
                          />
                        </Col>
                      );
                    else if (data.fieldName === "Select")
                      return (
                        <Col md={6} key={index}>
                          <SelectField
                            details={data.details}
                            setForms={setForms}
                            forms={forms}
                          />
                        </Col>
                      );
                    else if (data.fieldName === "Range")
                      return (
                        <Col md={6} key={index}>
                          <RangeField
                            details={data.details}
                            setForms={setForms}
                            forms={forms}
                            index={index}
                          />
                        </Col>
                      );
                  })}
                </Row>

                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit" onClick={onSubmit}>
                    Upload
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

export default RenderForm;
