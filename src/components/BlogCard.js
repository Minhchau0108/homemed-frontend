import React, { useState, useRef } from "react";
import {
  Row,
  Col,
  Card,
  Container,
  OverlayTrigger,
  Tooltip,
  Form,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FacebookSelector } from "react-reactions";
import { postActions } from "../redux/actions/post.actions";
import { useDispatch } from "react-redux";
import moment from "moment";
import {
  faCommentAlt as farCommentAlt,
  faThumbsUp as farThumbsUp,
} from "@fortawesome/free-regular-svg-icons";

const PostReactions = ({ comments, reactions }) => {
  const iconArray = reactions
    .map((r) => r.emoji)
    .filter((item, i, arr) => arr.indexOf(item) === i);
  const emojiArray = iconArray.map((i) => {
    if (i === "like") {
      return `👍`;
    }
    if (i === "love") {
      return `❤️`;
    }
    return `😲`;
  });
  const peopleArray = reactions
    .map((r) => r.owner.name)
    .filter((item, i, arr) => arr.indexOf(item) === i);

  return (
    <div className='d-flex justify-content-between my-1 mx-1 pl-2'>
      <div className='mb-0'>
        <div className='d-flex '>
          {emojiArray.length > 0 &&
            emojiArray.map((e) => {
              return (
                <div key={e} className='mr-0'>
                  {e}
                </div>
              );
            })}
          {peopleArray.length > 0 && (
            <OverlayTrigger
              placement='bottom'
              overlay={
                <Tooltip id='button-tooltip-2'>
                  {peopleArray.length > 0 &&
                    peopleArray.map((c) => {
                      return <div key={c}>{c}</div>;
                    })}
                </Tooltip>
              }
            >
              <button className='border-0 ml-1 bg-white'>
                {reactions.length}
              </button>
            </OverlayTrigger>
          )}
        </div>
      </div>
      <p className='mb-0 mr-3' style={{ fontSize: "13px" }}>
        {comments.length > 1
          ? `${comments.length} comments`
          : `${comments.length} comment`}
      </p>
    </div>
  );
};

const BlogCard = ({ post }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showSelector, setShowSelector] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const handleSelectReaction = (emoji) => {
    dispatch(postActions.createReaction(post._id, emoji));
    setShowSelector(false);
  };
  const [comment, setComment] = useState("");
  const commentInput = useRef(null);
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(postActions.createComment(null, comment, post._id));
    e.target.reset();
  };

  return (
    <Container className='mt-3 mb-3'>
      <div className='row align-items-center justify-content-center'>
        <Col md={10}>
          <Card className='pt-2 rounded shadow' style={{ border: "none" }}>
            <div className='d-flex justify-content-between py-1 px-3'>
              <div className='d-flex flex-row align-items-center'>
                <img
                  src={post?.owner?.profileURL}
                  alt=''
                  width='50'
                  height='50'
                  className='rounded-circle'
                  onClick={() => history.push(`/doctors/${post?.owner?._id}`)}
                  style={{ cursor: "pointer" }}
                />
                <div className='d-flex flex-column ml-2'>
                  <span className='font-weight-bold'>{post?.owner?.name}</span>
                  <small className='text-dark'>{post?.owner?.field}</small>
                </div>
              </div>
              <div className='d-flex flex-row mt-1 ellipsis'>
                <small className='mr-2'>
                  {moment(post?.createdAt).format("LL")}
                </small>
              </div>
            </div>

            <h6 className='ml-2 my-2 font-weight-bold'>{post.title}</h6>
            <div className='ml-2 mb-2'>
              {post.category.map((t) => (
                <span className='mr-2' key={t._id} style={{ fontSize: "14px" }}>
                  # {t.name}
                </span>
              ))}
            </div>
            <Row>
              <Col md={5}>
                <img
                  src={post?.image && post.image}
                  alt=''
                  className='img-fluid'
                  onClick={() => history.push(`/blogs/${post._id}`)}
                />
              </Col>
              <Col md={7}>
                <div className='text-justify pr-4'>
                  {post.body.substring(0, 200)}...
                </div>
              </Col>
            </Row>
            <hr className='my-0' />
            <PostReactions
              comments={post?.reviews}
              reactions={post?.reactions}
            />
            {showSelector && (
              <div
                style={{
                  marginBottom: "10px",
                  width: "150px",
                }}
              >
                <FacebookSelector
                  reactions={["like", "love", "wow"]}
                  onSelect={handleSelectReaction}
                />
              </div>
            )}

            <div className='p-2'>
              <div className='d-flex justify-content-between align-items-center'>
                <div className='d-flex flex-row'>
                  <div
                    style={{ cursor: "pointer" }}
                    className='like p-2 mr-3'
                    onClick={() => setShowSelector(!showSelector)}
                  >
                    <FontAwesomeIcon
                      size='lg'
                      icon={farThumbsUp}
                      color='gray'
                      className='action-icon'
                    />
                    <span className='ml-1'>Like</span>
                  </div>
                  <div
                    style={{ cursor: "pointer" }}
                    className='like p-2 '
                    onClick={() => commentInput.current.focus()}
                  >
                    <FontAwesomeIcon
                      size='lg'
                      icon={farCommentAlt}
                      color='gray'
                      className='action-icon'
                    />
                    <span className='ml-1'>Comment</span>
                  </div>
                </div>
              </div>
              <hr className='my-0' />
              <div
                className='my-1 small d-flex justify-content-end text-primary'
                style={{ cursor: "pointer" }}
                onClick={() => setShowAllComments(!showAllComments)}
              >
                {post?.reviews.length > 1 &&
                  !showAllComments &&
                  "See all comments"}
                {showAllComments && "Hide comments"}
              </div>
              <div>
                {showAllComments &&
                  post?.reviews.map((review) => (
                    <div className='d-flex flex-row mb-2' key={review._id}>
                      <img
                        src={
                          review.owner?.profileURL
                            ? review.owner.profileURL
                            : `https://ui-avatars.com/api/?name=${review.owner.name}&background=random&length=1&bold=true`
                        }
                        width='40'
                        height='40'
                        alt=''
                        className='rounded-circle'
                      />
                      <div className='d-flex flex-column ml-2'>
                        <span>{review?.owner?.name}</span>{" "}
                        <small>{review.content}</small>
                      </div>
                    </div>
                  ))}
                {!showAllComments &&
                  post?.reviews.slice(-1).map((review) => (
                    <div className='d-flex flex-row mb-2' key={review._id}>
                      <img
                        src={
                          review.owner?.profileURL
                            ? review?.owner?.profileURL
                            : `https://ui-avatars.com/api/?name=${review?.owner?.name}&background=random&length=1&bold=true`
                        }
                        width='40'
                        height='40'
                        alt=''
                        className='rounded-circle'
                      />
                      <div className='d-flex flex-column ml-2'>
                        <span>{review?.owner?.name}</span>{" "}
                        <small>{review.content}</small>
                      </div>
                    </div>
                  ))}
                <Form onSubmit={onSubmit}>
                  <Form.Row>
                    <Col className='d-flex'>
                      <Form.Control
                        size='md'
                        type='text'
                        ref={commentInput}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder='Write a comment...'
                        className='border-0 rounded bg-light'
                        required
                      />
                    </Col>
                  </Form.Row>
                </Form>
              </div>
            </div>
          </Card>
        </Col>
      </div>
    </Container>
  );
};

export default BlogCard;
