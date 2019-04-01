import React, { Component, Fragment } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Navbar from './Navbar'
import { fetchAllUsers } from '../store'
import { connect } from 'react-redux'
import UsersList from './UsersList'
import UserForm from './UserForm'

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
            <Switch>
              <Route exact path="/" render={() => <h6>Home</h6>} />
              <Route
                exact
                path="/users"
                render={({ history }) => (
                  <UsersList top={false} history={history} />
                )}
              />
              <Route
                path="/users/create"
                render={({ history }) => (
                  <UserForm history={history} useOfForm="Create" />
                )}
              />
              <Route
                path="/users/top"
                render={({ history }) => (
                  <UsersList top={true} history={history} />
                )}
              />
              <Route
                path="/users/:id"
                render={({ match, history }) => (
                  <UserForm
                    history={history}
                    useOfForm="Edit"
                    id={Number(match.params.id)}
                  />
                )}
              />
            </Switch>
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
