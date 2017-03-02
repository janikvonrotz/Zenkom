import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Router, Route, browserHistory } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { App, NotFound, MainLayout } from './core'
import { PostSearch, Post } from './posts'
import { Login, Register, EmailVerification, RecoverPassword,
  Profile } from './users'
import { RouterSearch, Router as RouterComponent } from './routers'
import { setUser } from './actions'
import zenkomApp from './reducers'

let store = createStore(zenkomApp, applyMiddleware(thunk))
injectTapEventPlugin()

Meteor.startup(() => {
  render(
    <Provider store={ store }>
      <Router history={ browserHistory }>
        <Route component={ MainLayout }>
          <Route path="/" component={ App } />
          <Route path="/posts" component={ PostSearch } />
          <Route path="/post/:id/edit" component={ Post } />
          <Route path="/post/new" component={ Post } />
          <Route path="/routers" component={ RouterSearch } />
          <Route path="/router/:id/edit" component={ RouterComponent } />
          <Route path="/router/new" component={ RouterComponent } />
          <Route path="/login" component={ Login } />
          <Route path="/register" component={ Register } />
          <Route path="/profile" component={ Profile } />
          <Route path="/email-verification" component={ EmailVerification } />
          <Route path="/email-verification/:token" component={ EmailVerification } />
          <Route path="/recover-password" component={ RecoverPassword } />
          <Route path="/recover-password/:token" component={ RecoverPassword } />
          <Route path="*" component={ NotFound } />
        </Route>
      </Router>
    </Provider>,
    document.getElementById('render-target'))
})

Meteor.autorun(() => {
  if (Meteor.user()) {
    store.dispatch(setUser(Meteor.user()))
  }
})

// <Route path="/posts" onEnter={requireAuthentication} component={PostList} />
// <Route path="/login" component={Login} />
// <Route path="/register" component={Register} />
// <Route path="/profile" onEnter={requireAuthentication} component={Profile} />
// <Route path="/change-password" component={ChangePassword} />
