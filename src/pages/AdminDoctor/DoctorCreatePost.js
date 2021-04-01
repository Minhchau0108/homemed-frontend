import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { postActions } from "../../redux/actions/post.actions";
import Select from "react-select";

const DoctorCreatePost = () => {
  const [imageURL, setImageURL] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });
  const subCategories = useSelector((state) => state.post.categories);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(postActions.getSubCategories());
  }, [dispatch]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form", formData);
    dispatch(
      postActions.createNewPost(
        formData.title,
        formData.body,
        imageURL,
        selectedTags
      )
    );
  };

  const handleChangeTags = (newValue) => {
    const newTags = newValue.map((x) => x.value);
    setSelectedTags(newTags);
  };
  const widget = window.cloudinary.createUploadWidget(
    {
      cloudName: "dqvyn7tom",
      uploadPreset: "homemed_upload",
    },
    (err, result) => {
      console.log("result");
      if (result.event === "success") {
        setImageURL(result.info.url);
      }
    }
  );
  console.log("subCategories", subCategories);

  console.log("newTags", selectedTags);
  return (
    <Container>
      <Row>
        <Col md={9}>
          <Form onSubmit={handleSubmit}>
            <div className='my-3'>
              <div className='title-h5 text-primary'>Create Post</div>
            </div>
            <Form.Group>
              <Form.Control
                type='text'
                required
                placeholder='Title'
                name='title'
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                as='textarea'
                rows='10'
                placeholder='Content'
                name='body'
                onChange={handleChange}
              />
            </Form.Group>

            <div className='mb-3'>Tags</div>
            <Select
              placeholder={`Select Tag for Post`}
              isMulti
              options={subCategories.map((c) => ({
                value: c._id,
                label: c.name,
              }))}
              className='basic-multi-select'
              classNamePrefix='select'
              onChange={handleChangeTags}
            />

            <div className='mt-2'>
              <Button variant='primary' onClick={() => widget.open()}>
                Upload Image
              </Button>
            </div>

            <img src={imageURL} width='200px' alt=''></img>

            <div>
              <Button className='mr-3 mt-2' type='submit' variant='primary'>
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorCreatePost;
