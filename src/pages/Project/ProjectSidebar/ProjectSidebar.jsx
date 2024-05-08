import { Outlet } from "react-router-dom";

const ProjectSidebar = () => {

    return(
        <>
            <div>프로젝트 사이드바</div>
            <Outlet/>
        </>
    )
}

export default ProjectSidebar;