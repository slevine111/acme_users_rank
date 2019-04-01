import React from 'react'
import { connect } from 'react-redux'
import { deleteUser } from '../store'

const User = ({ id, name, bio, rank, deleteUser, history }) => {
  return (
    <ul key={id}>
      <li>{name}</li>
      <li>{bio}</li>
      <li>{rank}</li>
      <button type="button" onClick={() => deleteUser(id)}>
        Delete
      </button>
      <button type="button" onClick={() => history.push(`/users/${id}`)}>
        Edit
      </button>
    </ul>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    deleteUser: userId => dispatch(deleteUser(userId))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(User)
