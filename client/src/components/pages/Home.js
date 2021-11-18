import React, { useContext, useEffect } from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  // get auth context to get loadUser function
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;
  // when component loads - check token with backend and put user in state
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>

      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
