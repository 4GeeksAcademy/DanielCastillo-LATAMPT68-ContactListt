import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Button, Modal } from "react-bootstrap";


export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const [show, setShow] = useState(false);
	const [editItem, setEditItem] = useState()

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

    const handleSubmit = async (e, idToEdit) => {
      e.preventDefault();
		idToEdit = editItem
      try {
        const response = await fetch(
          "https://playground.4geeks.com/contact/agendas/erosdevfs/contacts/" + idToEdit,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
          }
        );

        const data = await response.json();
		getContactList()

      } catch (error) {
        console.error("Error:", error);
      }
    };



	useEffect(() => {
		getContactList()
	}, [])

	const getContactList = async () => {
		try {
			const response = await
				fetch("https://playground.4geeks.com/contact/agendas/erosdevfs")
			if (response.status === 404) {
				const user = await
					fetch("https://playground.4geeks.com/contact/agendas/erosdevfs", {
						method: "POST",
						headers: { 'Content-Type': 'application/json' }
					})
				return
			}
			const data = await response.json()
			dispatch({
				type: "load_contactList",
				payload: data.contacts
			})

		} catch (error) {
			console.log(error)
		}

	}

	const deleteContact = async (idToDelete) => {
		console.log("deleteContact")
		try {
			const response = await
				fetch("https://playground.4geeks.com/contact/agendas/erosdevfs/contacts/" + idToDelete, {
					method: "DELETE"
				})
			getContactList()
		} catch (error) {
			console.log(error)
		}

	}

	return (
		<>
			<ul className="list-group w-75 mx-auto">
				{store && store.contacts?.map((item) => {
					return (
						<li
							key={item.id}
							className="list-group-item d-flex justify-content-between">

							<div className="w-50 d-flex justify-content-start">
								<img src="https://static.vecteezy.com/system/resources/thumbnails/032/176/191/small/business-avatar-profile-black-icon-man-of-user-symbol-in-trendy-flat-style-isolated-on-male-profile-people-diverse-face-for-social-network-or-web-vector.jpg" className="img-fluid mt-2 ms-5" style={{ height: "130px", width: "130px" }} />
								<div className="mt-2 ms-5">
									<h5 className="">{item.name}</h5>
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
								<button style={{ border: "none", backgroundColor: "white" }} onClick={() =>{ 
									setShow(true) 
									setEditItem(item.id)
									}} className="me-4">
									<i class="fa-solid fa-pencil"></i>
								</button>
								<button style={{ border: "none", backgroundColor: "white" }} onClick={() => deleteContact(item.id)}>
									<i class="fa-solid fa-trash-can"></i>
								</button>
							</div>

						</li>
					);
				})}
			</ul>


			<Modal show={show} onHide={() => setShow(false)}>
				<Modal.Body>
					<form onSubmit={handleSubmit} className="row g-3 needs-validation" noValidate>
						<div className="mb-3">
							<label htmlFor="exampleFormControlInput1" className="form-label">Full Name</label>
							<input type="text" value={formData.name} className="form-control" id="exampleFormControlInput1" placeholder="Edit name" name="name" onChange={handleChange} required />
						</div>
						<div className="mb-3">
							<label htmlFor="exampleFormControlInput2" className="form-label">Email</label>
							<input type="email" value={formData.email} className="form-control" id="exampleFormControlInput2" placeholder="Edit email" name="email" onChange={handleChange} required />
						</div>
						<div className="mb-3">
							<label htmlFor="exampleFormControlInput3" className="form-label">Phone</label>
							<input type="text" value={formData.phone} className="form-control" id="exampleFormControlInput3" placeholder="Edit phone" name="phone" onChange={handleChange} required />
						</div>
						<div className="mb-3">
							<label htmlFor="exampleFormControlInput4" className="form-label">Address</label>
							<input type="text" value={formData.address} className="form-control" id="exampleFormControlInput4" placeholder="Edit address" name="address" onChange={handleChange} required />
						</div>

						<div className="mb-3">
							<button type="submit" className="btn btn-primary mb-3 form-control" onClick={() => setShow(false)}>Save</button>
						</div>
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