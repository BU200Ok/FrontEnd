import React, { useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import './Forum.css';

const MyInfoComponent = ({ setUserInfo, userInfo }) => {
    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const response = await axios.get("http://localhost:8080/forum/myinfo", {
                    headers: {
                        'Authorization': window.localStorage.getItem("token")  // 여기에 토큰 추가
                    }
                });
                console.log(response.data.obj);
                setUserInfo(response.data.obj);
            } catch (err) {
                console.error(err);
            }
        };
        getUserInfo();
    }, [setUserInfo]);

    return (
        <Card style={{ width: '16rem' }}>
            <Card.Body>
                <br />
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
