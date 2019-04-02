import React from 'react'
import { connect } from 'react-redux'
import { deleteUser } from '../store'

const User = ({ id, name, bio, rank, deleteUser, history }) => {
  return (
    <div className="list-group-item">
      <div className="name-display">{name}</div>
      <div className="user-div">
        <i>{bio}</i>
      </div>
      <div className="user-div">
        <div className="badge badge-success">{rank}</div>
      </div>
      <div className="user-div">
        <button
          type="button"
          onClick={() => deleteUser(id)}
          className="btn btn-danger"
        >
          Delete
        </button>
        <button
          type="button"
          onClick={() => history.push(`/users/${id}`)}
          className="btn btn-light"
        >
          Edit
        </button>
      </div>
    </div>
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
