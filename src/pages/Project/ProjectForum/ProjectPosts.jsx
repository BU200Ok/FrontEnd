import React from 'react';

const ProjectPosts = ({posts}) => {
    return (
        <table>
            <tr>
                <td>번호</td>
                <td>상태</td>
                <td>제목</td>
                <td>작성일</td>
                <td>업무 담당</td>
            </tr>
            {posts.length != 0 ? posts.map((item)=> (
                <tr key={item.taskCode}>
                    <td>{item.taskCode}</td>
                    <td>{item.taskStatus}</td>
                    <td>{item.taskName}</td>
                    <td>{item.taskStart}</td>
                    <td>{item.accountName[0]}</td>
                </tr>
            ))
            : <tr><td colSpan={5}>작성된 글이 없습니다.</td></tr>}
        </table>
    );
};

export default ProjectPosts;