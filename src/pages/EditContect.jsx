import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { getContacts, updateContact } from "../store.js";

export const EditContact = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const { id } = useParams();

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (store.contacts.length === 0) {
      getContacts(dispatch);
    }
  }, []);

  useEffect(() => {
    const selectedContact = store.contacts.find(
      (item) => item.id === Number(id)
    );

    if (selectedContact) {
      setContact({
        name: selectedContact.name,
        email: selectedContact.email,
        phone: selectedContact.phone,
        address: selectedContact.address,
      });
    }
  }, [store.contacts, id]);

  const handleChange = (event) => {
    setContact({
      ...contact,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await updateContact(dispatch, id, contact);

    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Edit contact</h1>

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
          Update
        </button>
      </form>

      <Link to="/" className="d-block mt-3">
        Back to contacts
      </Link>
    </div>
  );
};