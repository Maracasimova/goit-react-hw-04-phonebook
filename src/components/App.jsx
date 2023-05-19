import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import style from './App.module.css';
import { LOCALSTORAGE_KEY } from '../constants';


export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const storedContacts = localStorage.getItem(LOCALSTORAGE_KEY);
    if (storedContacts !== null) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = userData => {
    const newUser = { ...userData, id: nanoid() };
    this.setState(prevstate => {
      return { contacts: [...prevstate.contacts, newUser] };
    });
  };

  deleteContact = id => {
    this.setState(prevstate => {
      return { contacts: prevstate.contacts.filter(user => user.id !== id) };
    });
  };

  handleChangeFilter = ({ target: { value } }) => {
    this.setState({
      filter: value,
    });
  };

  filterContact = (name, filter) => {
    let nameLow = name.toLocaleLowerCase();
    let filterLow = filter.toLocaleLowerCase();
    return nameLow.indexOf(filterLow) >= 0;
  };

  render() {
    const { contacts, filter } = this.state;
    const contactSeach = contacts.filter(user =>
      this.filterContact(user.name, filter)
    );
    const contactName = contacts.map(user => user.name);

    return (
      <div className={style.book}>
        <h1 className={style.text}>Phonebook</h1>
        <ContactForm addContact={this.addContact} contactName={contactName} />

        <h2 className={style.text}>Contacts</h2>

        <Filter handleChangeFilter={this.handleChangeFilter} filter={filter} />
        <ContactList
          contactSeach={contactSeach}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
