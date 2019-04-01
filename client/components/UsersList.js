import React from 'react'
import { connect } from 'react-redux'
import { getHighestRankedUsers } from '../helperfunctions'

const Users = ({ users, top, deleteProduct }) => {
  const usersToDisplay = top ? getHighestRankedUsers(users) : users
  return (
    <ul>
      {usersToDisplay.map(user => {
        const { id, name, bio, rank } = user
        return (
          <ul key={id}>
            <li>{name}</li>
            <li>{bio}</li>
            <li>{rank}</li>
            <button type="submit" onClick={() => deleteProduct(id)}>
              Delete
            </button>
          </ul>
        )
      })}
    </ul>
  )
}

const mapStateToProps = state => ({ users: state.users })

const mapDispatchToProps = dispatch => {
  return {
    deleteProduct: userId => 'rt'
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users)
