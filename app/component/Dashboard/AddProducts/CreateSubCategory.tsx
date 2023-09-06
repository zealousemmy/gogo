import * as yup from 'yup';
import CustomForm from "../../../helpers/customForms";



const CreateSubCategory = ( ) =>{
    const handleFormSubmit = (formValues:any) => {
        //         const response = await fetch('http://gokoPharma.com/category', {
        //             method: 'POST',
        //             headers: {'Content-Type': 'application/json',},
        //             body: JSON.stringify(formValues),
        //         });
        //         const responseData = await response.json();
        //         console.log('data response:', responseData);
        console.log('Form submitted with values from category.json:', formValues);
    };

    const formFields = [
        { name: 'categoryOne', label: 'Categories:', type: 'select',},
        { name: 'newSubCategoryOne', label: 'New sub categories:' },
    ];

    const validationSchema = yup.object().shape({
        newSubCategoryOne: yup.string().required('newSubCategory is required'),

    });

    return (
        <div className='mt-8'>
            <h5>Create Sub-Category (Level Two)</h5>
            <CustomForm
                fields={formFields}
                onSubmit={handleFormSubmit}
                buttonText="Create Sub-Category"
                validationSchema={validationSchema}
                inputClassName="custom-input"
                initialValues={{
                    categoryOne: ' ',
                    newSubCategoryOne:'',
                }}
            />
        </div>
    )
}


export default CreateSubCategory