import React, {useEffect, useState, ChangeEvent, FormEvent} from 'react';
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import styled from "styled-components";
import {ApiServices} from "./FetchData";





export const Stocks = [
    { id: 1, name: 'INSTOCK' },
    { id: 2, name: 'OUTOFSTOCK' },
];

const CustomForm = ({ fields, onSubmit, buttonText, validationSchema, inputClassName, initialValues }:any) => {
    const [formValues, setFormValues] = useState(initialValues || {});
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const [selectedInventoryStatus, setSelectedInventoryStatus] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const [categories, setCategories] = useState<string | any>([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [newSubcategoryOne, setNewSubcategoryOne] = useState('');


    const [selectedSubcategoryTwo, setSelectedSubcategoryTwo] = useState('');
    const [newSubcategoryTwo, setNewSubcategoryTwo] = useState('');



    useEffect(() => {
        ApiServices.GetProductsByCategory().then((data) => {
            const categoriesData = data.map((category:any) => ({
                name: category.name,
                subcategories: category.subcategories.map((subcategory:any) => ({
                    name: subcategory.name
                }))
            }));
            setCategories(categoriesData);
        });
    }, []);




    // CREATE PRODUCT & CATEGORY FUNCTIONALITIES STARTS HERE
    // { CATEGORY SELECT HANDLER}
    const handleCategorySelect = (event: any) => {
        const selectedCategory = event.target.value;
        setSelectedSubcategory('');
        setFormValues((prevValues:any) => ({
            ...prevValues,
            category: selectedCategory,
            // subcategory: '',
        }));
    };


    // { SELECT SUB CATEGORY FROM SELECTED CATEGORY  HANDLER }
    const handleSubcategorySelect = (event: any) => {
        const selectedSubcategory = event.target.value;
        setSelectedSubcategory(selectedSubcategory);
        setFormValues((prevValues:any) => ({
            ...prevValues,
            subcategory: selectedSubcategory,
        }));
    }


    //{ INPUT HANDLER }
    const handleInputChange = (event: any) => {
        const { name, value, type, files } = event.target;
        const inputValue = type === 'file' ? files[0] : value;
        setFormValues((prevValues:any) => ({ ...prevValues, [name]: inputValue }));
    };


    // { IMAGE HANDLER }
    const handleImageSelect = (event:any) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
            setFormValues((prevValues:any) => ({ ...prevValues, image_url: file }));
            // setFormValues((prevValues) => ({ ...prevValues, [fields.name]: file }));
        } else {
            setImagePreview(null);
            setFormValues((prevValues:any) => ({ ...prevValues, image_url: null }));        }
    };



    // {  INVENTORY STATUS HANDLER }
    const handleInventoryStatusChange = (event: any) => {
        setSelectedInventoryStatus(event.target.value);
        setFormValues((prevValues:any) => ({ ...prevValues, inventoryStatus: event.target.value }));
    };
    // CREATE PRODUCT & CATEGORY FUNCTIONALITIES ENDS HERE





    // CREATE New SUB CATEGORY FUNCTIONALITIES STARTS HERE
    // STEP 1 CREATE  { NEW - SUB CATEGORY SELECT HANDLER } (DROP-DOWN 1)
    const NewCategorySelect = (event: any) => {
        const selectedCategory = event.target.value;
        setNewSubcategoryOne('');
        setFormValues((prevValues:any) => ({
            ...prevValues,
            category: selectedCategory,
        }));
    };



  // STEP 1 { NEW - SUB CATEGORY  INPUT HANDLER }
    const handleNewSubcategoryChange = (event: any) => {
        const newSubcategoryValue = event.target.value;
        setFormValues((prevValues:any) => ({
            ...prevValues,
            newSubCategory: newSubcategoryValue,
        }));
    };




    // =======================================================================
    // STEP 2 CREATE  { NEW - SUB CATEGORY SELECT HANDLER } (DROP-DOWN 1)
    const handleCategorySelects =(event: any) => {
        const selectedCategoryTwo = event.target.value;
        setSelectedSubcategoryTwo('');
        setFormValues((prevValues:any) => ({
            ...prevValues,
            category: selectedCategoryTwo,
        }));
    };


    const handleSubcategorySelects =(event: any) => {
        const selectSubcategoryTwo = event.target.value;
        setSelectedSubcategoryTwo(selectSubcategoryTwo);
        setNewSubcategoryTwo('');
        setFormValues((prevValues:any) => ({
            ...prevValues,
            subcategory: selectSubcategoryTwo,
        }));
    };


    const handleNewSubcategoryChanges =(event: ChangeEvent<HTMLSelectElement>) => {
        const newSubcategoryTwo = event.target.value;
        setNewSubcategoryTwo(newSubcategoryTwo);
    };



    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await validationSchema.validate(formValues, { abortEarly: false });
            setErrors({});
            onSubmit(formValues);
            console.log(formValues, "check-custom");
        } catch (validationErrors: any) {
            if (Array.isArray(validationErrors.inner)) {
                const newErrors: Record<string, string> = {};
                validationErrors.inner.forEach((error:any) => {
                    newErrors[error.path] = error.message;
                });
                setErrors(newErrors);
            }
        }
    };



    return (
        <form onSubmit={handleSubmit} className="card p-fluid">
            {fields.map((field:any) => (
                <div key={field.name} className="field">
                    <label>{field.label}</label>
                    {field.name === 'category' ? (
                        // { SELECT CATEGORY TO ADD NEW PRODUCT }
                        <div>
                            <StyledSelect
                                id={field.name}
                                value={formValues.category || ''}
                                onChange={handleCategorySelect}
                                className={`select-input text-sm ${inputClassName}`}>
                                <option value="">Select category</option>
                                {categories.map((category:any, id:any) => (
                                    <option key={id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </StyledSelect>

                            {formValues.category && (
                                // { SELECT SUB CATEGORY INSIDE AN EXISTING SELECTED CATEGORY TO ADD NEW PRODUCT }
                                <div>
                                    <p className='mt-3 text-black font-bold'>Category: <span className='text-green-600'>{formValues.category}</span></p>
                                <StyledSelect
                                    id="subcategory"
                                    value={selectedSubcategory}
                                    onChange={handleSubcategorySelect}
                                    className={`select-input text-sm ${inputClassName}`}>
                                    <option value="">Select subcategory</option>
                                    {categories
                                        .find((category:any) => category.name === formValues.category)
                                        ?.subcategories.map((subcategory:any, id:any) => (
                                            <option key={id} value={subcategory.name}>
                                                {subcategory.name}
                                            </option>
                                        ))}
                                </StyledSelect>
                                    {selectedSubcategory && (
                                        <p className='mt-3 text-black font-bold'> Subcategory: <span className='text-green-600'>{selectedSubcategory}</span></p>
                                )}

                                </div>
                            )}
                        </div>

                        ) : field.name === 'inventoryStatus' ? (
                                <StyledSelect
                                    id="inventoryStatus"
                                    // value={selectedInventoryStatus}
                                    value={initialValues ? initialValues : selectedInventoryStatus}
                                    onChange={handleInventoryStatusChange}
                                    className={`select-input text-sm ${inputClassName}`}>
                                    <option value="" className='text-sm'>Select inventory Status</option>
                                    {Stocks.map((status:any,id:any) => (
                                        <option key={status.id}
                                                value={status.name}
                                                className='m-2 px-5 py-3'>
                                            {status.name}
                                        </option>
                                    ))}
                                </StyledSelect>
                            )
                        : field.name === 'description' ? (
                                <InputTextarea
                                    id="description"
                                    rows={4}
                                    name={field.name}
                                    value={formValues[field.name] || ''}
                                    onChange={handleInputChange}
                                    className={inputClassName}
                                />
                            )
                        : field.type === 'textarea' ? (
                        <InputTextarea
                            id="description"
                            rows={4}
                            name={field.name}
                            value={formValues[field.name] || ''}
                            onChange={handleInputChange}
                            className={inputClassName}
                        />
                    ) : field.type === 'file' ? (
                      <div>
                          <InputText
                              multiple
                              type="file"
                              accept="image/*"
                              name={field.name}
                              onChange={handleImageSelect}
                              className={inputClassName}
                          />

                          {imagePreview && (<img src={imagePreview} alt="Selected" style={{ maxWidth: "20vw", marginTop: "10px" }}/>)}
                              {!imagePreview && initialValues && initialValues.product_images && (<img src={`/img/${initialValues.product_images}`} alt="Initial" style={{ maxWidth: "20vw", marginTop: "10px" }}/>)}
                      </div>
                            )

                            // [ SELECT SUB CATEGORY INSIDE CATEGORY {LEVEL 1} USING INPUT ]
                            // [ SELECT CATEGORY TO ADD NEW SUB CATEGORY {LEVEL 1} ]
                            : field.name === 'categoryOne' ? (
                                    <div>
                                        <StyledSelect
                                            id="categoryOne"
                                            value={formValues.category || ''}
                                            // value={newSubcategory}
                                            onChange={NewCategorySelect}
                                            className={`select-input text-sm ${inputClassName}`}>
                                            <option value="">Select category</option>
                                            {categories.map((category:any) => (
                                                <option key={category.name} value={category.name}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </StyledSelect>
                                    </div>)

                                // [ CREATE NEW SUB CATEGORY INSIDE SELECTED CATEGORY ]
                                : field.name === 'newSubCategoryOne' ? ( <div>
                                        {formValues.category && (
                                            <div>
                                                <p className='text-black font-bold'>Selected category: <span className='text-green-600'>{formValues.category}</span></p>
                                                <InputText
                                                    placeholder="New sub category"
                                                    // value={formValues.newSubCategory || ''}
                                                    onChange={handleNewSubcategoryChange}
                                                    className={inputClassName}
                                                    type={field.type || 'text'}
                                                    name={field.name}
                                                    value={formValues[field.name] || ''}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    )

                                    :field.name === 'categoryTwo' ? (
                                            // { SELECT CATEGORY TO ADD NEW CATEGORY }
                                            <div>
                                                <StyledSelect
                                                    id={field.name}
                                                    value={formValues.category || ''}
                                                    onChange={handleCategorySelects}
                                                    className={`select-input text-sm ${inputClassName}`}>
                                                    <option value="">Select category</option>
                                                    {categories.map((category:any, id:any) => (
                                                        <option key={id} value={category.name}>
                                                            {category.name}
                                                        </option>
                                                    ))}
                                                </StyledSelect>
                                                {formValues.category && (
                                                    <p className='text-black font-bold mt-1'>
                                                        Selected category: <span className='text-green-600'>{formValues.category}</span>
                                                    </p>
                                                )}
                                            </div>
                                        )
                                        :field.name === 'subCategoryTwo' ? (
                                                <div>
                                                    {formValues.category && (
                                                        // { SELECT SUB CATEGORY INSIDE AN EXISTING SELECTED CATEGORY TO ADD NEW CATEGORY }
                                                        <div>
                                                            <StyledSelect
                                                                id="subcategory"
                                                                value={formValues.selectedSubcategory}
                                                                // onChange={NewCategorySelect}
                                                                onChange={handleSubcategorySelects}
                                                                className={`select-input text-sm ${inputClassName}`}>
                                                                <option value="">Select sub category</option>
                                                                {categories
                                                                    .find((category:any) => category.name === formValues.category)
                                                                    ?.subcategories.map((subcategory:any, id:any) => (
                                                                        <option key={id} value={subcategory.name}>
                                                                            {subcategory.name}
                                                                        </option>
                                                                    ))}
                                                            </StyledSelect>
                                                            {selectedSubcategoryTwo && (
                                                                <p className='mt-3 text-black font-bold'> Subcategory: <span className='text-green-600'>{selectedSubcategoryTwo}</span></p>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                        )

                                        // [ CREATE NEW SUB CATEGORY INSIDE SELECTED CATEGORY ]
                                        : field.name === 'newSubCategoryTwo' ? ( <div>
                                                    {selectedSubcategoryTwo && (
                                                        <div>
                                                            <InputText
                                                                placeholder="New Subcategory"
                                                                // value={formValues.newSubCategory || ''}
                                                                onChange={handleNewSubcategoryChange}
                                                                className={inputClassName}
                                                                type={field.type || 'text'}
                                                                name={field.name}
                                                                value={formValues[field.name] || ''}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                        <InputText
                                            type={field.type || 'text'}
                                            name={field.name}
                                            value={initialValues ? initialValues[field.name] : ''}
                                            // value={formValues[field.name] || ''}
                                            onChange={handleInputChange}
                                            className={inputClassName}
                                />
                    )

                    }
                    {errors[field.name] && <div className="error text-red-500 mt-2">{errors[field.name]}</div>}
                </div>
            ))}
            <Button type="submit" className='text-center'> {buttonText}</Button>
        </form>


    );
};


const StyledSelect = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: #fff;

  /* Style for the select options */
  option {
    padding: 8px;
  }
`;
export default CustomForm;
