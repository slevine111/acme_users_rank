import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'

const GET_ALL_USERS = 'GET_ALL_USERS'
const GET_USERS_AFTER_DELETE = 'GET_USERS_AFTER_DELETE'

const getAllUsers = users => {
  return {
    type: GET_ALL_USERS,
    users
  }
}

const getUsersAfterDelete = userId => {
  return {
    type: GET_USERS_AFTER_DELETE,
    userId
  }
}

export const fetchAllUsers = () => {
  return dispatch => {
    return axios
      .get('/api/users')
      .then(({ data }) => dispatch(getAllUsers(data)))
      .catch(err => console.error(err))
  }
}

export const deleteUser = userId => {
  return dispatch => {
    return axios
      .delete(`/api/users/${userId}`)
      .then(() => dispatch(getUsersAfterDelete(userId)))
      .catch(err => console.error(err))
  }
}

const reducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return { users: action.users }
    case GET_USERS_AFTER_DELETE:
      return { users: state.users.filter(user => user.id !== action.userId) }
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store
