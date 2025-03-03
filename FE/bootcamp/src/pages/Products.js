import { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductService from "../services/ProductService";

const Products = () =>{

    const [products, setProducts] = useState([]);

    useEffect(()=>{
        const fetchData = async ()=>{
            const fetchedProducts = await ProductService.getProducts();
            setProducts(fetchedProducts.data);
        }
        fetchData();
    }, []);

    return(
        <div>
            <h1>Products</h1>
            <h2>Add Products</h2>
            <ProductForm/>
            <table>
                <thead>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                </thead>
                <tbody>
                    {products?.map((product, index)=>(
                        <>
                            <tr key={index}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                            </tr>
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    )

}

export default Products;