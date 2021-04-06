import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "./../../redux/actions/post.actions";
import ModalBookAppointment from "../../components/ModalBookAppointment";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock as farClock } from "@fortawesome/free-regular-svg-icons";
import { faPills } from "@fortawesome/free-solid-svg-icons";

const BlogTitle = ({ post }) => {
  return (
    <>
      <Col lg={8} className='mx-auto'>
        <h1>{post.title}</h1>
        {post.category.map((t) => (
          <span className='mr-2 badge bg-soft-primary ' key={t._id}>
            # {t.name}
          </span>
        ))}

        <ul className='list-inline mb-5'>
          <li className='list-inline-item mx-2 mt-3'>
            <span className='text-muted '>
              {moment(post?.createdAt).format("LL")}
            </span>
          </li>
        </ul>
      </Col>
    </>
  );
};
const BlogContent = ({ post }) => {
  return (
    <>
      <div>
        {post && post.image && (
          <img className='w-100 mb-5 img-fluid' src={post.image} alt='...' />
        )}
      </div>
      <div>
        <div className='drop-caps mb-5' style={{ lineHeight: "2em" }}>
          {post.body}
        </div>
        <div style={{ lineHeight: "2em" }}>{post.body}</div>
      </div>
    </>
  );
};

const DoctorCard = ({ doctor }) => {
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const history = useHistory();
  const handleShowModalAppointment = () => {
    console.log("show modal");
    if (isAuthenticated) setShowAppointmentModal(true);
    if (!isAuthenticated) history.push(`/login`);
  };
  return (
    <Card className='rounded-0 border-0 bg-light mb-4 py-lg-4'>
      <Card.Body>
        <div>
          <div className='title-h5 text-center'>About Author</div>
        </div>
        <div className='d-flex flex-row mt-3'>
          <div className='mr-3'>
            <img
              src={doctor?.profileURL}
              className='rounded-circle'
              width='80'
              height='80'
              alt=''
              onClick={() => history.push(`/doctors/${doctor._id}`)}
              style={{ cursor: "pointer" }}
            />{" "}
          </div>
          <div>
            <div className='d-flex flex-column mb-1'>
              <div className='title-h6'>{doctor.name}</div>
              <span className='text-muted small'>{doctor.field}</span>
            </div>
            <div>
              <button
                className='btn btn-outline-primary btn-sm'
                onClick={() => history.push(`/doctors/${doctor._id}`)}
              >
                See Profile
              </button>{" "}
            </div>
          </div>
        </div>
        <hr />
        <div className='mt-4 text-center'>
          <button
            className='btn msg-button px-0'
            onClick={handleShowModalAppointment}
            style={{ width: "80%" }}
          >
            <FontAwesomeIcon icon={farClock} color='white' className='mr-1' />
            Make an appointment
          </button>
        </div>

        <ModalBookAppointment
          doctor={doctor}
          showModal={showAppointmentModal}
          handleClose={() => setShowAppointmentModal(false)}
        />
      </Card.Body>
    </Card>
  );
};

const BlogDetailPage = () => {
  const post = useSelector((state) => state.post.selectedPost);
  const loading = useSelector((state) => state.post.loading);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(postActions.getSinglePost(id));
  }, [dispatch, id]);

  return (
    <Container style={{ minHeight: "90vh" }}>
      {loading ? (
        <div className='text-center mt-5 d-flex justify-content-center align-items-center'>
          {/* //<ClipLoader color='#f86c6b' size={150} loading={loading} /> */}
          <FontAwesomeIcon
            icon={faPills}
            className='loaderImage mt-5'
            size='4x'
            color='#4650dd'
          />{" "}
        </div>
      ) : (
        <>
          {post && (
            <Container className='my-5'>
              <Row className='text-center pt-5'>
                <BlogTitle post={post} />
              </Row>

              <Row>
                <Col lg={8}>
                  <BlogContent post={post} />
                </Col>
                <Col lg={4}>
                  <DoctorCard doctor={post.owner} />
                </Col>
              </Row>
            </Container>
          )}
        </>
      )}
    </Container>
  );
};

export default BlogDetailPage;
