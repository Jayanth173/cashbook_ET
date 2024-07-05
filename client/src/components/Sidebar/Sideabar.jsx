import React from 'react';
import { FaPlus, FaFileAlt } from 'react-icons/fa';
import './Sidebar.css'; 
import { LuHome } from "react-icons/lu";
import { BsArrowRightCircle } from "react-icons/bs";
import { BsArrowLeftCircle } from "react-icons/bs";
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav className="vertical-nav">
      <button className="nav-button add-business-button">
    
        <span>Your Business</span>
      </button>
      <div className="nav-item active">
        <LuHome />
        <Link to='/home' className='nav-link'><span>Home</span></Link>
      </div>
      <div className="nav-item">
        <BsArrowRightCircle />
        <Link to='/income' className='nav-link'><span>Income</span></Link>
      </div>
      <div className="nav-item">
        <BsArrowLeftCircle />
        <Link to='/outlay' className='nav-link'><span>Outlay</span></Link>
      </div>
      <div className="spacer"></div> 
      <button className="nav-button logout-button">Log Out</button>
    </nav>
  );
}

export default Sidebar;
