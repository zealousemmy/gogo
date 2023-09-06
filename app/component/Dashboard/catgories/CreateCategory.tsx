import * as yup from 'yup';
import CustomCategoryForm from "../../Form/categoryForm";

const CreateCategory = ( ) =>{
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
        { name: 'name', label: 'Name:' },
        { name: 'description', label: 'Description:', type: 'textarea'},
        { name: 'category', label: 'Default category:', type: 'select', },
        { name: 'subCategory', label: 'category:', type: 'select', },
        // { name: 'newSubCategory', label: 'New category:' },

    ];

    const validationSchema = yup.object().shape({
        // name: yup.string().required('Name is required'),
        // description: yup.string().required('description is required'),
    });

    return (
        <div>
            <h4 className='font-bold'>Product Categories </h4>
            <p>product Categories for your store can be managed here. to change the order of categories on the front of the front end you can sort them </p>
                    <CustomCategoryForm
                        fields={formFields}
                        onSubmit={handleFormSubmit}
                        buttonText="Create  Category"
                        validationSchema={validationSchema}
                        inputClassName="custom-input"
                        initialValues={{
                            name:'',
                            category:'',
                            subCategory:'',
                            description:''
                        }}
                    />
        </div>
    )
}


export default CreateCategory