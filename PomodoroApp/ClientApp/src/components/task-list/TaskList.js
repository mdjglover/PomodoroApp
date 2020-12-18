import React, { useState } from 'react';
import { Button, Container } from 'reactstrap';
import { observer } from 'mobx-react';
import { useStore } from '../../stores/AppStore';
import { TaskItem } from './TaskItem';

const TaskList = observer(() => {
  let store = useStore()
  const [newTask, setNewTask] = useState('');
  let taskItems = store.tasks.map((task, idx) => <TaskItem key={idx}
    task={task}
    handleActiveTaskClick={() => store.setActiveTask(task)}
    handleTaskCompletedClick={() => store.updateTaskProgress(task)}
    handleDeleteTaskClick={() => store.deleteTask(task)}
  />);
  return (
    <Container>
      <div>
        <h1>Tasks</h1>
        {taskItems}
      </div>
      <div>
        <input type='text' value={newTask} onChange={(e) => setNewTask(e.target.value)} />
        <Button type='button' onClick={() => store.addTask(newTask)}>Add Task</Button>
      </div>
    </Container>
  );
});

export { TaskList }