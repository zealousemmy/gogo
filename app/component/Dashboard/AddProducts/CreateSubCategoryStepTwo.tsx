import * as yup from 'yup';
import CustomForm from "../../../helpers/customForms";



const CreateSubCategoryStepTwo = ( ) =>{
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
        { name: 'categoryTwo', label: 'category.json:', type: 'select', },
        { name: 'subCategoryTwo', label: 'category.json:', type: 'select', },
        { name: 'newSubCategoryTwo', label: 'New category.json:' },
    ];


    const validationSchema = yup.object().shape({
        // category.json: yup.string().required('category.json is required'),
        newSubCategoryTwo: yup.string().required('new Sub Category title is required'),

    });


    return (
        <div className='mt-8'>
            <h5>Create Sub-Category (Level Three)</h5>
            <CustomForm
                fields={formFields}
                onSubmit={handleFormSubmit}
                buttonText="Create Sub-Category"
                validationSchema={validationSchema}
                inputClassName="custom-input"
                initialValues={{
                    categoryTwo: ' ',
                    subCategoryTwo:'',
                    newSubCategoryTwo:'',
                }}
            />

        </div>
    )
}


export default CreateSubCategoryStepTwo