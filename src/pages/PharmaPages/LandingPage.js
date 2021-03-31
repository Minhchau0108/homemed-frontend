import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import banner4 from "../../images/banner-4.png";
import serviceBg from "../../images/service-bg.svg";
import objects from "../../images/objects.svg";
import halfBg from "../../images/half-bg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPills,
  faStethoscope,
  faShoppingCart,
  faBaby,
  faHeartbeat,
  faAllergies,
  faHeadSideVirus,
  faFemale,
  faUserMd,
  faCheck,
  faPrescription,
} from "@fortawesome/free-solid-svg-icons";
import { faNewspaper as farNewspaper } from "@fortawesome/free-regular-svg-icons";
import { Container, Row, Col } from "react-bootstrap";
import { postActions } from "./../../redux/actions/post.actions";
import BlogCardMini from "../../components/BlogCardMini";
import vitamin from "../../images/vitamin.png";
import pharm01 from "../../images/pharm01.jpeg";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const posts = useSelector((state) => state.post.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(postActions.postsRequest());
  }, [dispatch]);
  return (
    <>
      <section
        className='hero bg-top mt-5'
        style={{
          background: `url(${banner4}) no-repeat`,
          backgroundSize: `100% 80%`,
          minHeight: "100vh",
        }}
      >
        <div className='container'>
          <div className='row py-5'>
            <div className='col-lg-7 py-5'>
              <h1 className='font-weight-bold mt-4'>
                We care<br></br> about your health
              </h1>
              <div className='my-4' style={{ fontSize: "16px" }}>
                <span
                  style={{ fontFamily: "Dancing Script", fontSize: "32px" }}
                >
                  HomeMed
                </span>{" "}
                is here to bring medical care and medicine to your home easily.
              </div>
              <ul className='list-inline mb-0'>
                <li className='list-inline-item mb-2 mb-lg-0 mr-3'>
                  <Link to={`/pharmacy`}>
                    <button className='btn btn-primary px-3'>
                      <FontAwesomeIcon icon={faShoppingCart} className='mr-2' />
                      Pharmacy Online
                    </button>
                  </Link>
                </li>
                <li className='list-inline-item'>
                  <Link to={`/doctors`}>
                    <button className='btn btn-primary px-3'>
                      <FontAwesomeIcon icon={faStethoscope} className='mr-2' />
                      Find a doctor
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
            <div className='col-lg-3 mr-auto'>
              <img src={vitamin} className='mt-5' width='512px' />
            </div>
          </div>
        </div>
      </section>
      <div
        className='bg-center py-0'
        style={{
          background: `url(${serviceBg}) no-repeat`,
          backgroundSize: `cover`,
        }}
      >
        <div className='container'>
          <h6 className='text-uppercase text-primary font-weight-bold'>
            Services
          </h6>
          <h2 className='mb-5 font-weight-bold'>
            Provide healthcare services for you and your family
          </h2>
          <div className='row pb-5 mb-5'>
            <div className='col-lg-4 col-md-6 mb-4 mb-lg-0'>
              <div className='card border-0 shadow rounded-lg py-4 text-left'>
                <div className='card-body p-5'>
                  <FontAwesomeIcon icon={faPills} size='3x' color='#ff904e' />{" "}
                  <h4 className='font-weight-bold my-4'>Pharmacy</h4>
                  <div style={{ lineHeight: "1.8em" }}>
                    Where you can purchase your medicines, supplements and first
                    aid products online.
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-4 col-md-6 mb-4 mb-lg-0'>
              <div className='card border-0 shadow rounded-lg py-4 text-left'>
                <div className='card-body p-5'>
                  <FontAwesomeIcon
                    icon={faStethoscope}
                    size='3x'
                    color='#4CE1C6'
                  />{" "}
                  <h4 className='font-weight-bold my-4'>Doctors</h4>
                  <div style={{ lineHeight: "1.8em" }}>
                    Where you can find a doctor, see doctor's profile and
                    reviews, and easily make an appointment.
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-4 col-md-6'>
              <div className='card border-0 shadow rounded-lg py-4 text-left'>
                <div className='card-body p-5'>
                  <FontAwesomeIcon
                    icon={farNewspaper}
                    size='3x'
                    color='#8190ff'
                  />{" "}
                  <h4 className='font-weight-bold my-4'>News</h4>
                  <div style={{ lineHeight: "1.8em" }}>
                    Where you can read the most recent updates in healthcare
                    which are written by our doctors
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Container className='mt-5'>
            <Row style={{ marginBottom: "100px", marginTop: "100px" }}>
              <Col lg={6}>
                <img className='img-fluid w-100 px-lg-5' src={objects} alt='' />
              </Col>
              <Col lg={6}>
                <h2 className='font-weight-bold'>
                  Solution for order medicines from your prescription
                </h2>
                <div
                  style={{ fontSize: "16px", lineHeight: "2em" }}
                  className='mt-3'
                >
                  Already have a prescription?
                  <br />
                  Send it in to us, and you can save your time.
                </div>
                <ul className='list-unstyled mt-2'>
                  <li className='mb-2'>
                    <FontAwesomeIcon
                      icon={faCheck}
                      color='#5954cb'
                      className='mr-2'
                    />
                    Upload valid Prescription
                  </li>
                  <li className='mb-2'>
                    <FontAwesomeIcon
                      icon={faCheck}
                      color='#5954cb'
                      className='mr-2'
                    />
                    Receive a confirmation call from our pharmacist
                  </li>
                  <li className='mb-2'>
                    <FontAwesomeIcon
                      icon={faCheck}
                      color='#5954cb'
                      className='mr-2'
                    />
                    Delivery medicines at your door step
                  </li>
                </ul>
                <Link to={"/pharmacy/create-prescription"}>
                  <button className='btn btn-primary'>
                    <FontAwesomeIcon icon={faPrescription} className='mr-2' />
                    View detail
                  </button>
                </Link>
              </Col>
            </Row>
            <Row className='mt-3'>
              <Col lg={6}>
                <h2 className='mt-3 font-weight-bold'>Find the right doctor</h2>
                <h2 className='mt-2 font-weight-bold'>Get the best care</h2>

                <div className='mt-3' style={{ fontSize: "16px" }}>
                  Don't have prescription? Don't worry.
                </div>

                <div
                  className='mt-3'
                  style={{ fontSize: "16px", lineHeight: "2em" }}
                >
                  <span
                    style={{ fontFamily: "Dancing Script", fontSize: "32px" }}
                  >
                    HomeMed
                  </span>{" "}
                  offer a more convenient way to find and access healthcare
                  online. We make it easy to find a doctor, make an appointment,
                  and see a doctor sooner.
                </div>

                <Link to={"/doctors"}>
                  <button className='btn btn-primary mt-4'>
                    <FontAwesomeIcon icon={faUserMd} className='mr-2' />
                    View All Doctors
                  </button>
                </Link>
              </Col>
              <Col lg={6}>
                <Row>
                  <div className='col-lg-4 col-sm-4 mb-4'>
                    <div className='card border-0 shadow rounded-lg text-left px-2'>
                      <div className='card-body py-4'>
                        <FontAwesomeIcon
                          icon={faUserMd}
                          size='4x'
                          color='#ff904e'
                          className='mt-1'
                        />
                        <div className='title-h6 my-3'>Internal Dr.</div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-4 col-sm-4 mb-4'>
                    <div className='card border-0 shadow rounded-lg text-left px-2'>
                      <div className='card-body py-4'>
                        <FontAwesomeIcon
                          icon={faBaby}
                          size='4x'
                          color='#4CE1C6'
                          className='mt-1'
                        />
                        <div class='title-h6 my-3'>Pediatrician</div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-4 col-sm-4 mb-4'>
                    <div className='card border-0 shadow rounded-lg text-left px-2'>
                      <div className='card-body py-4'>
                        <FontAwesomeIcon
                          icon={faHeartbeat}
                          size='4x'
                          color='#8190ff'
                          className='mt-1'
                        />
                        <div className='title-h6 my-3'>Cardiologist</div>
                      </div>
                    </div>
                  </div>
                  <div class='col-lg-4 col-sm-4'>
                    <div class='card border-0 shadow rounded-lg text-left px-2'>
                      <div class='card-body py-4'>
                        <FontAwesomeIcon
                          icon={faHeadSideVirus}
                          size='4x'
                          color='#ff904e'
                          className='mt-1'
                        />
                        <div class='title-h6 my-3'>Psychiatrist</div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-4 col-sm-4'>
                    <div className='card border-0 shadow rounded-lg text-left px-2'>
                      <div className='card-body py-4'>
                        <FontAwesomeIcon
                          icon={faAllergies}
                          size='4x'
                          color='#4CE1C6'
                          className='mt-1'
                        />
                        <div className='title-h6 my-3'>Dermatologist</div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-4 col-sm-4'>
                    <div className='card border-0 shadow rounded-lg text-left px-2'>
                      <div className='card-body py-4'>
                        <FontAwesomeIcon
                          icon={faFemale}
                          size='4x'
                          color='#8190ff'
                          className='mt-1'
                        />
                        <div className='title-h6 my-3'>Gynecologist</div>
                      </div>
                    </div>
                  </div>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
        <section
          className='p-0'
          style={{
            background: `url(${halfBg}) no-repeat`,
            backgroundSize: `10% 100%`,
            backgroundPosition: `left center`,
          }}
        >
          <div className='container text-center' style={{ marginTop: "120px" }}>
            <Link to={`/blogs`}>
              <h4 className='text-uppercase text-primary font-weight-bold'>
                News
              </h4>
            </Link>

            <div class='title-h5 mb-5'>Provide information update for you</div>
          </div>
          <Container style={{ marginBottom: "120px" }}>
            <Row>
              {posts &&
                posts
                  .slice(0, 3)
                  .map((post) => <BlogCardMini post={post} key={post._id} />)}
            </Row>
          </Container>
        </section>
      </div>
    </>
  );
};

export default LandingPage;
