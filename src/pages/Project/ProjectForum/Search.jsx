import React from 'react';

const Search = () => {
    return (
        <div className='search-area'>
            <form>
                <input type='text' placeholder='검색어를 입력하세요'/>
                <button type='submit'>검색</button>
            </form>
        </div>
    );
};

export default Search;