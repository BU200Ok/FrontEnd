import React from 'react';
import { Table } from 'react-bootstrap';

const TeamTodoList = () => {
    return (
        <Table>
            <tr>
                <td>번호</td>
                <td>상태</td>
                <td>제목</td>
                <td>작성일</td>
                <td>업무 담당</td>
            </tr>
        </Table>
    );
};

export default TeamTodoList;