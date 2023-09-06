import * as yup from 'yup';
import CustomForm from "../../../helpers/customForms";
import {useFormik} from "formik";



const CreateProducts = ( )=>{

    const handleFormSubmit = (formValues:any) => {
        //         const response = await fetch('http://gokoPharma.com/createProducts', {
        //             method: 'POST',
        //             headers: {'Content-Type': 'application/json',},
        //             body: JSON.stringify(formValues),
        //         });
        //         const responseData = await response.json();
        //         console.log('data response:', responseData);
        console.log('Form submitted with values from category.json:', formValues);
    };


    const formFields = [
        { name: 'name', label: 'Name:' },
        { name: 'image', label: 'Image:', type: 'file' },
        { name: 'inventoryStatus', label: 'Inventory Status:', type: 'select', },
        { name: 'category', label: 'Category:', type: 'select',},
        { name: 'description', label: 'Description:' , type: 'textarea'},
    ];


    const validationSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        image: yup.string().required('Image is required'),
        inventoryStatus: yup.string().required('Inventory Status is required'),
        category: yup.string().required('Category is required'),
        description: yup.string().required('Description is required'),
    });



    return (
        <div>
            <h5>Create Product</h5>
            <CustomForm
                fields={formFields}
                onSubmit={handleFormSubmit}
                buttonText="Create Product"
                validationSchema={validationSchema}
                inputClassName="custom-input"
                initialValues={{
                    category: ' ',
                    subcategory:'',
                    name:'',
                    image:'',
                    price:'',
                    quantity:'',
                    inventoryStatus:'',
                    description:'',
                }}
            />

        </div>
    )
}


export default CreateProducts