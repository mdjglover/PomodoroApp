import React, { Component } from 'react';
import { TaskActivityItem } from './TaskActivityItem';

const TaskActivityList = ({ taskActivityList }) => {
  const taskActivityLst = taskActivityList.map((taskActivity, idx) => 
    <TaskActivityItem
      key={idx}
      taskActivity={taskActivity} />
  );

  return (
    <div>
      <h3>Activity</h3>
      {taskActivityLst}
    </div>
  );
}

export { TaskActivityList }