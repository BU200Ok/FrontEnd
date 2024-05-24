import React, { useState } from 'react';

const Notice = () => {
    const [notices, setNotices] = useState([
        {
            imgsrc : '/mypage/basicprofile.png',
            name: '송민규',
            title: 'Software Engineer',
            description: 'Apart from regular live classes, I was assigned with a Mentor someone from Microsoft and he guided me very well through out the course.'
        },
        {
            imgsrc : '/mypage/basicprofile.png',
            name: '송민규',
            title: 'Software Researcher',
            description: 'My focus and expectations was more into System Design and I have learned a lot of it, Specially High Level design and that helped me to crack Microsoft.'
        },
        {
            imgsrc : '/mypage/basicprofile.png',
            name: '송민규',
            title: 'Software Researcher',
            description: 'My focus and expectations was more into System Design and I have learned a lot of it, Specially High Level design and that helped me to crack Microsoft.'
        }
    ]);
    return (
        <div className='notice_area'>
            {notices.map((notice, index) => (
                <div key={index} className="notice-card">
                    <div className="notice-image">
                        <img src={notice.imgsrc} alt='notice writer profile'/>
                    </div>
                    <div>
                        <h3>{notice.name}</h3>
                        <h4>{notice.title}</h4>
                    </div>
                    <div>
                        <p>{notice.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Notice;