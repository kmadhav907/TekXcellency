import React from 'react'

 export const Pagination = ({ postsPerPage, totalPosts,paginate}:{postsPerPage:any,totalPosts:any,paginate:any}) => {

    const pageNumbers = [];
    for(let i=1;i<= Math.ceil(totalPosts/postsPerPage);i++){
        pageNumbers.push(i);

    }

  return (
    <nav >
        <div className="center-feedback">
    
        <ul className="pagination-feedback">
            {pageNumbers.map(number => (
                <li key={number}>
                    <a onClick={() =>paginate(number)} href='#' >
                        {number}</a>
                    
                </li>
            )
            ) 
            }
        </ul>
        </div>
        
    </nav>
  )
}
