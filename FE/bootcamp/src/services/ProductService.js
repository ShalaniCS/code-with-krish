import axios from "axios";

const productEndpoint = 'http://localhost:3002/inventory';

const ProductService = {

    createProduct : async (productData) => {
        try{
            const res = await axios.post(`${productEndpoint}`, productData);
            return{
                status:res.status,
                data: res.data
            }
        }
        catch(error){
            return{
                status: error.response.status,
                data: error.response.data
            }
        }
    }

}

export default ProductService;