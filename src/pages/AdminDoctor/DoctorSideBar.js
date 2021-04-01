import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import { Nav } from "react-bootstrap";
import { Card, Col } from "react-bootstrap";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../redux/actions/auth.actions";
import profileBg from "../../images/profile-bg.jpeg";

const DoctorSideBar = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogout = () => {
    history.push("/");
    dispatch(authActions.logout());
  };
  return (
    <Col md={3} className='pl-2 pr-0'>
      <div className=' shadow overflow-hidden sticky-bar'>
        <Card className='border-0'>
          <img src={profileBg} className='img-fluid' alt='' />
        </Card>
        {!loading && (
          <div className='text-center avatar-profile margin-negative mt-n5 position-relative pb-4 border-bottom'>
            <img
              className='rounded-circle mt-4'
              src={
                currentUser && currentUser?.profileURL
                  ? currentUser.profileURL
                  : `https://ui-avatars.com/api/?name=${currentUser.name}&background=random&length=1&bold=true`
              }
              alt=''
              width='100'
            />
            <div className='mt-3 title-h5 mb-0'>Dr. {currentUser?.name} </div>
            <div className='title-h6 text-muted mt-2 font-italic'>
              {currentUser?.field}
            </div>
          </div>
        )}

        <ul className='nav nav-pills flex-column user-sidebar'>
          <Nav.Link
            as={NavLink}
            to='/admin-doctor/appointments'
            className='text-muted'
            activeClassName='selected'
          >
            <FontAwesomeIcon icon={faCalendarCheck} className='mr-2' />
            <span>Appointments</span>
          </Nav.Link>

          <Nav.Link
            as={NavLink}
            to='/admin-doctor/posts'
            className='text-muted'
            activeClassName='selected'
          >
            <FontAwesomeIcon icon={faNewspaper} className='mr-2' />
            <span>Posts</span>
          </Nav.Link>

          <div>
            <button className='btn' onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} className='mr-2' /> Logout
            </button>
          </div>
        </ul>
      </div>
    </Col>
  );
};

export default DoctorSideBar;
