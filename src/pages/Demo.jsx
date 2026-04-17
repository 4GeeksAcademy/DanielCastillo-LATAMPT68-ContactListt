// Import necessary components from react-router-dom and other parts of the application.
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { useState } from "react";

export const Demo = () => {
  // Access the global sta  te and dispatch function using the useGlobalReducer hook.
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
    
  };

  const { store, dispatch } = useGlobalReducer()
  const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      address: ""
    });

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await fetch(
          "https://playground.4geeks.com/contact/agendas/erosdevfs/contacts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
          }
        );

        const data = await response.json();
        return goHome()

      } catch (error) {
        console.error("Error:", error);
      }
    };



    return (
      <div className="container">
        <div className="w-75 mx-auto">
          <h1 className="text-center">Add a new contact</h1>
          <form onSubmit={handleSubmit} className="row g-3 needs-validation" noValidate>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Full Name</label>
              <input type="text" value={formData.name} className="form-control" id="exampleFormControlInput1" placeholder="Full Name" name="name"  onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput2" className="form-label">Email</label>
              <input type="email" value={formData.email} className="form-control" id="exampleFormControlInput2" placeholder="Enter email" name="email"  onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput3" className="form-label">Phone</label>
              <input type="text" value={formData.phone} className="form-control" id="exampleFormControlInput3" placeholder="Enter phone" name="phone"  onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput4" className="form-label">Address</label>
              <input type="text" value={formData.address} className="form-control" id="exampleFormControlInput4" placeholder="Enter address" name="address"  onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <button type="submit" className="btn btn-primary mb-3 form-control">Save</button>
            </div>
          </form>
        </div>
        <br />



        <Link to="/">
          <button className="btn btn-primary">Back home</button>
        </Link>
      </div>
    );
  };