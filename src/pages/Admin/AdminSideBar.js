import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPrescription,
  faUserMd,
  faUserFriends,
  faChevronDown,
  faChevronUp,
  faPills,
  faDollarSign,
  faSignOutAlt,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { Nav, Accordion } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/actions/auth.actions";

const AdminSideBar = () => {
  const [showUser, setShowUser] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogout = () => {
    history.push("/");
    dispatch(authActions.logout());
  };
  return (
    <div className='text-left bg-white shadow' style={{ minHeight: "100vh" }}>
      <Nav className='flex-column'>
        <ul className='list-unstyled user-sidebar'>
          <li>
            <Nav.Link
              as={NavLink}
              to='/admin/dashboard'
              className='text-muted'
              activeClassName='selected'
            >
              <FontAwesomeIcon icon={faHome} style={{ marginRight: "12px" }} />
              <span>Dashboard</span>
            </Nav.Link>
          </li>
          <li>
            <Nav.Link
              as={NavLink}
              to='/admin/orders'
              className='text-muted'
              activeClassName='selected'
            >
              <FontAwesomeIcon
                icon={faDollarSign}
                style={{ marginRight: "18px" }}
              />
              <span>Orders</span>
            </Nav.Link>
          </li>
          <li>
            <Nav.Link
              as={NavLink}
              to='/admin/prescriptions'
              className='text-muted'
              activeClassName='selected'
            >
              <FontAwesomeIcon icon={faPrescription} className='mr-3' />
              <span>Prescriptions</span>
            </Nav.Link>
          </li>
          <li>
            <Nav.Link
              as={NavLink}
              to='/admin/products'
              className='text-muted'
              activeClassName='selected'
            >
              <FontAwesomeIcon icon={faPills} style={{ marginRight: "10px" }} />
              <span>Products</span>
            </Nav.Link>
          </li>
          <li>
            <Accordion>
              <Accordion.Toggle
                as={Nav}
                variant='link'
                eventKey='0'
                className='text-muted'
                onClick={() => setShowUser(!showUser)}
              >
                <FontAwesomeIcon icon={faUser} className='mr-3 text-gray' />
                <span style={{ marginRight: "40px" }}>Users</span>

                {!showUser && <FontAwesomeIcon icon={faChevronDown} />}
                {showUser && <FontAwesomeIcon icon={faChevronUp} />}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='0' className='text-left'>
                <>
                  <Nav.Link
                    as={NavLink}
                    to='/admin/customers'
                    className='text-muted ml-2'
                    activeClassName='selected'
                  >
                    <FontAwesomeIcon icon={faUserFriends} className='mr-2' />
                    <span>Customers</span>
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to='/admin/doctors'
                    className='text-muted ml-2'
                    activeClassName='selected'
                  >
                    <FontAwesomeIcon icon={faUserMd} className='mr-3' />
                    <span>Doctors</span>
                  </Nav.Link>
                </>
              </Accordion.Collapse>
            </Accordion>
          </li>
          <li>
            <button className='btn' onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} className='mr-3' />
              Logout
            </button>
          </li>
        </ul>
      </Nav>
    </div>
  );
};

export default AdminSideBar;
