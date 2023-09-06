"use client";
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Demo } from "../../../../types/types";
import React, { useEffect, useState } from "react";
import { Button } from 'primereact/button';
import {
    DetailLabel, DetailRow, DetailValue,
    ProductDetailsContainer,
    StyledDialog
} from "../StyledComponents/viewProducts.styled";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import UpdateProducts from "../AddProducts/UpdateProducts";
import { Go_Go_ApiService } from "../../../helpers/Fetch_Go_Go_Pharma";

const ProductsComponentList = () => {


    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);



    const [selectedBrand, setSelectedBrand] = useState<string | null>(null); // New
    const [searchQuery, setSearchQuery] = useState('');

    const [editedProduct, setEditedProduct] = useState<Demo.Product | null>(null);
    const [visible, setVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Demo.Product | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);


    const [productsCategories, setProductsCategories] = useState<{
        categories: Demo.MainCategory[];
        brands: Demo.Brand[];
        attributes: Demo.Attribute[];
        variantGroups: Demo.VariantGroup[];
    }>({
        categories: [],
        brands: [],
        attributes: [],
        variantGroups: [],
    });


    const [productsData, setProductsData] = useState<{
        products: Demo.Product[];
        brands: Demo.Brand[];
    }>({
        products: [],
        brands: [],
    });


    useEffect(() => {
        setLoading(true);
        Go_Go_ApiService.GetProductsByCategory()
            .then((data: any) => {
                console.log(data);
                setLoading(false);
                setProductsCategories(data);
                setProductsData(data)
            });
    }, []);


    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
        setSelectedSubcategory(null);
        setSelectedBrand(null);
    };

    const handleSubcategorySelect = (subcategory: string) => {
        setSelectedSubcategory(subcategory);
    };


    const handleBrandSelect = (brand: string) => {
        setSelectedBrand(brand);
    };


    const displayedSubcategories = selectedCategory
        ? (productsCategories.categories.find(category => category.name === selectedCategory)?.subcategories || [])
        : [];


    // Filter products by sub category
    const displayedProducts: Demo.Product[] = selectedSubcategory
        ? (displayedSubcategories.find(subcategory => subcategory.name === selectedSubcategory)?.products || [])
        : [];


    // Check if productsData.products exists before filtering
    const filteredProductsByBrand = selectedBrand && productsData.products
        ? productsData.products.filter(product => product.brand_id === selectedBrand)
        : [];


    const searchProducts = (products: Demo.Product[], searchQuery: string, filteredProductsByBrand: Demo.Product[]) => {
        if (!searchQuery) {
            return products || filteredProductsByBrand;
        }
        const normalizedQuery = searchQuery.toLowerCase();
        return products.filter((product: Demo.Product) => {
            if (product.translations && product.translations.en) {
                return (
                    product.translations.en.title.toLowerCase().includes(normalizedQuery) ||
                    product.translations.en.description.toLowerCase().includes(normalizedQuery)
                );
            }
            return false;
        });
    };

    const filteredProducts = searchProducts(displayedProducts, searchQuery, filteredProductsByBrand);





    const deleteProduct = (productId: any) => {
        setProductsCategories((prevProducts: any) => {
            const updatedCategories = [...prevProducts.categories];
            for (let i = 0; i < updatedCategories.length; i++) {
                const subcategories = updatedCategories[i].subcategories;
                for (let j = 0; j < subcategories.length; j++) {
                    subcategories[j].products = subcategories[j].products.filter(
                        (product: any) => product.id !== productId
                    );
                }
            }

            return {
                ...prevProducts,
                categories: updatedCategories,
            };
        });
    };


    const actionBodyTemplate = (rowData: Demo.Product) => {
        return (
            <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deleteProduct(rowData.id)} />
        );
    };

    const handleProductModal = (rowData: Demo.Product, editMode: boolean) => {
        setSelectedProduct(rowData);
        setVisible(true);
        setIsEditMode(editMode);
    };

    const DetailsBodyTemplate = (rowData: Demo.Product) => {
        return <span onClick={() => handleProductModal(rowData, isEditMode)} className={`cursor-pointer product-badge status`}>View Details</span>;
    };


    const updateBodyTemplate = (rowData: Demo.Product) => {
        return (<Button icon="pi pi-pencil" className=" text-xs p-button-rounded p-button-warning" onClick={() => handleProductModal(rowData, true)} />);
    };

    const updateProduct = (updatedProduct: any) => {
        setProductsCategories((prevProducts: any) => {
            if (!prevProducts || !prevProducts.dataByCategory) {
                return prevProducts;
            }

            const updatedProductsByCategory = { ...prevProducts };
            Object.keys(updatedProductsByCategory.dataByCategory).forEach(
                (categoryId) => {
                    updatedProductsByCategory.dataByCategory[categoryId].forEach(
                        (product: any, index: any) => {
                            if (product.id === updatedProduct.id) {
                                updatedProductsByCategory.dataByCategory[categoryId][index] =
                                    updatedProduct;
                            }
                        }
                    );
                }
            );
            return updatedProductsByCategory;
        });
        setIsEditMode(false);
        setVisible(false);
        setEditedProduct(null);
    };


    const productTitleTemplate = (rowData: Demo.Product) => {
        return <span className={`pt-2 ${rowData?.translations?.en.title}`}>{rowData?.translations?.en.title}</span>;
    };

    const imageBodyTemplate = (rowData: Demo.Product) => {
        return <img
            src={`/img/${rowData.product_images}`}
            onError={(e) => ((e.target as HTMLImageElement).src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')}
            alt={rowData.product_images} width={100} />;
    };




    return (
        <div className="col-12">
            <div className="flex flex-column md:flex-row md:justify-content-between gap-2">
                <div>
                    <h6 className='capitalize font-bold m-[-3rem]'> shop by Category</h6>

                    <Dropdown
                        value={selectedCategory}
                        options={productsCategories.categories.map(category => ({
                            value: category.name,
                            label: category.name
                        }))}
                        onChange={(e) => handleCategorySelect(e.value)}
                        placeholder="Select a category"
                        style={{ width: "20rem" }}
                        className="m-1"
                    />
                </div>
                <div>
                    <h6 className='capitalize font-bold m-[-3rem]'> shop by Brands</h6>
                    <Dropdown
                        value={selectedBrand}
                        options={productsCategories.brands.map(brand => ({
                            value: brand.id,
                            label: brand.slug
                        }))}
                        onChange={(e) => handleBrandSelect(e.value)}
                        placeholder="Select a Brand"
                        style={{ width: "20rem" }}
                        className="m-1"
                    />
                </div>
                <div>
                    <h6>Products Search</h6>
                    <span className="p-input-icon-left">
                        <i className="pi pi-search mb-2" />
                        <InputText placeholder="Search by Name" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    </span>
                </div>
            </div>
            <div className="flex flex-column md:flex-row md:justify-content-between gap-2">
                {selectedCategory && (
                    <Dropdown
                        value={selectedSubcategory}
                        options={displayedSubcategories.map(subcategory => ({
                            value: subcategory.name,
                            label: subcategory.name
                        }))}
                        onChange={(e) => handleSubcategorySelect(e.value)}
                        placeholder="Select a subcategory"
                        style={{ width: "20rem" }}
                        className="m-2 "
                    />
                )}
            </div>
            <div className="card">
                <h5> {selectedSubcategory || 'All Products'}</h5>
                <h6></h6>
                <DataTable
                    value={filteredProducts}
                    dataKey="id"
                    responsiveLayout="scroll">
                    <Column field="id" header="Id" style={{ flexGrow: 1, flexBasis: '100px' }} alignFrozen="left" />
                    <Column  header="Name"  body={productTitleTemplate} />
                    <Column header="Image" body={imageBodyTemplate} />
                    <Column field="details" header="Product Details" sortable body={DetailsBodyTemplate} />
                    <Column header="Actions" body={actionBodyTemplate} />
                    <Column header="Update Product" body={updateBodyTemplate} />
                </DataTable>
            </div>

            {selectedProduct && (
                <StyledDialog
                    header={isEditMode ? "Update Product" : "Product Details"}
                    visible={visible}
                    onHide={() => {
                        setVisible(false);
                        setIsEditMode(false);
                    }}>
                    {isEditMode ? (
                        <div>
                            <UpdateProducts onSubmit={updateProduct} product={selectedProduct} />
                        </div>
                    ) : (
                        <ProductDetailsContainer>
                            <img
                                src={`/img/${selectedProduct?.product_images}`}
                                onError={(e) => ((e.target as HTMLImageElement).src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')}
                                alt={selectedProduct?.product_images} className="shadow-2   mb-6" width={300} />
                            <DetailRow>
                                <DetailLabel>Product ID:</DetailLabel>
                                <DetailValue>{selectedProduct?.id}</DetailValue>
                            </DetailRow>
                            <DetailRow>
                                <DetailLabel>Product Name:</DetailLabel>
                                <DetailValue>{selectedProduct?.translations.en.title}</DetailValue>
                            </DetailRow>
                            <DetailRow>
                                <DetailLabel>Product Description:</DetailLabel>
                                <DetailValue>{selectedProduct?.translations?.en.description}</DetailValue>
                            </DetailRow>
                            <DetailRow>
                                <DetailLabel>Brand-ID:</DetailLabel>
                                <DetailValue>{selectedProduct?.brand_id}</DetailValue>
                            </DetailRow>
                        </ProductDetailsContainer>
                    )}
                </StyledDialog>
            )}
        </div>
    )
}

export default ProductsComponentList;
