import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const NotFoundPage = () => {
  return (
    <Container className='mt-5 pt-5' style={{ minHeight: "50vh" }}>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h1>404</h1>
          <p>The page you are looking for does not exist.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
