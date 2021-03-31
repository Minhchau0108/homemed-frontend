import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Table, Col, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faShoppingBag,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { productActions } from "../../../redux/actions/product.actions";
import SearchBar from "../../../components/SearchBar";
import AdminCartPage from "./AdminCartPage";
import SearchBar2 from "../../../components/SearchBar2";
import PaginationBar from "../../../components/PaginationBar";

const AdminCreateOrder = ({ prescription }) => {
  const [pageNum, setPageNum] = useState(1);
  const products = useSelector((state) => state.product.products);
  const totalPages = useSelector((state) => state.product.totalPages);
  const dispatch = useDispatch();
  const limit = 9;
  useEffect(() => {
    dispatch(productActions.productsRequest(pageNum, limit));
  }, [dispatch, pageNum, limit]);
  const [cart, setCart] = useState({
    products: [],
    totalPrice: 0,
  });

  const handleAddToCart = (product) => {
    let newProducts;
    if (cart.products.length === 0) {
      newProducts = [...cart.products, { ...product, qty: 1 }];
    }
    if (cart.products.length !== 0) {
      let check = false;
      cart.products.map((item) => {
        if (item._id === product._id) {
          item.qty++;
          check = true;
        }
      });
      if (check) {
        newProducts = [...cart.products];
      }
      if (!check) {
        newProducts = [...cart.products, { ...product, qty: 1 }];
      }
    }
    const newTotalPrice = newProducts.reduce(
      (total, item) => total + item.qty * item.price,
      0
    );
    setCart({ products: newProducts, totalPrice: newTotalPrice });
  };
  const handleEmptyCart = (id) => {
    let newProducts = cart.products.filter((item) => item._id !== id);
    const newTotalPrice = newProducts.reduce(
      (total, item) => total + item.qty * item.price,
      0
    );
    setCart({ products: newProducts, totalPrice: newTotalPrice });
  };
  const addQuantity = (id) => {
    let newProducts = cart.products.map((item) =>
      item._id === id ? { ...item, qty: item.qty + 1 } : item
    );
    const newTotalPrice = newProducts.reduce(
      (total, item) => total + item.qty * item.price,
      0
    );
    setCart({ products: newProducts, totalPrice: newTotalPrice });
  };
  const subQuantity = (id) => {
    console.log("subquantity", id);
    let newProducts = cart.products.map((item) =>
      item._id === id
        ? { ...item, qty: item.qty !== 1 ? item.qty - 1 : 1 }
        : item
    );
    const newTotalPrice = newProducts.reduce(
      (total, item) => total + item.qty * item.price,
      0
    );
    setCart({ products: newProducts, totalPrice: newTotalPrice });
  };
  const handlePageChange = (page) => {
    setPageNum(page.selected + 1);
  };

  return (
    <>
      <Row className='mt-5 bg-white m-1 pt-3 shadow rounded'>
        <Col lg={5}>
          <div className='px-3'>
            <Form
              className='p-1 shadow-sm bg-light mb-1'
              style={{ borderRadius: "0.3rem" }}
            >
              <div className='bg-light seach-bar position-relative'>
                <input
                  className='border-0 mr-2 bg-light search-bar-input'
                  placeholder='Search medicine'
                />
                <button
                  className='btn btn-primary'
                  style={{
                    width: "50px",
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                  }}
                >
                  <FontAwesomeIcon icon='search' />
                </button>
              </div>
            </Form>
          </div>

          <Table className='table-borderless mt-3 '>
            <tbody>
              {products.length > 0 &&
                products.map((p) => (
                  <tr key={p._id}>
                    <td className='py-2'>
                      {" "}
                      <div class='py-1 d-flex flex-row align-items-center mb-2'>
                        {" "}
                        <img
                          src={p.images && p.images[0]}
                          class='rounded-circle'
                          width='40'
                        />
                        <div class='d-flex flex-column ml-2'>
                          {" "}
                          <span class='d-block font-weight-bold'>
                            {p.name.substring(0, 50)}
                          </span>{" "}
                          <small class='text-muted'>{p.ingredient}</small>{" "}
                        </div>
                      </div>
                    </td>
                    <td className='py-2'>
                      <FontAwesomeIcon
                        style={{ cursor: "pointer" }}
                        icon={faPlusCircle}
                        className='mr-1'
                        color='#4650dd'
                        onClick={() => handleAddToCart(p)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <div className='d-flex justify-content-between'>
            <PaginationBar
              totalPages={totalPages}
              handlePageChange={handlePageChange}
              selectedPage={pageNum - 1}
            />
          </div>
        </Col>
        <Col>
          <AdminCartPage
            cart={cart}
            handleEmptyCart={handleEmptyCart}
            addQuantity={addQuantity}
            subQuantity={subQuantity}
            prescription={prescription}
          />
        </Col>
      </Row>
    </>
  );
};

export default AdminCreateOrder;
