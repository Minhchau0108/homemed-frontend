import React, { useState, useEffect } from "react";
import { Col, Form, Button, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { productActions } from "../../../redux/actions/product.actions";
import Select from "react-select";

const AdminCreateProduct = () => {
  const [imageURLs, setImageURLs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const subCategories = useSelector((state) => state.product.categories);
  const [formData, setFormData] = useState({
    name: "",
    rxId: "",
    isPrescription: false,
    ingredient: "",
    indication: "",
    volume: "",
    precaution: "",
    storage: "",
    price: 0,
    category: "",
    images: [],
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productActions.getAllSubCategories());
  }, [dispatch]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const widget = window.cloudinary.createUploadWidget(
    {
      cloudName: "dqvyn7tom",
      uploadPreset: "homemed_upload",
    },
    (err, result) => {
      if (result.event === "success") {
        // setImageURL(result.info.url);
        setImageURLs([...imageURLs, result.info.url]);
      }
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("selected category", selectedCategory.value);
    formData.category = selectedCategory.value;
    formData.images = imageURLs;
    console.log("form", formData);
    dispatch(productActions.createNewProduct(formData));
  };
  return (
    <>
      <Col lg={10} className='mx-auto my-3'>
        <Row className='justify-content-between p-3'>
          <div className='title-h5'>Upload product's picture</div>
          <Button variant='primary' onClick={() => widget.open()}>
            Upload{" "}
          </Button>
        </Row>
      </Col>

      <Col lg={10} className='mx-auto my-3 bg-white p-3 border-0 rounded'>
        <Form className='border-0 p-3 rounded' onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              name='name'
              placeholder='Enter name'
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>RxId</Form.Label>
              <Form.Control name='rxId' type='text' onChange={handleChange} />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Is Prescription Drug</Form.Label>
              <Form.Control
                as='select'
                custom
                onChange={handleChange}
                name='isPresctiption'
              >
                <option value={true}>True</option>
                <option value={false}>False</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <Form.Label>Ingredient</Form.Label>
            <Form.Control
              type='text'
              name='ingredient'
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Volumn</Form.Label>
            <Form.Control type='text' name='volume' onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Indication</Form.Label>
            <Form.Control
              type='text'
              name='indication'
              as='textarea'
              rows={2}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Precaution</Form.Label>
            <Form.Control
              type='text'
              name='precaution'
              as='textarea'
              rows={3}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Storage</Form.Label>
            <Form.Control
              type='text'
              name='storage'
              as='textarea'
              rows={2}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control type='number' name='price' onChange={handleChange} />
          </Form.Group>

          <div>Category</div>
          <Select
            onChange={setSelectedCategory}
            options={subCategories.map((c) => ({
              value: c._id,
              label: c.name,
            }))}
          />

          <Button variant='primary' type='submit' className='mt-5'>
            Submit
          </Button>
        </Form>
      </Col>
    </>
  );
};

export default AdminCreateProduct;
