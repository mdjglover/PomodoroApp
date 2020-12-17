import React, { useContext, createContext } from "react";
import { observable, computed, action, makeObservable, runInAction } from "mobx";
import { useLocalStore } from "mobx-react";

class AppStore {
  tasks = []

  constructor() {
    makeObservable(this, {
      tasks: observable,
      taskCount: computed,
      getTasks: action,
      addTask: action,
      updateTaskProgress: action,
      deleteTask: action
    });

    this.getTasks();
  }


  get taskCount() {
    return this.tasks.length;
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

    console.log(task);
    console.log(JSON.stringify(task));
    let response = await fetch("tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    });

    console.log(response);
    if (response.status == 200) this.getTasks();
  }

  async updateTaskProgress(task) {
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
      body: JSON.stringify(task)
    });
    if (response.status == 200) this.getTasks();
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