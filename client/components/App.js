import React, { Component, Fragment } from 'react'
import { HashRouter, Route } from 'react-router-dom'
import Navbar from './Navbar'
import { fetchAllUsers } from '../store'
import { connect } from 'react-redux'

class App extends Component {
  componentDidMount() {
    return this.props.fetchAllUsers()
  }

  render() {
    console.log(this.props.users)
    return (
      <div className="container">
        <h2>Acme Users Rank</h2>
        <HashRouter>
          <Fragment>
            <Navbar />
          </Fragment>
        </HashRouter>
      </div>
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
    fetchAllUsers: () => dispatch(fetchAllUsers())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
