import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import DOMPurify from 'dompurify';

const MyTodoList = ({myTodoLists}) => {
    function SafeHTMLComponent({ html }) {
        const cleanHTML = DOMPurify.sanitize(html);
        return <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
      }
    return (
        <div>
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
                {myTodoLists.length > 0 ? myTodoLists.map((item, index)=> (
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
            
        </div>
    );
};

export default MyTodoList;