import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faShoppingBag,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { faHospital as farHospital } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

const ThankYouPage = () => {
  return (
    <Container fluid>
      <Row className='mt-5'>
        <Col md={{ span: 6, offset: 3 }}>
          <div className='text-center jumbotron text-xs-center bg-white'>
            <FontAwesomeIcon icon={farHospital} size='6x' color='#396cf0 ' />
            <h1 className='mt-5'>Thank you for your order</h1>
            <Col md={4} className='mx-auto'>
              <Link to={`/pharmacy`}>
                <button className='btn btn-primary btn-sm btn-block h-100 d-flex align-items-center justify-content-center px-0 mt-5'>
                  <FontAwesomeIcon
                    icon={faShoppingBag}
                    className='py-1 mr-2'
                    size='2x'
                  />
                  Continue shopping
                </button>
              </Link>
            </Col>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ThankYouPage;
