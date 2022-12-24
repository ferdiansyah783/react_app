import React from "react";

const Pagination = (props) => {
  // for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
  //     _result.push(i)
  // }

  // pagination
  const paginate = (data, limit, current, adjacents) => {
    let _result = [];

    if (data && limit) {
      _result = range(Math.ceil(data / limit));

      if (current && adjacents) {
        if ((adjacents = Math.floor(adjacents / 2) * 2 + 1) >= 1) {
          _result = _result.slice(
            Math.max(
              0,
              Math.min(
                _result.length + 1 - adjacents,
                parseInt(current) - Math.ceil(adjacents / 2)
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

  const paginable = paginate(
    props.totalPosts,
    props.postsPerPage,
    props.currentPage,
    5
  );

  return (
    <>
      <button
        className={`border-2 p-1 px-3 ${
          props.currentPage === 1 ? "bg-slate-500" : ""
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
              ? "active bg-indigo-600 text-white px-4 py-2"
              : ""
          } `}
        >
          {value}
        </button>
      ))}
      <button className="border-2 p-1 px-3" onClick={props.handleNext}>
        next
      </button>
    </>
  );
};

export default Pagination;
