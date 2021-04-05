import React, { useEffect, useState } from "react";
import { Row, Table, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../../redux/actions/auth.actions";
import FormSearch from "../../../components/FormSearch";
import PaginationBar from "../../../components/PaginationBar";
import { ClipLoader } from "react-spinners";

const AdminCustormerPage = () => {
  const [pageNum, setPageNum] = useState(1);
  const customers = useSelector((state) => state.auth.customers);
  const totalPages = useSelector((state) => state.auth.totalPages);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authActions.getAllCustomers(pageNum));
  }, [dispatch, pageNum]);
  const handlePageChange = (page) => {
    setPageNum(page.selected + 1);
  };
  console.log("customers", customers);
  return (
    <>
      <div className='d-flex flex-row justify-content-between'>
        <Col md={2}></Col>
        <Col md={6}>
          <FormSearch placeholder={`Search by customer name ...`} />
        </Col>
        <Col md={4} className='d-flex justify-content-end'>
          <PaginationBar
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </Col>
      </div>

      <Row>
        <Col md={12}>
          {loading && (
            <div className='text-center'>
              <ClipLoader color='#f86c6b' size={150} loading={loading} />
            </div>
          )}
          {!loading && (
            <div className='table-responsive shadow rounded '>
              <Table className='shadow table table-center bg-white mb-0 table-borderless'>
                <thead>
                  <tr className='border-bottom'>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Phone Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer, idx) => (
                    <tr key={customer._id} className='border-bottom'>
                      <th>{idx + 1}</th>
                      <td>{customer.name}</td>
                      <td>{customer.email}</td>
                      <td>{customer.address}</td>
                      <td>{customer?.phone && `(+84)${customer.phone}`}</td>
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

export default AdminCustormerPage;
