import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import { Link } from "react-router-dom";


const AdminLogin = () => {
  const [email, setemail] = useState('');
  const navigate = useNavigate ();
  const [password, setpassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const handelLogin=async()=>{
    try {
        const response=await axios.post('http://localhost:5000/api/adminauth/adminlogin', {
            email: email,
            password: password,
        })
        if(response){
          navigate('/prodsadmin');
          localStorage.removeItem('authToken');
        }
    } catch (error) {
      setShowAlert(true)
        console.log("Some error occured ",error);
    }
    
  }  
 
    
  return (
    <div>
      {showAlert && (
        <div className="alert alert-danger" role="alert">
          Login failed. Please check your email and password.
        </div>
      )}
      <section className="vh-100" style={{background: "rgb(229 154 154)"}}>
  <div className="container py-3 h-100">
    <div className="row d-flex justify-content-center align-items-center h-50">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card bg-dark text-white" style={{borderRadius:"1rem"}}>
          <div className="card-body p-5 text-center">

            <div className="mb-md-5 mt-md-4 pb-5">

              <h2 className="fw-bold mb-2 text-uppercase">Admin Login</h2>
              <p className="text-white-50 mb-5">Please enter your login and password!</p>

              <div className="form-outline form-white mb-4">
                <input type="email"
                id="typeEmailX" 
                className="form-control form-control-lg" 
                value={email}
                onChange={(e)=>setemail(e.target.value)}/>
                <label className="form-label">Email</label>
              </div>

              <div className="form-outline form-white mb-4">
                <input type="password" 
                id="typePasswordX" 
                className="form-control form-control-lg" 
                value={password}
                onChange={(e)=>setpassword(e.target.value)}/>
                <label className="form-label">Password</label>
              </div>
              <button className="btn btn-outline-light btn-lg px-5 my-2" type="submit"  onClick={handelLogin}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default AdminLogin