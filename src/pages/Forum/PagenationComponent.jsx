import './Forum.css';
import React from 'react';

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div>
            {[...Array(totalPages).keys()].map((number) => (
                <button
                    key={number + 1}
                    onClick={() => onPageChange(number + 1)}
                    disabled={currentPage === number + 1}
                    style={{ marginRight: '10px' }}
                >
                    {number + 1}
                </button>
            ))}
        </div>
    );
};

export default PaginationComponent;
