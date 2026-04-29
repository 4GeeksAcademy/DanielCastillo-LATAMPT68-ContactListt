import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Button, Modal } from "react-bootstrap";

export const Home = () => {
  const { store, actions } = useGlobalReducer();

  const [show, setShow] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    actions.getContactList();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const openEditModal = (item) => {
    setEditItem(item.id);
    setFormData({
      name: item.name,
      email: item.email,
      phone: item.phone,
      address: item.address
    });
    setShow(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await actions.updateContact(editItem, formData);
    setShow(false);
  };

  return (
    <>
      <ul className="list-group w-75 mx-auto">
        {store.contacts?.map((item) => (
          <li key={item.id} className="list-group-item d-flex justify-content-between">
            <div className="w-50 d-flex justify-content-start">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/032/176/191/small/business-avatar-profile-black-icon-man-of-user-symbol-in-trendy-flat-style-isolated-on-male-profile-people-diverse-face-for-social-network-or-web-vector.jpg"
                className="img-fluid mt-2 ms-5"
                style={{ height: "130px", width: "130px" }}
              />

              <div className="mt-2 ms-5">
                <h5>{item.name}</h5>

                <div className="d-flex align-items-center mb-1">
                  <i className="fa-solid fa-location-dot pe-3"></i>
                  <p className="mb-0 fs-6">{item.address}</p>
                </div>

                <div className="d-flex align-items-center mb-1">
                  <i className="fa-solid fa-phone-flip pe-3"></i>
                  <p className="mb-0 small">{item.phone}</p>
                </div>

                <div className="d-flex align-items-center">
                  <i className="fa-solid fa-envelope pe-3"></i>
                  <p className="mb-0 small">{item.email}</p>
                </div>
              </div>
            </div>

            <div className="me-5 mt-2">
              <button
                style={{ border: "none", backgroundColor: "white" }}
                onClick={() => openEditModal(item)}
                className="me-4"
              >
                <i className="fa-solid fa-pencil"></i>
              </button>

              <button
                style={{ border: "none", backgroundColor: "white" }}
                onClick={() => actions.deleteContact(item.id)}
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="row g-3 needs-validation" noValidate>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                value={formData.name}
                className="form-control"
                placeholder="Edit name"
                name="name"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                value={formData.email}
                className="form-control"
                placeholder="Edit email"
                name="email"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="text"
                value={formData.phone}
                className="form-control"
                placeholder="Edit phone"
                name="phone"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                value={formData.address}
                className="form-control"
                placeholder="Edit address"
                name="address"
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary mb-3 form-control">
              Save
            </button>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Go back
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};