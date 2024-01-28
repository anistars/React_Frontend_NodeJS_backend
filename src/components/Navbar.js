import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { useNavigate  } from 'react-router-dom';
import AdminLogin from './AdminLogin';

const Navbar = () => {
  
  const navigate = useNavigate ();
  const handleLogout = () => {
    // Remove the authToken from localStorage
    localStorage.removeItem('authToken');
    // You can also redirect the user to the login page or any other desired location after logout
    navigate('/userlogin');
  }
  const handleContinueShopping=()=>{
    const authToken = localStorage.getItem('authToken');
    if(authToken){
      navigate('/cart');
    }
    else{
      navigate('/userlogin');
    }
  }
  return (
    <div>
      <nav className="navbar  navbar-expand-lg bg-body-tertiary">
           <div className="container-fluid">
             <Link className="navbar-brand" to="/">General Store</Link>
             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
             </button>
             <div className="collapse navbar-collapse" id="navbarNav">
               <ul className="navbar-nav nav-underline">
                 <li className="nav-item">
                   <Link className="nav-link" to="/about">About</Link>
                 </li>
                 <li className="nav-item">
                   <Link className="nav-link" to="/">Pricing</Link>
                 </li>
                 
                 
               </ul>
               <ul className="navbar-nav ms-auto">
               <li className="nav-item dropdown">
                   <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                     Login
                   </a>
                   <ul className="dropdown-menu">
                     <li><Link className="nav-link" to="/userlogin">User</Link></li>
                     <li><Link className="nav-link" to="/adminlogin">Admin</Link></li>
                   </ul>
                 </li>
                 <li>
                 <button type="button" className="btn btn-info btn-sm" style={{ fontSize: '0.82rem', padding: '0.48rem 0.85rem' }} onClick={handleContinueShopping}>
                    <i className="bi bi-cart-fill"></i>
                  </button>
                  </li>
               <li className="nav-item">
                <button className='btn btn-info mx-1' onClick={handleLogout}>
                  Logout
                </button>
                 </li>
                 </ul>
             </div>
           </div>
         </nav>
    </div>
  )
}

export default Navbar