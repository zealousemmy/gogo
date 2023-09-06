import {Demo} from "../../types/types";
import {supabase} from "../../supaBaseClient";

interface Subcategory {
    name: string;
    products: Demo.Product[];
    subcategories: Subcategory[];
}

interface MainCategory {
    name: string;
    subcategories: Subcategory[];
}






// FETCH DATA TO POPULATE
export const ApiServices = {

  // CUSTOMER'S ORDER LIST
    getProductsOrder() {
        return fetch('/demo-db/data/customerOrder.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as Demo.ProductOrder[]);
    },

  // GET  CATEGORY & PRODUCTS
    getProductsByCategory() {
        return fetch('/demo-db/data/products.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((data) => {
                const productsCategory = data.dataByCategory; // Change this line
                return { dataByCategory: productsCategory };
            });
    },


    //GET  CATEGORY & TO ADD NEW PRODUCTS
    getCategories() {
        return fetch('/demo-db/data/products.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((data) => {
                const categories = Object.keys(data.dataByCategory);
                return { categories };
            });
    },



    // GET ALL CATEGORIES, SUBCATEGORIES, AND PRODUCTS


    async GetProductsByCategory(): Promise<MainCategory[]> {
        const fetchCategoriesRecursively = async (url: string): Promise<MainCategory[]> => {
            try {
                const response = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } });
                // const { response } = await supabase.from("product_category").select("*").limit(20);
                const data = await response.json();
                console.log(response)
                const categoriesData: MainCategory[] = [];

                for (const category of data.categories) {
                    const mainCategory = processCategory(category);
                    categoriesData.push(mainCategory);
                }

                return categoriesData;
            } catch (error) {
                throw error;
            }
        };

        return fetchCategoriesRecursively('/demo-db/data/productsCategories.json');
    },

};


function processCategory (category: any): MainCategory {
    const mainCategory: MainCategory = {
        name: category.name,
        subcategories: [],
    };

    for (const subcategory of category.subcategories) {
        const subcategoryWithProducts: Subcategory = {
            name: subcategory.name,
            products: subcategory.products.map((product: Demo.Product) => ({ ...product })),
            subcategories: [],
        };
        mainCategory.subcategories.push(subcategoryWithProducts);

        if (subcategory.subcategories && subcategory.subcategories.length > 0) {
            subcategoryWithProducts.subcategories = subcategory.subcategories.map((sub: any) => {
                return processCategory(sub);
            });
        }
    }

    return mainCategory;
}



// fetching data with respective types
