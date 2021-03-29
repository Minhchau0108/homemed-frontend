import React, { useEffect, useState } from "react";
import { Row, Table, Col, Card } from "react-bootstrap";
import SearchBar from "../../../components/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../../redux/actions/auth.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faPen, faEye } from "@fortawesome/free-solid-svg-icons";
import GroupRadioButton from "../../../components/GroupRadioButton";
import FormSearch from "../../../components/FormSearch";
import { useHistory } from "react-router-dom";
import PaginationBar from "../../../components/PaginationBar";
import moment from "moment";
import Select from "react-select";

const AdminCustormerPage = () => {
  const [pageNum, setPageNum] = useState(1);
  const customers = useSelector((state) => state.auth.customers);
  const totalPages = useSelector((state) => state.auth.totalPages);
  const [status, setStatus] = useState("new");
  const history = useHistory();

  const statusOptions = [
    { name: "All", value: "new" },
    { name: "Has order", value: "has order" },
    { name: "No order", value: "no order" },
  ];
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
        <Col md={2}>
          <Card className='card p-2 rounded'>
            <h6 className='text-left text-uppercase pl-2 mt-3'>
              <FontAwesomeIcon icon={faTag} className='mr-2 text-muted' />
              filter
            </h6>
            <GroupRadioButton
              radioValue={status}
              radios={statusOptions}
              handleChangeRadio={(e) => setStatus(e.currentTarget.value)}
            />
          </Card>
        </Col>
        <Col md={10}>
          <div className='table-responsive shadow rounded '>
            <Table className='shadow table table-center bg-white mb-0 table-borderless'>
              <thead>
                <tr className='border-bottom'>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Phone Contact</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, idx) => (
                  <tr key={customer._id} className='border-bottom'>
                    <th>{idx + 1}</th>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.address}</td>
                    <td>{customer.phone}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default AdminCustormerPage;
