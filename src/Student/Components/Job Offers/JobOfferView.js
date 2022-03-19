import React from "react";
import { Image, Modal } from "react-bootstrap";
import { API } from "../../../backend";

const JobOfferView = ({ jobOffer, show, onHide }) => {
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title className="poppins-font fs-4">
          {jobOffer["Job Title"]}
          <br />
          <p className="m-0 p-0 text-dark fs-6">
            {jobOffer["Organization Name"]}, {jobOffer["Location"]}
          </p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="open-sans align-self-center">
        <Image
          thumbnail={true}
          src={`${API}/joboffer/certificate/${jobOffer._id}`}
          alt="loading..."
        />
      </Modal.Body>
    </Modal>
  );
};

export default JobOfferView;
