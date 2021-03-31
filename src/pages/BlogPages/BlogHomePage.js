import React, { useEffect, useState } from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import Tags from "../../components/Tags";
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "./../../redux/actions/post.actions";
import BlogCard from "../../components/BlogCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BlogHomePage = () => {
  const [filterPosts, setFilterPost] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [searchTerm, setSearchTerm] = useState(null);
  const [title, setTitle] = useState("");
  const posts = useSelector((state) => state.post.posts);
  const loading = useSelector((state) => state.post.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(postActions.postsRequest(pageNum, null, title));
  }, [dispatch, pageNum, title]);
  const handleChangeTag = (e) => {
    setSelectedTag(e.target.value);
  };
  useEffect(() => {
    if (!selectedTag) {
      setFilterPost(posts);
    }
    if (selectedTag) {
      const newPosts = posts.filter(
        (post) => post.category.map((c) => c.name).indexOf(selectedTag) >= 0
      );
      setFilterPost(newPosts);
    }
  }, [posts, selectedTag]);
  const onSubmit = (e) => {
    console.log("submit");
    e.preventDefault();
    setTitle(searchTerm);
  };

  console.log("title", title);
  return (
    <Container
      fluid
      className='bg-light mt-5'
      style={{ paddingBottom: "100px" }}
    >
      <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={9}>
            <Row className='align-items-center justify-content-center mt-5'>
              <Col md={11}>
                <Form onSubmit={onSubmit}>
                  <div className='p-1 bg-white rounded rounded-pill shadow-sm mb-3 search-bar'>
                    <input
                      placeholder='What are you searching for?'
                      className='border-0 bg-white search-bar-input'
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FontAwesomeIcon
                      icon='search'
                      size='lg'
                      color='grey'
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "20px",
                        transform: "translateY(-50%)",
                      }}
                    />
                  </div>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col lg={3}>
            <Row className='bg-light'>
              {!loading && posts && (
                <Tags
                  posts={posts}
                  selectedTag={selectedTag}
                  handleChangeTag={handleChangeTag}
                />
              )}
            </Row>
          </Col>
          <Col lg={9}>
            <Row>
              {!loading &&
                filterPosts.map((post) => (
                  <BlogCard post={post} key={post._id} />
                ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default BlogHomePage;
