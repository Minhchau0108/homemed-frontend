import React, { useEffect, useState } from "react";
import { Row, Col, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { prescriptionActions } from "./../../redux/actions/prescription.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faEye } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import PaginationBar from "../../components/PaginationBar";
import moment from "moment";

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

const UserPrescriptionPage = () => {
  const [pageNum, setPageNum] = useState(1);
  const [selectedOption, setSelectedOption] = useState({
    value: "",
    label: "",
  });
  const totalPages = useSelector((state) => state.prescription.totalPages);
  const prescriptions = useSelector(
    (state) => state.prescription.prescriptions
  );
  const loading = useSelector((state) => state.prescription.loading);
  const currentUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (currentUser?._id) {
      dispatch(
        prescriptionActions.getMyPrescriptions(
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
    { value: "done", label: "Done" },
    { value: "cancelled", label: "Cancelled" },
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
              <div className='title-h5'>Prescription</div>
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
            <Table className='shadow rounded table table-center bg-white mb-0 table-borderless'>
              <thead>
                <tr className='border-bottom'>
                  <th>#</th>
                  <th>Date Submitted</th>
                  <th>Phone Contact</th>
                  <th>Address</th>
                  <th>Patient's Age</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {!loading && prescriptions.length > 0 ? (
                  prescriptions.map((p, idx) => (
                    <tr key={p._id} className='border-bottom'>
                      <th>{idx + 1}</th>
                      <td> {moment(p?.createdAt).format("LL")}</td>
                      <td>{p.phone}</td>
                      <td>{p.address}</td>
                      <td>{p.patientAge}</td>
                      <td>{generateStatus(p.status)}</td>
                      <td>
                        <button
                          className='btn btn-icon btn-pills btn-soft-primary btn-sm'
                          onClick={() => history.push(`prescriptions/${p._id}`)}
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <h6>No prescription</h6>
                )}
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

export default UserPrescriptionPage;
