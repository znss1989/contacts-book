import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ContactContext from '../../context/contact/contactContext';
import Spinner from '../layout/Spinner';
import ContactItem from './ContactItem';

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { loading, contacts, filtered, getContacts } = contactContext;

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

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
    loading ? <Spinner /> :
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
