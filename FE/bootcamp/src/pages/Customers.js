import { useEffect, useState } from "react";
import CustomerForm from "../components/CustomerForm";
import CustomerService from "../services/CustomerService";

const Customers = ()=>{

    const [customers, setCustomers] = useState([]);

    useEffect(()=>{
        const fetchData = async () => {
            const fetchedCutomers = await CustomerService.getCustomers();
            setCustomers(fetchedCutomers.data);
        }
        fetchData();
    },[]);

    console.log(typeof customers);

    return(
        <div>
            <h1>Customers</h1>
            <h2>Add Customer</h2>
            <CustomerForm/>
            <table>
                <thead>
                    <tr>
                        <th>Customer ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {customers?.map((customer, index)=>(
                        <>
                            <tr key={index}>
                                <td>{customer.id}</td>
                                <td>{customer.name}</td>
                                <td>{customer.email}</td>
                                <td>{customer.address}</td>
                            </tr>
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    )

}

export default Customers;