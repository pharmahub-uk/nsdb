import React from 'react'
import { NavLink } from 'react-router-dom'

export default function login() {
  return (
    <div>
    {/* <!-- ============================================================== -->
    <!-- login page  -->
    <!-- ============================================================== --> */}
    <div className="splash-container">
        <div className="card ">
            <div className="card-header text-center"> <NavLink className="nav-link" to="/"><img src="images/NSDB Logo.svg" alt="" style={{height: "55px"}}/></NavLink><span className="splash-description">Please enter your user credential.</span></div>
            <div className="card-body">
                <form>
                    <div className="form-group">
                        <input className="form-control form-control-lg" id="username" type="text" placeholder="Username" autocomplete="off"/>
                    </div>
                    <div className="form-group">
                        <input className="form-control form-control-lg" id="password" type="password" placeholder="Password"/>
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
                    <a href="#" className="footer-link">Create An Account</a></div>
                <div className="card-footer-item card-footer-item-bordered">
                    <a href="#" className="footer-link">Forgot Password</a>
                </div>
            </div>
        </div>
    </div>
  
    {/* <!-- ============================================================== -->
    <!-- end login page  -->
    <!-- ============================================================== --> */}
    </div>
  )
}
