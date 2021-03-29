import React, { useState } from "react";
import { Card, Container, Row, Col, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faCaretLeft,
  faCaretRight,
  faLongArrowAltLeft,
  faLongArrowAltRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import cartActions from "../../redux/actions/cart.actions";

const CartTable = ({ products }) => {
  const dispatch = useDispatch();
  return (
    <Table>
      <thead className='bg-light'>
        <tr>
          <th className='border-0'>
            <div className='text-uppercase pt-2'>Product</div>
          </th>
          <th className='border-0'>
            <div className='text-uppercase pt-2'>Unit Price</div>
          </th>
          <th className='border-0'>
            <div className='text-uppercase pt-2'>Quantity</div>
          </th>
          <th className='border-0'>
            <div className='text-uppercase pt-2'>Total</div>
          </th>
          <th className='border-0'></th>
        </tr>
      </thead>
      <tbody>
        {products.length ? (
          products.map((product, key) => (
            <tr key={key}>
              <th className='pl-0 border-0' scope='row'>
                <div className='media align-items-center'>
                  <img src={product?.images[0]} alt='...' width='70' />
                  <div className='media-body ml-3 h6'>{product?.name}</div>
                </div>
              </th>
              <td className='align-middle border-0'>
                <div className='mb-0 '>
                  {" "}
                  {new Intl.NumberFormat().format(product.price)}
                </div>
              </td>
              <td className='align-middle border-0'>
                <div className='border d-flex align-items-center justify-content-between px-3'>
                  <span className='small text-uppercase text-gray headings-font-family'>
                    Quantity
                  </span>
                  <div className='quantity'>
                    <button
                      className='dec-btn p-0'
                      onClick={() =>
                        dispatch(cartActions.subQuantity(product._id))
                      }
                    >
                      <FontAwesomeIcon icon={faCaretLeft} />
                    </button>
                    <span className='btn'>{product.qty}</span>
                    <button
                      className='inc-btn p-0'
                      onClick={() =>
                        dispatch(cartActions.addQuantity(product._id))
                      }
                    >
                      <FontAwesomeIcon icon={faCaretRight} />
                    </button>
                  </div>
                </div>
              </td>
              <td className='align-middle border-0'>
                <div className='mb-0'>
                  {new Intl.NumberFormat().format(product.qty * product.price)}
                </div>
              </td>
              <td className='align-middle border-0'>
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  onClick={() => dispatch(cartActions.emptyCart(product._id))}
                />
              </td>
            </tr>
          ))
        ) : (
          <div class='col-12 text-center'>
            {" "}
            <img
              src='https://i.imgur.com/dCdflKN.png'
              width='130'
              height='130'
              className='img-fluid mb-4 mr-3'
              alt=''
            />
            <h5>Your Cart is Empty</h5>
          </div>
        )}
      </tbody>
    </Table>
  );
};

const CartNav = () => {
  return (
    <div className='bg-light px-4 py-3'>
      <div className='row align-items-center text-center'>
        <div className='col-md-6 mb-3 mb-md-0 text-md-left'>
          <Link to={`/pharmacy`}>
            <button className='btn btn-link p-0 text-primary btn-sm'>
              <FontAwesomeIcon icon={faLongArrowAltLeft} className='mr-2' />
              Continue shopping
            </button>
          </Link>
        </div>
        <div className='col-md-6 text-md-right'>
          <Link to='/cart/checkout'>
            <button className='btn btn-soft-primary btn-sm'>
              Procceed to checkout
              <FontAwesomeIcon icon={faLongArrowAltRight} className='ml-2' />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
const CartTotal = () => {
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  return (
    <Card className='border-0 rounded-0 p-lg-4 bg-light'>
      <Card.Body>
        <h5 className='text-uppercase mb-4'>Cart total</h5>
        <ul className='list-unstyled mb-0'>
          <li className='border-bottom my-2'></li>
          {totalPrice > 0 && (
            <li className='d-flex align-items-center justify-content-between mb-4'>
              <strong className='text-uppercase small font-weight-bold'>
                Total
              </strong>
              <span>{new Intl.NumberFormat().format(totalPrice)}</span>
            </li>
          )}
        </ul>
      </Card.Body>
    </Card>
  );
};

const CartPage = () => {
  const products = useSelector((state) => state.cart.cart);

  return (
    <Container style={{ minHeight: "40vh" }} className='my-5'>
      <h2 className='h5 text-uppercase mb-4'>Shopping cart</h2>
      <Row>
        <Col lg={9}>
          <CartTable products={products} />
          <CartNav />
        </Col>
        <Col lg={3}>
          <CartTotal />
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
