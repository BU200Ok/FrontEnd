import React from 'react';
import { Table } from 'react-bootstrap';

const TeamTodoList = ({projectTodoLists}) => {

    return (
        <Table className='todo-table'>
            <thead>
                <tr>
                    <td>번호</td>
                    <td>제목</td>
                    <td>작성일</td>
                    <td>완료일</td>
                    <td>업무 담당</td>
                </tr>
            </thead>
            <tbody>
                {projectTodoLists.length > 0 ? projectTodoLists.map((item, index)=> (
                    <tr key={item.todoListCode}>
                        <td>{item.todoListCode}</td>
                        <td>{item.todoListContent}</td>
                        <td>{item.todoListStart}</td>
                        <td>{item.todoListEnd}</td>
                        <td>{item.accountName}</td>
                    </tr>
                ))
                : <tr><td colSpan={5}>TodoList가 없습니다.</td></tr>
                }
            </tbody>
        </Table>
    );
};

export default TeamTodoList;