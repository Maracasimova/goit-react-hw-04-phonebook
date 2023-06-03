import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import style from './App.module.css';
import { LOCALSTORAGE_KEY } from '../constants';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const storedContacts = localStorage.getItem(LOCALSTORAGE_KEY);
    if (storedContacts !== null) {
      return JSON.parse(storedContacts);
    } else {
      return [];
    }
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = userData => {
    const existingContact = contacts.find(
      contact => contact.name === userData.name
    );

    if (existingContact) {
      alert(`This contact ${existingContact.name} already exists.`);
      return;
    }

    const newUser = { ...userData, id: nanoid() };
    setContacts(prevContacts => [...prevContacts, newUser]);
  };

  const deleteContact = id => {
    setContacts(prevContacts => prevContacts.filter(user => user.id !== id));
  };

  const handleChangeFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  const filterContact = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const contactName = contacts.map(user => user.name);

  const filteredContacts = filterContact();

  return (
    <div className={style.book}>
      <h1 className={style.text}>Phonebook</h1>
      <ContactForm addContact={addContact} contactName={contactName} />

      <h2 className={style.text}>Contacts</h2>

      {filteredContacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <>
          <Filter handleChangeFilter={handleChangeFilter} filter={filter} />
          <ContactList
            contactSearch={filteredContacts}
            deleteContact={deleteContact}
          />
        </>
      )}
    </div>
  );
};

export default App;
