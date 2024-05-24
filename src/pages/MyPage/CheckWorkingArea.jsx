import React from 'react';
import GoToWorkButton from './GoToWorkButton';
import LeaveWorkButton from './LeaveWorkButton';

const CheckWorkingArea = () => {
    return (
        <div className='check_working_area'>
            <GoToWorkButton />
            <LeaveWorkButton />
        </div>
    );
};

export default CheckWorkingArea;