import React, { useReducer } from 'react';
import Axios from 'axios';
// import { v4 as uuidv4 } from 'uuid'; // used to generate dummy IDs for testing
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import { GET_CONTACTS, ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, UPDATE_CONTACT, CLEAR_CONTACTS, FILTER_CONTACTS, CLEAR_FILTER, CONTACT_ERROR } from '../types';

const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // get contacts
  const getContacts = async () => {
    // const config = {
    //   headers: {
    //     'Context-Type': 'application/json'
    //   }
    // };
    try {
      const res = await Axios.get('/api/contacts');
      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };

  // Add contact
  const addContact = async contact => {
    const config = {
      headers: {
        'Context-Type': 'application/json'
      }
    };
    try {
      const res = await Axios.post('/api/contacts', contact, config);

      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };

  // Update contact
  const updateContact = async contact => {
    const config = {
      headers: {
        'Context-Type': 'application/json'
      }
    };
    try {
      const res = await Axios.put(`/api/contacts/${contact._id}`, contact, config);

      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };

  // Delete contact
  const deleteContact = async id => {
    try {
      await Axios.delete(`/api/contacts/${id}`);

      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };

  // clear contacts
  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  // Set current contact
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  // Clear current contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter contacts by search text
  const filterContacts = text => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  // Clear the search filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        getContacts,
        clearContacts
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );

  //
}; //
//
export default ContactState;
