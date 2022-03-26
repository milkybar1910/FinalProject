import React, { useEffect, useState } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import Avatar from "react-avatar";
import "./Blogs.css";
import moment from "moment";
import draftToHtml from "draftjs-to-html";
import { Modal } from "react-bootstrap";
import { BiLike, BiCommentDetail, BiBookmark } from "react-icons/bi";
import axios from "axios";

const Blogs = ({ blog }) => {
  const [modelView, setModelView] = useState(false);

  const toggleView = () => {
    setModelView(!modelView);
  };

  useEffect(() => {
    axios
      .get("http://192.168.141.88:5000/predict/")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Container fluid className="p-0 mb-3" onClick={toggleView}>
        <BlogView blog={blog} />
      </Container>

      {/* <Modal
        className="poppins-font"
        show={modelView}
        onHide={toggleView}
        size="lg"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className="mx-0 border-0 mt-2"></Modal.Header>
        <Modal.Body className="m-0 ">
          <Card className="p-2">
            <Card.Body>
              <Row>
                <Col>
                  <div className="d-flex flex-direction-row mb-3">
                    <div className="align-self-center">
                      <Avatar
                        name="SS SS"
                        color="#0d6efd"
                        round={true}
                        facebookId="100008343750912"
                        size="50"
                      />
                    </div>
                    <div className="ms-3">
                      <p className="poppins-font m-0 fs-5 fw-bold">
                        {blog["Name"]}
                      </p>
                      <p className="poppins-font m-0 fs-6">
                        posted on {moment(blog["createdAt"]).format("LL")}
                      </p>
                    </div>
                    <div className="ms-auto d-flex">
                      <div className="me-4">
                        <BiLike size={25} />
                        <span className="fw-bold ms-1">12</span>
                      </div>
                      {/* <div className="me-4">
                        <BiCommentDetail size={25} />
                        <span className="fw-bold ms-1">12</span>
                      </div> 
                      <div className="me-4">
                        <BiBookmark size={25} />
                      </div>
                    </div>
                  </div>
                  <p className="text-capitalize poppins-font fs-4 fw-bold">
                    {blog["Title"]}
                  </p>
                  <p className="poppins-font m-0">
                    <div
                      className="m-0"
                      dangerouslySetInnerHTML={{
                        __html: draftToHtml(JSON.parse(blog["Content"])),
                      }}
                    />
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal> */}
    </>
  );
};

const BlogView = ({ blog }) => {
  return (
    <Card className="p-2">
      <Card.Body>
        <Row>
          <Col>
            <div className="d-flex flex-direction-row mb-3 poppins-font">
              <div className="align-self-center">
                <Avatar
                  name="SS SS"
                  color="#0d6efd"
                  round={true}
                  facebookId="100008343750912"
                  size="50"
                />
              </div>
              <div className="ms-3">
                <p className="poppins-font m-0 fs-5 fw-bold">{blog["title"]}</p>
                <p className="poppins-font m-0 fs-6">
                  posted on {moment(blog["timestamp"]).format("LL")}
                </p>
              </div>
              <div className="ms-auto d-flex">
                <div className="me-4">
                  <BiLike size={25} />
                  <span className="fw-bold ms-1">12</span>
                </div>
                <div className="me-4">
                  <BiCommentDetail size={25} />
                  <span className="fw-bold ms-1">12</span>
                </div>
                <div className="me-4">
                  <BiBookmark size={25} />
                  <span className="fw-bold ms-1">12</span>
                </div>
              </div>
            </div>
            <p className="text-capitalize poppins-font fs-4 fw-bold">
              {blog["Title"]}
            </p>
            <p className="poppins-font blog-mini-description m-0">
              {/* <div
                className="m-0"
                dangerouslySetInnerHTML={{
                  __html: draftToHtml(JSON.parse(blog["Content"])),
                }}
              /> */}
              {blog["text"]}
            </p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Blogs;
