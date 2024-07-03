import React from 'react';
import Navbar from "./Componants/Navbar";
import Sidebar from "./Componants/Sidebar";
// import Footer from "./Componants/Footer";
import Dashboard from "./Componants/Dashboard";
import Supplier from './Componants/Supplier';
import Customer from './Componants/Customer';
import Product from './Componants/Product';
import Error from './Componants/Error';
import Signin from './Componants/Signin';
import Registration from './Componants/Registration';
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import ProtectedRoutes from './Componants/ProtectedRoutes';



// import {c3chartsjs} from './public/vendor/charts/c3charts/c3chartsjs.js';

// import Chart, {
//   ArgumentAxis, Label, Legend, Series,
// } from 'devextreme-react/chart';




function App() {

  return(
    <BrowserRouter>
      <div className="dashboard-main-wrapper">
        <Navbar/>
        <Sidebar/>
          <Routes>
            <Route path='/Signin' element={<Signin/>}/>
            {/* <Route element={<ProtectedRoutes/>}> */}
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/Supplier' element={<Supplier/>}/>
            <Route path='/Customer' element={<Customer/>}/>
            <Route path='/Product' element={<Product/>}/>
            <Route path='/Registration' element={<Registration/>}/>
            {/* </Route> */}
            
            <Route path='/*' element={<Error/>}/>

          </Routes>

      </div>  
    </BrowserRouter>
    
    

     
      
    
  );
}

export default App;
