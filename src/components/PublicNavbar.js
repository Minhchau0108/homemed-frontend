import React from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { NavLink, Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faColumns,
  faPills,
  faShoppingCart,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { faUser as farUser } from "@fortawesome/free-regular-svg-icons";
import { authActions } from "../redux/actions/auth.actions";

const publicLinks = (
  <Nav.Link as={Link} to='/login'>
    <FontAwesomeIcon icon={farUser} className='mr-1 text-gray' size='lg' />
  </Nav.Link>
);

const AuthLinks = ({ currentUser }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogout = () => {
    history.push("/");
    dispatch(authActions.logout());
  };

  return (
    <Dropdown>
      <Dropdown.Toggle className='p-0 dropdown-toggle btn-pills btn-soft-primary'>
        <img
          className='avatar avatar-ex-small rounded-circle'
          src={
            currentUser?.profileURL
              ? currentUser.profileURL
              : `https://ui-avatars.com/api/?name=${currentUser.name}&background=random&length=1&bold=true`
          }
          width='36px'
          height='36px'
          alt=''
        />
      </Dropdown.Toggle>

      <Dropdown.Menu
        className='dropdown-menu dd-menu dropdown-menu-end bg-white shadow border-0 mt-3 py-3'
        align='right'
      >
        <Dropdown.Item as={Link} to={`/user/profile`}>
          <FontAwesomeIcon icon={faCog} className='mr-2 text-muted ' />
          Profile Settings
        </Dropdown.Item>
        <Dropdown.Item className='mt-2' as={Link} to={`/user/prescriptions`}>
          <FontAwesomeIcon icon={faColumns} className='mr-2 text-muted ' />
          Dashboard
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} className='mr-2 text-muted ' />{" "}
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
const PublicNavbar = () => {
  const cartCount = useSelector((state) => state.cart.cartCount);
  const { loading, isAuthenticated } = useSelector((state) => state.auth);
  const currentUser = useSelector((state) => state.auth.user);

  return (
    <Container fluid>
      <Navbar
        bg='white'
        expand='lg'
        className='navbar fixed-top shadow-sm navbar-light'
      >
        <Container>
          <Navbar.Brand as={NavLink} to='/'>
            <h2
              style={{ fontFamily: "Dancing Script" }}
              className='font-weight-bold'
            >
              HomeMed
              <FontAwesomeIcon icon={faPills} className='ml-2' />{" "}
            </h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='navbar-nav mr-auto mb-2 mb-lg-0'>
              <Nav.Link className='text-uppercase' as={NavLink} to='/home'>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to='/pharmacy' className='text-uppercase'>
                Pharmacy
              </Nav.Link>
              <Nav.Link as={NavLink} to='/doctors' className='text-uppercase'>
                Doctor
              </Nav.Link>
              <Nav.Link as={NavLink} to='/blogs' className='text-uppercase'>
                Blogs
              </Nav.Link>
            </Nav>
            <Nav className='ml-auto'>
              <Nav.Link
                as={NavLink}
                to='/cart'
                className='position-relative mr-2'
              >
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  size='lg'
                  color=' #454545'
                />
                <span className='badge rounded-pill bg-primary'>
                  <small>{cartCount}</small>
                </span>
              </Nav.Link>
              {!loading && (
                <>
                  {isAuthenticated ? (
                    <AuthLinks currentUser={currentUser} />
                  ) : (
                    publicLinks
                  )}
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
};

export default PublicNavbar;
