import React from 'react';
import axios from 'axios';

const FileDownloadComponent = ({ fileName }) => {
    const downloadFile = async () => {
        try {
            const token = window.localStorage.getItem("token");
            const response = await axios.get(`http://localhost:8080/forum-file/download`, {
                params: {
                    changedFileName: fileName
                },
                responseType: 'blob', // blob 타입으로 응답을 받음
                headers: {
                    'Authorization': window.localStorage.getItem("token")  // 여기에 토큰 추가
                }
            });

            console.log('Download response:', response);

            // 브라우저에서 파일 다운로드
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName); // 파일 이름 설정
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    return (
        <button onClick={downloadFile}>
            {fileName}
        </button>
    );
};

export default FileDownloadComponent;
