import React, { useState } from "react";
import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";
import "../../../style.css";
import { API } from "../../../backend";
import { removeWorkshop } from "../../helper/StudentApiCall";
import WorkshopView from "./WorkshopView";

const WorkshopCard = ({ workshop, onReload }) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteworkshop = (id) => {
    setLoading(true);
    removeWorkshop(id).then((data) => {
      if (data?.error) {
        setLoading(false);
        alert("Failed to Delete");
      } else {
        setLoading(false);
        onReload();
      }
    });
  };
  return (
    <div className="my-4">
      <Container fluid>
        <Row>
          <Col
            md={2}
            xs={0}
            className="d-none d-md-inline justify-self-center align-self-center "
          >
            <Image
              thumbnail={true}
              src={`${API}/workshop/certificate/${workshop._id}`}
              alt="loading..."
              width={150}
              height={150}
            />
          </Col>

          <Col xs={11} md={10} className="border-bottom align-self-center">
            <Row>
              <Col
                className="pe-0 detailCards"
                as="div"
                onClick={() => setShow(true)}
              >
                <p className="my-0  fw-bold open-sans mt-2">
                  {workshop["Course Name"]}
                </p>
                <p className="m-0 ">{workshop["Organization Name"]}</p>
                <p className="m-0 text-black-50 mb-2">
                  {workshop["From Date"]} - {workshop["To Date"]}
                </p>
              </Col>
              <WorkshopView
                show={show}
                onHide={() => setShow(false)}
                workshop={workshop}
              />
              <Col
                xs={1}
                className="align-self-center "
                as="div"
                onClick={() => deleteworkshop(workshop["_id"])}
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
                  <BsFillTrashFill
                    size={22}
                    color="#495057"
                    style={{
                      cursor: "pointer",
                    }}
                  />
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default WorkshopCard;
