import React from 'react';
import { observer } from 'mobx-react';
import searchStore from './stores/SearchStore';
import '@fortawesome/fontawesome-free/css/all.min.css';

const WikiSearch = observer(() => {

    if (searchStore.error) {
        return <h4 className="error">{searchStore.error}</h4>;
    }

    const handleSearch = () => {
        searchStore.wikipediaSearch();
    };

    return (
        <div>
            <div className="imgMain">
                <h2 id = 'mainHeaerText'>WikiSearch</h2>
                <img src="http://res.cloudinary.com/kharatpriyank/image/upload/v1513659146/search_ojyiyb.svg" alt="Search" />
            </div>
            <div className="searchWrapper">
                <span className="searchBar">
                    <i id="searchIcon" className="fa fa-search" onClick={handleSearch}></i>
                    <input
                        type="search"
                        id="searchBox"
                        placeholder="Search Here"
                        value={searchStore.query}
                        onChange={(e) => searchStore.setQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter'){
                                handleSearch();
                            }
                        }}
                    />
                </span>
                <a 
                    className="button button-primary" 
                    id='randomButton' 
                    href="https://en.wikipedia.org/wiki/Special:Random" 
                    target="_blank">
                        Random!
                </a>
            </div>
            <div className="container searchResultsShow">
                {searchStore.results.map((result, index) => (
                    <a key={index} href={result.link} className="cardLink" target="_blank" rel="noopener noreferrer">
                    <div className="card">
                        <h5 className="heading">{result.heading}</h5>
                        <p className="details">{result.description}</p>
                    </div>
                    </a>
                ))}
            </div>
        </div>
    );
});

export default WikiSearch;
