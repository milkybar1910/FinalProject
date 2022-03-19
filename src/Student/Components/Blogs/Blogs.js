import React from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import Avatar from "react-avatar";
import "./Blogs.css";
import moment from "moment";
import draftToHtml from "draftjs-to-html";

const Blogs = ({ blog }) => {
  return (
    <Container fluid className="p-0 mb-3">
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
              </div>
              <p className="text-capitalize poppins-font fs-4 fw-bold">
                {blog["Title"]}
              </p>
              <p className="poppins-font blog-mini-description m-0">
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
    </Container>
  );
};

export default Blogs;
