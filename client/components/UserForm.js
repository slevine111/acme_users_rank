import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createNewUser, updateUser } from '../store'
import TextTipsClass from '../TextTipsClass'
import { makeStringTitleCase } from '../helperfunctions'

class UserForm extends Component {
  constructor(props) {
    super(props)
    const { id, users } = this.props
    this.state = this.generateStateObject(id && users.length)
    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.generateFieldTextTip = TextTipsClass.generateFieldTextTip.bind(this)
    this.updateNameTextTip = TextTipsClass.updateNameTextTip.bind(this)
    this.updateBioTextTip = TextTipsClass.updateBioTextTip.bind(this)
    this.updateRankTextTip = TextTipsClass.updateRankTextTip.bind(this)
    this.addOrRemoveOutFocusEventListeners = TextTipsClass.addOrRemoveOutFocusEventListeners.bind(
      this
    )
  }

  componentDidMount() {
    this.addOrRemoveOutFocusEventListeners('add')
  }

  componentWillUnmount() {
    this.addOrRemoveOutFocusEventListeners('remove')
  }

  componentDidUpdate(prevProps) {
    const { id, users } = this.props
    if (id !== prevProps.id || users.length !== prevProps.users.length) {
      this.setState(this.generateStateObject(id && users.length))
    }
  }

  generateStateObject(idPropExistsAndUsersLoaded) {
    const { users, id } = this.props
    const selectedUser = users.find(user => user.id === id)
    return {
      name: idPropExistsAndUsersLoaded ? selectedUser.name : '',
      bio: idPropExistsAndUsersLoaded ? selectedUser.bio : '',
      rank: idPropExistsAndUsersLoaded ? selectedUser.rank : '',
      error: '',
      textTips: {
        name: idPropExistsAndUsersLoaded ? '' : 'Field is required',
        bio: idPropExistsAndUsersLoaded ? '' : 'Field is required',
        rank: idPropExistsAndUsersLoaded ? '' : 'Field is required'
      },
      nameFieldHasBeenClicked: idPropExistsAndUsersLoaded,
      bioFieldHasBeenClicked: idPropExistsAndUsersLoaded,
      rankFieldHasBeenClicked: idPropExistsAndUsersLoaded
    }
  }

  onChange({ target }) {
    this.setState({
      [target.name]: target.value
    })
    this[`update${makeStringTitleCase(target.name)}TextTip`](target.value)
  }

  handleSubmit(event) {
    event.preventDefault()
    const { users, history, createNewUser, updateUser, id } = this.props
    const rankAsNumber = Number(this.state.rank)
    const goToTopRankedView = users.every(user => rankAsNumber <= user.rank)
    if (id) {
      return updateUser({ ...this.state, id, rank: rankAsNumber })
        .then(() => history.push(`/users${goToTopRankedView ? '/top' : ''}`))
        .catch(err => this.setState({ error: err.response.data }))
    }
    return createNewUser({ ...this.state, rank: rankAsNumber })
      .then(() => history.push(`/users${goToTopRankedView ? '/top' : ''}`))
      .catch(err => {
        this.setState({ error: err.response.data })
      })
  }

  createField(fieldName) {
    const fieldHasBeenClickedState = this.state[
      `${fieldName}FieldHasBeenClicked`
    ]
    const makeBorderRed =
      (this.state.textTips[fieldName] !== '' && fieldHasBeenClickedState) ||
      !['', 'Field is required'].includes(this.state.textTips[fieldName])
    return (
      <div className="form-group">
        <label htmlFor={fieldName}>{fieldName}</label>
        <input
          type="text"
          id={`${fieldName}-input`}
          name={fieldName}
          value={this.state[fieldName]}
          onChange={this.onChange}
          className={`form-control ${makeBorderRed ? 'red-border' : ''}`}
        />
        {this.generateFieldTextTip(fieldName)}
      </div>
    )
  }

  render() {
    const { error, textTips } = this.state
    const canNotSubmit =
      textTips.name !== '' || textTips.bio !== '' || textTips.rank !== ''
    return (
      <form onSubmit={this.handleSubmit} className="user-form">
        {this.createField('name')}
        {this.createField('bio')}
        {this.createField('rank')}
        {error && (
          <div className="alert alert-danger">
            {Array.isArray(error) ? (
              <div>
                {' '}
                You have the following errors:
                <ul>
                  {error.map((curError, idx) => (
                    <li key={idx}>{curError}</li>
                  ))}
                </ul>
              </div>
            ) : (
              error
            )}
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          disabled={canNotSubmit}
        >
          {this.props.id ? 'Edit' : 'Create'}
        </button>
        <button
          type="button"
          onClick={() => this.props.history.goBack()}
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
