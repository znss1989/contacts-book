import React, { Fragment, useContext } from 'react';

import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered } = contactContext;

  const contactToItem = contact => (
    <ContactItem
      key={ contact.id }
      contact={ contact } 
    />
  );

  return (
    contacts.length === 0 ?
    <h4>Please add a contact</h4> :
    <Fragment>
      { 
        filtered === null ?
        contacts.map(contactToItem) :
        filtered.map(contactToItem)
      }
    </Fragment>
  );
};

export default Contacts;
