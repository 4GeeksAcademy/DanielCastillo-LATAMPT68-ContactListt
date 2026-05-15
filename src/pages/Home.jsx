import { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { getContacts, deleteContact } from "../store.js";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    getContacts(dispatch);
  }, []);

  const handleDelete = async (id) => {
    await deleteContact(dispatch, id);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-end mb-3">
        <Link to="/add-contact" className="btn btn-success">
          Add new contact
        </Link>
      </div>

      <ul className="list-group">
        {store.contacts.map((contact) => (
          <li key={contact.id} className="list-group-item">
            <div className="row align-items-center">
              <div className="col-md-2 text-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="contact"
                  className="rounded-circle img-fluid"
                  style={{ maxWidth: "120px" }}
                />
              </div>

              <div className="col-md-8">
                <h4>{contact.name}</h4>

                <p className="mb-1 text-secondary">
                  <i className="fa-solid fa-location-dot me-2"></i>
                  {contact.address}
                </p>

                <p className="mb-1 text-secondary">
                  <i className="fa-solid fa-phone me-2"></i>
                  {contact.phone}
                </p>

                <p className="mb-1 text-secondary">
                  <i className="fa-solid fa-envelope me-2"></i>
                  {contact.email}
                </p>
              </div>

              <div className="col-md-2 text-end">
                <Link
                  to={`/edit-contact/${contact.id}`}
                  className="btn btn-light me-2"
                >
                  <i className="fa-solid fa-pencil"></i>
                </Link>

                <button
                  className="btn btn-light"
                  onClick={() => handleDelete(contact.id)}
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};