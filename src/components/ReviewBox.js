import React, { useState, useRef } from "react";
import { Row, Form } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import { productActions } from "../redux/actions/product.actions";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
const ReviewItem = ({ review }) => {
  return (
    <>
      <div className='col-lg-9'>
        <div className='media mb-3'>
          <img
            className='rounded-circle'
            src={
              review?.owner?.profileURL
                ? review.owner.profileURL
                : `https://ui-avatars.com/api/?name=${review?.owner?.name}&background=random&length=1&bold=true`
            }
            alt=''
            width='50'
          />
          <div className='media-body ml-3'>
            <h6 className='tilte-h6 mb-0'>{review?.owner?.name}</h6>
            <p className='small text-muted mb-0'>
              {moment(review?.createdAt).format("LL")}
            </p>
            <StarRatings
              rating={review?.rating}
              starRatedColor='#FFC107'
              numberOfStars={5}
              name='rating'
              starDimension='16px'
              starSpacing='1px'
            />
            <p className='text-small mb-0 text-muted'>{review?.content}</p>
          </div>
        </div>
      </div>
    </>
  );
};
const ReviewBox = ({ product }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [showForm, setShowForm] = useState(false);
  const [content, setContent] = useState("");
  const reviewInput = useRef(null);
  const [rating, setRating] = useState(5);
  const dispatch = useDispatch();
  const handleSubmitReview = (e) => {
    e.preventDefault();
    dispatch(productActions.createReview(rating, content, product._id));
    setShowForm(false);
    e.target.reset();
  };
  return (
    <div className='p-4 p-lg-5 bg-white'>
      <Row>
        {product.reviews.map((review) => (
          <ReviewItem key={review._id} review={review} />
        ))}
      </Row>
      {/* {isAuthenticated && (
        <button
          className='btn btn-primary'
          onClick={() => setShowForm(!showForm)}
        >
          Add a review
        </button>
      )} */}

      {showForm && (
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
          <div className='row mt-3'>
            <div className='form-group col-12'>
              <textarea
                className='form-control'
                id='reviewMessage'
                name='review-message'
                rows='3'
                ref={reviewInput}
                placeholder='Add a review about product'
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
            <div className='form-group col-12 m-0'>
              <button className='btn btn-primary' type='submit'>
                Post your review
              </button>
            </div>
          </div>
        </Form>
      )}
    </div>
  );
};

export default ReviewBox;
