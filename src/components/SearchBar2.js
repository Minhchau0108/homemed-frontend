import React from "react";
import { Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar2 = ({ onSubmit, onChange }) => {
  return (
    <>
      <Form
        className='p-1 shadow-sm bg-light my-0'
        style={{ borderRadius: "0.3rem" }}
        onSubmit={onSubmit}
      >
        <div className='bg-light seach-bar position-relative'>
          <input
            className='border-0 mr-2 bg-light search-bar-input'
            placeholder='What are you searching for?'
            onChange={onChange}
          />
          <button
            className='btn btn-primary'
            style={{
              width: "50px",
              position: "absolute",
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
            }}
          >
            <FontAwesomeIcon icon='search' />
          </button>
        </div>
      </Form>
    </>
  );
};

export default SearchBar2;
