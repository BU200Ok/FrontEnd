import { useEffect, useState } from 'react';
import Pagination from "react-js-pagination";
import './Project.css';
import ProjectComponent from './ProjectComponent';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Project = () => {

    const nav = useNavigate();
    const [project,setProject] = useState([]);
    const [title,setTitle] = useState('전체 프로젝트');
    const [page,setPage] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [search, setSearch] = useState(false);
    const [searchWord, setSearchWord] = useState('');

    useEffect(()=>{ //처음 들옴
        getAllProject(1);
    },[])
    useEffect(()=> {
        console.log(project);
    }, [project]);
    const handlePageChange = (page) => {    //페이지 누름
        setPage(page);  //여기서 시간이걸림
        sessionStorage.setItem('currentPage',page); 
        if(title=='내 프로젝트'){
            getMyProject(page);
        } else {
            getAllProject(page);
        }
    };
    // const reqUrl = `http://localhost:8080/project/get-search-all-project?page=${p-1}&word=${searchWord}`;
    const getAllProject = async (p,status) => {
        setTitle('전체 프로젝트');
        if(status === true){
            const res = await axios.get(`http://localhost:8080/project/find-all-project`,
            {
                headers: {Authorization: localStorage.getItem('token')},
                params : {page : p}
            }
            );
            console.log(res);
            setTotalElements(res.data.obj.totalElements);
            setProject(res.data.obj);
        }else {
            try{
            const response = await axios.get(`http://localhost:8080/project/find-all-project`,
            {
                headers: {Authorization: localStorage.getItem('token')},
                params : {
                    page : 1
                }
            }
            )
            setTotalElements(response.data.obj.totalElements);
            setProject(response.data.obj);
            } catch(err){
                nav('/error/403',{state: {msg:"로그인 먼저 해주세요."}});
            }
         
        }
        
    }

    const getMyProject = async (p,status) => {
        setTitle('내 프로젝트');
        if(status === true){
            const res = await axios.get(`http://localhost:8080/project/get-search-my-project?page=${p-1}&word=${searchWord}`,
            {
                headers: {Authorization: localStorage.getItem('token')}
            }
            );
            setTotalElements(res.data.obj.totalElements);
            setProject(res.data.obj);
        }else {
            const response = await axios.get(`http://localhost:8080/project/get-my-project?page=${p-1}`,
            {
                headers: {Authorization: localStorage.getItem('token')}
            }
            )
            setTotalElements(response.data.obj.totalElements);
            setProject(response.data.obj);
        }
        
    }
    const getSearchProject = () => {
        setSearch(true);
        if(title === '내 프로젝트'){
            getMyProject(1,true);
        } else {
            getAllProject(1,true);
        }
    }
    

    return(
        <section style={{display:'flex'}}>
            <section className="project-main-sidebar">
                <div>프로젝트</div>
                <ol>
                    <li onClick={()=>{getAllProject(1); setPage(1)}}>전체 프로젝트</li>
                    <li onClick={()=>{getMyProject(1); setPage(1)}}>내 프로젝트</li>
                </ol>
            </section>
            <section style={{display:'flex', flexDirection:'column'}}>
            <section className="project-main-header" style={{display:'flex', height:43}}>
                <div>{title}</div>
                <input value={searchWord} onChange={(e)=>{setSearchWord(e.target.value)}} placeholder="프로젝트 검색"/>
                <button onClick={getSearchProject}>검색</button>
                <button onClick={()=>{nav('/project/create')}}>프로젝트 만들기</button>
            </section>
            <ProjectComponent projects={project} title={title}/>
            </section>
            <Pagination
                    activePage={page} // 현재 페이지
                    itemsCountPerPage={6} // 한 페이지랑 보여줄 아이템 갯수
                    totalItemsCount={totalElements} // 총 아이템 갯수
                    pageRangeDisplayed={5} // paginator의 페이지 범위
                    prevPageText={"‹"} // "이전"을 나타낼 텍스트
                    nextPageText={"›"} // "다음"을 나타낼 텍스트
                    onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
            />
        </section>
    )
}

export default Project;