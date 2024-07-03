import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import axios from 'axios'

export default function Registration() {

    const [values, setValues] = useState({
        username :'',
        email :'',
        password :'',
    })

    

    // const handleInput = (event) => {
    //   setValues(prev => ({...prev, [event.target.name]:[event.target.value]}))
    // }
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
      event.preventDefault();
      axios.post('http://localhost:8081/Registration', values)
      .then(res => {
        if(res.data.Status == 'Success'){
            console.log(res);
            navigate('/Signin')
        }else{
            alert ("Not redirect in Login Page");
        }
        
      })
      
    }



  return (
    <div>
      <form className="splash-container" onSubmit={handleSubmit}>
          <div className="card">
              <div className="card-header">
                  <h3 className="mb-1">Registrations Form</h3>
                  <p>Please enter your user information.</p>
              </div>
              <div className="card-body">
                  <div className="form-group">
                      <input className="form-control form-control-lg" type="text" name="username" required="" placeholder="Username" onChange={e => setValues({...values, username: e.target.value})} autocomplete="off"/>
                  </div>
                  <div className="form-group">
                      <input className="form-control form-control-lg" type="email" name="email" required="" placeholder="E-mail" onChange={e => setValues({...values, email: e.target.value})} autocomplete="off"/>
                  </div>
                  <div className="form-group">
                      <input className="form-control form-control-lg" name="password" type="password" onChange={e => setValues({...values, password: e.target.value})} required="" placeholder="Password"/>
                  </div>
                  <div className="form-group">
                      <input className="form-control form-control-lg" required="" placeholder="Confirm"/>
                  </div>
                  <div className="form-group pt-2">
                      <button className="btn btn-block btn-primary" type="submit">Register My Account</button>
                  </div>
                  <div className="form-group">
                      <label className="custom-control custom-checkbox">
                          <input className="custom-control-input" type="checkbox"/><span className="custom-control-label">By creating an account, you agree the <Link href="#">terms and conditions</Link></span>
                      </label>
                  </div>
                  <div className="form-group row pt-0">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-2">
                          <button className="btn btn-block btn-social btn-facebook " type="button">Facebook</button>
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                          <button className="btn  btn-block btn-social btn-twitter" type="button">Twitter</button>
                      </div>
                  </div>
              </div>
              <div className="card-footer bg-white">
                  <p>Already member? <Link to="/Signin" className="text-secondary">Login Here.</Link></p>
              </div>
          </div>
      </form>
    </div>
  )
}
