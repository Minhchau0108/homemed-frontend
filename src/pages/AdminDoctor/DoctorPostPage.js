import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge, Row, Table, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "./../../redux/actions/post.actions";
import BlogCardMini from "../../components/BlogCardMini";

const DoctorPostPage = () => {
  const posts = useSelector((state) => state.post.posts);
  const currentDoctor = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentDoctor?._id) {
      dispatch(postActions.getPostsByDoctor(currentDoctor._id));
    }
  }, [dispatch, currentDoctor]);
  return (
    <div>
      <div className='d-flex justify-content-end'>
        <Link to={`/admin-doctor/create-post`}>
          <button className='btn btn-primary btn-pills my-2 mr-2'>
            <FontAwesomeIcon icon={faPlus} className='mr-1' />
            <span>Create Post</span>
          </button>
        </Link>
      </div>

      <Row>
        <Col md={12}>
          <Row>
            {posts &&
              posts.map((post) => <BlogCardMini post={post} key={post._id} />)}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default DoctorPostPage;
