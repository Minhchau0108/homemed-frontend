import React from "react";
import Hero from "../../components/Hero";
import { Row, Col, Container, Jumbotron, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Category = () => {
  return (
    <Container>
      <div className='pt-5'>
        <div className='text-center'>
          <p className='small text-muted small text-uppercase mb-1'>
            Carefully created collections
          </p>
          <h2 className='h5 text-uppercase mb-4'>Browse our categories</h2>
        </div>
        <Row>
          <Col lg={3}>
            <Card className='overflow-hidden'>
              <img src='https://img.freepik.com/free-vector/red-capsule-pills-plastic-blister-two-piece-hard-capsules-pharmaceutical-packs-white-background-illustration_224528-363.jpg?size=338&ext=jpg&ga=GA1.1.2070128673.1608777434'></img>
              <div>Prescription</div>
            </Card>
          </Col>
          <Col lg={3}>
            <Card className='overflow-hidden'>
              <img src='https://img.freepik.com/free-vector/pharmacist-objects-pack_23-2148521834.jpg?size=338&ext=jpg&ga=GA1.2.2070128673.1608777434'></img>
              <div>Prescription</div>
            </Card>
          </Col>
          <Col lg={3}>
            <Card className='overflow-hidden'>
              <img src='https://img.freepik.com/free-vector/vitamin-complex-package_23-2148488954.jpg?size=338&ext=jpg&ga=GA1.2.2070128673.1608777434'></img>
              <div>Prescription</div>
            </Card>
          </Col>
          <Col lg={3}>
            <Card className='overflow-hidden'>
              <img src='https://img.freepik.com/free-vector/pills-recipe-pharmacy-background_1284-16213.jpg?size=338&ext=jpg&ga=GA1.2.2070128673.1608777434'></img>
              <div>Prescription</div>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
};
const SERVICE = [
  {
    title: "Free shipping",
    icon: "truck",
    content: "Free shipping worlwide",
  },
  {
    title: "24 x 7 service",
    icon: "phone",
    content: "Free shipping worlwide",
  },
  {
    title: "Festival offer",
    icon: "tags",
    content: "Free shipping worlwide",
  },
];

const ServiceCard = ({ icon, title, content }) => {
  return (
    <div className='col-lg-4 mb-3 mb-lg-0'>
      <div className='d-inline-block'>
        <div className='media align-items-end'>
          <FontAwesomeIcon icon={icon} size='3x' />
          <div className='media-body text-left ml-3'>
            <h6 className='text-uppercase mb-1'>{title}</h6>
            <p className='text-small mb-0 text-muted'>{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
const Service = () => {
  return (
    <Container className='py-5 bg-light mb-5'>
      <Row className='row text-center'>
        {SERVICE.map((item, idx) => {
          return <ServiceCard key={idx} {...item} />;
        })}
      </Row>
    </Container>
  );
};

const HomePage = () => {
  return (
    <>
      <Hero />
      <Category />
      <Container className='py-5'>
        <header>
          <div className='small text-muted small text-uppercase mb-1'>
            Made the hard way
          </div>
          <h2 className='h5 text-uppercase mb-4'>Top trending products</h2>
        </header>
      </Container>
      <Service />
    </>
  );
};

export default HomePage;
