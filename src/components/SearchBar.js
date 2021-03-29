import React from "react";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = () => {
  return (
    <>
      <Form>
        <div className='p-1 bg-light rounded rounded-pill shadow-sm mb-4 search-bar'>
          <input
            placeholder="What're you searching for?"
            className='border-0 bg-light search-bar-input'
          />
          <FontAwesomeIcon
            icon='search'
            size='lg'
            color='grey'
            style={{
              position: "absolute",
              top: "50%",
              right: "20px",
              transform: "translateY(-50%)",
            }}
          />
        </div>
      </Form>
    </>
  );
};

export default SearchBar;
