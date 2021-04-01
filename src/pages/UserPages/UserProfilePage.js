import React, { useState } from "react";
import { Col, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../redux/actions/auth.actions";

const UserProfilePage = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const [imageURL, setImageURL] = useState(currentUser?.profileURL);
  const [formData, setFormData] = useState({
    name: currentUser.name,
    phone: currentUser.phone,
    address: currentUser.address,
    profileURL: currentUser.profileURL,
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const dispatch = useDispatch();
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
  const handleSubmit = (e) => {
    e.preventDefault();
    formData.profileURL = imageURL;
    console.log("formData", formData);
    dispatch(authActions.updateProfile(formData));
  };

  return (
    <>
      <div
        class='card bg-white mt-sm-4 mb-5'
        style={{
          padding: "30px 50px",
          borderRadius: `15px`,
          margin: `10px auto`,
          maxWidth: `600px`,
        }}
      >
        <h5 class='pb-4 font-weight-bold border-bottom'>Your Profile</h5>
        <div class='d-flex flex-row align-items-between py-3 border-bottom'>
          <div>
            <div className='title-h6 mb-1'>Profile Photo</div>
            <p>Accepted file type .png, .jpeg</p>
            <button class='btn btn-primary' onClick={() => widget.open()}>
              Upload
            </button>
          </div>
          <div className='ml-5'>
            <img
              className='rounded-circle'
              src={imageURL && imageURL}
              width='100'
              alt=''
            />
          </div>
        </div>
        <div class='py-2'>
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={currentUser?.email}
                  disabled
                />
              </Form.Group>

              <Form.Group as={Col} controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId='address'>
              <Form.Label>Address</Form.Label>
              <Form.Control value={formData.address} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId='phone'>
              <Form.Label>Phone</Form.Label>
              <Form.Control value={formData.phone} onChange={handleChange} />
            </Form.Group>

            <Button variant='primary' type='submit'>
              Save Changes
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;
