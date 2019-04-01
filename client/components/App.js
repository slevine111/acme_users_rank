import React, { Component, Fragment } from 'react'
import { HashRouter, Route } from 'react-router-dom'
import Navbar from './Navbar'
import { fetchAllUsers } from '../store'
import { connect } from 'react-redux'
import UsersList from './UsersList'

class App extends Component {
  componentDidMount() {
    return this.props.fetchAllUsers()
  }

  render() {
    return (
      <div className="container">
        <h2>Acme Users Rank</h2>
        <HashRouter>
          <Fragment>
            <Navbar />
            <Route exact path="/" render={() => <h6>Home</h6>} />
            <Route
              exact
              path="/users"
              render={() => <UsersList top={false} />}
            />
            <Route path="/users/top" render={() => <UsersList top={true} />} />
          </Fragment>
        </HashRouter>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllUsers: () => dispatch(fetchAllUsers())
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App)
