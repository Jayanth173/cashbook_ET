import React, { useState } from 'react';
import './Login.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = () => {
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post('http://localhost:3001/login',{email,password})
        .then((res)=> {
          if(res.data.message=="Success"){
            localStorage.setItem("email",email);
            navigate('/home')
          }
        })
        // .then(result=>{
        //     console.log(result.json())
        //     if(result.data === 'Success')
        //       {
        //         navigate('/todo')
        //       }
        // })
        .then(err=>console.log(err))
    }
  return (
    <div className="container-fluid">
      <div className="card text-black m-5 custom-card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-10 col-lg-6 order-2 order-lg-1 d-flex flex-column align-items-center">
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Signin</p>
              <form onSubmit={handleSubmit}>
                <div className="d-flex flex-row align-items-center mb-4">
                  <input type="email" id="form2" className="form-control" placeholder="Your Email" name='email' onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <input type="password" id="form3" className="form-control" placeholder="Password" name='password' onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button className="btn btn-primary mb-4 custom-btn" size="lg">Login</button>
              </form>
              <Link to='/register'>
              <button className="btn mb-4 btn-dark custom-btn1">Signup</button>
              </Link>
            </div>
            <div className="col-md-10 col-lg-6 order-1 order-lg-2 d-flex align-items-center">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login