import React, { Fragment, useContext } from 'react';

import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, user, logout } = authContext;

  const contactContext = useContext(ContactContext);
  const { clearContacts } = contactContext;

  const handleLogout = () => {
    logout();
    clearContacts();
  };

  const authLinks = (
    <Fragment>
      <li>Hello { user && user.name }</li>
      <li>
        <a href="#!" onClick={ handleLogout }>
          <i className="fas fa-sign-out-alt" /> <span className="hide-sm">Log out</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={ icon } /> { title }
      </h1>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
        {
          isAuthenticated ?
          authLinks :
          guestLinks
        }
      </ul>
    </div>
  )
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: "Feather Contacts",
  icon: "fas fa-feather"
};

export default Navbar;
