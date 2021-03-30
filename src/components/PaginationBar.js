import React from "react";
import ReactPaginate from "react-paginate";

const PaginationBar = ({ selectedPage, handlePageChange, totalPages }) => {
  return (
    <div>
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
        forcePage={selectedPage}
      />
    </div>
  );
};

export default PaginationBar;
