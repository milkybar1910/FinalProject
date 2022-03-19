import React from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import Avatar from "react-avatar";
import "./Blogs.css";

const Blogs = ({ blog }) => {
  return (
    <Container fluid className="p-0 mb-3">
      <Card className="p-2">
        <Card.Body>
          <Row>
            <Col md={6}>
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
                    Siva Shankar SR
                  </p>
                  <p className="poppins-font m-0 fs-6">
                    posted on{blog["timestamp"]}
                  </p>
                </div>
              </div>
              <p className="text-capitalize poppins-font fs-4 fw-bold">
                Lambda Provisioned Concurrency Times
              </p>
              <p className="poppins-font blog-mini-description">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Aspernatur illum maxime cum culpa modi aliquid reiciendis
                incidunt dolore odit, saepe inventore minus tempore atque fugit
                rerum, magnam libero doloribus? Ipsam commodi qui possimus vel
                cum porro natus accusantium sequi? Minus amet cupiditate,
                voluptates molestiae labore corporis laudantium, repellendus
                aspernatur odio fugit ut, obcaecati laboriosam illum? Ullam
                velit praesentium, animi aut possimus asperiores, temporibus
                unde repellat labore tempore voluptatem iste dolorem illum sequi
                maiores in explicabo sapiente laborum excepturi rem saepe
                suscipit deleniti perspiciatis. Officiis praesentium alias iure
                modi laborum reprehenderit dolor, doloremque ratione perferendis
                tenetur quaerat voluptas esse qui minima?
              </p>
              {/* <div className="d-flex flex-direction-row mt-4">
                <div className="align-items-center justify-content center mx-2">
                  <AiOutlineLike size={30} />
                  <p className="d-inline  text-center poppins-font ms-1 mt-2 fw-bold">
                    8
                  </p>
                </div>
                <div className="align-self-center mx-3">
                  <AiOutlineMessage size={30} className="" />
                  <span className="text-center poppins-font ms-1 fw-bold">
                    Comment
                  </span>
                </div>
              </div> */}
            </Col>
            <Col md={6}>
              <Image
                // thumbnail={true}
                src={
                  // "https://media-exp1.licdn.com/dms/image/C5616AQG9NL8UdLqwoA/profile-displaybackgroundimage-shrink_200_800/0/1623600245937?e=1647475200&v=beta&t=GCB3L2yk7HsTjFWZBAXeQMsjM_JAY7nyaKOKzw20LAA"
                  require("../../../assets/blog.png")
                  // "https://raw.githubusercontent.com/PhantomScript/asset-container/main/developer-portfolio/landingImg.png"
                }
                alt="loading."
                className="img-fluid"
                style={{
                  height: "50vh",
                  width: "100vw",
                }}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Blogs;
