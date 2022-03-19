import React, { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { isAuthenticated } from "../../Auth/helper";
import Base from "../../Base";
import Blogs from "../../Student/Components/Blogs/Blogs";
import Batch from "../Components/Batch/Batch";
import FormControl from "../Components/Form Control/FormControl";
import ExtraForm from "../Components/Forms/ExtraForm";
import FormNames from "../Components/Forms/FormNames";

const Home = () => {
  const { student, token } = isAuthenticated();

  const [reRenderForms, setReRenderForms] = useState(false);

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
                {data.map((blog, index) => (
                  <Blogs blog={blog} key={index} />
                ))}
              </Card.Body>
            </Card>
          </Col>
          <Col
            className="d-none mt-3 d-lg-block p-0 poppins-font vh-100"
            lg={3}
          >
            <Card className="border mb-4 ">
              <Card.Body className="p-0">
                <Card.Title className="fw-bold text-center my-4 poppins-font">
                  FORM CONTROLS
                </Card.Title>
                <FormControl />
              </Card.Body>
            </Card>
            <Card className="border mb-4">
              <Card.Body className="p-0">
                <Card.Title className="fw-bold text-center my-4 poppins-font">
                  DOWNLOAD DATA
                </Card.Title>
                <Batch />
              </Card.Body>
            </Card>

            {/* POSTED FORMS */}
            <Card className="border mb-4">
              <Card.Body className="p-0">
                <Card.Title className="fw-bold text-center my-4 poppins-font">
                  POSTED FORMS
                </Card.Title>
                <FormNames reRender={reRenderForms} />
              </Card.Body>
            </Card>

            {/* UPLOADED FORMS */}
            <Card className="border ">
              <Card.Body className="p-0">
                <Card.Title className="fw-bold text-center my-4 poppins-font">
                  UPLOAD FORMS
                </Card.Title>
                <ExtraForm onClick={() => setReRenderForms(!reRenderForms)} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default Home;
