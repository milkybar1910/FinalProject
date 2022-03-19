import React, { useState } from "react";
import { Button, CloseButton, Form, Image, Modal } from "react-bootstrap";
import {
  BsFillCameraFill,
  BsFillCloudUploadFill,
  BsFillTrashFill,
} from "react-icons/bs";
import Compressor from "compressorjs";
import { isAuthenticated, updateCoverPhoto } from "../../../Auth/helper";
import "./Header.css";
const CoverPhotoChanger = ({ show, onHide, defaultView, COVERPICURL }) => {
  const [picture, setPicture] = useState({
    photo: "",
    formData: new FormData(),
  });
  const [view, setView] = useState(false);
  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(true);
  const { student, token } = isAuthenticated();

  const onSubmit = (event) => {
    event.preventDefault();
    updateCoverPhoto(student._id, picture["formData"]);
    setPicture({
      photo: "",
      formData: new FormData(),
    });
    setView(false);
    setLoading(true);
    onHide();
  };

  const handleCompressedUpload = (e) => {
    setPicture({ ...picture, photo: e.target.value });
    const image = e.target.files[0];
    if (image.size > 1048576)
      setErrors({
        ...errors,
        Picture: "Picture size too big!",
      });
    else if (
      image.type !== "image/png" &&
      image.type !== "image/jpg" &&
      image.type !== "image/jpeg"
    )
      setErrors({
        ...errors,
        Picture: "File format not supported",
      });
    else
      new Compressor(image, {
        quality: 0.5,
        success: (compressedResult) => {
          setView(URL.createObjectURL(compressedResult));
          picture["formData"].set("CoverPhoto", compressedResult);
        },
      });
    setLoading(false);

    if (!!errors["Picture"])
      setErrors({
        ...errors,
        Picture: null,
      });
  };

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => {
        setPicture({
          photo: "",
          formData: new FormData(),
        });
        setView(false);
        setLoading(true);
        onHide();
      }}
      className="profileModal text-white"
    >
      <Modal.Header>
        <Modal.Title className="poppins-font fs-4">Cover Picture</Modal.Title>
        <CloseButton
          variant="white"
          onClick={() => {
            setPicture({
              photo: "",
              formData: new FormData(),
            });
            setView(false);
            setLoading(true);
            onHide();
          }}
        />
      </Modal.Header>
      <Modal.Body className="open-sans ">
        <Image
          src={
            view
              ? view
              : defaultView
              ? require("../../../assets/cover.jpg")
              : COVERPICURL
          }
          alt="loading..."
          width={600}
          className="coverphoto"
        />
      </Modal.Body>
      <hr />
      <Modal.Footer className="mx-3 d-flex flex-direction-row justify-content-center border-0 ">
        <Form.Group controlId="Certificate">
          <Form.Label className="mb-0 custom-file-upload text-center btn btn-primary">
            <BsFillCameraFill size={25} className="mb-1" />
            <span className="ms-2">Add Photo</span>
          </Form.Label>

          <Form.Control
            as="input"
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={handleCompressedUpload}
            value={picture["photo"]}
            isInvalid={!!errors["Picture"]}
          />
          <Form.Control.Feedback type="invalid">
            {errors["Picture"]}
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          variant="primary"
          disabled={loading}
          onClick={onSubmit}
          className="text-center"
        >
          <BsFillCloudUploadFill size={25} className="mt-1" />
          <span className="ms-2">Update Photo</span>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CoverPhotoChanger;
