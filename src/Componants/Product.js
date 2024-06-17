import React from 'react';
import axios from 'axios';
import { useState, useEffect} from 'react';
import { CSVLink } from 'react-csv';

export default function Product() {

    const [Products, setProduct] = useState([]);
    const [Search, setSearch] = useState([]);
    const [Filter, setFilter] = useState([]);
     


    {/* <!-- ============================================================== -->
    <!-- Get Record from Database throgh the API and Dyanamic Search filter -->
    <!-- ============================================================== --> */}

    const searchItem = Products.filter((item) => {
        if(Search == ''){
            return item;
        }else if( item.EAN_Barcode.toLowerCase().includes(Search.toLowerCase()) || 
                  item.ASIN_Code.toLowerCase().includes(Search.toLowerCase()) ||
                  item.Product_Description.toLowerCase().includes(Search.toLowerCase()) ||
                  item.Supplier_Name.toLowerCase().includes(Search.toLowerCase()) ||
                  item.Pack_Size.toLowerCase().includes(Search.toLowerCase()) ||
                  item.Total_Stock.toLowerCase().includes(Search.toLowerCase()) ||
                  item.Single_Price.toLowerCase().includes(Search.toLowerCase()) ||
                  item.Case_Price.toLowerCase().includes(Search.toLowerCase())     
        ){
            return item;
        }
    })

    // console.log("Hello",searchItem);
    useEffect(() => {
        
        const getProduct = async() => {
            try{
            const reqData = await fetch('http://localhost:8080/nsdb/Product_API.php'); //api
            const resData = await reqData.json();
            console.log(resData);
            // setProduct(resData);
            if (Array.isArray(resData)) {
                
                setProduct(resData);
                // setFilter(resData);
                // setSearch(resData);
              } 
            else if (!Array.isArray(resData)) {
                return <div>Loading...</div>;
              }
            } catch (error) { 
              console.error('Error fetching products:', error);
            }
        }
        
        getProduct();

    }, []);
    
    {/* <!-- ============================================================== -->
    <!-- end Get Record from Database throgh the API and Dyanamic Search filter -->
    <!-- ============================================================== --> */}
    

    {/* Pagination of Datatable */}
    
    const [CurrentPage, SetCurrentPage] = useState(1);
    const RecordsPerPage = 3;
    const IndexofLastRecords = CurrentPage * RecordsPerPage;
    const IndexofFirstRecords = IndexofLastRecords - RecordsPerPage;
    const Records = searchItem.slice(IndexofFirstRecords, IndexofLastRecords);
    const Pages = Math.ceil(searchItem.length / RecordsPerPage);
    // console.log('page',Pages);
    const PageNumber = [...Array(Pages + 1).keys()].slice(1);
    // console.log('PageNumber',PageNumber);

    function PrePage(){
        if(CurrentPage !== 1){
            SetCurrentPage(CurrentPage - 1);
        }
    }

    function ChangePage(e){
        SetCurrentPage(e);
        console.log(e);
       
    }
    
    function NextPage(){
        if(CurrentPage !== Pages){
            SetCurrentPage(CurrentPage + 1);
        }

    }

    {/* end Pagination of Datatable */}


    {/* Expandable Row in Datatable */}
    const [expandedRows, setExpandedRows] = useState([]);

    // State variable to keep track which row is currently expanded.
    const [expandState, setExpandState] = useState({});
  
    /**
     * This function gets called when show/hide link is clicked.
     */
    const handleEpandRow = (event, userId) => {
      const currentExpandedRows = expandedRows;
      const isRowExpanded = currentExpandedRows.includes(userId);
  
      let obj = {};
      isRowExpanded ? (obj[userId] = false) :  (obj[userId] = true);
      setExpandState(obj);
  
      // If the row is expanded, we are here to hide it. Hence remove
      // it from the state variable. Otherwise add to it.
      const newExpandedRows = isRowExpanded ?
            currentExpandedRows.filter(id => id !== userId) :
            currentExpandedRows.concat(userId);
  
      setExpandedRows(newExpandedRows);
    }

    {/* end Expandable Row in Datatable */}

    
        
     {/* Currency Conveter */}    
    const [exchangeRate, setExchangeRate] = useState(null);

    useEffect(() => {
     fetchExchangeRate();
    }, []);
  
  
    const fetchExchangeRate = async () => {
      try {
        // Fetch exchange rate from your chosen API
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        const data = await response.json();
        setExchangeRate(data.rates.GBP); // Assuming API response structure is { rates: { GBP: rate } }
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    };
    console.log(exchangeRate);
    const convertToGBP = price => {
      if (exchangeRate) {
        return (price * exchangeRate).toFixed(2);
      } else {
        return 'Loading...'; // Handle loading state
      }
    };
     {/* end Currency Conveter */}   
   
    // const getProduct = async() =>{

    //     const result = await axios.get("http://localhost:8080/nsdb/Product_API.php");
    //     setProduct(result.data.phpresult);
    //     console.log(result.data.result);

    // };

    // useEffect(() => {
    //     getProduct();
    // }, []);


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
                                <h2 className="pageheader-title">Product </h2>
                                <p className="pageheader-text">Nulla euismod urna eros, sit amet scelerisque torton lectus vel mauris facilisis faucibus at enim quis massa lobortis rutrum.</p>
                                <div className="page-breadcrumb">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="#" className="breadcrumb-link">Dashboard</a></li>
                                            <li className="breadcrumb-item active" aria-current="page">Product</li>
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
                                                    <label for="validationCustom01">Search</label>
                                                    <div className="row" >
                                                        <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10 d-flex">
                                                            <input type="text" placeholder="Search something..." className="form-control" onChange={(event) => setSearch(event.target.value)}  />
                                                        </div>
                                                        <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 text-md-right">
                                                                {/* Export CSV File */}
                                                            <CSVLink data={searchItem} filename='Products' className='btn btn-outline-success btn-sm'><i className="far fa-md fa-file-excel"></i> Export</CSVLink>
                                                        </div>
                                                    </div>
                                                </div>    
                                            </div>
                                            
                                            <div className="card-body">
                                                <div className="table-responsive">
                                                    <table id="example" className="table table-striped table-bordered second" style={{width:"100%"}}>
                                                        <thead>
                                                               
                                                            <tr>
                                                                <th>#</th>
                                                                <th>EAN/Barcode</th>
                                                                <th>ASIN Code</th>
                                                                <th>Product Description</th>
                                                                <th>Supplier Name</th>
                                                                <th>Pack Size</th>
                                                                <th>Brand</th>
                                                                <th>Total Stock</th>
                                                                <th>Single Price</th>
                                                                <th>Case Price</th>
                                                                {/* <th>Action</th> */}
                                                            </tr>    
                                                        </thead>
                                                        <tbody >
                                                            {
                                                                Records.length > 0 ?(
                                                                    Records.map(data => <>
                                                                            <tr key={data} onClick={event => handleEpandRow(event, data.ID)}>
                                                                                <td>{data.ID}</td>
                                                                                <td>{data.EAN_Barcode}</td>
                                                                                <td>{data.ASIN_Code}</td>
                                                                                <td>{data.Product_Description}</td>
                                                                                <td>{data.Supplier_Name}</td>
                                                                                <td>{data.Pack_Size}</td>
                                                                                <td>{data.Brand}</td>
                                                                                <td><span className='badge badge-pill badge-success'>{data.Total_Stock}</span></td>
                                                                                <td><span className='badge badge-pill badge-dark'>$ {data.Single_Price}</span> <span className='badge badge-pill badge-info'>£ {convertToGBP(data.Single_Price)}</span></td>
                                                                                <td><span className='badge badge-pill badge-dark'>$ {data.Case_Price}</span> <span className='badge badge-pill badge-info'> £ {convertToGBP(data.Case_Price)}</span></td>
                                                                                {/* <td> <p
                                                                                        
                                                                                        
                                                                                        onClick={event => handleEpandRow(event, data.ID)}>
                                                                                        {
                                                                                        expandState[data.ID] ?
                                                                                            'Hide' : 'Show'
                                                                                        }
                                                                                    </p></td> */}
                                                                            </tr>
                                                                           <> {
                                                                           expandedRows.includes(data.ID) ?
                                                                            <tr>
                                                                                <td colspan="10">
                                                                                <div style={{}}>
                                                                                    <h2> Details </h2>
                                                                                    <ul>
                                                                                    <li>
                                                                                        <span><b>ID:</b></span> {' '}
                                                                                        <span> { data.ID } </span>
                                                                                    </li>
                                                                                    <li>
                                                                                        <span><b>EAN/Barcode:</b></span> {' '}
                                                                                        <span> { data.EAN_Barcode } </span>
                                                                                    </li>
                                                                                    <li>
                                                                                        <span><b>ASIN Code:</b></span> {' '}
                                                                                        <span> { data.ASIN_Code } </span>
                                                                                    </li>
                                                                                    <li>
                                                                                        <span><b>Product Description:</b></span> {' '}
                                                                                        <span> { data.Product_Description } </span>
                                                                                    </li>
                                                                                    <li>
                                                                                        <span><b>Supplier Name:</b></span> {' '}
                                                                                        <span> { data.Supplier_Name } </span>
                                                                                    </li>
                                                                                    <li>
                                                                                        <span><b>Pack Size:</b></span> {' '}
                                                                                        <span> { data.Pack_Size } </span>
                                                                                    </li>
                                                                                    <li>
                                                                                        <span><b>Brand:</b></span> {' '}
                                                                                        <span> { data.Brand } </span>
                                                                                    </li>
                                                                                    <li>
                                                                                        <span><b>Total Stock:</b></span> {' '}
                                                                                        <span> { data.Total_Stock } </span>
                                                                                    </li>
                                                                                    <li>
                                                                                        <span><b>Singal Price:</b></span> {' '}
                                                                                        <span> {'$'}{ data.Single_Price } </span>
                                                                                    </li>
                                                                                    <li>
                                                                                        <span><b>Case Price:</b></span> {' '}
                                                                                        <span> { data.Case_Price } </span>
                                                                                    </li>
                                                                                    </ul>
                                                                                </div>
                                                                                </td>
                                                                            </tr> : null
                                                                            } </> 
                                                                            
                                                                            
                                                                        </>)
                                                                )  : (
                                                                       <td colspan={10}><p style={{textAlign:'center'}}>No products available.</p></td>
                                                                        
                                                                  )      
                                                            }

                                                            
                                                                
                                                            

                                                        </tbody>
                                                        
                                                    </table>
                                                    <div className="col-lg-12 card-body"  style={{textAlign:'center'}}>
                                                            <nav aria-label="Page navigation example" >
                                                                <ul className="pagination justify-content-end">
                                                                    <li className="page-item">
                                                                        <a className="page-link" href="#" onClick={PrePage} aria-label="Previous">
                                                                        <span aria-hidden="true">«</span><span className="sr-only">Previous</span></a>
                                                                    </li>
                                                                    {
                                                                        PageNumber && PageNumber.map((n,i) => (
                                                                            <li className={`page-item ${CurrentPage === n ? 'active' : ''}`} key={i}>
                                                                                <a className="page-link" href="#" onClick={()=> ChangePage(i+1)} >{n}</a>
                                                                            </li> 
                                                                        )
                                                                    )}
                                                                    {/* <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                                                    <li className="page-item"><a className="page-link" href="#">3</a></li> */}
                                                                    <li className="page-item">
                                                                        <a className="page-link" href="#" onClick={NextPage} aria-label="Next"><span aria-hidden="true">»</span>
                                                                        <span className="sr-only">Next</span></a>
                                                                    </li>
                                                                </ul>
                                                            </nav>
                                                        </div>
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
