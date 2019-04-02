import React from 'react'

class TextTipsClass {
  static generateFieldTextTip(field) {
    const { textTips } = this.state

    const keep = textTips[field] !== ''

    const useRedFont =
      (textTips[field] !== '' && this.state[`${field}FieldHasBeenClicked`]) ||
      !['', 'Field is required'].includes(textTips[field])

    return (
      <div>
        <small className={`help-text-size ${useRedFont ? 'red-font' : ''}`}>
          {keep ? textTips[field] : ''}
        </small>
      </div>
    )
  }

  static updateNameTextTip(currentNameValue) {
    const textTip =
      currentNameValue === ''
        ? 'Field is required'
        : this.props.users
            .filter(user => (this.props.id ? user.id !== this.props.id : true))
            .map(user => user.name.toLowerCase())
            .includes(currentNameValue.toLowerCase())
        ? 'User has already been added (name is NOT case sensitive). Add another user'
        : ''
    return this.setState(curState => {
      curState.textTips.name = textTip
      return curState
    })
  }

  static updateBioTextTip(currentBioValue) {
    const textTip = currentBioValue === '' ? 'Field is required' : ''
    return this.setState(curState => {
      curState.textTips.bio = textTip
      return curState
    })
  }

  static updateRankTextTip(currentRankValue) {
    const textTip =
      currentRankValue === ''
        ? 'Field is required'
        : !/^[1-9][0-9]*$/.test(currentRankValue)
        ? 'Value must be an integer one or greater'
        : ''
    return this.setState(curState => {
      curState.textTips.rank = textTip
      return curState
    })
  }

  static addOrRemoveOutFocusEventListeners(addOrRemove) {
    ;['name', 'bio', 'rank'].forEach(field => {
      document
        .querySelector(`#${field}-input`)
        [`${addOrRemove}EventListener`]('focusout', () => {
          this.setState({
            [`${field}FieldHasBeenClicked`]: true
          })
        })
    })
  }
}

export default TextTipsClass
