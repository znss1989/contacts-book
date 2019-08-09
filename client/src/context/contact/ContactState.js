import React, { useReducer } from 'react';
import axios from 'axios';

import ContactContext from './contactContext';
import contactReucer from './contactReducer';

import { 
  SET_LOADING,
  GET_CONTACTS,
  CLEAR_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  CONTACT_ERROR,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [],
    current: null,
    filtered: null,
    error: null,
    loading: false
  };

  const [state, dispatch] = useReducer(contactReucer, initialState);

  // action creators
  const getContacts = async () => {
    try {
      dispatch({
        type: SET_LOADING
      });
      const res = await axios.get('/api/contacts');
      dispatch({
        type: GET_CONTACTS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg
      });
    }
  };

  const addContact = async contact => {
    const config = { 
      headers: { 'Content-Type': 'application/json' }
    };

    try {
      dispatch({
        type: SET_LOADING
      });
      const res = await axios.post('/api/contacts', contact, config);
      dispatch({
        type: ADD_CONTACT,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg
      });
    }
  };

  const updateContact = async contact => {
    const config = { 
      headers: { 'Content-Type': 'application/json' }
    };

    try {
      const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);
      dispatch({
        type: UPDATE_CONTACT,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg
      });
    }
  }

  const deleteContact = async _id => {
    try {
      await axios.delete(`/api/contacts/${_id}`);

      dispatch({
        type: DELETE_CONTACT,
        payload: _id
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg
      });
    }
  };

  const setCurrent = contact => {
    dispatch({
      type: SET_CURRENT,
      payload: contact
    });
  };

  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT
    });
  };

  const filterContacts = text => {
    dispatch({
      type: FILTER_CONTACTS,
      payload: text
    });
  };

  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER
    });
  };

  const clearContacts = () => {
    dispatch({
      type: CLEAR_CONTACTS
    });
  };

  return (
    <ContactContext.Provider
      value={{
        loading: state.loading,
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getContacts,
        addContact,
        updateContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        filterContacts,
        clearFilter,
        clearContacts,
      }}
    >
      { props.children }
    </ContactContext.Provider>
  );
};

export default ContactState;