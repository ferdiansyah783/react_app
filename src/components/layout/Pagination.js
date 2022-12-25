import React from "react";

const Pagination = (props) => {
  // pagination
  const lastPage = Math.ceil(props.totalPosts / props.postsPerPage);
  const startIndex = (props.currentPage - 1) * props.postsPerPage + 1;
  const endIndex = props.currentPage * props.postsPerPage;

  const paginate = (data, limit, current, adjacents) => {
    let _result = [];

    if (data && limit) {
      _result = range(lastPage);

      if (current && adjacents) {
        if ((adjacents = Math.floor(adjacents / 2) * 2 + 1) >= 1) {
          _result = arraySlice(
            _result,
            Math.max(
              0,
              Math.min(
                _result.length + 1 - adjacents,
                current - Math.ceil(adjacents / 2)
              )
            ),
            adjacents
          );
        }
      }
    }

    return _result;
  };

  const range = (size, startAt = 1) => {
    return [...Array(size).keys()].map((i) => i + startAt);
  };

  const arraySlice = (array, start, length) => {
    let end = start + length;
    return array.slice(start, end);
  };

  const paginable = paginate(
    props.totalPosts,
    props.postsPerPage,
    props.currentPage,
    5
  );

  return (
    <>
      <div className="flex justify-between items-center">
        <p className="font-light">
          showing <span className="font-semibold">{startIndex}</span> to{" "}
          <span className="font-semibold">{endIndex}</span> of{" "}
          <span className="font-semibold">{props.totalPosts}</span> results
        </p>
        <div>
          <button
            className={`border py-1 px-3 rounded-md mr-2 ${
              props.currentPage === 1 ? "bg-slate-400 text-white" : ""
            }`}
            disabled={props.currentPage === 1 ? true : false}
            onClick={props.handlePrev}
          >
            prev
          </button>
          {paginable.map((value, index) => (
            <button
              key={index}
              onClick={() => props.setCurrentPage(value)}
              className={`border px-3 py-1 rounded-md ${
                props.currentPage === value
                  ? "active bg-indigo-600 text-white"
                  : ""
              } `}
            >
              {value}
            </button>
          ))}
          <button
            className={`border py-1 px-3 rounded-md ml-2 ${
              props.currentPage === lastPage ? "bg-slate-400 text-white" : ""
            }`}
            disabled={props.currentPage === lastPage ? true : false}
            onClick={props.handleNext}
          >
            next
          </button>
        </div>
      </div>
    </>
  );
};

export default Pagination;
