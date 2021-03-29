import React from "react";
import { Card, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faFilePrescription,
  faCalendar,
  faShoppingBag,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../redux/actions/auth.actions";

const UserSideBar = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogout = () => {
    history.push("/");
    dispatch(authActions.logout());
  };
  return (
    <Col md={2} className='px-0 mt-4'>
      <Card className='shadow border-0 rounded'>
        <Card.Header className='text-center bg-white pb-4'>
          <img
            className='rounded-circle mt-4'
            src={
              currentUser?.profileURL
                ? currentUser.profileURL
                : `https://ui-avatars.com/api/?name=${currentUser.name}&background=random&length=1&bold=true`
            }
            width='80'
          />

          <h6 className='mt-3 mb-0'>Hi, {currentUser?.name} </h6>
        </Card.Header>

        <ul className='nav nav-pills flex-column user-sidebar'>
          <NavLink
            className='nav-link'
            activeClassName='selected'
            to='/user/prescriptions'
          >
            <FontAwesomeIcon icon={faFilePrescription} className='mr-2' />{" "}
            Prescriptions
          </NavLink>

          <NavLink
            className='nav-link'
            activeClassName='selected'
            to='/user/orders'
          >
            <FontAwesomeIcon
              icon={faShoppingBag}
              style={{ marginRight: "10px" }}
            />
            Orders
          </NavLink>

          <NavLink
            className='nav-link'
            activeClassName='selected'
            to='/user/appointments'
          >
            <FontAwesomeIcon
              icon={faCalendar}
              style={{ marginRight: "10px" }}
            />
            Appointments
          </NavLink>

          <div>
            <button className='btn' onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} className='mr-2' /> Logout
            </button>
          </div>
        </ul>
      </Card>
    </Col>
  );
};

export default UserSideBar;
