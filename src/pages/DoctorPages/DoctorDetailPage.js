import React, { useEffect } from "react";
import { Col, Container, Jumbotron, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doctorActions } from "./../../redux/actions/doctor.actions";
import { postActions } from "./../../redux/actions/post.actions";
import BlogCard from "../../components/BlogCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StarRatings from "react-star-ratings";
import { faMap as farMap } from "@fortawesome/free-regular-svg-icons";
import moment from "moment";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const DoctorDetailPage = () => {
  const doctor = useSelector((state) => state.doctor.selectedDoctor);
  const posts = useSelector((state) => state.post.posts);
  const loadingDoctor = useSelector((state) => state.doctor.loading);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(doctorActions.getSingleDoctor(id));
    dispatch(postActions.getPostsByDoctor(id));
  }, [dispatch, id]);

  return (
    <>
      <Jumbotron
        className='hero d-flex align-items-end py-5 bg-cover bg-center'
        style={{
          backgroundImage: `url("http://shreethemes.in/doctris/html/images/blog/05.jpg")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          minHeight: "50vh",
        }}
      >
        <Container className='index-forward py-5 py-lg-0'>
          <Row>
            <Col lg={7} className='mb-4 mb-lg-0'>
              <div className='media align-items-center'>
                <img
                  className='rounded-circle'
                  src={doctor?.profileURL}
                  alt=''
                  width='100'
                  height='100'
                />
                <div className='media-body ml-3'>
                  <h5 className='text-white mt-1 font-weight-bold'>
                    {doctor?.name}
                  </h5>
                  <h6 className='text-gray font-italic'>{doctor?.field}</h6>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
      <Container className='mb-5'>
        <Row>
          <Col lg={4}>
            <div className='card border-0 shadow-sm mb-4 mb-lg-5 p-2 p-lg-0 mt-3'>
              <div className='card-body '>
                <div className='title-h5 mb-4'>Doctor Profile</div>
                <div class='product-description'>
                  <div>
                    <span class='font-weight-bold'>Address Private Clinic</span>
                  </div>

                  <div class='d-flex flex-row align-items-center mt-3'>
                    <FontAwesomeIcon icon={farMap} className='mr-2' />
                    <span class='ml-1'>{doctor?.address}</span>
                  </div>
                  <div class='mt-4'>
                    <span class='font-weight-bold'>Experience</span>
                    <div class='bullets mt-2'>
                      {doctor?.description.split(".").map((item, idx) => (
                        <div className='mt-2' key={idx}>
                          {item !== "" && `- ${item}`}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='card border-0 shadow-sm mb-4 mb-lg-5 p-2 p-lg-0 mt-3'>
              <div className='card-body '>
                <div className='title-h5'>Rating</div>
                <div class='d-flex flex-row align-items-center'>
                  <StarRatings
                    rating={4}
                    starRatedColor='#FFC107'
                    numberOfStars={5}
                    starDimension='15px'
                    starSpacing='1px'
                  />
                </div>
                <div class='mt-2'>
                  <div className='title-h5'>Reviews</div>
                </div>
                {doctor &&
                  doctor?.reviews &&
                  doctor?.reviews.map((review, idx) => (
                    <div
                      key={idx}
                      className={`comment mt-4 text-justify float-left shadow p-2 rounded ${
                        idx % 2 === 0 ? "border" : "bg-light"
                      }`}
                    >
                      <img
                        src='https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png'
                        alt=''
                        class='rounded-circle'
                        width='40'
                        height='40'
                      />
                      <span className='title-h6 small'>
                        {review?.owner.name}
                      </span>{" "}
                      <span className='small'>
                        - {moment(review?.createdAt).format("LL")}
                      </span>{" "}
                      <br />
                      <StarRatings
                        rating={4}
                        starRatedColor='#FFC107'
                        numberOfStars={5}
                        starDimension='15px'
                        starSpacing='1px'
                      />
                      <p>{review?.content}</p>
                    </div>
                  ))}
              </div>
            </div>
          </Col>
          <Col lg={8}>
            {posts.map((post) => (
              <BlogCard post={post} key={post._id} />
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DoctorDetailPage;
