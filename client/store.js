import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'

const GET_ALL_USERS = 'GET_ALL_USERS'

export const getAllUsers = users => {
  return {
    type: GET_ALL_USERS,
    users
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

const reducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return { users: action.users }
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store
