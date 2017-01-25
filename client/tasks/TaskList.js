import React from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Task } from './index'
import { Tasks } from '/imports/collections'

class TaskList extends React.Component {

  renderTasks() {
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
    ))
  }

  insert(event) {
    event.preventDefault()

    let { text } = this.refs
    text = text.value

    Tasks.insert({
      text,
      createdAt: new Date(),
    })
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
        </header>
        <form onSubmit={this.insert.bind(this)} >
          <input
          type="text"
          ref="text"
          placeholder="Type to add new tasks" />
        </form>
        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    )
  }
}

export default createContainer(() => {
  return {
    tasks: Tasks.find({}).fetch(),
  };
}, TaskList);
