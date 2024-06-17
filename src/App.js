import React from 'react';
import Navbar from "./Componants/Navbar";
import Sidebar from "./Componants/Sidebar";
// import Footer from "./Componants/Footer";
import Dashboard from "./Componants/Dashboard";
import Supplier from './Componants/Supplier';
import Customer from './Componants/Customer';
import Product from './Componants/Product';
import Error from './Componants/Error';
import Login from './Componants/login';
import Registration from './Componants/Registration';
// import {c3chartsjs} from './public/vendor/charts/c3charts/c3chartsjs.js';

// import Chart, {
//   ArgumentAxis, Label, Legend, Series,
// } from 'devextreme-react/chart';

import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return(
    <BrowserRouter>
      <div className="dashboard-main-wrapper">
        <Navbar/>
        <Sidebar/>
          <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/Supplier' element={<Supplier/>}/>
            <Route path='/Customer' element={<Customer/>}/>
            <Route path='/Product' element={<Product/>}/>
            <Route path='/Login' element={<Login/>}/>
            <Route path='/Registration' element={<Registration/>}/>
            <Route path='/*' element={<Error/>}/>

          </Routes>

      </div>  
    </BrowserRouter>
    
    

     
      
    
  );
}

export default App;
