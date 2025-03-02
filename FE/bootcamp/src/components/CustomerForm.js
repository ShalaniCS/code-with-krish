import { useState } from "react";
import CustomerService from "../services/CustomerService";

const CustomerForm = () => {
  const defaultValues = {
    name: "ginger",
    email: "ginger@gmail.com",
    address: "123 street",
  };

  const refreshForm = {
    name:'',
    email:'',
    address:''
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
    await CustomerService.createCustomer(formData);
    setFormData(refreshForm);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="adddress">Address</label>
          <input
            type="text"
            id="ddress"
            name="address"
            value={formData.address}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <button type="submit">Save Customer</button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
