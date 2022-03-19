import React, { useState } from "react";
import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";
import "../../../style.css";
import { API } from "../../../backend";
import { removeJob } from "../../helper/StudentApiCall";
import JobOfferView from "./JobOfferView";

const JobOfferCard = ({ jobOffer, onReload }) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteJobOffer = (id) => {
    setLoading(true);
    removeJob(id).then((data) => {
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
              src={`${API}/joboffer/certificate/${jobOffer._id}`}
              alt="loading..."
            />
          </Col>

          <Col xs={11} md={10} className=" border-bottom align-self-center">
            <Row>
              <Col
                className="pe-0 detailCards"
                as="div"
                onClick={() => setShow(true)}
              >
                <p className="my-0  fw-bold open-sans mt-2">
                  {jobOffer["Job Title"]}
                </p>
                <p className="m-0 ">{jobOffer["Organization Name"]}</p>
                <p className="m-0 text-black-50 mb-2">{jobOffer["Location"]}</p>
              </Col>
              <JobOfferView
                show={show}
                onHide={() => setShow(false)}
                jobOffer={jobOffer}
              />
              <Col
                xs={1}
                className="align-self-center "
                as="div"
                onClick={() => deleteJobOffer(jobOffer["_id"])}
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

export default JobOfferCard;
