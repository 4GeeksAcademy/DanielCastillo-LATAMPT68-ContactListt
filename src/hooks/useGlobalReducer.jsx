import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from "../store";

const StoreContext = createContext();

const AGENDA = "erosdevfs";
const API_URL = `https://playground.4geeks.com/contact/agendas/${AGENDA}`;

export function StoreProvider({ children }) {
  const [store, dispatch] = useReducer(storeReducer, initialStore());

  const actions = {
    getContactList: async () => {
      try {
        const response = await fetch(API_URL);

        if (response.status === 404) {
          await fetch(API_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            }
          });

          return actions.getContactList();
        }

        const data = await response.json();

        dispatch({
          type: "load_contactList",
          payload: data.contacts
        });
      } catch (error) {
        console.log(error);
      }
    },

    createContact: async (formData) => {
      try {
        await fetch(`${API_URL}/contacts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });

        await actions.getContactList();
      } catch (error) {
        console.log(error);
      }
    },

    updateContact: async (id, formData) => {
      try {
        await fetch(`${API_URL}/contacts/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });

        await actions.getContactList();
      } catch (error) {
        console.log(error);
      }
    },

    deleteContact: async (id) => {
      try {
        await fetch(`${API_URL}/contacts/${id}`, {
          method: "DELETE"
        });

        await actions.getContactList();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <StoreContext.Provider value={{ store, dispatch, actions }}>
      {children}
    </StoreContext.Provider>
  );
}

export default function useGlobalReducer() {
  const { dispatch, store, actions } = useContext(StoreContext);
  return { dispatch, store, actions };
}