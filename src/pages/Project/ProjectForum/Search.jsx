import axios from 'axios';
import React, { useState } from 'react';

const Search = ({setSearchResult, projectCode, projectOption, anyPost, page}) => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const searching = async(event) => {
        event.preventDefault();
        try{
            const response = await axios.get(`http://localhost:8080/projects/${projectCode}/tasks/${projectOption}/${anyPost}/search`,{
                headers: {Authorization: localStorage.getItem('token')},
                params: {
                    keyword: searchKeyword,
                    page: page
                }
            });
            console.log(response);
            setSearchResult(response.data.obj.content);
            setSearchKeyword('');
        }
        catch(err){
            console.error(err);
        }
    }
    return (
        <div className='search-area'>
            <form onSubmit={searching}>
                <input type='text' placeholder='검색어를 입력하세요' value={searchKeyword} onChange={(e)=> setSearchKeyword(e.target.value)}/>
                <button type='submit'>검색</button>
            </form>
        </div>
    );
};

export default Search;