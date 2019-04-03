import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getHighestRankedUsers } from '../helperfunctions'

const Navbar = ({ location, topRankedHeaderString }) => {
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
        {topRankedHeaderString}
      </Link>
    </ul>
  )
}

const mapStateToProps = state => {
  const highestRankedUsers = getHighestRankedUsers(state.users)
  return {
    topRankedHeaderString: !highestRankedUsers.length
      ? 'Top Ranked'
      : `Top Ranked (${highestRankedUsers[0].name}${
          highestRankedUsers.length === 1
            ? ''
            : ` and ${highestRankedUsers.length - 1} more`
        })`
  }
}

export default connect(
  mapStateToProps,
  null
)(Navbar)
