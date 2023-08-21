import React from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";

export default function Navbar(props) {
  return (
    <div>
      <nav className={`navbar navbar-expand-lg ${props.mode === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
        <div className="container-fluid">
          {/* Brand link */}
          <Link className="navbar-brand" to="/">{props.title}</Link>
          {/* Navbar toggler */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* Navbar content */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* Navigation links */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {/* NavLink for Home */}
                <NavLink className="nav-link" aria-current="page" exact to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                {/* NavLink for About */}
                <NavLink className="nav-link" to="/about">{props.aboutText}</NavLink>
              </li>
            </ul>
            {/* Dark/Light mode switch */}
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" role="switch" onClick={props.toggleMode} id="flexSwitchCheckDefault"/>
              <label className={`form-check-label text-${props.mode === 'light' ? 'dark' : 'light'}`} htmlFor="flexSwitchCheckDefault">
                {`Enable ${props.mode === 'light' ? 'Dark' : 'Light'} Mode`}
              </label>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

// PropTypes validation
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  aboutText: PropTypes.string.isRequired,
};
Navbar.defaultProps = {
  title: "TextUtils",
  aboutText: "About Us",
};
