// "use client";
// import { Column } from 'primereact/column';
// import {DataTable, DataTableExpandedRows} from 'primereact/datatable';
// import {Demo} from "../../../../types/types";
// import React, {useEffect, useState} from "react";
// import {ApiServices} from "../../../helpers/FetchData";
// import { useRouter } from 'next/navigation'
// import { Button } from 'primereact/button';
// import {
//     DetailLabel, DetailRow, DetailValue,
//     ProductDetailsContainer,
//     StyledDialog
// } from "../StyledComponents/viewProducts.styled";
// import {Dropdown} from "primereact/dropdown";
// import {InputText} from "primereact/inputtext";
// import UpdateProducts from "../AddProducts/UpdateProducts";
// import {GO_GO_PHARMA_ApiServices} from "../../../helpers/GO_GO_API_FETCH";
// import {Go_Go_ApiService} from "../../../helpers/Fetch_Go_Go_Pharma";
//
//
// const ProductsComponent = ( ) =>{
//     const router = useRouter()
//     const [loading, setLoading] = useState(true)
//     const [productsCategories, setProductsCategories] = useState<string | any>({ dataByCategory: {} });
//     // const [productsCategories, setProductsCategories] = useState<{ dataByCategory: Record<any, Demo.Product[]> }>({ dataByCategory: {} });
//
//     const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//     const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
//     const [searchQuery, setSearchQuery] = useState('');
//
//     const [editedProduct, setEditedProduct] = useState<Demo.Product | null>(null);
//
//     const [visible, setVisible] = useState(false);
//     const [selectedProduct, setSelectedProduct] = useState<Demo.Product | null>(null);
//     const [isEditMode, setIsEditMode] = useState(false);
//
//
//
//     // Fetch product
//     // useEffect(() => {
//     //     ApiServices.GetProductsByCategory().then((data: { dataByCategory: Record<string, Demo.Product[]> }) => {
//     //         setProductsCategories(data);
//     //     });
//     // }, []);
//
//     // useEffect(() => {
//     //     setLoading(true)
//     //     ApiServices.GetProductsByCategory()
//     //         .then((data:any) => {
//     //             setLoading(false)
//     //         setProductsCategories(data);
//     //     });
//     // }, []);
//
//
//     useEffect(() => {
//         setLoading(true)
//         Go_Go_ApiService.GetProductsByCategory()
//             .then((data:any) => {
//                 console.log(data)
//                 setLoading(false)
//                 setProductsCategories(data);
//             });
//     }, []);
//
//
//
//     //  HANDLE PRODUCT CATEGORY FUNCTION AND SUB - CATEGORY
//     const handleCategorySelect = (category: string) => {
//         setSelectedCategory(category);
//         setSelectedSubcategory(null);
//     };
//     const handleSubcategorySelect = (subcategory: string) => {
//         setSelectedSubcategory(subcategory);
//     };
//
//
//     // const displayedSubcategories = selectedCategory
//     //     ? (productsCategories[selectedCategory]?.subcategories || [])
//     //     : [];
//
//     //     const displayedProducts = selectedSubcategory
//     //         ? displayedSubcategories
//     //         .find(subcategory => subcategory.name === selectedSubcategory)
//     //         ?.products || []
//     //         : [];
//
//
//     const displayedSubcategories = selectedCategory
//         ? (productsCategories[selectedCategory]?.subcategories || [])
//         : [];
//
//
//     const displayedProducts: Demo.Product[] = selectedSubcategory
//         ? (displayedSubcategories
//                 .find((subcategory:any, id:any) => subcategory.name === selectedSubcategory)
//                 ?.products || [])
//         : [];
//
//
//
//     // SEARCH FOR PRODUCTS
//     const searchProducts = (products:any, searchQuery:any) => {
//         if (!searchQuery) {
//             return products;
//         }
//         const normalizedQuery = searchQuery.toLowerCase();
//         return products.filter((product:any) => product.name.toLowerCase().includes(normalizedQuery));
//     };
//
//     const filteredProducts = searchProducts(displayedProducts, searchQuery);
//
//
//     // DELETE PRODUCTS
//     const deleteProduct = (productId:any) => {
//         const updatedProductsByCategory = { ...productsCategories };
//         Object.keys(updatedProductsByCategory).forEach((categoryId:any) => {
//             updatedProductsByCategory[categoryId].subcategories.forEach((subcategory:any) => {
//                 subcategory.products = subcategory.products.filter((product:any) => product.id !== productId);
//             });
//         });
//         setProductsCategories(updatedProductsByCategory);
//     };
//     const actionBodyTemplate = (rowData: Demo.Product) => {
//         return (
//             <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deleteProduct(rowData.id)}/>
//         );
//     }
//
//
//
//     // VIEW PRODUCT DETAILS & UPDATE PRODUCT DETAILS
//     // view Product Modal
//     const handleProductModal = (rowData: Demo.Product, editMode: boolean) => {
//         setSelectedProduct(rowData);
//         setVisible(true)
//         setIsEditMode(editMode);
//     };
//
//
//     // Product Details template
//     const DetailsBodyTemplate = (rowData: Demo.Product) => {
//         return <span onClick={() => handleProductModal(rowData, isEditMode)} className={`cursor-pointer product-badge status ${rowData?.productDetails}`}>View Details</span>;
//     };
//
//
//     // Product update template
//     const updateBodyTemplate = (rowData: Demo.Product) => {
//         return (<Button icon="pi pi-pencil" className=" text-xs p-button-rounded p-button-warning" onClick={() => handleProductModal(rowData, true)}/>);
//     };
//
//
//     const updateProduct = (updatedProduct:any) => {
//         setProductsCategories((prevProducts:any) => {
//             if (!prevProducts || !prevProducts.dataByCategory) {
//                 // Handle the case where data is not available
//                 return prevProducts;
//             }
//
//             const updatedProductsByCategory = { ...prevProducts };
//             Object.keys(updatedProductsByCategory.dataByCategory).forEach(
//                 (categoryId) => {
//                     updatedProductsByCategory.dataByCategory[categoryId].forEach(
//                         (product:any, index:any) => {
//                             if (product.id === updatedProduct.id) {
//                                 updatedProductsByCategory.dataByCategory[categoryId][index] =
//                                     updatedProduct;
//                             }
//                         }
//                     );
//                 }
//             );
//             return updatedProductsByCategory;
//
//         });
//         setIsEditMode(false);
//         setVisible(false);
//         setEditedProduct(null);
//     };
//
//
//     // Table Data Styling (IMAGE)
//     const imageBodyTemplate = (rowData: Demo.Product) => {
//         return <img
//             // src={`/demo-db/images/product/${rowData.image}`}
//             src={`/img/${rowData.image}`}
//             onError={(e) => ((e.target as HTMLImageElement).src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')}
//             alt={rowData.image} width={100} />;
//     //     className="shadow-2"
//     };
//
//
//     // Table Data Styling (TIME -  FORMAT)
//     const formatDate = (value: Date) => {
//         return value.toLocaleDateString('en-US', {
//             day: '2-digit',
//             month: '2-digit',
//             year: 'numeric'
//         });
//     };
//
//
//     // Table Data Styling (PRICE-CURRENCY)
//     const formatCurrency = (value: number) => {
//         return value.toLocaleString('en-US', {
//             style: 'currency',
//             currency: 'AED'
//             // currency: 'USD'
//         });
//     };
//
//
//     const priceBodyTemplate = (rowData: Demo.Product) => {
//         return formatCurrency(rowData.price as number);
//     };
//
//
//     // Table Data Styling (INVENTORY- STATUS)
//     const statusBodyTemplate = (rowData: Demo.Product) => {
//         return <span className={`product-badge pt-2 status-${rowData.inventoryStatus?.toLowerCase()}`}>{rowData.inventoryStatus}</span>;
//     };
//
//
//
//
//     return(
//         <div className="col-12">
//             <div className="flex flex-column md:flex-row md:justify-content-between gap-2">
//             <div>
//                 <h6 className='capitalize font-bold m-[-3rem]'> shop by Category</h6>
//
//                 <Dropdown
//                     value={selectedCategory}
//                     options={Object.keys(productsCategories).map(categoryId => ({
//                         value: categoryId,
//                         label: productsCategories[categoryId].name
//                     }))}
//                     onChange={(e) => handleCategorySelect(e.value)}
//                     placeholder="Select a category"
//                     style={{ width: "20rem" }}
//                     className="m-1"
//                 />
//
//
//
//
//             </div>
//             <div>
//                 <h6>Products Search</h6>
//                  <span className="p-input-icon-left">
//                          <i className="pi pi-search mb-2" />
//                         <InputText placeholder="Search by Name"   value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}/>
//                  </span>
//             </div>
//             </div>
//             <div className="flex flex-column md:flex-row md:justify-content-between gap-2">
//                 {selectedCategory && (
//                     <Dropdown
//                         value={selectedSubcategory}
//                         options={displayedSubcategories.map((subcategory:any) => ({
//                             value: subcategory.name,
//                             label: subcategory.name
//                         }))}
//                         onChange={(e) => handleSubcategorySelect(e.value)}
//                         placeholder="Select a subcategory"
//                         style={{ width: "20rem" }}
//                         className="m-2 "
//                     />
//                 )}
//             </div>
//             <div className="card">
//                 <h5> {selectedSubcategory || 'All Products'}</h5>
//              <h6>
//
//
//
//              </h6>
//                 <DataTable
//                     value={filteredProducts}
//                     dataKey={filteredProducts.id}
//                     responsiveLayout="scroll">
//                     <Column field="id" header="Id" style={{ flexGrow: 1, flexBasis: '100px' }}  alignFrozen="left"  />
//                     <Column field="name" header="Name" sortable />
//                     <Column header="Image" body={imageBodyTemplate} />
//                     <Column field="price" header="Price" sortable body={priceBodyTemplate} />
//                     <Column field="inventoryStatus" header="Status" sortable body={statusBodyTemplate} />
//                     <Column field="details" header="Product Details" sortable body={DetailsBodyTemplate}/>
//                     <Column header="Actions" body={actionBodyTemplate} />
//                     <Column header="Update Product" body={updateBodyTemplate} />
//                 </DataTable>
//             </div>
//
//             {selectedProduct && (
//                 // {visible && setProductsId && (
//                 <StyledDialog
//                     header={isEditMode ? "Update Product" : "Product Details"}
//                         visible={visible}
//                         onHide={() => {
//                             setVisible(false);
//                             setIsEditMode(false);
//                         }}>
//
//                     {isEditMode ? (
//                        <div>
//                            {/*<UpdateProducts />     */}
//                            <UpdateProducts onSubmit={updateProduct} product={selectedProduct} />
//                        </div>
//                         ) : (
//                         // Render the product details here
//                         <ProductDetailsContainer>
//                             <img
//                                 src={`/img/${selectedProduct?.image}`}
//                                 onError={(e) => ((e.target as HTMLImageElement).src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')}
//                                 alt={selectedProduct?.image} className="shadow-2 w-full  mb-6" width={100} />
//                             <DetailRow>
//                                 <DetailLabel>Product ID:</DetailLabel>
//                                 <DetailValue>{selectedProduct?.id}</DetailValue>
//                             </DetailRow>
//                             <DetailRow>
//                                 <DetailLabel>Product Name:</DetailLabel>
//                                 <DetailValue>{selectedProduct?.name}</DetailValue>
//                             </DetailRow>
//                             <DetailRow>
//                                 <DetailLabel>Product Description:</DetailLabel>
//                                 <DetailValue>{selectedProduct?.description}</DetailValue>
//                             </DetailRow>
//                             <DetailRow>
//                                 <DetailLabel>Quantity:</DetailLabel>
//                                 <DetailValue>{selectedProduct?.quantity}</DetailValue>
//                             </DetailRow>
//                             <DetailRow>
//                                 <DetailLabel>Price:</DetailLabel>
//                                 <DetailValue>AED{selectedProduct?.price}</DetailValue>
//                             </DetailRow>
//                             <DetailRow>
//                                 <DetailLabel>Date Added:</DetailLabel>
//                                 {/*<DetailValue>{timeBodyTemplate(selectedProduct)}</DetailValue>*/}
//                             </DetailRow>
//                             <DetailRow>
//                                 <DetailLabel>Inventory Status:</DetailLabel>
//                                 <DetailValue className={`product-badge lowercase status-${selectedProduct?.inventoryStatus?.toLowerCase()}`}>{selectedProduct?.inventoryStatus}</DetailValue>
//                             </DetailRow>
//                         </ProductDetailsContainer>
//                         )}
//
//                 </StyledDialog>
//             )}
//         </div>
//     )
// }
//
//
// export default ProductsComponent