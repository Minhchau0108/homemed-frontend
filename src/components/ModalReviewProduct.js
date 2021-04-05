import React, { useState } from "react";
import { Modal, Col, Row, Form } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import { productActions } from "../redux/actions/product.actions";
import { useDispatch } from "react-redux";

const ModalReviewProduct = ({ showModalReview, handleClose, product }) => {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const dispatch = useDispatch();
  const handleSubmitReview = (e) => {
    e.preventDefault();
    dispatch(productActions.createReview(rating, content, product._id));
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
                    <div className='title-h5'>Add a review for product</div>
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
                  src={product && product?.images && product?.images[0]}
                  width='100'
                  height='100'
                  alt=''
                />
                <div className='mt-3 title-h6'>{product?.name}</div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalReviewProduct;
