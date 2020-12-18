import React, { Component } from 'react';
import { Button, Container } from 'reactstrap';

const TaskItem = ({ task, handleActiveTaskClick, handleTaskCompletedClick, handleDeleteTaskClick }) => {
  let taskText;
  if (task.status == "IN_PROGRESS") {
    taskText = task.description;
  } else {
    taskText = <del>{task.description}</del>;
  }

  return (
    <div className="row my-2">
      <div className="col-8" onClick={handleActiveTaskClick}>
        {taskText}
      </div>
      <i className="col-1 bi-check" onClick={handleTaskCompletedClick}></i>
      <i className="col-1 bi-trash" onClick={handleDeleteTaskClick}></i>
    </div>
    
  )
}

export { TaskItem }
