import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Pagination from 'react-js-pagination';
const AnalysisTask = () => {
    const { projectCode, taskType } = useParams();
    const [taskInfo, setTaskInfo] = useState({});
    const [activeTab, setActiveTab] = useState(taskType);
    const [page, setPage] = useState(1);

    useEffect(() => {
        getTaskInfo(taskType);
    }, [projectCode, taskType]);

    const getTaskInfo = async () => {
        try {
        const response = await axios.get(`http://localhost:8080/project/${projectCode}/${taskType}`, {
            headers: {
            'Authorization': localStorage.getItem('token')
            },

        });
        console.log(response.data.obj);
        setTaskInfo(response.data.obj); // 데이터 설정
        } catch (err) {
        console.error('Error fetching project info:', err);
        }
    };

    const handleTabChange = (newTaskType) => {
        setActiveTab(newTaskType);
    };

    const handlePageChange = (page) => {
        setPage(page);
        sessionStorage.setItem('currentPage',page); 

    };


    return (
        <div>
        <header className="py-3">
            <div className="container px-12">
            <div className="row justify-content-center">
                <div className="col-lg-8 col-xxl-6">
                <div className="my-5">
                    <h1 className="fw-bolder mb-3">분석</h1>
                    <p>뙤약볕이 내리쬐는 한 여름에 개미들은 땀을 뻘뻘 흘리며 일했지만 베짱이는 시원한 나무 그늘에서 놀기만 했다. 개미들은 부지런히 먹을 것을 날랐다. 
                    개미는 베짱이에게 곧 겨울이 오니 일을 하라고 말했지만 베짱이는 듣지 않았다. 어느 새 겨울이 왔다.</p>
                </div>
                </div>
            </div>
            </div>
        </header>
        
                <Tabs
                activeKey={activeTab}
                onSelect={(k) => handleTabChange(k)}
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="요구분석" title="요구분석">
                  
                </Tab>
                <Tab eventKey="환경분석" title="환경분석">
                   
                </Tab>
                <Tab eventKey="SWOT분석" title="SWOT분석">
                   
                </Tab>
            </Tabs>
            <Pagination
                    activePage={page} // 현재 페이지
                    itemsCountPerPage={6} // 한 페이지랑 보여줄 아이템 갯수
                    totalItemsCount={6} // 총 아이템 갯수
                    pageRangeDisplayed={5} // paginator의 페이지 범위
                    prevPageText={"‹"} // "이전"을 나타낼 텍스트
                    nextPageText={"›"} // "다음"을 나타낼 텍스트
                    onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
            />
        </div>
    );
};

export default AnalysisTask;
