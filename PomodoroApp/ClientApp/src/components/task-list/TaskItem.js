import React, { Component } from 'react';

const TaskItem = ({ task }) => {
  return (
    <div>
      {task.description}
    </div>
  )
}

export { TaskItem }
