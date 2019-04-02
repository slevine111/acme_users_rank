import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getHighestRankedUsers } from '../helperfunctions'

const Navbar = ({ location, users }) => {
  const { pathname } = location
  const highestRankedUsers = getHighestRankedUsers(users)
  const topRankedHeaderString = !highestRankedUsers.length
    ? 'Top Ranked'
    : `Top Ranked (${highestRankedUsers[0].name}${
        highestRankedUsers.length === 1
          ? ''
          : ` and ${highestRankedUsers.length - 1} more`
      })`
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
        {topRankedHeaderString}
      </Link>
    </ul>
  )
}

const mapStateToProps = state => state

export default connect(
  mapStateToProps,
  null
)(Navbar)
