import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ProductCard from "../../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "./../../redux/actions/product.actions";
import FilterBar from "../../components/FilterBar";
import PaginationBar from "../../components/PaginationBar";
import SearchBar2 from "../../components/SearchBar2";
import banner4 from "../../images/banner-4.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePrescription } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const ShopPage = () => {
  const [pageNum, setPageNum] = useState(1);
  const [searchTerm, setSearchTerm] = useState(null);
  const [query, setQuery] = useState("");
  const products = useSelector((state) => state.product.products);
  const totalPages = useSelector((state) => state.product.totalPages);
  const mainCategories = useSelector((state) => state.product.categories);
  const loading = useSelector((state) => state.product.loading);
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const [sortBy, setSortBy] = useState({ key: "", ascending: -1 });
  const [price, setPrice] = useState({ min: 0, max: 500000 });
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(productActions.getMainCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      productActions.productsRequest(pageNum, null, null, query, sortBy, price)
    );
  }, [dispatch, pageNum, query, sortBy, price]);
  const handlePageChange = (page) => {
    setPageNum(page.selected + 1);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setQuery(searchTerm);
  };
  const handleSelectedSort = (e) => {
    setSortBy(e.value);
  };
  const handlePriceRange = (value) => {
    setPrice(value);
  };
  const shouldShowPagination = products.length > 0 && totalPages > 1;
  return (
    <>
      <div
        className='hero bg-top mt-5'
        style={{
          background: `url(${banner4}) no-repeat`,
          backgroundSize: `100% 80%`,
          minHeight: "45vh",
        }}
      >
        <h3
          className='text-center text-capitalize font-weight-bold'
          style={{ paddingTop: "80px" }}
        >
          Online Pharmacy
        </h3>

        <div className='text-center pt-2' style={{ fontSize: "16px" }}>
          You can easily order{" "}
          <span className='badge bg-soft-primary'>Prescription Drugs </span> by
          uploading your prescription
          <button
            className='btn btn-primary px-2 ml-2'
            onClick={() => history.push(`/pharmacy/create-prescription`)}
          >
            Upload{" "}
            <FontAwesomeIcon
              icon={faFilePrescription}
              className='ml-2'
              size='lg'
            />
          </button>
        </div>
      </div>

      <Container style={{ minHeight: "90vh", marginBottom: "80px" }}>
        <Row>
          <Col></Col>
          <Col lg={9}>
            <SearchBar2
              onSubmit={onSubmit}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            {!loadingCategory && (
              <FilterBar
                categories={mainCategories}
                main={true}
                selectedSort={sortBy}
                handleSelectedSort={handleSelectedSort}
                priceRange={price}
                handlePriceRange={handlePriceRange}
              />
            )}
          </Col>
          <Col lg={9}>
            <Row>
              <Row className='px-4'>
                {!loading &&
                  !loadingCategory &&
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
            </Row>
          </Col>
        </Row>

        {shouldShowPagination && (
          <div className='d-flex justify-content-end'>
            <PaginationBar
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </div>
        )}
      </Container>
    </>
  );
};

export default ShopPage;
