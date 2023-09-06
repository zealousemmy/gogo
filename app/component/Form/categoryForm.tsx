import React, {useEffect, useState, ChangeEvent, FormEvent} from 'react';
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import styled from "styled-components";
import {ApiServices} from "../../helpers/FetchData";




export const Stocks = [
    { id: 1, name: 'INSTOCK' },
    { id: 2, name: 'OUTOFSTOCK' },
];


export const categoryDisplayType = [
    { id: 1, name: 'Default' },
    { id: 2, name: 'Products' },
    { id: 3, name: 'Subcategories' },
    { id: 4, name: 'Both' },
];

const CustomCategoryForm = ({ fields, onSubmit, buttonText, validationSchema, inputClassName, initialValues }:any) => {
    const [formValues, setFormValues] = useState(initialValues || {});
    const [errors, setErrors] = React.useState<Record<string, string>>({});


    const [categories, setCategories] = useState<string | any>([]);



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


    //{ INPUT HANDLER }
    const handleInputChange = (event: any) => {
        const { name, value, type, files } = event.target;
        const inputValue = type === 'file' ? files[0] : value;
        setFormValues((prevValues:any) => ({ ...prevValues, [name]: inputValue }));
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


    const handleAddCategory = (newCategoryName:any) => {
        const updatedCategories = [...categories];
        if (!formValues.category) {
            // If default category is empty, create a top-level default category
            updatedCategories.push({ name: formValues.name, subcategories: [] });
        } else if (!formValues.subcategory) {
            // If default category has a value but category is empty, create a subcategory
            const selectedCategory = updatedCategories.find((c) => c.name === formValues.category);
            if (selectedCategory) {
                selectedCategory.subcategories.push({ name: formValues.name });
            }
        } else {
            const selectedCategory = updatedCategories.find((c) => c.name === formValues.category);
            if (selectedCategory && selectedSubcategoryTwo) {
                const selectedSubcategory = selectedCategory.subcategories.find(
                    (s:any) => s.name === selectedSubcategoryTwo
                );
                if (selectedSubcategory) {
                    selectedSubcategory.subcategories.push({ name: formValues.name });
                }
            }
        }

        setCategories(updatedCategories);
    };





    const isValidationError = (error: any): error is { inner: any[] } => {
        return error && Array.isArray(error.inner);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await validationSchema.validate(formValues, { abortEarly: false });
            setErrors({});
            onSubmit(formValues);
            console.log(formValues, "check-custom");
            if (formValues) {
                handleAddCategory(formValues);
            }
        } catch (validationErrors:any) {
            if (isValidationError(validationErrors)) {
                const newErrors: Record<string, string> = {};
                validationErrors.inner.forEach((error) => {
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
                        <div>
                            <StyledSelect
                                id={field.name}
                                value={formValues.category || ''}
                                onChange={handleCategorySelects}
                                className={`select-input text-sm ${inputClassName}`}>
                                <option value="">Default category</option>
                                    {categories.map((category:any, id:any) => (<option key={id} value={category.name}>
                                            {category.name}
                                    </option>
                                    ))}
                            </StyledSelect>
                                {formValues.category && (<p className='text-black font-bold mt-1'>
                                   <span className='text-green-600'>{formValues.category}</span></p>)}
                                    </div>
                              ) :field.name === 'subCategory' ? (
                            <div>
                                {formValues.category && (
                                    <div>
                                        <StyledSelect
                                            id="subcategory"
                                            value={formValues.selectedSubcategory}
                                            onChange={handleSubcategorySelects}
                                            className={`select-input text-sm ${inputClassName}`}>
                                            <option value="">category</option>
                                            {categories
                                                .find((category:any) => category.name === formValues.category)
                                                ?.subcategories.map((subcategory:any, id:any) => (
                                                    <option key={id} value={subcategory.name}>
                                                        {subcategory.name}
                                                    </option>
                                                ))}
                                        </StyledSelect>
                                        {selectedSubcategoryTwo && (
                                            <p className='mt-3 text-black font-bold'> <span className='text-green-600'>{selectedSubcategoryTwo}</span></p>
                                        )}
                                    </div>
                                )}
                            </div>
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
                            ) : (
                                <InputText
                                    type={field.type || 'text'}
                                    name={field.name}
                                    value={formValues[field.name] || ''}
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
export default CustomCategoryForm;
