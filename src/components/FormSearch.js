import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const FormSearch = ({ placeholder, handleChange, handleSubmit }) => {
  return (
    <>
      <form className='pt-2' onSubmit={handleSubmit}>
        <div className='p-1 bg-white rounded rounded-pill shadow-sm mb-4'>
          <div className='input-group'>
            <input
              type='search'
              placeholder={placeholder}
              className='form-control border-0 '
              onChange={handleChange}
            />
            <div className='input-group-append'>
              <button type='submit' className='btn btn-link text-primary'>
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default FormSearch;
