import React, { useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCameraRetro,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { prescriptionActions } from "../../redux/actions/prescription.actions";
import moment from "moment";

const TrackCardStepOne = () => {
  return (
    <div className='pt-3'>
      {" "}
      <div className='track mx-3'>
        <div className='step active'>
          <span class='icon'>
            <FontAwesomeIcon icon={faCameraRetro} />
          </span>
          <span className='text'>Upload Prescription</span>
        </div>
        <div className='step'>
          <span className='icon'>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className='text'> Pharmacist checked</span>
        </div>
        <div className='step'>
          <span className='icon'>
            <FontAwesomeIcon icon={faShoppingCart} />
          </span>
          <span className='text'> Pharmacist created order </span>
        </div>
      </div>
    </div>
  );
};
const TrackCardStepTwo = () => {
  return (
    <div className='track mx-3'>
      <div className='step active'>
        <span class='icon'>
          <FontAwesomeIcon icon={faCameraRetro} />
        </span>
        <span className='text'>Upload Prescription</span>
      </div>
      <div className='step active'>
        <span className='icon'>
          <FontAwesomeIcon icon={faCheck} />
        </span>
        <span className='text'> Pharmacist checked</span>
      </div>
      <div className='step active'>
        <span className='icon'>
          <FontAwesomeIcon icon={faShoppingCart} />
        </span>
        <span className='text'> Pharmacist created order </span>
      </div>
    </div>
  );
};

const UserPresPage = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const prescriptions = useSelector(
    (state) => state.prescription.prescriptions
  );
  const loading = useSelector((state) => state.prescription.loading);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (currentUser?._id) {
      dispatch(
        prescriptionActions.getMyPrescriptionsDashboard(currentUser._id)
      );
    }
  }, [dispatch, currentUser]);

  return (
    <Row>
      <div className='title-h5 ml-3 pt-3'>Prescription</div>
      <Col lg={12} className='mb-4 mb-lg-0'>
        <Card className='mt-3 rounded border-0 shadow pt-3'>
          <Card.Body>
            {!loading &&
              prescriptions.length > 0 &&
              prescriptions.map((p, idx) => (
                <Card className='border-0 bg-light rounded shadow mb-5 mx-3'>
                  <Row>
                    <Col lg={3}>
                      <div class='d-flex flex-column justify-content-between order-summary pl-2 py-3'>
                        <div className='font-weight-bold'>Date Submitted</div>
                        <div>{moment(p?.createdAt).format("LLL")}</div>
                        <div className='mt-2'>
                          <button
                            class='btn btn-link btn-sm p-0 m-0'
                            onClick={() =>
                              history.push(`/user/prescriptions/${p?._id}`)
                            }
                          >
                            <span className='m-0 p-0'> View Prescription</span>
                          </button>
                        </div>
                      </div>
                    </Col>
                    <Col lg={9}>
                      <div class='d-flex justify-content-end'>
                        {p.status === "done" && (
                          <button
                            class='btn btn-primary btn-sm m-2'
                            onClick={() =>
                              history.push(`/user/orders/${p?.orderId}`)
                            }
                          >
                            View Order
                          </button>
                        )}
                      </div>
                      {p.status === "new" && <TrackCardStepOne />}
                      {p.status === "done" && <TrackCardStepTwo />}
                    </Col>
                  </Row>
                </Card>
              ))}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default UserPresPage;
