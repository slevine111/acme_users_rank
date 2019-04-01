import React from 'react'
import { connect } from 'react-redux'
import { getHighestRankedUsers } from '../helperfunctions'
import User from './User'

const UsersList = ({ users, top }) => {
  const usersToDisplay = top ? getHighestRankedUsers(users) : users
  return (
    <ul>
      {usersToDisplay.map(user => (
        <User key={user.id} {...user} />
      ))}
    </ul>
  )
}

const mapStateToProps = state => ({ users: state.users })

export default connect(
  mapStateToProps,
  null
)(UsersList)
