import React, { PropTypes } from 'react'

class Task extends React.Component {
  render() {
    return (
      <li>{this.props.task.text}</li>
    )
  }
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
}

export default Task
