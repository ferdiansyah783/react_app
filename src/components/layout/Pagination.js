import React from 'react'

const Pagination = (props) => {
    let pages = []

    for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
        pages.push(i)
    }

  return (
    <>
        {pages.map((value, index) => (
            <button key={index} onClick={() => props.setCurrentPage(value)} className={`border px-3 py-1 rounded-md ${props.currentPage === value ? 'active bg-indigo-600 text-white px-4 py-2' : ''} `}>{value}</button>
        ))}
    </>
  )
}

export default Pagination