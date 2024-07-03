import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import Footer from "./Footer";
// import { Link } from 'react-router-dom';
// import Papa from 'papaparse';

export default function Product() {
  const [Products, setProduct] = useState([]);
  const [Search, setSearch] = useState([]);
  const [Filter, setFilter] = useState([]);

  // Import CSV File
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);
    axios
      .post("http://localhost:8081/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert("File uploaded successfully");
      })
      .catch((error) => {
        console.error("There was an error uploading the file!", error);
      });
  };
  // End Import CSV File

  {/* <!-- ============================================================== -->
    <!-- Get Record from Database throgh the API and Dyanamic Search filter -->
    <!-- ============================================================== --> */}

  const searchItem = Products.filter((item) => {
    if (Search == "") {
      return item;
    } else if (
      item.Barcode.toLowerCase().includes(Search.toLowerCase()) ||
      item.ASIN_Code.toLowerCase().includes(Search.toLowerCase()) ||
      item.Product_Description.toLowerCase().includes(Search.toLowerCase()) ||
      item.Brand.toLowerCase().includes(Search.toLowerCase()) ||
      item.Pack_Size.toLowerCase().includes(Search.toLowerCase()) ||
      item.Total_Stock.toLowerCase().includes(Search.toLowerCase()) ||
      item.Single_Price.toLowerCase().includes(Search.toLowerCase()) ||
      item.Case_Price.toLowerCase().includes(Search.toLowerCase())
    ) {
      return item;
    }
  });

  // console.log("Hello",searchItem);
  useEffect(() => {
    const getProduct = async () => {
      try {
        const reqData = await fetch(
          "http://localhost:8080/nsdb/Product.php"
        ); //api
        const resData = await reqData.json();
        console.log(resData);
        // setProduct(resData);
        if (Array.isArray(resData)) {
          setProduct(resData);
          // setFilter(resData);
          // setSearch(resData);
          //getProduct();
        } else if (!Array.isArray(resData)) {
          return <div>Loading...</div>;
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProduct();
  }, []);

  {/* <!-- ============================================================== -->
    <!-- end Get Record from Database throgh the API and Dyanamic Search filter -->
    <!-- ============================================================== --> */}

  {/* Model Box */}

   const [ModelData, setModelData] = useState([])
   const showDetails = async(Barcode) =>{
    try{
      debugger;
      const Res = await fetch(`http://localhost:8080/nsdb/Product_Supplier.php?Barcode=${Barcode}`);
      const Supplierdata = await Res.json();
      console.log(Supplierdata);
      setModelData(Supplierdata);
    }catch(err){
      console.error("Error fetching Supplier Details:", err);
    }
       
   }
    
  {/* end Model Box */}


  {/* Pagination of Product Datatable */}

  const [CurrentPage, SetCurrentPage] = useState(1);
  const RecordsPerPage = 10;
  const IndexofLastRecords = CurrentPage * RecordsPerPage;
  const IndexofFirstRecords = IndexofLastRecords - RecordsPerPage;
  const Records = searchItem.slice(IndexofFirstRecords, IndexofLastRecords);
  const Pages = Math.ceil(searchItem.length / RecordsPerPage);
  // console.log('page',Pages);
  const PageNumber = [...Array(Pages + 1).keys()].slice(1);
  // console.log('PageNumber',PageNumber);

  function PrePage() {
    if (CurrentPage !== 1) {
      SetCurrentPage(CurrentPage - 1);
    }
  }

  function ChangePage(e) {
    SetCurrentPage(e);
    console.log(e);
  }

  function NextPage() {
    if (CurrentPage !== Pages) {
      SetCurrentPage(CurrentPage + 1);
    }
  }

  { /* end Pagination of Product Datatable */}

  { /* Expandable Row in Datatable */}

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
    isRowExpanded ? (obj[userId] = false) : (obj[userId] = true);
    setExpandState(obj);

    // If the row is expanded, we are here to hide it. Hence remove
    // it from the state variable. Otherwise add to it.
    const newExpandedRows = isRowExpanded
      ? currentExpandedRows.filter((id) => id !== userId)
      : currentExpandedRows.concat(userId);

    setExpandedRows(newExpandedRows);
  };

  {/* end Expandable Row in Datatable */  }

  { /* Currency Conveter */ }
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    fetchExchangeRate();
  }, []);

  const fetchExchangeRate = async () => {
    try {
      // Fetch exchange rate from your chosen API
      const response = await fetch("https://open.er-api.com/v6/latest/USD");
      const data = await response.json();
      setExchangeRate(data.rates.GBP); // Assuming API response structure is { rates: { GBP: rate } }
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    }
  };
  console.log(exchangeRate);
  const convertToGBP = (price) => {
    if (exchangeRate) {
      return (price * exchangeRate).toFixed(2);
    } else {
      return "Loading..."; // Handle loading state
    }
  };
  { /* end Currency Conveter */}

  { /* Supplier Dropdown */}
  const [Supplier, setSupplierData] = useState([])
  useEffect(() => {
    const getSupplier = async() =>{
      try{
        
        const resSupplier = await fetch(`http://localhost:8080/nsdb/Supplier.php`);
        const result_Supplier = await resSupplier.json();
        console.log(result_Supplier);
        setSupplierData(result_Supplier);
      }catch(err){
        console.error("Error fetching Supplier Details:", err);
      }
        
    }
    getSupplier();
  }, []);
  { /* end Supplier Dropdown */}

  { /* Currencies Dropdown */}
  const [Currencies, setCurrenciesData] = useState([])
  useEffect(() => {
    const getCurrencies = async() =>{
      try{
        
        const resCurrencies = await fetch(`http://localhost:8080/nsdb/Currencies.php`);
        const result_Currencies = await resCurrencies.json();
        console.log(result_Currencies);
        setCurrenciesData(result_Currencies);
      }catch(err){
        console.error("Error fetching Supplier Details:", err);
      }
        
    }
    getCurrencies();
  }, []);
  { /* end Currencies Dropdown */}

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
                <p className="pageheader-text">
                  Nulla euismod urna eros, sit amet scelerisque torton lectus
                  vel mauris facilisis faucibus at enim quis massa lobortis
                  rutrum.
                </p>
                <div className="page-breadcrumb">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="#" className="breadcrumb-link">
                          Dashboard
                        </a>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Product
                      </li>
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
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="card">
                    <div className="card-header">
                      <div>
                        <h3>Import Product List</h3>
                        <hr></hr>
                        <div className="row">
                          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-2">
                            <form>
                                <div className="form-group">
                                    <label for="input-select">Supplier Name<span className="text-danger">*</span></label>
                                    <select className="form-control" id="input-select">
                                          <option>Select Supplier</option>
                                      {Supplier.length > 0 ? (
                                        Supplier.map((sdata) => (
                                        <>
                                          <option>{sdata.Supplier_Name}</option>
                                        </>
                                      ))
                                      ) : (
                                          <option>-- Not Fetching Supplier --</option>
                                      )}  
                                    </select>
                                </div>
                            </form>
                          </div>
                          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-2">
                            <form>
                                <div className="form-group">
                                    <label for="input-select">Currency<span className="text-danger">*</span></label>
                                    <select className="form-control" id="input-select">
                                          <option>Select Currency</option>
                                      {Currencies.length > 0 ? (
                                        Currencies.map((cdata) => (
                                        <>
                                          <option value={cdata.currencies_status}>{cdata.currencies_name} - {cdata.currencies_code}</option>
                                        </>
                                      ))
                                      ) : (
                                          <option>-- Not Fetching Currencies --</option>
                                      )}  
                                    </select>
                                </div>
                            </form>
                          </div>
                          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-2">
                            <form>
                                <div className="form-group">
                                    <label for="input-select">Import File<span className="text-danger">*</span></label><br/>
                                    <input type="file" className="form control form control-lg" name="file" accept=".csv" onChange={handleFileChange} id="inputLarge"/>
                                    <label className=" btn btn-primary btn-sm" onClick={handleUpload}>
                                        <i className="fas fa-md fa-upload"></i> Import
                                    </label>
                                </div>
                            </form>
                          </div>
                        </div>
                        <div>
                            <p className="text-muted">Sure, here is a sample file for importing supplier products data. You can <a href="doc\Products-Import.csv" className="text-secondary">download</a> it now.</p>
                            <p className="text-dark">Note: Barcode and price must not be empty, After importing the file, any issue in row will be displayed below:</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                {/* <!-- ============================================================== -->
                <!-- data table  -->
                <!-- ============================================================== --> */}
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="card">
                    <div className="card-header">
                      <div>
                        <h3 className="mb-0">Product Details</h3><br/>
                        <label for="validationCustom01">Search</label>
                        <div className="row">
                          <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12 mb-2">
                            <input
                              type="text"
                              placeholder="Search something..."
                              className="form-control"
                              onChange={(event) =>
                                setSearch(event.target.value)
                              }
                            />
                          </div>
                          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-2 text-md-right">
                            {/* <div className="custom-file ">
                              <input type="file" className=" form control" name="file" accept=".csv" onChange={handleFileChange} id=" inputDefault"/>
                              <label className=" btn btn-primary btn-sm" onClick={handleUpload}>
                                <i className="fas fa-md fa-upload"></i> Import
                              </label>
                            </div> */}
                          </div>
                          <div className="col-xl-1 col-lg-1 col-md-12 col-sm-12 col-12 mb-2 text-md-right">
                            <CSVLink data={searchItem} filename="Products" className="btn btn-outline-success btn-sm"><i className="fas fa-md fa-file-excel"></i> Export</CSVLink>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="table-responsive">
                        <table
                          id="example"
                          className="table table-striped table-bordered second"
                          style={{ width: "100%" }}
                        >
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>EAN/Barcode</th>
                              <th>ASIN Code</th>
                              <th>Product Description</th>
                              <th>Pack Size</th>
                              <th>Brand</th>
                              <th>Total Stock</th>
                              <th>Single Price</th>
                              <th>Case Price</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Records.length > 0 ? (
                              Records.map((data) => (
                                <>
                                  <tr key={data}>
                                    <td onClick={(event) => handleEpandRow(event, data.Product_ID) }>
                                      {expandState[data.Product_ID] ? (
                                        <i className="fas fa-minus-circle"></i>
                                      ) : (
                                        <i className="fas fa-plus-circle"></i>
                                      )}
                                    </td>
                                    <td>{data.Barcode}</td>
                                    <td>{data.ASIN_Code}</td>
                                    <td>{data.Product_Description}</td>
                                    <td>{data.Pack_Size}</td>
                                    <td>{data.Brand}</td>
                                    <td>{data.Total_Stock}</td>
                                    <td>
                                      <span className="badge badge-pill badge-warning"> $ {data.Single_Price}</span>{" "}
                                      <span className="badge badge-pill badge-info"> £ {convertToGBP(data.Single_Price)}</span>
                                    </td>
                                    <td>
                                      <span className="badge badge-pill badge-warning"> $ {data.Case_Price}</span>{" "}
                                      <span className="badge badge-pill badge-info">£ {convertToGBP(data.Case_Price)}</span>
                                    </td>
                                    {/* <td> <span className='badge badge-pill badge-dark' onClick={event => handleEpandRow(event, data.ID)}>
                                              {
                                              expandState[data.ID] ?
                                                  <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>
                                              }
                                          </span>
                                      </td> */}
                                    <td>
                                      {/* onClick={(e) => showDetails(data.ID)} */}
                                      <a href="#" className="btn btn-rounded btn-dark btn-xs" data-toggle="modal" onClick={(e) => showDetails(data.Barcode)} data-target="#exampleModal"><i className="fas fa-eye"></i></a>
                                    </td>
                                  </tr>
                                  <>
                                    {/* Expnadable Row of Datatabale */}
                                    {expandedRows.includes(data.Product_ID) ? (
                                      <tr>
                                        <td colspan="11">
                                          <div style={{}}>
                                            <h2>Product Details </h2>
                                            <table className="table-responsive">
                                            
                                            </table>
                                            <thead>
                                                <tr style={{textAlign:"center"}}>
                                                    <th>PIP Code</th>
                                                    <th>Outer Barcode</th>
                                                    <th>Country Of Origin</th>
                                                    <th>Manufacturer</th>
                                                    <th>Product Images</th>
                                                    <th>Product Code</th>
                                                    <th>Outer Pack</th>
                                                    <th>Case Only</th>
                                                    <th>Pcs Box</th>
                                                    <th>Layer Box</th>
                                                    <th>Pal Box</th>
                                                    <th>Item Category</th>
                                                    <th>Sub Market Group</th>
                                                    <th>Group Category</th>
                                                    <th>Coding</th>
                                                    <th>Customs Referance</th>
                                                    <th>Nav ID</th>
                                                    <th>Product Classification</th>
                                                    <th>RRP/RSP</th>
                                                    <th>Discount</th>
                                                    <th>Single Trade Price</th>
                                                    <th>Case Trade Price</th>
                                                    <th>Unit Offer Price</th>
                                                    <th>Case Offer Price</th>
                                                    <th>Percentage Off Trade</th>
                                                    <th>Due In</th>
                                                    <th>Special Price</th>
                                                    <th>Mixed Pallet Price</th>
                                                    <th>Full Pallet Price</th>
                                                    <th>Single Promo Price</th>
                                                    <th>Case Promo Price</th>
                                                    <th>Layer Case Price</th>
                                                    <th>Layer Unit Price</th>
                                                    <th>MOQ</th>
                                                    <th>Cases Available</th>
                                                    <th>Stock</th>
                                                    <th>Expiry Date</th>
                                                    <th>created at</th>
                                                    <th>updated at</th>
                                                </tr>
                                            </thead>    
                                            <tbody>
                                                    <td>{data.PIP_Code}</td>
                                                    <td>{data.Outer_Barcode}</td>
                                                    <td>{data.Country_Of_Origin}</td>
                                                    <td>{data.Manufacturer}</td>
                                                    <td>{data.Product_Images}</td>
                                                    <td>{data.Product_Code}</td>
                                                    <td>{data.Outer_Pack}</td>
                                                    <td>{data.Case_Only}</td>
                                                    <td>{data.Pcs_Box}</td>
                                                    <td>{data.Layer_Box}</td>
                                                    <td>{data.Pal_Box}</td>
                                                    <td>{data.Item_Category}</td>
                                                    <td>{data.Sub_Market_Group}</td>
                                                    <td>{data.Group_Category}</td>
                                                    <td>{data.Coding}</td>
                                                    <td>{data.Customs_Referance}</td>
                                                    <td>{data.Nav_ID}</td>
                                                    <td>{data.Product_Classification}</td>
                                                    <td>{data.RRP_RSP}</td>
                                                    <td>{data.Discount}</td>
                                                    <td>{data.Single_Trade_Price}</td>
                                                    <td>{data.Case_Trade_Price}</td>
                                                    <td>{data.Unit_Offer_Price}</td>
                                                    <td>{data.Case_Offer_Price}</td>
                                                    <td>{data.Percentage_Off_Trade}</td>
                                                    <td>{data.Due_In}</td>
                                                    <td>{data.Special_Price}</td>
                                                    <td>{data.Mixed_Pallet_Price}</td>
                                                    <td>{data.Full_Pallet_Price}</td>
                                                    <td>{data.Single_Promo_Price}</td>
                                                    <td>{data.Case_Promo_Price}</td>
                                                    <td>{data.Layer_Case_Price}</td>
                                                    <td>{data.Layer_Unit_Price}</td>
                                                    <td>{data.MOQ}</td>
                                                    <td>{data.Cases_Available}</td>
                                                    <td>{data.Stock}</td>
                                                    <td>{data.Expiry}</td>
                                                    <td>{data.created_at}</td>
                                                    <td>{data.updated_at}</td>
                                            </tbody>
                                          </div>
                                        </td>
                                      </tr>
                                    ) : null}
                                  </> 
                                    {/* end Expnadable Row of Datatabale */}
                                </>
                              ))
                            ) : (
                              <td colspan={11}>
                                <p style={{ textAlign: "center" }}>
                                  No Products Available.
                                </p>
                              </td>
                            )}
                          </tbody>
                        </table>
                        {/* fetch multiple supplier based on Product Barcode in Modal Box */}
                        <div className=" modal fade " id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div className="modal-dialog modal-xl" role="document">
                            <div className="modal-content ">
                              <div className="modal-header">
                                <h3 className="modal-title" id="exampleModalLabel">Supplier Details</h3>
                                <button href="#" className="close" data-dismiss="modal"aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                                
                              </div>
                              <div className="modal-body">
                                <div className="card-header">
                                  <div>
                                    {/* <h3 className="mb-0">Supplier Details</h3> */}
                                    

                                    <div className="row">
                                      <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-2">
                                        <label for="validationCustom01">
                                          Search
                                        </label>
                                        <input type="text" placeholder="Search something..." className="form-control" onChange={(event) =>setSearch(event.target.value)} />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="table-responsive">
                                  <table id="example" className="table table-striped table-bordered second" style={{ width: "100%" }}>
                                    <thead>
                                      <tr>
                                        <th>Barcode</th>
                                        <th>Supplier Code</th>
                                        <th>Supplier Name</th>
                                        <th>Single Price</th>
                                        <th>Case Price</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                    {
                                      ModelData.length > 0 ? (
                                        ModelData.map((data) => (
                                          <>
                                            <tr >
                                              <td>{data.Barcode}</td>
                                              <td>{data.Supplier_Code}</td>
                                              <td>{data.Supplier_Name}</td>
                                              <td>
                                                <span className="badge badge-pill badge-warning">$ {data.Single_Price}</span>{" "}
                                                <span className="badge badge-pill badge-info"> £ {convertToGBP(data.Single_Price)}</span>
                                              </td>
                                              <td>
                                                <span className="badge badge-pill badge-warning">$ {data.Case_Price}</span>{" "}
                                                <span className="badge badge-pill badge-info">£ {convertToGBP(data.Case_Price)}</span>
                                              </td>
                                            </tr>
                                            
                                          </> 
                                      ))
                                      ) : (
                                        <td colspan={5}>
                                          <p style={{ textAlign: "center" }}>
                                            No Products Available.
                                          </p>
                                        </td>
                                      )}
                                      
                                     
                                    </tbody>
                                    
                                  </table>
                                  <div className="col-lg-12 card-body "style={{ textAlign: "right", position:"static" }}>
                                      <nav aria-label="Page navigation example">
                                        <ul className="pagination justify-content-end">
                                          <li className="page-item">
                                            <a className="page-link" href="#" onClick={PrePage} aria-label="Previous">
                                              <span aria-hidden="true">«</span>
                                              <span className="sr-only">Previous</span>
                                            </a>
                                          </li>
                                          {PageNumber && PageNumber.map((n, i) => (
                                              <li className={`page-item ${CurrentPage === n ? "active" : ""}`} key={i}>
                                                <a className="page-link" href="#" onClick={() => ChangePage(i + 1)}> {n} </a>
                                              </li>
                                            ))}
                                          
                                          <li className="page-item">
                                            <a className="page-link"href="#" onClick={NextPage} aria-label="Next">
                                              <span aria-hidden="true">»</span>
                                              <span className="sr-only"> Next</span>
                                            </a>
                                          </li>
                                        </ul>
                                      </nav>
                                    </div>
                                </div>
                              </div>
                              <div className="modal-footer">
                                <a href="#" className="btn btn-secondary" data-dismiss="modal">Close</a>
                                {/* <a href="#" className="btn btn-primary">Save changes</a> */}
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* end fetch multiple supplier based on Product Barcode in Modal Box */}
                        
                        <div className="col-lg-12 card-body"style={{ textAlign: "left" }}>
                            <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-end">
                                <li className="page-item">
                                <a className="page-link" href="#" onClick={PrePage} aria-label="Previous">
                                    <span aria-hidden="true">«</span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                </li>
                                {PageNumber && PageNumber.map((n, i) => (
                                    <li className={`page-item ${CurrentPage === n ? "active" : ""}`} key={i}>
                                    <a className="page-link" href="#" onClick={() => ChangePage(i + 1)}> {n} </a>
                                    </li>
                                ))}
                                
                                <li className="page-item">
                                <a className="page-link"href="#" onClick={NextPage} aria-label="Next">
                                    <span aria-hidden="true">»</span>
                                    <span className="sr-only"> Next</span>
                                </a>
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
        <Footer />
      </div>
    </div>
  );
}
