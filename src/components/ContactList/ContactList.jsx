import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeContact } from 'Redux/contactsSlice';
import { selectContacts, selectFilters } from 'Redux/selector';
import Filter from '../Filter/Filter';

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilters);
  const dispatch = useDispatch();
  const getFilteredContacts = () => {
    return contacts.filter(
      contact =>
        contact.name &&
        contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  const filteredContacts = getFilteredContacts();

  const removeContactById = id => {
    const contactId = id;
    dispatch(
      removeContact(contacts.filter(contact => contact.id !== contactId))
    );
  };

  return (
    <div>
      <h2>Contacts</h2>
      <Filter />
      <ul>
        {filteredContacts.map(contact => (
          <li key={contact.id}>
            {contact.name}: {contact.number}
            <button type="button" onClick={() => removeContactById(contact.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
