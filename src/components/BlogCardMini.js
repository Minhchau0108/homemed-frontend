import React from "react";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faCommentAlt as farCommentAlt,
  faThumbsUp as farThumbsUp,
  faCalendarAlt as farCalendarAlt,
} from "@fortawesome/free-regular-svg-icons";

import moment from "moment";

const BlogCardMini = ({ post }) => {
  return (
    <div className='col-lg-4 mb-3'>
      <Card
        style={{ border: "none" }}
        className='rounded overflow-hidden shadow'
      >
        <img className='img-fluid' src={post?.image} alt='...' />
        <Card.Body>
          <ul className='list-unstyled mb-2 d-flex justify-content-between'>
            <li className='list-inline-item text-muted small me-3'>
              <FontAwesomeIcon
                icon={farCalendarAlt}
                size='lg'
                className='mr-2 text-muted'
              />
              <div className='d-inline pt-1'>
                {" "}
                {moment(post?.createdAt).format("LL")}
              </div>
            </li>

            <li className='list-inline-item text-muted small me-3'>
              <div className='d-inline mr-3'>
                <FontAwesomeIcon
                  icon={farThumbsUp}
                  size='lg'
                  className='mr-1 text-muted'
                />
                {post?.reactions?.length}
              </div>
              <div className='d-inline'>
                <FontAwesomeIcon
                  icon={farCommentAlt}
                  size='lg'
                  className='mr-1 text-muted'
                />
                {post?.reviews?.length}
              </div>
            </li>
          </ul>
          <div className='title-h5 mt-4'>{post.title}</div>
          <div className='media align-items-center mt-3'>
            <img
              className='rounded-circle'
              src={post?.owner?.profileURL}
              width='40'
              height='40'
              alt=''
            />
            <div className='media-body d-flex ml-2 align-items-center'>
              <span className='small text-muted mr-1'>By</span>
              <Link>
                <h6 className='mb-0 title-h6 text-decoration-none text-primary'>
                  {post?.owner?.name}
                </h6>
              </Link>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BlogCardMini;
