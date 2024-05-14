import Pagination from 'react-bootstrap/Pagination';
import './Forum.css';
import React from 'react';

const PaginationComponent = ({ activePage, numberOfPages, onPageChange }) => {
    let items = [];
    for (let number = 1; number <= numberOfPages; number++) {
        items.push(
            <Pagination.Item key={number} active={number === activePage} onClick={() => onPageChange(number)}>
                {number}
            </Pagination.Item>
        );
    }

    return (
        <Pagination>{items}</Pagination>
    );
};

export default PaginationComponent;
