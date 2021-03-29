import React from "react";
import { Container } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Hero = () => {
  return (
    <div
      className='d-flex align-items-center w-100'
      // style={{
      //   backgroundImage: `url(${pharm01})`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center center",
      //   minHeight: "80vh",
      // }}
    >
      <Container className='p-5 d-flex flex-column h-100 align-items-left justify-content-center'>
        <h2 className='font-weight-bold'>Pharmacy Online</h2>
        <h4 className='font-weight-italic mt-3'>20% off on new season</h4>
        <div>
          <button className='btn btn-primary btn-lg px-3 mt-3'>
            <FontAwesomeIcon icon={faShoppingCart} className='mr-2' size='sm' />
            Shop Online
          </button>
        </div>
      </Container>
    </div>
  );
};
export default Hero;
