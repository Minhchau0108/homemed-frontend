import React, { useState, useEffect } from "react";
import { Row, Col, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { orderActions } from "./../../redux/actions/order.actions";
import PaginationBar from "../../components/PaginationBar";
import moment from "moment";

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

const UserOrderPage = () => {
  const [pageNum, setPageNum] = useState(1);
  const [selectedOption, setSelectedOption] = useState({
    value: "",
    label: "",
  });
  const totalPages = useSelector((state) => state.order.totalPages);
  const orders = useSelector((state) => state.order.orders);
  const currentUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (currentUser?._id) {
      dispatch(
        orderActions.getMyOrders(
          currentUser._id,
          pageNum,
          null,
          selectedOption.value
        )
      );
    }
  }, [dispatch, currentUser, pageNum, selectedOption]);

  const options = [
    { value: "new", label: "New" },
    { value: "confirmed", label: "Confirmed" },
    { value: "cancelled", label: "Cancelled" },
    { value: "delivered", label: "Delivered" },
  ];
  const handlePageChange = (page) => {
    setPageNum(page.selected + 1);
  };

  console.log("selectedOption", selectedOption);
  return (
    <>
      <Row>
        <Col className='mt-0 pt-2'>
          <Row className='justify-content-between my-3'>
            <Col md={3}>
              <div className='title-h5'>Order</div>
            </Col>
            <Col md={3}>
              <Select
                options={options}
                onChange={setSelectedOption}
                placeholder={`Filter by status`}
              />
            </Col>
          </Row>

          <div className='table-responsive rounded shadow mt-3'>
            <Table className='shadow table table-center bg-white mb-0 table-borderless'>
              <thead>
                <tr className='border-bottom'>
                  <th>#</th>
                  <th>Date</th>
                  <th>Shipping Address</th>
                  <th>Phone Contact</th>
                  <th>Nb Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 &&
                  orders.map((order, idx) => (
                    <tr key={order._id} className='border-bottom'>
                      <th>{idx + 1}</th>
                      <td>{moment(order?.createdAt).format("LL")}</td>
                      <td>{order.address}</td>
                      <td>(+84){order.phone}</td>
                      <td>{order.products.length}</td>
                      <td>
                        {new Intl.NumberFormat().format(order?.totalPrice)}
                      </td>
                      <td>{generateStatus(order?.status)}</td>
                      <td className='pt-2'>
                        <button
                          className='btn btn-icon btn-pills btn-soft-primary btn-sm'
                          onClick={() => history.push(`orders/${order._id}`)}
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
          <div className='d-flex justify-content-end'>
            <PaginationBar
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default UserOrderPage;
