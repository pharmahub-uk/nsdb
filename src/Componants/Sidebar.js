import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="nav-left-sidebar sidebar-dark">
            <div className="menu-list">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <a className="d-xl-none d-lg-none" href="#">Dashboard</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="true" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav flex-column">
                            
                            <li className="nav-divider" style={{textAlign:"right"}}>
                                <a href="#" class="btn btn-light btn-sm"><span class="navbar-toggler-icon"></span></a>
                            </li>
                            <li className="nav-item ">
                                <NavLink className="nav-link" to="/" data-toggle="collapse" aria-expanded="false" data-target="#submenu-1" aria-controls="submenu-1"><i className="fa fa-fw fa-user-circle"></i>Dashboard </NavLink>                              
                            </li>
                             <li className="nav-item">
                                <NavLink className="nav-link" to="/Supplier" data-toggle="collapse" aria-expanded="false" data-target="#submenu-2" aria-controls="submenu-2"><i className="fa fa-fw fas fa-boxes"></i>Supplier</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/Customer" data-toggle="collapse" aria-expanded="false" data-target="#submenu-3" aria-controls="submenu-3"><i className="fas fa-fw fa-users"></i>Customer</NavLink>
                            </li>
                            <li className="nav-item ">
                                <NavLink className="nav-link" to="/Product" data-toggle="collapse" aria-expanded="false" data-target="#submenu-4" aria-controls="submenu-4"><i className="fab fa-fw fas fa-pills"></i>Product</NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
  )
}
