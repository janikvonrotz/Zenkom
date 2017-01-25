import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { TaskList } from './tasks';

Meteor.startup(() => {
  render(<TaskList />, document.getElementById('render-target'));
});
