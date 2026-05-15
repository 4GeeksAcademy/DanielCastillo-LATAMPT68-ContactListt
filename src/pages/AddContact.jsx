import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { createContact } from "../store.js";

export const AddContact = () => {
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (event) => {
    setContact({
      ...contact,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await createContact(dispatch, contact);

    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Add a new contact</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="name"
            value={contact.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Full Name"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter email"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            name="phone"
            value={contact.phone}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter phone"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            name="address"
            value={contact.address}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter address"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Save
        </button>
      </form>

      <Link to="/" className="d-block mt-3">
        Back to contacts
      </Link>
    </div>
  );
};