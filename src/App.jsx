import { useState, useEffect } from "react";
import "./App.css";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";

function App() {
  const [filter, setFilter] = useState("");
  const [contacts, setContacts] = useState([
    { id: "id-1", name: "Rick Grimes", number: "459-12-56" },
    { id: "id-2", name: "Deacon St. John", number: "443-89-12" },
    { id: "id-3", name: "Daryl Dixon", number: "645-17-79" },
    { id: "id-4", name: "Mark Copeland", number: "227-91-26" },
  ]);

  useEffect(() => {
    const savedContacts = JSON.parse(
      localStorage.getItem("contacts")
    );
    if (savedContacts) {
      setContacts(savedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (newContact) => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const deleteContact = (contactId) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== contactId)
    );
  };

  const visibleContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onAdd={addContact} />
      <SearchBox value={filter} onFilter={setFilter} />
      <ContactList contacts={visibleContacts} onDelete={deleteContact} />
    </>
  );
}

export default App;

