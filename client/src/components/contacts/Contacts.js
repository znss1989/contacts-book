import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered } = contactContext;

  const contactToItem = contact => (
    <CSSTransition 
      key={ contact._id } 
      classNames="item"
      timeout={ 500 }
    >
      <ContactItem
        contact={ contact } 
      />
    </CSSTransition>
  );

  return (
    contacts.length === 0 ?
    <h4>Please add a contact</h4> :
    <Fragment>
      <TransitionGroup>
        { 
          filtered === null ?
          contacts.map(contactToItem) :
          filtered.map(contactToItem)
        }
      </TransitionGroup>
    </Fragment>
  );
};

export default Contacts;
