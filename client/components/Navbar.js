import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ location }) => {
  const { pathname } = location
  return (
    <ul className="nav nav-tabs">
      <Link
        to="/"
        className={`nav-item nav-link ${pathname === '/' ? 'active' : ''}`}
      >
        Home
      </Link>
      <Link
        to="/users"
        className={`nav-item nav-link ${pathname === '/users' ? 'active' : ''}`}
      >
        Users
      </Link>
      <Link
        to="/users/create"
        className={`nav-item nav-link ${
          pathname === '/users/create' ? 'active' : ''
        }`}
      >
        Create A User
      </Link>
      <Link
        to="/users/top"
        className={`nav-item nav-link ${
          pathname === '/users/top' ? 'active' : ''
        }`}
      >
        Top Ranked
      </Link>
    </ul>
  )
}

export default Navbar
