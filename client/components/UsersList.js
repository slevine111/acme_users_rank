import React from 'react'
import { connect } from 'react-redux'
import { getHighestRankedUsers } from '../helperfunctions'
import User from './User'

const UsersList = ({ users, top, history }) => {
  const usersToDisplay = top ? getHighestRankedUsers(users) : users
  return (
    <ul>
      {usersToDisplay.map(user => (
        <User key={user.id} {...user} history={history} />
      ))}
    </ul>
  )
}

const mapStateToProps = state => ({ users: state.users })

export default connect(
  mapStateToProps,
  null
)(UsersList)
