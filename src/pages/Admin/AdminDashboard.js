import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserMd,
  faDollarSign,
  faUserAlt,
  faFilePrescription,
  faLongArrowAltRight,
} from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { prescriptionActions } from "../../redux/actions/prescription.actions";
import { orderActions } from "../../redux/actions/order.actions";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { authActions } from "../../redux/actions/auth.actions";

const AdminDashboard = () => {
  const prescriptions = useSelector(
    (state) => state.prescription.prescriptions
  );
  const loadingPrescription = useSelector(
    (state) => state.prescription.loading
  );
  const orders = useSelector((state) => state.order.orders);
  const loadingOrders = useSelector((state) => state.order.loading);
  const dashboard = useSelector((state) => state.auth.dashboard);

  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(prescriptionActions.getAllPrescriptions(null, null, "new"));
    dispatch(authActions.getAdminDashboard());
  }, [dispatch]);

  useEffect(() => {
    dispatch(orderActions.getAllOrders(null, null, "new"));
  }, [dispatch]);
  return (
    <div>
      <section className='py-5'>
        <div className='row'>
          <div className='col-xl-3 col-lg-6 mb-4 mb-xl-0'>
            <div className='bg-white shadow roundy p-4 h-100 d-flex align-items-center justify-content-between'>
              <div className='flex-grow-1 d-flex align-items-center'>
                <div className='dot mr-3 bg-violet'></div>
                <div className='text'>
                  <h6 className='mb-0 font-weight-bold'>Orders</h6>
                  <span className='text-gray'>{dashboard?.orderCount}</span>
                </div>
              </div>
              <div className='icon text-white bg-violet'>
                <FontAwesomeIcon
                  icon={faDollarSign}
                  classNameName='text-white '
                />
              </div>
            </div>
          </div>
          <div className='col-xl-3 col-lg-6 mb-4 mb-xl-0'>
            <div className='bg-white shadow roundy p-4 h-100 d-flex align-items-center justify-content-between'>
              <div className='flex-grow-1 d-flex align-items-center'>
                <div className='dot mr-3 bg-violet'></div>
                <div className='text'>
                  <h6 className='mb-0 font-weight-bold'>Prescriptions</h6>
                  <span className='text-gray'>
                    {dashboard?.prescriptionCount}
                  </span>
                </div>
              </div>
              <div className='icon text-white bg-green'>
                <FontAwesomeIcon
                  icon={faDollarSign}
                  classNameName='text-white '
                />
              </div>
            </div>
          </div>
          <div className='col-xl-3 col-lg-6 mb-4 mb-xl-0'>
            <div className='bg-white shadow roundy p-4 h-100 d-flex align-items-center justify-content-between'>
              <div className='flex-grow-1 d-flex align-items-center'>
                <div className='dot mr-3 bg-blue'></div>
                <div className='text'>
                  <h6 className='mb-0 font-weight-bold'>Customers</h6>
                  <span className='text-gray'>{dashboard?.customerCount}</span>
                </div>
              </div>
              <div className='icon bg-blue'>
                <FontAwesomeIcon icon={faUserAlt} className='text-white ' />
              </div>
            </div>
          </div>
          <div className='col-xl-3 col-lg-6 mb-4 mb-xl-0'>
            <div className='bg-white shadow roundy p-4 h-100 d-flex align-items-center justify-content-between'>
              <div className='flex-grow-1 d-flex align-items-center'>
                <div className='dot mr-3 bg-red'></div>
                <div className='text'>
                  <h6 className='mb-0 font-weight-bold'>Doctors</h6>
                  <span className='text-gray'>{dashboard?.doctorCount}</span>
                </div>
              </div>
              <div className='icon text-white bg-red'>
                <FontAwesomeIcon icon={faUserMd} className='text-white ' />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Row>
        <Col lg={6}>
          <Card className='border-0 rounded shadow'>
            <div className='d-flex justify-content-between p-4 border-bottom'>
              <h6>
                <FontAwesomeIcon icon={faFilePrescription} className='mr-2' />
                Newest Prescription
              </h6>
              <h6 className='text-muted'>
                {!loadingPrescription &&
                  prescriptions &&
                  `${prescriptions.length} prescription`}
              </h6>
            </div>
            <ul className='list-unstyled mb-0 p-4'>
              {!loadingPrescription &&
                prescriptions &&
                prescriptions.map((p) => (
                  <li key={p._id}>
                    <div className='d-flex align-items-center justify-content-between'>
                      <div className='d-inline-flex'>
                        <img
                          className='avatar avatar-md-sm rounded-circle border shadow'
                          src={p?.owner?.profileURL}
                          alt=''
                        ></img>
                        <div className='ml-3'>
                          <h6 className='text-dark font-weight-bold'>
                            {p?.owner?.name}
                          </h6>
                          <div className='text-muted'>
                            Upload Prescription on{" "}
                            {moment(p?.createdAt).format("LLL")}
                          </div>
                        </div>
                      </div>
                      <FontAwesomeIcon
                        icon={faLongArrowAltRight}
                        onClick={() => history.push(`prescriptions/${p._id}`)}
                      />
                    </div>
                  </li>
                ))}
            </ul>
          </Card>
        </Col>
        <Col lg={6}>
          <Card className='border-0 rounded shadow'>
            <div className='d-flex justify-content-between p-4 border-bottom'>
              <h6>
                <FontAwesomeIcon icon={faDollarSign} className='mr-2' />
                Orders waiting confirm
              </h6>
              <h6 className='text-muted'>
                {!loadingOrders && orders && `${orders.length} order`}
              </h6>
            </div>
            <ul className='list-unstyled mb-0 p-4'>
              {!loadingOrders &&
                orders &&
                orders.map((o) => (
                  <li key={o._id}>
                    <div className='d-flex align-items-center justify-content-between'>
                      <div className='d-inline-flex'>
                        <img
                          className='avatar avatar-md-sm rounded-circle border shadow'
                          src={o?.customer?.profileURL}
                          alt=''
                        ></img>
                        <div className='ml-3'>
                          <h6 className='text-dark font-weight-bold'>
                            {o?.customer?.name}
                          </h6>
                          <div className='text-muted'>
                            Created At {moment(o?.createdAt).format("LLL")}
                          </div>
                        </div>
                      </div>
                      <FontAwesomeIcon
                        icon={faLongArrowAltRight}
                        onClick={() => history.push(`orders/${o._id}`)}
                      />
                    </div>
                  </li>
                ))}
            </ul>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
