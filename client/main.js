import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Router, Route, browserHistory } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { App, NotFound, MainLayout, About, muiTheme } from './core'
import { Login, Register, EmailVerification, RecoverPassword,
  Profile, Settings, UserSearch } from './users'
import { RouterPage, Router as RouterComponent,
  RouterVersion } from './routers'
import { Vehicle, VehicleSearch } from './vehicles'
import { NotificationSearch } from './notifications'
import { setUser } from './actions'
import zenkomApp from './reducers'
import { DfiSearch, Dfi } from './dfis'

let store = createStore(zenkomApp, applyMiddleware(thunk))
injectTapEventPlugin()

Meteor.startup(() => {
  render(
    <Provider store={ store }>
      <MuiThemeProvider muiTheme={ muiTheme }>
        <Router history={ browserHistory }>
          <Route component={ MainLayout }>
            <Route path="/" component={ App } />
            <Route path="/routers" component={ RouterPage } />
            <Route path="/router/:id/edit" component={ RouterComponent } />
            <Route path="/router/new" component={ RouterComponent } />
            <Route path="/router/:id/version/:version" component={ RouterVersion } />
            <Route path="/vehicles" component={ VehicleSearch } />
            <Route path="/vehicle/:id/edit" component={ Vehicle } />
            <Route path="/vehicle/new" component={ Vehicle } />
            <Route path="/dfis" component={ DfiSearch } />
            <Route path="/dfi/:id/edit" component={ Dfi } />
            <Route path="/dfi/new" component={ Dfi } />
            <Route path="/notifications" component={ NotificationSearch } />
            <Route path="/users" component={ UserSearch } />
            <Route path="/login" component={ Login } />
            <Route path="/register" component={ Register } />
            <Route path="/profile" component={ Profile } />
            <Route path="/settings" component={ Settings } />
            <Route path="/email-verification" component={ EmailVerification } />
            <Route path="/email-verification/:token" component={ EmailVerification } />
            <Route path="/recover-password" component={ RecoverPassword } />
            <Route path="/recover-password/:token" component={ RecoverPassword } />
            <Route path="/about" component={ About } />
            <Route path="*" component={ NotFound } />
          </Route>
        </Router>
      </MuiThemeProvider>
    </Provider>,
    document.getElementById('render-target'))
})

Meteor.autorun(() => {
  if (Meteor.user() && Meteor.subscribe('users.current').ready()) {
    store.dispatch(setUser(Meteor.user()))
  }
})
