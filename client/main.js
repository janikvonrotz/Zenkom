import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { Router, Route, browserHistory } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { App, NotFound, MainLayout } from './core'
import { PostList, Post } from './posts'
import { posts } from './actions'
import zenkomApp from './reducers'

let store = createStore(zenkomApp)
injectTapEventPlugin();

Meteor.startup(() => {
  render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route component={MainLayout}>
          <Route path="/" component={App} />
          <Route path="/posts" component={PostList} />
          <Route path="/post/:id/edit" component={Post} />
          <Route path="/post/insert" component={Post} />
          <Route path="*" component={NotFound} />
        </Route>
      </Router>
    </Provider>,
    document.getElementById('render-target'));
});

// <Route path="/posts" onEnter={requireAuthentication} component={PostList} />
// <Route path="/login" component={Login} />
// <Route path="/register" component={Register} />
// <Route path="/profile" onEnter={requireAuthentication} component={Profile} />
// <Route path="/change-password" component={ChangePassword} />
// <Route path="/email-verification" component={EmailVerification} />
// <Route path="/email-verification/:token" component={EmailVerification} />
// <Route path="/recover-password" component={RecoverPassword} />
// <Route path="/recover-password/:token" component={RecoverPassword} />
