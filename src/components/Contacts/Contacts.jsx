import React, { useEffect } from 'react';

import { nanoid } from 'nanoid';
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';

import css from './contacts.module.css';
import {
  addContact,
  deleteContact,
  setFilter,
} from 'components/redux/contactsSlice';
import { useDispatch, useSelector } from 'react-redux';

const Contacts = () => {
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      dispatch(addContact(JSON.parse(storedContacts)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = (name, number) => {
    dispatch(addContact({ id: nanoid(), name, number }));
  };

  const handleFilterChange = e => {
    dispatch(setFilter(e.target.value));
  };

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <div className={css.phonebook}>
        <h1 className={css.titlePhone}>Phonebook</h1>
        <ContactForm onAddContact={handleAddContact} contacts={contacts} />
      </div>
      <div className={css.contacts}>
        <h2 className={css.titleContacts}>Contacts</h2>
        <Filter value={filter} onChange={handleFilterChange} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={handleDeleteContact}
        />
      </div>
    </div>
  );
};
export default Contacts;
