import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Header.css'; 

const Header = () => {
  const [name, setName] = useState('');
  const email = localStorage.getItem("email");
  useEffect(() => {
    const fetchName = async () => {
      try {
        const email = localStorage.getItem("email");
        console.log(email);
        const response = await axios.post('http://localhost:3001/users',{email});
        console.log(response);
        setName(response.data.name);
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };

    fetchName();
  }, []);

  return (
    <header className="header" style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",height:"58px",paddingLeft:"10px",paddingRight:"10px",maxWidth:"100%"}}>
      <div className="logo">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6--vXaMXwTHiXS7ImPFZMaKGOcnbAttL8oA&s" className="logo" alt="Cashbook Logo" style={{height: "100%"}} />
      </div>
      <div className="profile">
        <div className="profile-circle">{name.charAt(0)}</div>
        <span>{name}</span>
      </div>
    </header>
  );
}

export default Header;
