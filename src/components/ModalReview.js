import React, { useState } from "react";
import { Modal, Col, Row, Table, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import StarRatings from "react-star-ratings";
import { doctorActions } from "../redux/actions/doctor.actions";
import { useDispatch } from "react-redux";

const ModalReview = ({ showModalReview, handleClose, doctor }) => {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const dispatch = useDispatch();
  const handleSubmitReview = (e) => {
    e.preventDefault();
    console.log("doctor", doctor._id);
    console.log("content", content);
    console.log("rating", rating);
    dispatch(doctorActions.createReview(rating, content, doctor?._id));
    handleClose();
  };
  return (
    <div>
      <Modal show={showModalReview} onHide={handleClose} size='lg' centered>
        <Modal.Body>
          <Row>
            <Col md={8} className='border-right pl-4'>
              <div className='modal-content'>
                <div className='card-body text-center'>
                  <img
                    src='https://i.imgur.com/d2dKtI7.png'
                    height='100'
                    width='100'
                    alt=''
                  />
                  <div className='text-center'>
                    <div className='title-h5'>Add a review for doctor</div>
                    <Form onSubmit={handleSubmitReview}>
                      <StarRatings
                        rating={rating}
                        starRatedColor='#FFC107'
                        numberOfStars={5}
                        name='rating'
                        starDimension='18px'
                        starSpacing='1px'
                        changeRating={(rating) => setRating(rating)}
                      />
                      <div>
                        <textarea
                          className='form-control'
                          placeholder='what is your view?'
                          rows='4'
                          onChange={(e) => setContent(e.target.value)}
                        ></textarea>{" "}
                      </div>
                      <div className='text-center mt-4'>
                        <button className='btn btn-soft-primary send px-5'>
                          Post review
                        </button>{" "}
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className='p-2 text-center'>
                <img
                  src={doctor?.profileURL}
                  width='100'
                  height='100'
                  className='rounded-circle border'
                  alt=''
                />
                <div className='mt-3 title-h5'>Dr. {doctor.name}</div>
              </div>

              <Table borderless>
                <tbody>
                  <tr>
                    <td className='text-center'>
                      <div className='d-flex flex-column'>
                        <div class='title-h6 d-block'>{doctor.field}</div>
                        <div className='d-flex mt-2'>
                          <FontAwesomeIcon
                            icon={faMapMarkerAlt}
                            className='mr-2'
                          />
                          <div className='text-muted'>{doctor.address}</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalReview;
