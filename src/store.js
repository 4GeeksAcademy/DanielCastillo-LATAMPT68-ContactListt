const agendaSlug = "danielcastillo410";
const baseURL = `https://playground.4geeks.com/contact/agendas/${agendaSlug}`;

export const initialStore = () => {
  return {
    contacts: [],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_contacts":
      return {
        ...store,
        contacts: action.payload,
      };

    case "add_contact":
      return {
        ...store,
        contacts: [...store.contacts, action.payload],
      };

    case "update_contact":
      return {
        ...store,
        contacts: store.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };

    case "delete_contact":
      return {
        ...store,
        contacts: store.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
      };

    default:
      return store;
  }
}

export const getContacts = async (dispatch) => {
  try {
    const response = await fetch(`${baseURL}/contacts`);

    if (response.status === 404) {
      await fetch(baseURL, {
        method: "POST",
      });

      return getContacts(dispatch);
    }

    const data = await response.json();

    dispatch({
      type: "set_contacts",
      payload: data.contacts || [],
    });
  } catch (error) {
    console.log("Error getting contacts:", error);
  }
};

export const createContact = async (dispatch, contactData) => {
  try {
    const response = await fetch(`${baseURL}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });

    const data = await response.json();

    dispatch({
      type: "add_contact",
      payload: data,
    });
  } catch (error) {
    console.log("Error creating contact:", error);
  }
};

export const updateContact = async (dispatch, contactId, contactData) => {
  try {
    const response = await fetch(`${baseURL}/contacts/${contactId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });

    const data = await response.json();

    dispatch({
      type: "update_contact",
      payload: data,
    });
  } catch (error) {
    console.log("Error updating contact:", error);
  }
};

export const deleteContact = async (dispatch, contactId) => {
  try {
    await fetch(`${baseURL}/contacts/${contactId}`, {
      method: "DELETE",
    });

    dispatch({
      type: "delete_contact",
      payload: contactId,
    });
  } catch (error) {
    console.log("Error deleting contact:", error);
  }
};