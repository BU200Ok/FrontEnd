import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background-color: white;
  width: 200px; // Adjust width as needed
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  height: 100vh;
  position: fixed;
  gap: 40px;
`;

const MenuItem = styled.a`
  font-size: 16px;
  color: black;
  /* padding: 8px 20px; // Adjust padding for better visual spacing */
  text-decoration: none;
  display: block; // Ensure the padding affects the entire block
  /* width: 100%; */
  height: 10%;
  box-sizing: border-box;
  align-self: flex-end;
  ${props => props.active && css`
    background-color: #76c893; // Active color
  `}
  &:hover {
    background-color: #76c893; // Hover color
  }
`;
const ProjectSidebar = () => {
    const [activeItem, setActiveItem] = useState(''); // Track active item

  const handleItemClick = (item) => {
    setActiveItem(item);
  };
    return (
        <MenuWrapper>
            <h1>회사 사진</h1>
      <MenuItem
        href="#"
        active={activeItem === 'main'}
        onClick={() => handleItemClick('main')}
      >
        메인
      </MenuItem>
      <MenuItem
        href="#"
        active={activeItem === 'mypage'}
        onClick={() => handleItemClick('mypage')}
      >
        마이페이지
      </MenuItem>
      <MenuItem
        href="#"
        active={activeItem === 'board'}
        onClick={() => handleItemClick('board')}
      >
        게시판
      </MenuItem>
      <MenuItem
        href="#"
        active={activeItem === 'project'}
        onClick={() => handleItemClick('project')}
      >
        프로젝트
      </MenuItem>
    </MenuWrapper>
    );
};

export default ProjectSidebar;
