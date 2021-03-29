import React, { useState } from "react";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { orderActions } from "../../redux/actions/order.actions";
import { useHistory } from "react-router-dom";

const CheckoutPage = () => {
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);
  const products = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const currentUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const createOrder = (e) => {
    e.preventDefault();
    const order = {
      userId: currentUser._id,
      phone: phone,
      address: address,
      products: products,
      totalPrice: totalPrice,
    };
    console.log("order", order);
    if (products.length > 0) {
      dispatch(orderActions.createOrder(order));
    }

    history.push("/cart/thankyou");
  };

  return (
    <>
      <Container className='my-5'>
        <h2 className='h5 text-uppercase py-5'>Billing details</h2>
        <Row>
          <Col lg={6}>
            <Form onSubmit={createOrder}>
              <Form.Group controlId='formGridAddress1'>
                <Form.Label>
                  Phone <span className='text-danger'>*</span>
                </Form.Label>
                <Form.Control
                  placeholder='1234 Main St'
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId='formGridAddress2'>
                <Form.Label>
                  Shipping Address <span className='text-danger'>*</span>
                </Form.Label>
                <Form.Control
                  placeholder='Apartment, studio, or floor'
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId='formBasicCheckbox'>
                <Form.Label>Payment</Form.Label>
                <Form.Check
                  type='radio'
                  defaultChecked={true}
                  label='Cash on delivery'
                />
              </Form.Group>

              <Button
                variant='primary'
                type='submit'
                className='mt-5'
                disabled={products.length === 0}
              >
                Place order
              </Button>
            </Form>
          </Col>
          <Col lg={6}>
            <div className='card border-0 rounded-0 p-lg-4 bg-light'>
              <div className='card-body'>
                <h5 className='text-uppercase mb-4'>Your order summary</h5>
                <ul className='list-unstyled mb-0'>
                  {products.map((product) => (
                    <>
                      <li className='d-flex align-items-center justify-content-between'>
                        <strong className='font-weight-bold'>
                          {product.name}
                        </strong>
                        <span className='text-muted'>
                          {new Intl.NumberFormat().format(
                            product.qty * product.price
                          )}
                        </span>
                      </li>
                      <li className='border-bottom my-2'></li>
                    </>
                  ))}
                  <li className='d-flex align-items-center justify-content-between'>
                    <strong className='font-weight-bold'>Total</strong>
                    <span className='text-muted '>
                      {new Intl.NumberFormat().format(totalPrice)}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CheckoutPage;
