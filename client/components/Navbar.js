import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

export default () => {
  return (
    <Fragment>
      <Link to="/">Home</Link>
      <Link to="/users">Users</Link>
      <Link to="/users/create">Create A User</Link>
      <Link to="/users/top">Top Ranked</Link>
    </Fragment>
  )
}
