import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const isMenuOpen = useSelector(store => store.app.isMenuOpen);

  if (!isMenuOpen) return null;
  return (
    <div className="p-5 shadow-lg w-48">
      <ul>
        <li><Link to="">Home</Link></li>
        <li>videos</li>
        <li>shorts</li>
        <li>Live</li>
      </ul>
      <h1 className="font-bold pt-5">subscriptions</h1>
      <ul>
        <li>music</li>
        <li>sports</li>
        <li>gaming</li>
        <li>movies</li>
      </ul>

      <h1 className="font-bold pt-5">Watch Later</h1>
      <ul>
        <li>music</li>
        <li>sports</li>
        <li>gaming</li>
        <li>movies</li>
      </ul>

    </div>
  )
}

export default Sidebar;