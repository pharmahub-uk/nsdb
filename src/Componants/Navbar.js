import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {

    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [name, setUname] = useState('');

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    useEffect(() => {
         axios.get("http://localhost:8081")
         .then(res => {
            console.log(res.data);
            if(res.data.Status === "Success"){
                setAuth(true);
                setUname(res.data.name);
                console.log(res.data.name);
                // navigate('/Signin');
                

            }else{
                setAuth(false);
                setMessage(res.data.Error);
            }
        })
        
    }, [])

    const handleDelete = () => {
     axios.get('http://localhost:8081/logout')
     .then(res =>{
        window.location.reload(true);
     }).catch(err => console.log(err)); 
    } 

   
  return (
    <div className="dashboard-header">
            <nav className="navbar navbar-expand-lg bg-white fixed-top">
                <Link className="navbar-brand" to="/"><img src="images/NSDB Logo.svg" alt="" style={{height: "45px"}}/></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto navbar-right-top">
                        <li className="nav-item">
                            <div id="custom-search" className="top-search-bar">
                                <input className="form-control" type="text" placeholder="Search.."/>
                            </div>
                        </li>
                        <li className="nav-item dropdown notification">
                            <a className="nav-link nav-icons" href="#" id="navbarDropdownMenuLink1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-fw fa-bell"></i> <span className="indicator"></span></a>
                            <ul className="dropdown-menu dropdown-menu-right notification-dropdown">
                                <li>
                                    <div className="notification-title"> Notification</div>
                                    <div className="notification-list">
                                        <div className="list-group">
                                            <a href="#" className="list-group-item list-group-item-action active">
                                                <div className="notification-info">
                                                    <div className="notification-list-user-img"><img src="images/avatar-2.jpg" alt="" className="user-avatar-md rounded-circle"/></div>
                                                    <div className="notification-list-user-block"><span className="notification-list-user-name">Jeremy Rakestraw</span>accepted your invitation to join the team.
                                                        <div className="notification-date">2 min ago</div>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href="#" className="list-group-item list-group-item-action">
                                                <div className="notification-info">
                                                    <div className="notification-list-user-img"><img src="images\avatar-3.jpg" alt=""className="user-avatar-md rounded-circle"/></div>
                                                    <div className="notification-list-user-block"><span className="notification-list-user-name">John Abraham </span>is now following you
                                                        <div className="notification-date">2 days ago</div>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href="#" className="list-group-item list-group-item-action">
                                                <div className="notification-info">
                                                    <div className="notification-list-user-img"><img src="images/avatar-4.jpg" alt="" className="user-avatar-md rounded-circle"/></div>
                                                    <div className="notification-list-user-block"><span className="notification-list-user-name">Monaan Pechi</span> is watching your main repository
                                                        <div className="notification-date">2 min ago</div>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href="#" className="list-group-item list-group-item-action">
                                                <div className="notification-info">
                                                    <div className="notification-list-user-img"><img src="images/avatar-5.jpg" alt="" className="user-avatar-md rounded-circle"/></div>
                                                    <div className="notification-list-user-block"><span className="notification-list-user-name">Jessica Caruso</span>accepted your invitation to join the team.
                                                        <div className="notification-date">2 min ago</div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="list-footer"> <a href="#">View all notifications</a></div>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown connection">
                            <a className="nav-link" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="fas fa-fw fa-th"></i> </a>
                            <ul className="dropdown-menu dropdown-menu-right connection-dropdown">
                                <li className="connection-list">
                                    <div className="row">
                                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ">
                                            <a href="#" className="connection-item"><img src="images/github.png" alt="" /> <span>Github</span></a>
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ">
                                            <a href="#" className="connection-item"><img src="images/dribbble.png" alt="" /> <span>Dribbble</span></a>
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ">
                                            <a href="#" className="connection-item"><img src="images/dropbox.png" alt="" /> <span>Dropbox</span></a>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ">
                                            <a href="#" className="connection-item"><img src="images/bitbucket.png" alt=""/> <span>Bitbucket</span></a>
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ">
                                            <a href="#" className="connection-item"><img src="images/mail_chimp.png" alt="" /><span>Mail chimp</span></a>
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ">
                                            <a href="#" className="connection-item"><img src="images/slack.png" alt="" /> <span>Slack</span></a>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="conntection-footer"><a href="#">More</a></div>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown nav-user">
                            <a className="nav-link nav-user-img" href="#" id="navbarDropdownMenuLink2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="images/avatar-1.jpg" alt="" className="user-avatar-md rounded-circle"/></a>
                            <div className="dropdown-menu dropdown-menu-right nav-user-dropdown" aria-labelledby="navbarDropdownMenuLink2">
                                {
                                    auth ?
                                    <div>
                                        <div className="nav-user-info">
                                            <h5 className="mb-0 text-white nav-user-name">Hi. {name}</h5>
                                            <span className="status"></span><span className="ml-2">Available</span>
                                        </div>
                                        <Link className="dropdown-item" to="/Profile"><i className="fas fa-user mr-2"></i>Account</Link>
                                        <Link className="dropdown-item" href="/Setting"><i className="fas fa-cog mr-2"></i>Setting</Link>
                                        <Link className="dropdown-item" to="/Signin" onClick={handleDelete}><i className="fas fa-sign-out-alt mr-2"></i>Logout</Link>
                                    </div>
                                    :
                                    <div>
                                        <div className="nav-user-info">
                                            <span className="status"></span><span className="ml-2">{message}</span>
                                        </div>
                                        <Link className="dropdown-item" to="/Signin"><i className="fas fa-sign-in-alt mr-2"></i>Login</Link>
                                    </div>    
                                }
                                
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
  )
}
