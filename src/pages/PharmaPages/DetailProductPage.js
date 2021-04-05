import React, { useEffect, useState } from "react";
import { Col, Container, Row, Accordion, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretLeft,
  faCaretRight,
  faShoppingBag,
  faFilePrescription,
  faPills,
} from "@fortawesome/free-solid-svg-icons";
import ReviewBox from "../../components/ReviewBox";
import BlogCardMini from "../../components/BlogCardMini";
import StarRatings from "react-star-ratings";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../redux/actions/product.actions";
import { postActions } from "./../../redux/actions/post.actions";
import cartActions from "../../redux/actions/cart.actions";
import { useParams } from "react-router-dom";
//import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";

const ImagesColumn = (props) => {
  return (
    <div className='d-flex flex-row flex-sm-column'>
      <div className='mb-2 mr-2 mr-sm-0'>
        <img className='w-100' src={props.images[0]} alt='' />
      </div>
    </div>
  );
};
const ProductInfo = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(cartActions.addProductToCart(product, quantity));
  };
  return (
    <>
      <h2 className='mt-2 text-capitalize mt-5'>{product.name}</h2>
      <p className='text-muted lead'>
        {new Intl.NumberFormat().format(product.price)} VND
      </p>
      {product.avgRating && (
        <StarRatings
          rating={product.avgRating}
          starRatedColor='#FFC107'
          numberOfStars={5}
          name='rating'
          starDimension='18px'
          starSpacing='1px'
        />
      )}

      <div className='text-small mb-4 mt-2'>{product.indication}</div>

      {product.isPrescription === false && (
        <div className='row align-items-stretch mb-4'>
          <div className='col-sm-5 pr-sm-0'>
            <div className='border d-flex align-items-center justify-content-between py-1 px-3 bg-white border-white'>
              <span className='small text-uppercase text-gray mr-4 no-select'>
                Quantity
              </span>
              <div className='quantity mr-3'>
                <button
                  className='dec-btn p-0'
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                >
                  <FontAwesomeIcon icon={faCaretLeft} />
                </button>
                <span className='btn mr-2'>{quantity}</span>
                <button
                  className='inc-btn p-0 pr-2'
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <FontAwesomeIcon icon={faCaretRight} />
                </button>
              </div>
            </div>
          </div>
          <div className='col-sm-3 pl-sm-0'>
            <button
              className='btn btn-primary btn-sm btn-block h-100 d-flex align-items-center justify-content-center px-0'
              onClick={handleAddToCart}
            >
              <FontAwesomeIcon
                icon={faShoppingBag}
                className='py-1 mr-2'
                size='2x'
              />
              Add to cart
            </button>
          </div>
        </div>
      )}
      {product?.isPrescription === true && (
        <Link to={`/pharmacy/create-prescription`}>
          <button
            className='btn btn-primary px-2 ml-2'
            //onClick={() => history.push(`/pharmacy/create-prescription`)}
          >
            Upload Prescription
            <FontAwesomeIcon
              icon={faFilePrescription}
              className='ml-2'
              size='lg'
            />
          </button>
        </Link>
      )}
    </>
  );
};

const DetailAccordion = (props) => {
  return (
    <Accordion defaultActiveKey='0'>
      <Card>
        <Card.Header className='bg-white shadow-sm border-0'>
          <Accordion.Toggle as={Button} variant='link' eventKey='0'>
            <h6 className='mb-0 font-weight-bold d-block position-relative collapsed text-dark text-uppercase collapsible-link py-'>
              Ingredient
            </h6>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey='0'>
          <Card.Body className='p-5'>
            <p className='font-weight-light m-0'>{props.ingredient}</p>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Card.Header className='bg-white shadow-sm border-0'>
          <Accordion.Toggle as={Button} variant='link' eventKey='1'>
            <h6 className='mb-0 font-weight-bold d-block position-relative collapsed text-dark text-uppercase collapsible-link py-'>
              Indication
            </h6>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey='1'>
          <Card.Body className='p-5'>
            <p className='font-weight-light m-0'>{props.indication}</p>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Card.Header className='bg-white shadow-sm border-0'>
          <Accordion.Toggle as={Button} variant='link' eventKey='2'>
            <h6 className='mb-0 font-weight-bold d-block position-relative collapsed text-dark text-uppercase collapsible-link py-'>
              Precaution
            </h6>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey='2'>
          <Card.Body className='p-5'>
            <p className='font-weight-light m-0'>{props.precaution}</p>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Card.Header className='bg-white shadow-sm border-0'>
          <Accordion.Toggle as={Button} variant='link' eventKey='3'>
            <h6 className='mb-0 font-weight-bold d-block position-relative collapsed text-dark text-uppercase collapsible-link py-'>
              Storage
            </h6>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey='3'>
          <Card.Body className='p-5'>
            <p className='font-weight-light m-0'>{props.storage}</p>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};
const DetailProductPage = () => {
  const product = useSelector((state) => state.product.selectedProduct);
  const products = useSelector((state) => state.product.products);
  const posts = useSelector((state) => state.post.posts);
  const loadingPost = useSelector((state) => state.post.loading);
  const loadingSelectedProduct = useSelector(
    (state) => state.product.loadingSelectedProduct
  );
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productActions.getSingleProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    console.log("categoryId", product?.category?._id);
    if (product?.category?._id) {
      dispatch(postActions.postsRequestByCategory(product?.category?._id));
      dispatch(
        productActions.productsRequest(null, null, product?.category?._id)
      );
    }
  }, [dispatch, product]);
  console.log("posts", posts);
  console.log("products", products);

  return (
    <Container fluid className='bg-light mt-5' style={{ minHeight: "90vh" }}>
      <Container className='pt-4 pb-5'>
        {loadingSelectedProduct ? (
          <div className='text-center mt-5 d-flex justify-content-center align-items-center'>
            {/* //<ClipLoader color='#f86c6b' size={150} loading={loading} /> */}
            <FontAwesomeIcon
              icon={faPills}
              className='loaderImage mt-5'
              size='4x'
              color='#4650dd'
            />{" "}
          </div>
        ) : (
          <>
            {product && (
              <>
                <Row>
                  <Col lg={6}>
                    <Row>
                      <Col lg={2}>
                        <ImagesColumn images={product.images} />
                      </Col>
                      <Col lg={10}>
                        <img
                          className='img-fluid w-100'
                          src={product.images[0]}
                          alt=''
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={6}>
                    <ProductInfo product={product} />
                  </Col>
                </Row>
                <h2 className='h5 text-uppercase my-4'>Product Information</h2>
                <DetailAccordion {...product} />

                {product && product?.reviews && product?.reviews?.length > 0 && (
                  <>
                    <h2 className='h5 text-uppercase my-4'>Reviews</h2>
                    <ReviewBox product={product} />
                  </>
                )}
                <h2 className='h5 text-uppercase my-4'>Related Products</h2>
                <Row>
                  {products &&
                    products.length > 0 &&
                    products
                      .filter((p) => p._id !== product._id)
                      .slice(-4)
                      .map((product) => (
                        <Col lg={3}>
                          <ProductCard product={product} key={product._id} />
                        </Col>
                      ))}
                </Row>
              </>
            )}
          </>
        )}
      </Container>

      {!loadingSelectedProduct && !loadingPost && posts && posts.length > 0 && (
        <Container className='pb-5'>
          <header className='text-center my-5'>
            <h3 className='mb-1'>Our Resource Blog</h3>
            <div className='text-muted text-small'>
              Where you can find useful knowledge
            </div>
          </header>
          <Row>
            {!loadingSelectedProduct &&
              !loadingPost &&
              posts &&
              posts.slice(0, 3).map((post) => (
                <Col lg={4} className='mb-3'>
                  <BlogCardMini post={post} key={post._id} />
                </Col>
              ))}
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default DetailProductPage;
