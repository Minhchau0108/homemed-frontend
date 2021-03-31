import React, { useEffect, useState } from "react";
import { Row, Table, Col, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { prescriptionActions } from "../../../redux/actions/prescription.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faEye, faPen } from "@fortawesome/free-solid-svg-icons";
import GroupRadioButton from "../../../components/GroupRadioButton";
import FormSearch from "../../../components/FormSearch";
import { useHistory } from "react-router-dom";
import moment from "moment";
import PaginationBar from "../../../components/PaginationBar";
import { ClipLoader } from "react-spinners";

const generateStatus = (status) => {
  if (status === "new")
    return (
      <span className='badge bg-soft-primary text-capitalize'>{status}</span>
    );
  if (status === "done")
    return (
      <span className='badge bg-soft-success text-capitalize'>{status}</span>
    );
  return (
    <span className='badge bg-soft-warning text-capitalize'>{status}</span>
  );
};

const AdminPrescriptionPage = () => {
  const [pageNum, setPageNum] = useState(1);
  const [status, setStatus] = useState("new");
  const prescriptions = useSelector(
    (state) => state.prescription.prescriptions
  );
  const totalPages = useSelector((state) => state.prescription.totalPages);
  const loading = useSelector((state) => state.prescription.loading);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(prescriptionActions.getAllPrescriptions(pageNum, null, status));
  }, [dispatch, pageNum, status]);

  const handlePageChange = (page) => {
    setPageNum(page.selected + 1);
  };

  const statusOptions = [
    { name: "New", value: "new" },
    { name: "Done", value: "done" },
    { name: "Cancelled", value: "cancelled" },
  ];
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
        <Col>
          {loading ? (
            <div className='text-center'>
              <ClipLoader color='#f86c6b' size={150} loading={loading} />
            </div>
          ) : (
            <div className='table-responsive shadow rounded'>
              <Table className='shadow rounded table table-center bg-white mb-0 table-borderless'>
                <thead>
                  <tr className='border-bottom'>
                    <th>#</th>
                    <th>Date Submitted</th>
                    <th>Customer</th>
                    <th>Phone Contact</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {prescriptions &&
                    prescriptions.map((p, idx) => (
                      <tr key={p._id} className='border-bottom'>
                        <th>{idx + 1}</th>
                        <td>{moment(p?.createdAt).format("LL")}</td>
                        <td>{p.owner.name}</td>
                        <td>(+84){p.phone}</td>
                        <td>{p.address}</td>
                        <td>{generateStatus(p.status)}</td>
                        <td>
                          <button
                            className='btn btn-icon btn-pills btn-soft-primary btn-sm'
                            onClick={() =>
                              history.push(`prescriptions/${p._id}`)
                            }
                          >
                            {p?.status === "new" ? (
                              <FontAwesomeIcon icon={faPen} />
                            ) : (
                              <FontAwesomeIcon icon={faEye} />
                            )}
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

export default AdminPrescriptionPage;
