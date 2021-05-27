// imports
import { useState } from 'react';

const SearchBar = ({ setSearchTerm }) =>
{
    // states
    const [ search, setSearch ] = useState('');

    return (
        <form className="search-bar" onSubmit={(e) => {e.preventDefault(); setSearchTerm(search)}}>
            <input type="text" value={search} placeholder="Search" onChange={(e) => {setSearch(e.target.value)}} />
            <input type="submit" value="Search" />
        </form>
    )
}

export default SearchBar;