import React, { useEffect, useState } from 'react';
// import DataTable from 'react-data-table-component';
// import jsonData from './csvjson.json';

export default function Supplier() {
   
    // const DisplayData=jsonData.map(
    //     (data)=>{
    //         return(
    //             <tr>
    //                 <td>{data.EAN_Barcode}</td>
    //                 <td>{data.ASINCode}</td>
    //                 <td>{data.ProductDescription}</td>
    //                 <td>{data.SupplierName}</td>
    //                 <td>{data.PackSize}</td>
    //                 <td>{data.Brand}</td>
    //                 <td>{data.TotalStock}</td>
    //                 <td>{data.SinglePrice}</td>
    //                 <td>{data.CasePrice}</td>
    //             </tr>
    //         )
    //     }
    // )  
    
    // const columns = [
    //     {
    //         name: 'Title',
    //         selector: row => row.title,
    //     },
    //     {
    //         name: 'Year',
    //         selector: row => row.year,
    //     },
    // ];
    
    const [data, setData] = useState([]);
    const getProducts = async() =>{
        try{
            const req= await fetch("./Componants/csvjson.json");
            const res= await req.json();
            setData(res);
            // setFilter(res);

        }catch(error){
            console.log(error);
        }   
    } 
    
    useEffect(()=>{
        getProducts();
    }, []);
       

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
                                    <h2 className="pageheader-title">Supplier </h2>
                                    <p className="pageheader-text">Nulla euismod urna eros, sit amet scelerisque torton lectus vel mauris facilisis faucibus at enim quis massa lobortis rutrum.</p>
                                    <div className="page-breadcrumb">
                                        <nav aria-label="breadcrumb">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item"><a href="#" className="breadcrumb-link">Dashboard</a></li>
                                                <li className="breadcrumb-item active" aria-current="page">Supplier</li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>

                        
                        {/* <!-- ============================================================== -->
                        <!-- end pageheader  -->
                        <!-- ============================================================== --> */}
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <h3 className="text-center">Content goes here!</h3>

                                 {/* <DataTable columns={columns} data={data}/>                            */}
                                <div className="row">
                                    {/* <!-- ============================================================== -->
                                    <!-- data table  -->
                                    <!-- ============================================================== --> */}
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div className="card">
                                            <div className="card-header">
                                                <div>
                                                    <h5 className="mb-0">Data Tables - Print, Excel, CSV, PDF Buttons</h5>
                                                    <p>This example shows DataTables and the Buttons extension being used with the Bootstrap 4 framework providing the styling.</p>
                                                    <input type='text'/>
                                                </div>
                                            </div>
                                            
                                            <div className="card-body">
                                                <div className="table-responsive">
                                                    <table id="example" className="table table-striped table-bordered second" style={{width:"100%"}}>
                                                        <thead>
                                                            <tr>
                                                                <th>EAN/Barcode</th>
                                                                <th>ASIN Code</th>
                                                                <th>Product Description</th>
                                                                <th>Supplier Name</th>
                                                                <th>Pack Size</th>
                                                                <th>Brand</th>
                                                                <th>Total Stock</th>
                                                                <th>Single Price</th>
                                                                <th>Case Price</th>
                                                            </tr>    
                                                        </thead>
                                                        <tbody>
                                                            {data.map(data => (
                                                            <tr key={data.EAN_Barcode}>
                                                                <td>{data.EAN_Barcode}</td>
                                                                <td>{data.ASINCode}</td>
                                                                <td>{data.ProductDescription}</td>
                                                                <td>{data.SupplierName}</td>
                                                                <td>{data.PackSize}</td>
                                                                <td>{data.Brand}</td>
                                                                <td>{data.TotalStock}</td>
                                                                <td>{data.SinglePrice}</td>
                                                                <td>{data.CasePrice}</td>
                                                            </tr>
                                                             ))}

                                                        {/* {DisplayData} */}

                                                        {/* <DataTable data={DisplayData}
                                                            highlightOnHover
                                                            pagination
                                                            paginationPerPage={5}
                                                            paginationRowsPerPageOptions={[5, 15, 25, 50]}
                                                            paginationComponentOptions={{
                                                            rowsPerPageText: 'Records per page:',
                                                            rangeSeparatorText: 'out of', }}
                                                        > 
                                                            {DisplayData.map(data => (
                                                            <tr >
                                                                <td>{data.EAN_Barcode}</td>
                                                                <td>{data.ASINCode}</td>
                                                                <td>{data.ProductDescription}</td>
                                                                <td>{data.SupplierName}</td>
                                                                <td>{data.PackSize}</td>
                                                                <td>{data.Brand}</td>
                                                                <td>{data.TotalStock}</td>
                                                                <td>{data.SinglePrice}</td>
                                                                <td>{data.CasePrice}</td>
                                                            </tr>
                                                             ))}
                                                        
                                                        </DataTable> */}
                                                                

                                                        </tbody>
                                                       
                                                    </table>

                                                    {/* <DataTable                                                       
                                                        columns={columns}
                                                        data={data}
                                                        highlightOnHover
                                                        pagination
                                                        paginationPerPage={5}
                                                        paginationRowsPerPageOptions={[5, 15, 25, 50]}
                                                        paginationComponentOptions={{
                                                        rowsPerPageText: 'Records per page:',
                                                        rangeSeparatorText: 'out of', }} >
                                                    </DataTable> */}

                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- ============================================================== -->
                                    <!-- end data table  -->
                                    <!-- ============================================================== --> */}
                                </div>

                            </div>
                        </div>
                    </div>
                        {/* <!-- ============================================================== -->
                        <!-- footer -->
                        <!-- ============================================================== --> */}
                        <div className="footer">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                        Copyright © 2018 Concept. All rights reserved. Dashboard by <a href="https://colorlib.com/wp/">Colorlib</a>.
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                        <div className="text-md-right footer-links d-none d-sm-block">
                                            <a href="javascript: void(0);">About</a>
                                            <a href="javascript: void(0);">Support</a>
                                            <a href="javascript: void(0);">Contact Us</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- ============================================================== -->
                        <!-- end footer -->
                        <!-- ============================================================== --> */}
                </div>
        </div>
  )
}
