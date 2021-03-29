import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPills } from "@fortawesome/free-solid-svg-icons";

const FooterBar = () => {
  return (
    <>
      <footer
        className='with-pattern-1 position-relative'
        style={{ backgroundColor: `#27314f`, color: "#adb5bd" }}
      >
        <div
          className='container'
          style={{ paddingTop: "6.5rem", paddingBottom: "6.5rem" }}
        >
          <div className='row'>
            <div className='col-lg-3 mb-4 mb-lg-0'>
              <h2
                style={{ fontFamily: "Dancing Script" }}
                className='font-weight-bold text-white'
              >
                HomeMed
                <FontAwesomeIcon
                  icon={faPills}
                  className='ml-3 text-white'
                />{" "}
              </h2>
              <p className='text-muted'>
                We makes online ordering pharmacy, make appointment and update
                everything related healthcare easier than ever before.
              </p>
            </div>
            <div className='col-lg-2 mb-4 mb-lg-0'>
              <div className='title-h5 mb-4 text-white'>Quick Links</div>
              <div className='d-flex'>
                <ul className='list-unstyled d-inline-block mr-4 mb-0'>
                  <li className='mb-2'>History </li>
                  <li className='mb-2'>About us</li>
                  <li className='mb-2'>Contact us</li>
                  <li className='mb-2'>Services</li>
                </ul>
              </div>
            </div>
            <div className='col-lg-2 mb-4 mb-lg-0'>
              <div className='title-h5 mb-4 text-white'>Service</div>
              <div className='d-flex'>
                <ul className='list-unstyled mr-4 mb-0'>
                  <li className='mb-2'>History </li>
                  <li className='mb-2'>About us</li>
                  <li className='mb-2'>Contact us</li>
                  <li className='mb-2'>Services</li>
                </ul>
              </div>
            </div>
            <div className='col-lg-5'>
              <div className='title-h5 mb-4 text-white'>Contact Info</div>
              <ul className='list-unstyled mr-4 mb-3'>
                <li className='mb-2 text-muted'>Ho Chi Minh City</li>
                <li className='mb-2'>619-851-4132</li>
                <li className='mb-2'>homeMed@gmail.com</li>
              </ul>
              <ul className='list-inline mb-0'>
                <li className='list-inline-item'>
                  <i className='fab fa-facebook-f'></i>
                </li>
                <li className='list-inline-item'>
                  <i className='fab fa-twitter'></i>
                </li>
                <li className='list-inline-item'>
                  <i className='fab fa-google-plus'></i>
                </li>
                <li className='list-inline-item'>
                  <i className='fab fa-instagram'></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='copyrights'>
          <div className='container text-center py-4'>
            <p className='mb-0 text-muted text-sm'>&copy; HomeMed 2021</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterBar;
