import React, { useContext, useState } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });

  const { name, email, phone, type } = contact;

  const handleChange = event => setContact({
    ...contact,
    [event.target.name]: event.target.value
  });

  const handleSubmit = event => {
    event.preventDefault();
    contactContext.addContact(contact);
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal'
    });
  };

  return (
    <form onSubmit={ handleSubmit }>
      <h2 className="text-primary">Add Contact</h2>
      <input 
        type="text" 
        placeholder="Name" 
        name="name" 
        value={ name }
        onChange={ handleChange }
      />
      <input 
        type="text" 
        placeholder="Email" 
        name="email" 
        value={ email }
        onChange={ handleChange }
      />
      <input 
        type="text" 
        placeholder="Phone" 
        name="phone" 
        value={ phone }
        onChange={ handleChange }
      />
      <h5>Contact Type</h5>
      <input 
        type="radio" 
        name="type" 
        value="personal"
        checked={ type === 'personal' }
        onChange={ handleChange }
      /> Personal{' '}
      <input 
        type="radio" 
        name="type" 
        value="professional"
        checked={ type === 'professional' }
        onChange={ handleChange }
      /> Professional{' '}
      <div>
        <input 
          className="btn btn-primary btn-block"
          type="submit"
          value="add contact"
        />
      </div>
    </form>
  )
};

export default ContactForm;
