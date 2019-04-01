import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createNewUser } from '../store'
import {} from '../helperfunctions'

class UserForm extends Component {
  constructor() {
    super()
    console.log('thyg')
    this.state = {
      name: '',
      bio: '',
      rank: ''
    }
    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  onChange({ target }) {
    this.setState({
      [target.name]: target.value
    })
  }

  handleSubmit(event) {
    const goToTopRankedView = this.props.users.every(
      user => Number(this.state.rank) <= user.rank
    )
    event.preventDefault()
    this.props.createNewUser(this.state)
    this.props.history.push(`/users${goToTopRankedView ? '/top' : ''}`)
  }

  createField(fieldName) {
    return (
      <div>
        <label htmlFor={fieldName}>{fieldName}</label>
        <input
          type="text"
          name={fieldName}
          value={this.state[fieldName]}
          onChange={this.onChange}
        />
      </div>
    )
  }

  render() {
    const { history, useOfForm } = this.props
    return (
      <form onSubmit={this.handleSubmit}>
        {this.createField('name')}
        {this.createField('bio')}
        {this.createField('rank')}
        <button type="submit">{useOfForm}</button>
        <button type="button" onClick={() => history.push('/users')}>
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
    createNewUser: newUser => dispatch(createNewUser(newUser))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserForm)
