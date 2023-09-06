// Define the data structures for categories, brands, attributes, and variants
interface MainCategory {
    name: string;
    subcategories: SubCategory[];
}

interface SubCategory {
    name: string;
    products: Product[];
}

interface Product {
    id: number;
    brand_id: string;
    product_images: string;
    translations: { [language: string]: { title: string; description: string } };
    attributes: { [key: string]: string };
}

interface Brand {
    id: number;
    slug: string;
    logo_url: string | null;
    translations: { [language: string]: { title: string; description_html: string | null } };
}

interface Attribute {
    id: number;
    name: string;
}

interface VariantGroup {
    id: number;
    name: string;
    variants: Variant[];
}

interface Variant {
    id: number;
    name: string;
}


export const Go_Go_ApiService = {
    async  GetProductsByCategory(): Promise<{ categories: MainCategory[]; brands: Brand[]; attributes: Attribute[]; variantGroups: VariantGroup[] }> {
        try {
            // Fetch data from the JSON endpoint
            const response = await fetch('/demo-db/data/category.json', { headers: { 'Cache-Control': 'no-cache' } });
            const data = await response.json();

            const categoriesData: MainCategory[] = [];
            const brandsData: Brand[] = data.brands;
            const attributesData: Attribute[] = data.attributes;
            const variantGroupsData: VariantGroup[] = data.variant_groups;

            // Iterate through each product category
            for (const categoryData of data.product_category) {
                const mainCategory: MainCategory = {
                    name: categoryData.category,
                    subcategories: [],
                };


                // Iterate through each subcategory within the category
                for (const subcategoryData of categoryData.sub_categories) {
                    const subCategory: SubCategory = {
                        name: subcategoryData.sub_category,
                        products: [],
                    };


                    // Iterate through each product within the subcategory
                    for (const productData of subcategoryData.products) {
                        const product: Product = {
                            id: productData.id,
                            brand_id: productData.brand_id,
                            product_images: productData.product_images,
                            translations: productData.translations,
                            attributes: productData.attributes,
                        };

                        subCategory.products.push(product);
                    }

                    // Add the subCategory to the mainCategory
                    mainCategory.subcategories.push(subCategory);
                }

                // Add the mainCategory to the categoriesData
                categoriesData.push(mainCategory);
            }

            return {
                categories: categoriesData,
                brands: brandsData,
                attributes: attributesData,
                variantGroups: variantGroupsData,
            };
        } catch (error) {
            throw error;
        }
    }




    //
    // async  GetProductsByCategories(): Promise<MainCategory[]> {
    //     const fetchCategoriesRecursively = async (url: string): Promise<MainCategory[]> => {
    //         try {
    //             const response = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } });
    //             const data = await response.json();
    //             const categoriesData: MainCategory[] = [];
    //
    //             for (const category of data.product_category) {
    //                 const mainCategory: MainCategory = {
    //                     name: category.category,
    //                     subcategories: [],
    //                 };
    //
    //                 for (const subcategory of category.sub_categories) {
    //                     const categoryWithSubcategories: Category = {
    //                         category: subcategory.sub_category,
    //                         sub_categories: [],
    //                     };
    //
    //                     for (const product of subcategory.products) {
    //                         categoryWithSubcategories.sub_categories.push({
    //                             name: "", subcategories: [],
    //                             sub_category: product.category_id,
    //                             products: [product]
    //                         });
    //                     }
    //
    //                     mainCategory.subcategories.push(categoryWithSubcategories);
    //                 }
    //
    //                 categoriesData.push(mainCategory);
    //             }
    //
    //             return categoriesData;
    //         } catch (error) {
    //             throw error;
    //         }
    //     };
    //
    //     return fetchCategoriesRecursively('/demo-db/data/category.json');
    // }

    // async  GetProductsByCategory(): Promise<{ categories: MainCategory[]; brands: Brand[]; attributes: Attribute[]; variantGroups: VariantGroup[]}> {
    //     try {
    //         const response = await fetch('/demo-db/data/category.json', { headers: { 'Cache-Control': 'no-cache' } });
    //         const data = await response.json();
    //         const categoriesData: MainCategory[] = [];
    //         const brandsData: Brand[] = data.brands;
    //         const attributesData: Attribute[] = data.attributes;
    //         const variantGroupsData: VariantGroup[] = data.variant_groups;
    //
    //         // Iterate through each product category
    //         for (const categoryData of data.product_category) {
    //             const mainCategory: MainCategory = {
    //                 name: categoryData.category,
    //                 subcategories: [],
    //             };
    //
    //             // Iterate through each subcategory within the category
    //             for (const subcategoryData of categoryData.sub_categories) {
    //                 const subCategory: { sub_categories: any[]; category: any } = {
    //                     category: subcategoryData.sub_category,
    //                     sub_categories: [],
    //                 };
    //
    //                 // Iterate through each product within the subcategory
    //                 for (const productData of subcategoryData.products) {
    //                     subCategory.sub_categories.push({
    //                         name: '',
    //                         sub_category: productData.category_id,
    //                         products: [productData],
    //                     });
    //                 }
    //
    //                 // Add the subCategory to the mainCategory
    //                 mainCategory.subcategories.push(subCategory);
    //             }
    //
    //             // Add the mainCategory to the categoriesData
    //             categoriesData.push(mainCategory);
    //         }
    //
    //         return {
    //             categories: categoriesData,
    //             brands: brandsData,
    //             attributes: attributesData,
    //             variantGroups: variantGroupsData,
    //         };
    //     } catch (error) {
    //         throw error;
    //     }
    // }


}