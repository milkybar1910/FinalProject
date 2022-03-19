import React, { useEffect, useState } from "react";
import Base from "../../Base";
import Blogs from "../Components/Blogs/Blogs";
import { Card, Col, Container, Row, Modal } from "react-bootstrap";
import { isAuthenticated } from "../../Auth/helper";
import { BsFillPencilFill } from "react-icons/bs";
import Notification from "./Notification";
import EditorPage from "./Editor";
import { createBlog, getAllBlogs } from "../helper/StudentApiCall";

const Home = () => {
  const [show, setShow] = useState({
    editor: false,
  });

  const [blogDetails, setBlogDetails] = useState({
    Title: "",
    Content: "",
    user: "",
  });

  const postBlog = (e) => {
    e.preventDefault();
    if (blogDetails.Title === "" || blogDetails.Content === "") {
      alert("PROVIDE title");
      return;
    }
    setBlogDetails({ ...blogDetails, user: student._id });
    createBlog(student._id, blogDetails)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  const getContent = (content) => {
    setBlogDetails({ ...blogDetails, Content: content });
  };

  const [renderBlogs, setRenderBlogs] = useState([]);

  useEffect(() => {
    getAllBlogs()
      .then((data) => {
        setRenderBlogs(data.result);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

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
                  <BsFillPencilFill size={25} className="ms-4  mb-2" />
                  <p className="d-inline-block poppins-font fs-5 ms-4 mb-0 fw-bold ">
                    Write an article{" "}
                  </p>
                </div>
              </Card.Body>
            </Card>
            <Modal
              className="poppins-font"
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
                <Modal.Title>Create Articles</Modal.Title>
              </Modal.Header>
              <Modal.Body className="m-0">
                <div class="mb-3  row container pe-0">
                  <label
                    for="title"
                    class="col-sm-1 p-0 align-self-center  col-form-label"
                  >
                    Title
                  </label>
                  <div class="col-sm-11 p-0">
                    <input
                      type="text"
                      class="form-control"
                      id="title"
                      value={blogDetails.Title}
                      onChange={(e) => {
                        setBlogDetails({
                          ...blogDetails,
                          Title: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <EditorPage getContent={getContent} />
                <button onClick={postBlog}>POST</button>
              </Modal.Body>
            </Modal>
            <Card className="border-0">
              <Card.Body className="px-0">
                {renderBlogs.map((blog, index) => (
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
