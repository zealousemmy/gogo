"use client";
import {Column} from "primereact/column";
import {DataTable, DataTableExpandedRows} from "primereact/datatable";
import {Rating} from "primereact/rating";
import {Demo} from "../../../types/types";
import React, {useEffect, useState} from "react";
import { ApiServices} from "../../helpers/FetchData";
import {Button} from "primereact/button";

const SalesOrder =( )=>{

    const [products, setProducts] = useState<Demo.Product[]>([]);
    const [expandedRows, setExpandedRows] = useState<any[] | DataTableExpandedRows>([]);
    const [allExpanded, setAllExpanded] = useState(false);


    //GET CUSTOMER-PRODUCT-ORDER
    useEffect(() => {
        ApiServices.getProductsOrder().then((data:any) => setProducts(data));
    }, []);


    // TABLE DATA TOGGLE & EXPAND ALL TABS
    const toggleAll = () => {if (allExpanded) collapseAll(); else expandAll();};
    const expandAll = () => {
        let _expandedRows = {} as { [key: string]: boolean };
        products.forEach((p) => (_expandedRows[`${p.id}`] = true));
        setExpandedRows(_expandedRows);
        setAllExpanded(true);
    };
    const collapseAll = () => {setExpandedRows([]);setAllExpanded(false);};



    // TABLE DATA TEMPLATES
    const imageBodyTemplate = (rowData: Demo.Product) => {
        return <img
            src={`/img/${rowData.product_images}`}
            onError={(e) => ((e.target as HTMLImageElement).src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')}
            alt={rowData.product_images} width={100} />;
    };
    const formatCurrency = (value: number) => {return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});};
    // const priceBodyTemplate = (rowData: Demo.Product) => {return formatCurrency(rowData?.price as number);};
    // const ratingBodyTemplate = (rowData: Demo.Product) => {return <Rating value={rowData?.rating} readOnly cancel={false} />;};
    // const statusBodyTemplate = (rowData: Demo.Product) => {return <span className={`product-badge status-${rowData.inventoryStatus?.toLowerCase()}`}>{rowData.inventoryStatus}</span>;};



    // CUSTOMER - ORDER {AMOUNT -STATUS- TEMPLATE}
    const amountBodyTemplate = (rowData: Demo.Customer) => {
        return formatCurrency(rowData?.amount as number);
    };
    const statusOrderBodyTemplate = (rowData: Demo.Customer) => {
        return <span className={`order-badge order-${rowData?.status?.toLowerCase()}`}>{rowData?.status}</span>;
    };


    const rowExpansionTemplate = (data: Demo.Product) => {
        return (
            <div className="orders-subtable">
                {/*<h5>Orders for {data?.name}</h5>*/}
                <DataTable value={data?.orders} responsiveLayout="scroll">
                    <Column field="id" header="Id" sortable></Column>
                    <Column field="customer" header="Customer" sortable></Column>
                    <Column field="date" header="Date" sortable></Column>
                    <Column field="amount" header="Amount" body={amountBodyTemplate} sortable></Column>
                    <Column field="status" header="Status" body={statusOrderBodyTemplate} sortable></Column>
                </DataTable>
            </div>
        );
    };

    const header = <Button icon={allExpanded ? 'pi pi-minus' : 'pi pi-plus'} label={allExpanded ? 'Collapse All' : 'Expand All'} onClick={toggleAll} className="w-11rem" />;

    // RETURN
    return(
        <div className="col-12">
            <div className="card">
                <h5>Customer Order</h5>
                <DataTable value={products} expandedRows={expandedRows}
                           onRowToggle={(e) => setExpandedRows(e.data)} responsiveLayout="scroll"
                           rowExpansionTemplate={rowExpansionTemplate} dataKey="id" header={header}>
                    <Column expander style={{ width: '3em' }} />
                    <Column field="id" header="Id" sortable/>
                    <Column field="name" header="Name" sortable />
                    <Column header="Image" body={imageBodyTemplate} />
                    <Column field="category" header="Category" sortable />
                </DataTable>
            </div>
        </div>
    )
}


export default SalesOrder