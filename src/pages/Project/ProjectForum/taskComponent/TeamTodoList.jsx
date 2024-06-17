import React from 'react';
import { Table } from 'react-bootstrap';
import DOMPurify from 'dompurify';

const TeamTodoList = ({projectTodoLists}) => {
    function SafeHTMLComponent({ html }) {
        const cleanHTML = DOMPurify.sanitize(html);
        return <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
      }
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
                        <SafeHTMLComponent html={item.todoListContent}/>
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