// src/ErrorPage.js
import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

const ErrorPage = () => {
  const { errorCode } = useParams();
  const location = useLocation();
  const { msg } = location.state || {};

  return (
    <div>
      <h1>🛑Error {errorCode}🛑</h1>
      <p>{msg}</p>
      <Link to="/">홈으로 돌아가기</Link>
    </div>
  );
};

export default ErrorPage;
