import React from 'react';
import { Link } from 'react-router-dom';


export default function Error() {
  return (
    <div className="container">
                <div className="row">
                    <div className="offset-xl-2 col-xl-10 offset-lg-2 col-lg-8 col-md-12 col-sm-12 col-12">
                        <div className="error-section">
                            <img src="images/404 error.png" alt="" className="img-fluid"/>
                            <div className="error-section-content">
                                <h1 className="display-3 text-center">Page Not Found</h1>
                                <h3 className="display-6 text-center">This page is outside of the universe</h3>
                                <p className='text-center'> The page you are trying to access doesn’t exist or has been moved.</p>
                                <div className='text-center'><Link to="/" className="btn btn-secondary btn-lg text-center" >Back to Home</Link></div>
                            </div>
                            <p className='text-center'>If you think this is an error, contact our developer at <b>viral@smartwaypharma.co.uk</b></p>
                        </div>
                    </div>
                </div>
            </div>
  )
}
