import React, { useState } from "react";
import { Row, Form } from "react-bootstrap";
import { postActions } from "../redux/actions/post.actions";
import { useDispatch } from "react-redux";
const CommentItem = ({ review }) => {
  return (
    <div className='col-lg-9'>
      <div className='media mb-3'>
        <img
          className='rounded-circle'
          src='https://dummyimage.com/50'
          alt=''
          width='50'
        />
        <div className='media-body ml-3'>
          <h6 className='mb-0 text-uppercase'>{review?.owner?.name}</h6>
          <p className='small text-muted mb-0 text-uppercase'>20 May 2020</p>

          <p className='text-small mb-0 text-muted'>{review?.content}</p>
        </div>
      </div>
    </div>
  );
};
const CommentBox = ({ post }) => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const handleSubmitReview = (e) => {
    e.preventDefault();
    dispatch(postActions.createComment(null, content, post._id));
  };
  return (
    <div className='bg-white'>
      <Row>
        {post.reviews.map((review) => (
          <CommentItem key={review._id} review={review} />
        ))}
      </Row>

      <Form onSubmit={handleSubmitReview}>
        <div className='row mt-3'>
          <div className='form-group col-12'>
            <textarea
              className='form-control'
              id='reviewMessage'
              name='review-message'
              rows='3'
              value={content}
              placeholder='Add a small brief about your listing.'
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
    </div>
  );
};

export default CommentBox;
