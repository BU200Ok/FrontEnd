import './ProjectComponent.css';
const ProjectComponent = (props) => {

    return(
        <section style={{display:'flex', flexDirection:'column'}}>
            <section className="project-main-header" style={{display:'flex', height:43}}>
                <div>{props.title}</div>
                <input placeholder="프로젝트 검색"/>
                <button>검색</button>
                <button>프로젝트 만들기</button>
            </section>
            <section className='project-main-projects'>


                <div className='project-main-project-container'>
                    <div className='project-main-project-title'>회사 로고 변경을 위한 아이디어</div>
                    <div className='project-main-project-from'>개발 본부, OOO, OOO, OOO</div>
                    <div>
                        <div className='project-main-project-status'>기획중</div>
                        <div>
                            <div>~2024년 1월 23일</div>
                            <div>2</div>
                        </div>
                    </div>
                </div>


                <div className='project-main-project-container'>
                    <div className='project-main-project-title'>회사 로고 변경을 위한 아이디어</div>
                    <div className='project-main-project-from'>개발 본부, OOO, OOO, OOO</div>
                    <div>
                        <div className='project-main-project-status'>기획중</div>
                        <div>
                            <div>~2024년 1월 23일</div>
                            <div>2</div>
                        </div>
                    </div>
                </div>


            </section>
        </section>
    )
}

export default ProjectComponent;