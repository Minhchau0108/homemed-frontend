import React, { useEffect, useState } from "react";
import { Row, Table, Col, Card } from "react-bootstrap";
import SearchBar2 from "../../../components/SearchBar2";
import { useSelector, useDispatch } from "react-redux";
import { orderActions } from "../../../redux/actions/order.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faPen, faEye } from "@fortawesome/free-solid-svg-icons";
import GroupRadioButton from "../../../components/GroupRadioButton";
import FormSearch from "../../../components/FormSearch";
import { useHistory } from "react-router-dom";
import PaginationBar from "../../../components/PaginationBar";
import moment from "moment";
import Select from "react-select";
import { ClipLoader } from "react-spinners";

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
const generateIcon = (status) => {
  if (status === "new" || status === "confirmed")
    return <FontAwesomeIcon icon={faPen} />;
  return <FontAwesomeIcon icon={faEye} />;
};
const AdminOrderPage = () => {
  const [pageNum, setPageNum] = useState(1);
  const orders = useSelector((state) => state.order.orders);
  const totalPages = useSelector((state) => state.order.totalPages);
  const loading = useSelector((state) => state.order.loading);
  const [status, setStatus] = useState("new");
  const history = useHistory();

  const statusOptions = [
    { name: "New", value: "new" },
    { name: "Confirmed", value: "confirmed" },
    { name: "Cancelled", value: "cancelled" },
    { name: "Delivered", value: "delivered" },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(orderActions.getAllOrders(pageNum, null, status));
  }, [dispatch, pageNum, status]);
  const handlePageChange = (page) => {
    setPageNum(page.selected + 1);
  };
  return (
    <>
      <div className='d-flex flex-row justify-content-between'>
        <Col md={2}></Col>
        <Col md={6}>
          <FormSearch placeholder={`Search by customer name ...`} />
        </Col>
        <Col md={4} className='d-flex justify-content-end'>
          {!loading && totalPages > 1 && (
            <PaginationBar
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          )}
        </Col>
      </div>

      <Row>
        <Col md={2}>
          <Card className='card p-2 rounded'>
            <h6 className='text-left text-uppercase pl-2 mt-3'>
              <FontAwesomeIcon icon={faTag} className='mr-2 text-muted' />
              status
            </h6>
            <GroupRadioButton
              radioValue={status}
              radios={statusOptions}
              handleChangeRadio={(e) => setStatus(e.currentTarget.value)}
            />
          </Card>
        </Col>
        <Col md={10}>
          {loading ? (
            <div className='text-center'>
              <ClipLoader color='#f86c6b' size={150} loading={loading} />
            </div>
          ) : (
            <div className='table-responsive shadow rounded pl-0'>
              <Table className='shadow table table-center bg-white mb-0 table-borderless'>
                <thead>
                  <tr className='border-bottom'>
                    <th>ID</th>
                    <th>Order Date</th>
                    <th>Customer</th>
                    <th>Shipping Address</th>
                    <th>Phone Contact</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {!loading &&
                    orders.map((order, idx) => (
                      <tr key={order._id} className='border-bottom'>
                        <th>{idx + 1}</th>
                        <td>{moment(order?.createdAt).format("LL")}</td>
                        <td>{order?.customer?.name}</td>
                        <td>{order.address}</td>
                        <td>(+84){order.phone}</td>
                        <td>
                          {new Intl.NumberFormat().format(order?.totalPrice)}
                        </td>
                        <td>{generateStatus(order?.status)}</td>
                        <td className='pt-2'>
                          <button
                            className='btn btn-icon btn-pills btn-soft-primary btn-sm'
                            onClick={() => history.push(`orders/${order._id}`)}
                          >
                            {generateIcon(order?.status)}
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};

export default AdminOrderPage;
