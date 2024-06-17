import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
const columns = [
	{
		name: 'ID',
		selector: row => row.id,
	},
    {
		name: 'EAN/Barcode',
		selector: row => row.EAN_Barcode,
	},
	{
        name : 'ASIN Code',
        Selector : row => row.ASIN_Code,               
    }, 
    {
        name : 'Product Description',
        Selector : row => row.Product_Description               
    },  
    {
        name : 'Supplier Name',
        Selector : row => row.Supplier_Name               
    }, 
    {
        name : 'Pack Size',
        Selector : row => row.Pack_Size               
    }, 
    {
        name  : 'Brand',
        Selector : row => row.Brand                
    }, 
    {
        name : 'Total Stock',
        Selector : row => row.Total_Stock               
    }, 
    {
        name : 'Single Price (USD)',
        Selector : row => row.Single_Price               
    }, 
    {
        name : 'Case Price (USD)',
        Selector : row => row.Case_Price               
    }, 
    {
        name : 'Action',
        Selector : row => row.Action               
    }
];




export default function Products() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] =useState([]);

    const getProducts = async() =>{
        try{
            const req= await fetch("C:\NSDB\nsdb\src\Componants\csvjson.json");
            const json= await req.json();
            setData(res);
            setFilter(res);

        }catch{
            console.log(error);
        }   
    } 

    useEffect(()=>{
        getProducts();
    }, []);

    return (
    <React.Fragment>
        <DataTable columns={columns} data={data}/>
    </React.Fragment>
  )
}
