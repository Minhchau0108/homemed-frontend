import React from "react";
import { Nav } from "react-bootstrap";

const AdminNavbar = ({ title }) => {
  return (
    <>
      <Nav className='navbar navbar-expand-lg px-4 py-2 bg-white shadow-sm'>
        <h1
          className='navbar-brand font-weight-bold text-uppercase text-base mx-auto'
          style={{ fontFamily: "Dancing Script" }}
        >
          {title}
        </h1>
      </Nav>
    </>
  );
};

export default AdminNavbar;
