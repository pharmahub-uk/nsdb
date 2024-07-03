// import Fonts from "./public/vendor/fonts/fontawesome/css/fontawesome-all.css";
import Footer from "./Footer";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



export default function Dashboard() {

    

    // const [uname, setUname] = useState('');
    // const navigate = useNavigate()

    // useEffect( () => {
    //     axios.get('http://localhost:8081')
    //     .then( res => {
    //         if(res.data.valid){
    //             console.log(res.data.Username);
    //             setUname(res.data.Username);
    //         }else{
    //             navigate('/Signin');
    //         }
    //         console.log(res);

    //     })
    //     .catch(err => console.log(err))
    // }, [])


  return (
    <div className="dashboard-wrapper">
            <div className="dashboard-ecommerce">
                <div className="container-fluid dashboard-content ">
                    {/* <!-- ============================================================== -->
                    <!-- pageheader  -->
                    <!-- ============================================================== --> */}
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="page-header">
                                <h2 className="pageheader-title">Dashboard</h2>
                                <p className="pageheader-text">Nulla euismod urna eros, sit amet scelerisque torton lectus vel mauris facilisis faucibus at enim quis massa lobortis rutrum.</p>
                                <div className="page-breadcrumb">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            {/* <li className="breadcrumb-item"><a href="#" className="breadcrumb-link">Dashboard</a></li> */}
                                            {/* <li className="breadcrumb-item active" aria-current="page">E-Commerce Dashboard Template</li> */}
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- ============================================================== -->
                    <!-- end pageheader  -->
                    <!-- ============================================================== --> */}
                    
                </div>
            </div>
            {/* <!-- ============================================================== -->
            <!-- footer -->
            <!-- ============================================================== --> */}
            {/* <div className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                             Copyright © 2018 Concept. All rights reserved. Dashboard by <a href="https://colorlib.com/wp/">Colorlib</a>.
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="text-md-right footer-links d-none d-sm-block">
                                <a href="javascript: void(0);">About</a>
                                <a href="javascript: void(0);">Support</a>
                                <a href="javascript: void(0);">Contact Us</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <Footer/>
            {/* <!-- ============================================================== -->
            <!-- end footer -->
            <!-- ============================================================== --> */}
        </div>
  )
}
