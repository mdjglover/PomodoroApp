import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { useStore } from '../../stores/AppStore';
import { Container } from 'reactstrap';
import { TaskActivityList } from './TaskActivityList';

const TaskStatistics = observer(() => {
  const history = useHistory();
  const store = useStore();
  const activeTask = store.activeTask;
  let totalTimeMillis = 0;
  let taskActivity = [];

  if (activeTask != null && store.tasksActivity != null && store.tasksActivity.length > 0) {
    taskActivity = store.tasksActivity.filter((activity) => activity.taskId == activeTask.id);
    for (let i = 0; i < taskActivity.length; i++) {
      totalTimeMillis += taskActivity[i].duration;
    }
  }

  return (
    <Container>
      <div>
        <h3>Task:</h3>
        <p>{activeTask == null ? "N/A" : activeTask.description}</p>
        <h3>Total Time:</h3>
        { totalTimeMillis }
      </div>
      <TaskActivityList taskActivityList={ taskActivity } /> 
      
    </Container>
  );
})

export { TaskStatistics }