import { Link, NavLink, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import axios from 'axios'

export default function Signin() {

    const [values, setValues] = useState({
        username :'',
        email :'',
        password :'',
    })

    // const handleInput = (event) => {
    //   setValues(prev => ({...prev, [event.target.name]:[event.target.value]}))
    // }
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const handleSubmit = (event) => {
      event.preventDefault();
      axios.post('http://localhost:8081/Signin', values)
      .then(res => {
        console.log(res.data.Status);
        if(res.data.Status === "Success"){
            
            navigate('/')
        }else{
            console.log(res);
            alert ("Not redirect in Login Page");
        }
      })
    }


  return (
    
    <body style={{ }}>
        {/* <!-- ============================================================== -->
        <!-- login page  -->
        <!-- ============================================================== --> */}
        <div className="splash-container">
            <div className="card vh-100">
                <div className="card-header text-center"> <NavLink className="nav-link" to="/"><img src="images/NSDB Logo.svg" alt="" style={{height: "55px"}}/></NavLink><span className="splash-description">Please enter your user credential.</span></div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input className="form-control form-control-lg" name="email" type="text" placeholder="email" onChange={e => setValues({...values, email: e.target.value})} autocomplete="off"/>
                        </div>
                        <div className="form-group">
                            <input className="form-control form-control-lg" name="password" type="password" onChange={e => setValues({...values, password: e.target.value})} placeholder="Password"/>
                        </div>
                        <div className="form-group">
                            <label className="custom-control custom-checkbox">
                                <input className="custom-control-input" type="checkbox"/><span className="custom-control-label">Remember Me</span>
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg btn-block">Sign in</button>
                    </form>
                </div>
                <div className="card-footer bg-white p-0  ">
                    <div className="card-footer-item card-footer-item-bordered">
                        <Link to="/Registration" className="footer-link">Create An Account</Link></div>
                    <div className="card-footer-item card-footer-item-bordered">
                        <Link to="/Forgot_Password" className="footer-link">Forgot Password</Link>
                    </div>
                </div>
            </div>
        </div>

        {/* <!-- ============================================================== -->
        <!-- end login page  -->
        <!-- ============================================================== --> */}
    </body>
  )
}
