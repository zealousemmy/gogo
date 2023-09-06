import * as yup from 'yup';
import CustomForm from "../../../helpers/customForms";



const UpdateProducts = ({product, onSubmit}:any)=>{

    console.log(product)
    const handleFormSubmit = (formValues:any) => {
        //         const response = await fetch('http://gokoPharma.com/createProducts', {
        //             method: 'POST',
        //             headers: {'Content-Type': 'application/json',},
        //             body: JSON.stringify(formValues),
        //         });
        //         const responseData = await response.json();
        //         console.log('data response:', responseData);
        onSubmit(formValues);
        console.log('Product Update Successfully:', formValues);
    };


    const formFields = [
        { name: 'name', label: 'Name:',  },
        { name: 'image', label: 'Image:', type: 'file' },
        { name: 'inventoryStatus', label: 'Inventory Status:', type: 'select', },
        { name: 'description', label: 'Description:' , type: 'textarea'},
    ];


    const validationSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        image: yup.string().required('Image is required'),
        inventoryStatus: yup.string().required('Inventory Status is required'),
        description: yup.string().required('Description is required'),
    });


    return (
        <div>
            <h6>Update Product </h6>
            <CustomForm
                Datakey={product.id}
                initialValues={product}
                fields={formFields}
                onSubmit={handleFormSubmit}
                buttonText="Update Product"
                validationSchema={validationSchema}
                inputClassName="custom-input"
            />

        </div>
    )
}


export default UpdateProducts