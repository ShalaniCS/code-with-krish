import axios from "axios";

const customerEndpoint = 'http://localhost:3001/customers';

const CustomerService = {

    createCustomer : async (customerData) =>{
        try{
            const res = await axios.post(`${customerEndpoint}/createCustomer`, customerData);
            return {
                status: res.status,
                data: res.data
            }
        }
        catch(error){
            return{
                status: error.response.status,
                data:error.response.data
            }
        }
    },

    getCustomers : async () =>{
        try{
            const res = await axios.get(`${customerEndpoint}`);
            return{
                status: res.status,
                data:res.data
            }
        }
        catch(error){
            return{
                status: error.response.status,
                data:error.response.data
            }
        }
    }

}

export default CustomerService;