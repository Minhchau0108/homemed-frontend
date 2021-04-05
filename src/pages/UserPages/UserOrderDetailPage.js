import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../../redux/actions/order.actions";
import { Row, Col, Table, Container, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCapsules } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import cod from "../../images/cod.png";
import ModalReviewProduct from "../../components/ModalReviewProduct";

const generateStatus = (status) => {
  if (status === "new")
    return (
      <span className='badge bg-soft-primary text-capitalize'>{status}</span>
    );
  if (status === "confirmed")
    return (
      <span className='badge bg-soft-danger text-capitalize'>{status}</span>
    );
  if (status === "cancelled")
    return (
      <span className='badge bg-soft-warning text-capitalize'>{status}</span>
    );
  return (
    <span className='badge bg-soft-success text-capitalize'>{status}</span>
  );
};

const UserOrderRow = ({ product, order }) => {
  const [showModalReview, setShowModalReview] = useState(false);
  const history = useHistory();
  return (
    <tr key={product._id}>
      <td width='20%'>
        <img
          src={product?.images[0]}
          width='90'
          alt=''
          onClick={() => history.push(`/shop/${product?._id}`)}
        />{" "}
      </td>
      <td width='60%'>
        <div className='font-weight-bold'>{product?.name}</div>
        <div>
          <div>
            <span>Quantity:</span> {product?.qty}
            <span className='ml-3'>Unit Price: </span>
            {new Intl.NumberFormat().format(product?.price)}
          </div>

          <div>
            {order && order?.status && order?.status === "delivered" && (
              <>
                <button
                  className='btn btn-sm btn-soft-primary mt-1'
                  onClick={() => setShowModalReview(true)}
                >
                  Write a review
                </button>
                <ModalReviewProduct
                  product={product}
                  showModalReview={showModalReview}
                  handleClose={() => setShowModalReview(false)}
                />
              </>
            )}
          </div>
        </div>
      </td>
      <td width='20%' className='text-right font-weight-bold'>
        {new Intl.NumberFormat().format(product?.price * product?.qty)}
      </td>
    </tr>
  );
};

const UserOrderDetailPage = () => {
  const order = useSelector((state) => state.order.selectedOrder);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(orderActions.getSingleOrder(id));
  }, [dispatch, id]);

  return (
    <Container>
      <Row className='d-flex justify-content-center'>
        <Col md={8}>
          <Card>
            <div className='text-left p-2 px-5 mt-3'>
              <FontAwesomeIcon icon={faCapsules} size='4x' color='#0072B5' />
            </div>
            <div className='p-5'>
              <div className='title-h5'>ORDER DETAIL</div>
              <div className='mt-4 d-flex justify-content-between'>
                <div className='title-h5'>Hello, {order?.customer?.name}</div>
                <div className='title-h6'>
                  Status Order {order && generateStatus(order?.status)}
                </div>
              </div>

              <div className='border-top mt-3 mb-3 border-bottom table-responsive'>
                <Table borderless>
                  <tbody>
                    <tr>
                      <td>
                        <div className='py-2'>
                          <div className='text-muted'>Order Date</div>
                          <div>{moment(order?.createdAt).format("LL")}</div>
                        </div>
                      </td>
                      <td>
                        <div className='py-2'>
                          <div className='text-muted'>Payment</div>
                          <img src={cod} width='40' alt='' />
                        </div>
                      </td>
                      <td>
                        <div className='py-2'>
                          <div className='text-muted'>Shiping Address</div>
                          <div>{order?.address}</div>{" "}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <div className='border-bottom table-responsive'>
                <Table borderless>
                  <tbody>
                    {order &&
                      order.products &&
                      order?.products.map((product) => (
                        <>
                          <UserOrderRow
                            key={product._id}
                            product={product}
                            order={order}
                          />
                        </>
                      ))}
                  </tbody>
                </Table>
              </div>
              <Row className='justify-content-end'>
                <Col md={5}>
                  <Table borderless>
                    <tbody>
                      <tr className='border-bottom'>
                        <td className='text-left font-weight-bold'>Total</td>
                        <td className='text-right font-weight-bold'>
                          {new Intl.NumberFormat().format(order?.totalPrice)}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserOrderDetailPage;
