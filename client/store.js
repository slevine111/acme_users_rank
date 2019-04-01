import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'

const GET_ALL_USERS = 'GET_ALL_USERS'
const GET_USERS_AFTER_DELETE = 'GET_USERS_AFTER_DELETE'
const GET_USERS_AFTER_CREATE = 'GET_USERS_AFTER_CREATE'

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

const getUsersAfterCreate = newUser => {
  return {
    type: GET_USERS_AFTER_CREATE,
    newUser
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

export const createNewUser = user => {
  return dispatch => {
    user.bio = user.bio
      .split(' ')
      .map((word, index) => {
        if (index === 0) {
          return `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`
        }
        return word.toLowerCase()
      })
      .join(' ')
    return axios
      .post('/api/users', user)
      .then(({ data }) => dispatch(getUsersAfterCreate(data)))
      .catch(err => console.error(err))
  }
}

const reducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return { ...state, users: action.users }
    case GET_USERS_AFTER_DELETE:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.userId)
      }
    case GET_USERS_AFTER_CREATE:
      action.newUser.rank = Number(action.newUser.rank)
      return { ...state, users: [...state.users, action.newUser] }
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store
