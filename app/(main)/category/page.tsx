'use client';
import React from 'react';
import CreateCategory from '../../component/Dashboard/catgories/CreateCategory';
import CreateProducts from '../../component/Dashboard/AddProducts/Createproducts';
import CreateSubCategory from '../../component/Dashboard/AddProducts/CreateSubCategory';
import CreateSubCategoryStepTwo from '../../component/Dashboard/AddProducts/CreateSubCategoryStepTwo';
import NewCreateCategory from '../../component/Dashboard/catgories/newDesign';

const Add_Category_Product = () => {
    return (
        <div className="grid">
            <div className="col-12 md:col-7">
                {/* <CreateCategory /> */}
                <NewCreateCategory />
                {/*<CreateSubCategory/>*/}
            </div>

            <div className="col-12 md:col-5">{/*<CreateSubCategoryStepTwo/>*/}</div>
        </div>
    );
};

export default Add_Category_Product;
