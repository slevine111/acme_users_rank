import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'
import { makeStringTitleCase } from './helperfunctions'

const GET_ALL_USERS = 'GET_ALL_USERS'
const GET_USERS_AFTER_DELETE = 'GET_USERS_AFTER_DELETE'
const GET_USERS_AFTER_CREATE = 'GET_USERS_AFTER_CREATE'
const GET_USERS_AFTER_UPDATE = 'GET_USERS_AFTER_UPDATE'

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

const getUsersAfterUpdate = changedUser => {
  return {
    type: GET_USERS_AFTER_UPDATE,
    changedUser
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
    return axios
      .post('/api/users', {
        ...user,
        name: makeStringTitleCase(user.name),
        bio: makeStringTitleCase(user.bio)
      })
      .then(({ data }) => dispatch(getUsersAfterCreate(data)))
  }
}

export const updateUser = changedUser => {
  return dispatch => {
    return axios
      .put(`/api/users/${changedUser.id}`, {
        ...changedUser,
        name: makeStringTitleCase(changedUser.name),
        bio: makeStringTitleCase(changedUser.bio)
      })
      .then(({ data }) => dispatch(getUsersAfterUpdate(data)))
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
    case GET_USERS_AFTER_UPDATE:
      return {
        ...state,
        users: state.users.map(user =>
          user.id === Number(action.changedUser.id) ? action.changedUser : user
        )
      }
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store
