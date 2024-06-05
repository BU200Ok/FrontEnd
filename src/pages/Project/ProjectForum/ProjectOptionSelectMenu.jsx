import React from 'react';
import './Forum.css';

const ProjectOptionSelectMenu = ({ selectedOption, optionChange }) => {
    const getButtonClass = (buttonIndex) => {
        if (selectedOption === 1 && buttonIndex !== 0) return 'disableBtn';
        if (selectedOption === 2 && buttonIndex !== 1) return 'disableBtn';
        if (selectedOption === 3 && buttonIndex !== 2) return 'disableBtn';
        if (selectedOption === 4 && buttonIndex !== 3) return 'disableBtn';
        if (selectedOption === 5 && buttonIndex !== 4) return 'disableBtn';
        return '';
    };

    return (
        <div className='option_select_menu_main'>
            <div className='project_option_select_menu_area'>
                <button className={getButtonClass(0)} onClick={() => optionChange(1)}>분석</button>
                <button className={getButtonClass(1)} onClick={() => optionChange(2)}>설계</button>
                <button className={getButtonClass(2)} onClick={() => optionChange(3)}>구현</button>
                <button className={getButtonClass(3)} onClick={() => optionChange(4)}>테스트</button>
                <button className={getButtonClass(4)} onClick={() => optionChange(5)}>산출물</button>
            </div>
            <hr />
        </div>
    );
};

export default ProjectOptionSelectMenu;
