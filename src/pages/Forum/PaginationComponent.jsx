// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Pagination } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css'; 


// const PaginationComponent = () => {
//     const [forums, setForums] = useState([]);
//     const [page, setPage] = useState(1); // 페이지는 1부터 시작
//     const [totalPages, setTotalPages] = useState(0);

//     useEffect(() => {
//         fetchForums();
//     }, [page]);

//     const fetchForums = async () => {
//         try {
//             const response = await axios.get('/forum/pages', {
//                 params: {
//                     page: page - 1, // Spring Data JPA의 페이지는 0부터 시작
//                     size: 8  // 페이지 당 포럼 개수
//                 },
//                 headers: {
//                     'Authorization': window.localStorage.getItem("token")
//                 }
//             });
//             setForums(response.data.data.content);
//             setTotalPages(response.data.data.totalPages);
//         } catch (error) {
//             console.error("Failed to fetch forums", error);
//         }
//     };

//     const handlePageChange = (newPage) => {
//         if (newPage >= 1 && newPage <= totalPages) {
//             setPage(newPage);
//         }
//     };

//     return (
//         <div>
//             <ul>
//                 {forums.map(forum => (
//                     <li key={forum.forumCode}>{forum.forumTitle}</li>
//                 ))}
//             </ul>
//             <Pagination>
//                 <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page === 1} />
//                 {Array.from({ length: totalPages }, (_, i) => (
//                     <Pagination.Item key={i + 1} active={i + 1 === page} onClick={() => handlePageChange(i + 1)}>
//                         {i + 1}
//                     </Pagination.Item>
//                 ))}
//                 <Pagination.Next onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} />
//             </Pagination>
//         </div>
//     );
// };

// export default PaginationComponent;

