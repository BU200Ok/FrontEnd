import React from 'react';
import './Forum.css'
import Card from 'react-bootstrap/Card';

const MyInfoComponent = (props) => {
    const { userInfo } = props;
    return (
        <Card style={{ width: '16rem' }}>
            <Card.Body>
                <br/>
                <p>사진이 들어갈 예정</p>
                <Card.Title><h3>{userInfo.accountName}</h3></Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{userInfo.teamName} {userInfo.accountPosition}</Card.Subtitle>
                <Card.Text>
                <p>email: {userInfo.accountEmail}</p>
                </Card.Text>

            </Card.Body>
        </Card>
    );
};

export default MyInfoComponent;
