import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ProductCard from "../../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "./../../redux/actions/product.actions";
import { useParams } from "react-router-dom";
import FilterBar from "../../components/FilterBar";
import SearchBar2 from "../../components/SearchBar2";
import PaginationBar from "../../components/PaginationBar";
import { ClipLoader } from "react-spinners";
import Skeleton from "react-loading-skeleton";
const CardSkeleton = () => {
  return (
    <>
      {Array(9)
        .fill()
        .map((item, index) => (
          <Col lg={4} sm={6}>
            <div key={index} className='mb-2'>
              <Skeleton height={250} width={250} />
              <Skeleton count={2} height={20} width={250} />
            </div>
          </Col>
        ))}
    </>
  );
};

const FilterBarSkeleton = () => {
  return (
    <>
      <div>
        <Skeleton height={40} />
      </div>
      <div className='my-1'>
        <Skeleton count={4} height={30} />
      </div>
      <div className='mt-3'>
        <Skeleton height={40} />
      </div>
      <div className='my-4'>
        <Skeleton height={30} />
      </div>
    </>
  );
};

const CategoryPage = () => {
  const { mainCategory } = useParams();
  const [pageNum, setPageNum] = useState(1);
  const [searchTerm, setSearchTerm] = useState(null);
  const [query, setQuery] = useState("");
  const products = useSelector((state) => state.product.products);
  const totalPages = useSelector((state) => state.product.totalPages);
  const subCategories = useSelector((state) => state.product.categories);
  const loading = useSelector((state) => state.product.loading);
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const [sortBy, setSortBy] = useState({ key: "", ascending: -1 });
  const [price, setPrice] = useState({ min: 0, max: 500000 });
  const selectedCategory = useSelector(
    (state) => state.product.selectedCategory
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productActions.setSelectedCategory(mainCategory));
    dispatch(productActions.getSubCategories(mainCategory));
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory) {
      dispatch(
        productActions.productsRequest(
          pageNum,
          null,
          selectedCategory,
          query,
          sortBy,
          price
        )
      );
    }
  }, [dispatch, pageNum, query, selectedCategory, sortBy, price]);

  const handleClickCategory = (e) => {
    dispatch(productActions.setSelectedCategory(e.target.value));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setQuery(searchTerm);
  };
  const shouldShowPagination = products.length > 0 && totalPages > 1;
  const handlePageChange = (page) => {
    setPageNum(page.selected + 1);
  };
  const handleSelectedSort = (e) => {
    setSortBy(e.value);
  };
  const handlePriceRange = (value) => {
    setPrice(value);
  };

  return (
    <Container
      style={{ minHeight: "90vh", marginBottom: "80px" }}
      className='mt-5 pt-5'
    >
      <Row className='mt-5'>
        <Col></Col>
        <Col lg={9}>
          <SearchBar2
            onSubmit={onSubmit}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </Row>

      <Row className='mt-5'>
        <Col>
          {loadingCategory && <FilterBarSkeleton />}
          {!loadingCategory && (
            <FilterBar
              main={false}
              categories={subCategories}
              selectedCategory={selectedCategory}
              handleClickCategory={handleClickCategory}
              selectedSort={sortBy}
              handleSelectedSort={handleSelectedSort}
              priceRange={price}
              handlePriceRange={handlePriceRange}
            />
          )}
        </Col>
        <Col lg={9}>
          <Row className='px-4'>
            {(loadingCategory || loading) && <CardSkeleton />}
            {!loading &&
              products.length > 0 &&
              products.map((p) => (
                <Col lg={4} sm={6} key={p._id}>
                  <ProductCard key={p._id} product={p} />
                </Col>
              ))}
            {!loading && products.length === 0 && query !== "" && (
              <h1 className='text-center font-weight-normal'>
                Your search did not match any products.
              </h1>
            )}
          </Row>
          {!loading && !loadingCategory && shouldShowPagination && (
            <div className='d-flex justify-content-end'>
              <PaginationBar
                totalPages={totalPages}
                handlePageChange={handlePageChange}
                selectedPage={pageNum - 1}
              />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CategoryPage;
