import React, { useEffect, useState } from "react";
import Base from "../../Base";
import Blogs from "../Components/Blogs/Blogs";
import {
  Card,
  Col,
  Container,
  Row,
  Modal,
  Button,
  Spinner,
  Form,
} from "react-bootstrap";
import { isAuthenticated } from "../../Auth/helper";
import { BsFillPencilFill } from "react-icons/bs";
import Notification from "./Notification";
import EditorPage from "./Editor";
import { createBlog, getAllBlogs } from "../helper/StudentApiCall";

const Home = () => {
  const [blogCreateLoading, setBlogCreateLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState({
    editor: false,
  });

  const [blogDetails, setBlogDetails] = useState({
    Title: "",
    Content: "",
    user: "",
  });

  const findFormErrors = () => {
    const newErrors = {};

    if (!blogDetails["Title"] || blogDetails["Title"] === "")
      newErrors["Title"] = "Provide article title";

    return newErrors;
  };

  const postBlog = (e) => {
    e.preventDefault();
    setBlogCreateLoading(true);
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setBlogCreateLoading(false);
      setErrors(newErrors);
    } else {
      setBlogDetails({ ...blogDetails, user: student._id });
      createBlog(student._id, blogDetails)
        .then((data) => {
          setBlogCreateLoading(false);
          if (data?.error) {
            alert(data.error);
            return;
          } else {
            setShow({
              ...show,
              editor: !show["editor"],
            });
          }
        })
        .catch((err) => console.log(err));
    }
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
  }, [blogCreateLoading]);

  const { student, token } = isAuthenticated();

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
                setBlogDetails({
                  Title: "",
                  Content: "",
                });
                setErrors({});
              }}
              size="lg"
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton className="m-0">
                <Modal.Title>Create Articles</Modal.Title>
              </Modal.Header>
              <Modal.Body className="m-0 ">
                <Form.Group
                  controlId="Title"
                  className="container row pe-0 me-0 mb-3"
                >
                  <Form.Label className="mb-1 col-1 align-self-center">
                    Title
                  </Form.Label>
                  <div className="col-11 pe-0">
                    <Form.Control
                      className="py-2 "
                      type="text"
                      placeholder="Give the Title"
                      required
                      value={blogDetails["Title"]}
                      onChange={(e) => {
                        setBlogDetails({
                          ...blogDetails,
                          Title: e.target.value,
                        });
                        if (!!errors["Title"])
                          setErrors({
                            ...errors,
                            ["Title"]: null,
                          });
                      }}
                      isInvalid={!!errors["Title"]}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors["Title"]}
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>
                <EditorPage getContent={getContent} />
                <div className="d-grid gap-2 container">
                  <Button
                    variant="primary"
                    type="submit"
                    className="mt-3"
                    onClick={postBlog}
                    disabled={blogCreateLoading}
                  >
                    {blogCreateLoading ? (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="text-center"
                      />
                    ) : (
                      "Post Article"
                    )}
                  </Button>
                </div>
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
