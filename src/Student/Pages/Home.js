import React, { useState } from "react";
import Base from "../../Base";
import Blogs from "../Components/Blogs/Blogs";
import { Card, Col, Container, Row, Modal } from "react-bootstrap";
import { isAuthenticated } from "../../Auth/helper";
import { BsFillPencilFill } from "react-icons/bs";
import Notification from "./Notification";
import EditorPage from "./Editor";
const Home = () => {
  const [show, setShow] = useState({
    editor: false,
  });

  const { student, token } = isAuthenticated();
  let data = [
    {
      id: 1,
      blog: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptatum ipsum voluptates magnam molestiae? Ipsam modi ut molestiae itaque soluta, dolorum magnam quis nihil fugit. Sunt nulla iure fugit cupiditate, nihil ipsum et quisquam aperiam consectetur sint adipisci tempore nisi magni deleniti placeat porro tenetur vitae delectus reiciendis eos vero doloremque temporibus earum. Neque iure fugit hic ducimus, dignissimos exercitationem odit? Unde esse, accusantium exercitationem earum vitae nobis inventore ut fugiat laudantium? Ea aliquam cum sit non sint sed error delectus eum? Obcaecati quam voluptatem consequuntur quisquam unde quaerat soluta, atque corporis magnam dolorum harum exercitationem! Itaque dolores perspiciatis quidem?",
      user: "lorem10",
      batch: "2018",
      regno: "312418205087",
      studentId: student._id,
      timestamp: "Jan 6, 2021",
    },
    {
      id: 2,
      blog: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptatum ipsum voluptates magnam molestiae? Ipsam modi ut molestiae itaque soluta, dolorum magnam quis nihil fugit. Sunt nulla iure fugit cupiditate, nihil ipsum et quisquam aperiam consectetur sint adipisci tempore nisi magni deleniti placeat porro tenetur vitae delectus reiciendis eos vero doloremque temporibus earum. Neque iure fugit hic ducimus, dignissimos exercitationem odit? Unde esse, accusantium exercitationem earum vitae nobis inventore ut fugiat laudantium? Ea aliquam cum sit non sint sed error delectus eum? Obcaecati quam voluptatem consequuntur quisquam unde quaerat soluta, atque corporis magnam dolorum harum exercitationem! Itaque dolores perspiciatis quidem?",
      user: "lorem10",
      batch: "2018",
      regno: "312418205087",
      studentId: student._id,
      timestamp: "Jan 6, 2021",
    },
    {
      id: 3,
      blog: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptatum ipsum voluptates magnam molestiae? Ipsam modi ut molestiae itaque soluta, dolorum magnam quis nihil fugit. Sunt nulla iure fugit cupiditate, nihil ipsum et quisquam aperiam consectetur sint adipisci tempore nisi magni deleniti placeat porro tenetur vitae delectus reiciendis eos vero doloremque temporibus earum. Neque iure fugit hic ducimus, dignissimos exercitationem odit? Unde esse, accusantium exercitationem earum vitae nobis inventore ut fugiat laudantium? Ea aliquam cum sit non sint sed error delectus eum? Obcaecati quam voluptatem consequuntur quisquam unde quaerat soluta, atque corporis magnam dolorum harum exercitationem! Itaque dolores perspiciatis quidem?",
      user: "lorem10",
      batch: "2018",
      regno: "312418205087",
      studentId: student._id,
      timestamp: "Jan 6, 2021",
    },
    {
      id: 4,
      blog: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptatum ipsum voluptates magnam molestiae? Ipsam modi ut molestiae itaque soluta, dolorum magnam quis nihil fugit. Sunt nulla iure fugit cupiditate, nihil ipsum et quisquam aperiam consectetur sint adipisci tempore nisi magni deleniti placeat porro tenetur vitae delectus reiciendis eos vero doloremque temporibus earum. Neque iure fugit hic ducimus, dignissimos exercitationem odit? Unde esse, accusantium exercitationem earum vitae nobis inventore ut fugiat laudantium? Ea aliquam cum sit non sint sed error delectus eum? Obcaecati quam voluptatem consequuntur quisquam unde quaerat soluta, atque corporis magnam dolorum harum exercitationem! Itaque dolores perspiciatis quidem?",
      user: "lorem10",
      batch: "2018",
      regno: "312418205087",
      studentId: student._id,
      timestamp: "Jan 6, 2021",
    },
    {
      id: 5,
      blog: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptatum ipsum voluptates magnam molestiae? Ipsam modi ut molestiae itaque soluta, dolorum magnam quis nihil fugit. Sunt nulla iure fugit cupiditate, nihil ipsum et quisquam aperiam consectetur sint adipisci tempore nisi magni deleniti placeat porro tenetur vitae delectus reiciendis eos vero doloremque temporibus earum. Neque iure fugit hic ducimus, dignissimos exercitationem odit? Unde esse, accusantium exercitationem earum vitae nobis inventore ut fugiat laudantium? Ea aliquam cum sit non sint sed error delectus eum? Obcaecati quam voluptatem consequuntur quisquam unde quaerat soluta, atque corporis magnam dolorum harum exercitationem! Itaque dolores perspiciatis quidem?",
      user: "lorem10",
      batch: "2018",
      regno: "312418205087",
      studentId: student._id,
      timestamp: "Jan 6, 2021",
    },
  ];
  return (
    <Base>
      <Container fluid="lg">
        <Row>
          <Col lg={9}>
            <Card className="border-0">
              <Card.Body className="px-0">
                <div
                  className="py-4 rounded border ps-3 bg-light"
                  onClick={() => {
                    setShow({
                      ...show,
                      editor: !show["editor"],
                    });
                  }}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  {/* {show["editor"] && <Navigate to="/editor" />} */}
                  <BsFillPencilFill size={25} className="ms-4  mb-2" />
                  <p className="d-inline-block poppins-font fs-5 ms-4 mb-0 fw-bold ">
                    Write an article{" "}
                  </p>
                </div>
                {/* <Editor /> */}
              </Card.Body>
            </Card>
            <Modal
              className=""
              show={show["editor"]}
              onHide={() => {
                setShow({
                  ...show,
                  editor: !show["editor"],
                });
              }}
              size="lg"
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton className="m-0">
                <Modal.Title>Modal title</Modal.Title>
              </Modal.Header>
              <Modal.Body className="m-0">
                <EditorPage />
              </Modal.Body>
            </Modal>
            <Card className="border-0">
              <Card.Body className="px-0">
                {data.map((blog, index) => (
                  <Blogs blog={blog} key={index} />
                ))}
              </Card.Body>
            </Card>
          </Col>
          <Col
            className="d-none border mt-3  d-lg-block p-0 poppins-font vh-100"
            lg={3}
          >
            <Card className="border-0 mb-4">
              <Card.Body className="p-0">
                <Card.Title className="fw-bold text-center my-4 poppins-font">
                  Notification
                </Card.Title>
                <Notification />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default Home;
