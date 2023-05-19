import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import style from './App.module.css';
import { LOCALSTORAGE_KEY } from '../constants';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem(LOCALSTORAGE_KEY);
    if (storedContacts !== null) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = userData => {
    const newUser = { ...userData, id: nanoid() };
    setContacts(prevContacts => [...prevContacts, newUser]);
  };

  const deleteContact = id => {
    setContacts(prevContacts => prevContacts.filter(user => user.id !== id));
  };

  const handleChangeFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  const filterContact = (name, filter) => {
    let nameLow = name.toLocaleLowerCase();
    let filterLow = filter.toLocaleLowerCase();
    return nameLow.indexOf(filterLow) >= 0;
  };

  const contactSeach = contacts.filter(user =>
    filterContact(user.name, filter)
  );
  const contactName = contacts.map(user => user.name);

  return (
    <div className={style.book}>
      <h1 className={style.text}>Phonebook</h1>
      <ContactForm addContact={addContact} contactName={contactName} />

      <h2 className={style.text}>Contacts</h2>

      <Filter handleChangeFilter={handleChangeFilter} filter={filter} />
      <ContactList contactSeach={contactSeach} deleteContact={deleteContact} />
    </div>
  );
};

export default App;
