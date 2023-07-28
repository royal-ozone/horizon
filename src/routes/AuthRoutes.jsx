import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
import routes from './routes'
import cookie from 'react-cookies'
import Page404 from '../pages/Page404'
export const AuthRoutes = ({ login, match }) => {
  console.log("🚀 ~ file: AuthRoutes.jsx ~ line 6 ~ AuthRoutes ~ login", login)
  const history = useHistory()
  const path = cookie.load('redirectTo', { path: '/' })
  useEffect(() => {
    routes.find(v => (v.path === window.location.pathname.toLowerCase()) && v.auth !== login) && history.push(login ? path ?? '/' : '/signin')
    if (window.location.pathname.startsWith('/settings') && !window.location.pathname.endsWith('/settings')) {
      history.push('/settings')
    }
  }, [login])
  return (
    <Switch>
      {routes.map((route, i) => login === route.auth && <Route key={`route${i}`} path={route.path} component={route.component} exact={route.exact} />)}
      <Route exact path="*">
        <Page404 />
      </Route>
    </Switch>
  )
}

const mapStateToProps = (state) => ({
  login: state.sign.login
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoutes)