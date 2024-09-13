import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toggleMenu } from '../utils/appSlice';
import { YOUTUBE_SEARCH_API } from '../utils/constants';
import { useSelector } from 'react-redux';
import { cacheResults } from '../utils/searchSlice';

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sugestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchCache = useSelector(store => store.search);
  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);

      } else {
        getSearchSuggestions();
      }

    }, 200)

    return () => {
      clearTimeout(timer);
    }

  }, [searchQuery]);


  const getSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    setSuggestions(json[1]);
    dispatch(cacheResults({
      [searchQuery]: json[1],
    }));
  }

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  }

  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-lg">
      <div className="flex col-span-1">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-8 cursor-pointer"
          alt="menu" src="https://icons.veryicon.com/png/o/miscellaneous/linear-icon-45/hamburger-menu-5.png" />
        <a href="/">
          <img
            className="h-9 mx-2"
            alt="youtube-logo" src="https://cdn.mos.cms.futurecdn.net/8gzcr6RpGStvZFA2qRt4v6.jpg" />
        </a>
      </div>

      <div className="col-span-10 px-10">
        <div>
          <input className="px-5 w-1/2 border border-gray-400 p-2 rounded-l-full" type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onFocus={() => setShowSuggestions(true)} onBlur={() => setShowSuggestions(false)} />
          <button className="border border-gray-400 px-5 py-2 rounded-r-full bg-gray-100">🔍</button>
        </div>
        {showSuggestions && (<div className="fixed bg-white py-2 px-5 w-[38rem] showdow-lg rounded-lg border border-gray">
          <ul>
            {sugestions.map(s => <li key={s} className="py-2 shadow-sm hover:bg-gray-200">🔍{s}</li>)}
          </ul>
        </div>)}
      </div>


      <div className="col-span-1">
        <img
          className="h-8"
          alt="user" src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" />
      </div>
    </div>
  )
}

export default Head