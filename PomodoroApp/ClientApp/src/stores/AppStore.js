import React, { useContext, createContext } from "react";
import { observable, computed, action, makeObservable, runInAction } from "mobx";
import { useLocalStore } from "mobx-react";

class AppStore {
  tasks = [];
  tasksActivity = [];
  activeTask = null;

  constructor() {
    makeObservable(this, {
      tasks: observable,
      tasksActivity: observable,
      activeTask: observable,
      setActiveTask: action,
      taskCount: computed,
      getTasks: action,
      addTask: action,
      updateTaskProgress: action,
      deleteTask: action
    });

    this.getTasks();
    this.getTasksActivity();
  }


  get taskCount() {
    return this.tasks.length;
  }

  setActiveTask(task) {
    this.activeTask = task;
  }

  async getTasks() {
    let response = await fetch("tasks");
    let tasks = await response.json()
    runInAction(() => {
      this.tasks = tasks;
    });
  }

  async addTask(taskDescription) {
    if (taskDescription == "") {
      return;
    }

    let currentTime = new Date()

    let task = {
      "description": taskDescription,
      "createdAt": currentTime,
      "status": "IN_PROGRESS"
    }

    let response = await fetch("tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    });

    if (response.status == 200) this.getTasks();
  }

  async updateTaskProgress(task) {
    if (task.status == "IN_PROGRESS") {
      task.status = "COMPLETED";
    } else {
      task.status = "IN_PROGRESS";
    }
    let response = await fetch("tasks", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    });
    if (response.status == 200) this.getTasks();
  }

  async deleteTask(task) {
    let response = await fetch("tasks", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    });
    if (response.status == 200) this.getTasks();

    if (this.activeTask != null && this.activeTask.id == task.id) {
      runInAction(() => {
        this.activeTask = null;
      });
    }
  }

  async getTasksActivity() {
    let response = await fetch("tasks/activity");
    let tasksActivity = await response.json()
    console.log(tasksActivity);
    runInAction(() => {
      this.tasksActivity = tasksActivity;
    });
  }

  async addTaskActivity(taskActivity) {
    console.log(taskActivity);
    let response = await fetch("tasks/activity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(taskActivity)
    });
    if (response.status == 200) this.getTasksActivity();
  }
}

const storeContext = createContext(new AppStore());

const StoreProvider = ({ children }) => {
  const store = useContext(storeContext);
  return (
    <storeContext.Provider value={store}>{children}</storeContext.Provider>
  );
}

const useStore = () => {
  const store = useContext(storeContext);
  if (!store) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return store;
}

export { StoreProvider, useStore };