import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const { addContact, updateContact, clearCurrent, current } = contactContext;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      });
    }
  }, [contactContext, current]); // if either of these change

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal' // default type
  });

  // destructure contact
  const { name, email, phone, type } = contact;

  // set state of contact that fired onChange
  const onChange = e => setContact({ ...contact, [e.target.name]: e.target.value });

  // When form is submitted
  const onSubmit = e => {
    e.preventDefault();

    // if current not set this is a new contact, so add
    if (current === null) {
      addContact(contact);
    } else {
      // otherwise we are editing an existing contact, so update
      updateContact(contact);
      // and clear current
      clearCurrent();
    }
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal'
    });
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      {/* Heading - if current set, then edit otherwise add */}
      <h2 className="text-primary">{current ? 'Edit Contact' : 'Add Contact'}</h2>
      {/* Name */}
      <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} />
      {/* Email */}
      <input type="email" placeholder="Email" name="email" value={email} onChange={onChange} />
      {/* Phone */}
      <input type="text" placeholder="Phone" name="phone" value={phone} onChange={onChange} />
      {/* Radio button, personal (default)/professional */}
      <h5>Contact Type</h5>
      <input type="radio" name="type" value="personal" checked={type === 'personal'} onChange={onChange} /> Personal
      <input type="radio" name="type" value="professional" checked={type === 'professional'} onChange={onChange} /> Professional
      <div>
        {/* button caption - if current set, then edit otherwise add */}
        <input type="submit" value={current ? 'Update Contact' : 'Add Contact'} className="btn btn-block btn-primary" />
      </div>
      {/* if current has content then display clear button */}
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
