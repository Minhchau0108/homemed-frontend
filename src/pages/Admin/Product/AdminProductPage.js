import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  ButtonGroup,
  ToggleButton,
  Badge,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faPlus, faPills } from "@fortawesome/free-solid-svg-icons";
import FormSearch from "../../../components/FormSearch";
import PaginationBar from "../../../components/PaginationBar";
import { productActions } from "../../../redux/actions/product.actions";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <>
      <Card className='border-0 mb-3'>
        <div className='position-relative product shadow'>
          <div className='position-relative'>
            <img src={product.images[0]} alt='' className='img-fluid' />
          </div>
        </div>

        <Card.Body className='card-body p-2'>
          <h6 className='mb-0 text-dark'>{product.name.substring(0, 20)}</h6>

          <div className='d-flex justify-content-between mt-1'>
            <h6 className='text-muted font-italic mb-0'>
              {new Intl.NumberFormat().format(product.price)}
            </h6>
            {product?.avgRating && (
              <StarRatings
                rating={product?.avgRating}
                starRatedColor='#FFC107'
                numberOfStars={5}
                name='rating'
                starDimension='14px'
                starSpacing='1px'
              />
            )}
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

const AdminProductPage = () => {
  const [pageNum, setPageNum] = useState(1);
  const [searchTerm, setSearchTerm] = useState(null);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const products = useSelector((state) => state.product.products);
  const loading = useSelector((state) => state.product.loading);
  const totalPages = useSelector((state) => state.product.totalPages);
  const mainCategories = useSelector((state) => state.product.categories);
  const loadingMainCategory = useSelector(
    (state) => state.product.loadingCategory
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productActions.getMainCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      productActions.productsRequest(pageNum, 8, selectedCategory, query)
    );
  }, [dispatch, pageNum, selectedCategory, query]);
  const handleClickCategory = (e) => {
    console.log("e", e.target.value);
    setPageNum(1);
    setSelectedCategory(e.target.value);
  };
  const handlePageChange = (page) => {
    setPageNum(page.selected + 1);
  };
  return (
    <>
      <div className='d-flex flex-row justify-content-between'>
        <Col md={3}></Col>
        <Col md={5}>
          <FormSearch
            placeholder={`Search by product name ...`}
            handleChange={(e) => setSearchTerm(e.target.value)}
            handleSubmit={(e) => {
              e.preventDefault();
              setQuery(searchTerm);
            }}
          />
        </Col>
        <Col md={4} className='d-flex justify-content-end'>
          <Link to='create-product'>
            <button className='btn btn-primary my-2 mx-2 btn-pills '>
              <FontAwesomeIcon icon={faPlus} className='mr-1' />
              <span> Add new product</span>
            </button>
          </Link>
        </Col>
      </div>

      <Row>
        <Col md={3}>
          {!loadingMainCategory && (
            <Card className='card p-2 rounded'>
              <h6 className='text-left text-uppercase pl-2 mt-3'>
                <FontAwesomeIcon icon={faTag} className='mr-2 text-muted' />
                Category
              </h6>
              <ButtonGroup toggle vertical style={{ width: "100%" }}>
                {mainCategories.length &&
                  mainCategories.map((c, idx) => (
                    <ToggleButton
                      key={c._id}
                      type='radio'
                      className='mb-2 d-flex justify-content-between text-capitalize text-dark'
                      variant='outline-category'
                      name='tag'
                      value={c._id}
                      checked={selectedCategory === c._id}
                      onChange={handleClickCategory}
                    >
                      <span style={{ fontWeight: "600px" }}>{c.name}</span>

                      <Badge
                        pill
                        variant='light'
                        style={{ paddingTop: "5px", color: "#1877f2" }}
                      >
                        {c?.sum}
                      </Badge>
                    </ToggleButton>
                  ))}
              </ButtonGroup>
            </Card>
          )}
        </Col>
        <Col md={9}>
          <Row>
            {(loading || loadingMainCategory) && (
              <div className='text-center col-md-6 mt-5 d-flex justify-content-center align-items-center'>
                <FontAwesomeIcon
                  icon={faPills}
                  className='loaderImage mt-5'
                  size='4x'
                  color='#4650dd'
                />{" "}
              </div>
            )}
            {!loading &&
              !loadingMainCategory &&
              products &&
              products.map((product, idx) => (
                <Col lg={3} key={idx}>
                  <ProductCard key={product._id} product={product} />
                </Col>
              ))}
          </Row>
          <div className='d-flex justify-content-end'>
            {!loading && !loadingMainCategory && (
              <PaginationBar
                totalPages={totalPages}
                handlePageChange={handlePageChange}
                selectedPage={pageNum - 1}
              />
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default AdminProductPage;
