const UpdateComponent = () => {
    const location = useLocation();
    const { userInfo } = location.state || {};

    const getUserInfo = async() => {
        try{
            const response = await axios.get("http://localhost:8080/forum/update", {
                headers: {
                    'Authorization': window.localStorage.getItem("token")  // 여기에 토큰 추가
                }
            });
            console.log(response.data.obj);
            setUserInfo(response.data.obj);
        }
        catch(err){
            console.error(err);
        }
    }
    return(
        <div>
        {(userInfo && forum.accountCode === userInfo.accountCode) && (
            <button
                onClick={handleDeletePost}
                className="btn btn-outline-danger"
                style={{ textDecoration: 'none' }}>
                수정
            </button>
            )}
        </div>
    )

}

export default UpdateComponent;