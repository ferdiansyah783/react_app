import React from 'react'

const Pagination = (props) => {
    let pages = []

    for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
        pages.push(i)
    }

  return (
    <>
        {pages.map((value, index) => (
            <button key={index} onClick={() => props.setCurrentPage(value)} className='border px-3 py-1'>{value}</button>
        ))}
    </>
  )
}

export default Pagination