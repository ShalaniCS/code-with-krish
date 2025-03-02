import { useState } from "react";
import ProductService from "../services/ProductService";

const ProductForm = () => {

    const defaultValues = {
        name: 'laptop',
        price: 900,
        quantity: 40
    }

    const refreshForm = {
        name : '',
        price: '',
        quantity : ''
    }

    const [formData, setFormData] = useState(defaultValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        await ProductService.createProduct(formData);
        setFormData(refreshForm);
      };

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Product Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required></input>
                </div>
                <div>
                    <label htmlFor="pprice">Price</label>
                    <input type="text" id="price" name="price" value={formData.price} onChange={handleChange} required></input>
                </div>
                <div>
                    <label htmlFor="quantity">Qunatity</label>
                    <input type="text" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} required></input>
                </div>
                <div>
                    <button type="submit">Add Product</button>
                </div>
            </form>
        </div>
    )

}

export default ProductForm;