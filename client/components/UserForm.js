import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createNewUser, updateUser } from '../store'
import {} from '../helperfunctions'

class UserForm extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      bio: '',
      rank: ''
    }
    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  componentDidMount() {
    const { users, id } = this.props
    const selectedUser = users.find(user => user.id === id)
    if (selectedUser) {
      const { name, bio, rank } = selectedUser
      this.setState({
        name,
        bio,
        rank
      })
    }
  }

  onChange({ target }) {
    this.setState({
      [target.name]: target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const { users, history, createNewUser, updateUser, id } = this.props
    const rankAsNumber = Number(this.state.rank)
    const goToTopRankedView = users.every(user => rankAsNumber <= user.rank)
    if (id) {
      return updateUser({ ...this.state, id, rank: rankAsNumber }).then(() =>
        history.push(`/users${goToTopRankedView ? '/top' : ''}`)
      )
    }
    return createNewUser(this.state).then(() =>
      history.push(`/users${goToTopRankedView ? '/top' : ''}`)
    )
  }

  handleCancel() {
    const { users, history } = this.props
    const rankAsNumber = Number(this.state.rank)
    const goToTopRankedView = users.every(user => rankAsNumber <= user.rank)
    history.push(`/users${goToTopRankedView ? '/top' : ''}`)
  }

  createField(fieldName) {
    return (
      <div className="form-group">
        <label htmlFor={fieldName}>{fieldName}</label>
        <input
          type="text"
          name={fieldName}
          value={this.state[fieldName]}
          onChange={this.onChange}
          className="form-control"
        />
      </div>
    )
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="user-form">
        {this.createField('name')}
        {this.createField('bio')}
        {this.createField('rank')}
        <button type="submit" className="btn btn-primary">
          {this.props.id ? 'Edit' : 'Create'}
        </button>
        <button
          type="button"
          onClick={this.handleCancel}
          className="btn btn-secondary"
        >
          Cancel
        </button>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createNewUser: newUser => dispatch(createNewUser(newUser)),
    updateUser: changedUser => dispatch(updateUser(changedUser))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserForm)
