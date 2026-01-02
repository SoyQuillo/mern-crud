import { createContext, useContext, useState } from "react";
import {
  createTaskRequest,
  getTasksRequest,
  deleteTaskRequest,
  getTaskRequest,
  updateTaskRequest
} from "../api/task";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }

  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    const res = await getTasksRequest();
    setTasks(res.data);
  };

  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task);
      setTasks(prev => [res.data, ...prev]);
      return res.data;
    } catch (e) {
      console.log(e.response?.data || e.message);
      throw e;
    }
  }; 

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);

      if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id));
    } catch (e) {
      console.log(e);
    }
  };

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };

  const updateTask = async (id, task) => {
    try{
      const res = await updateTaskRequest(id, task)
    }catch(e){
      console.log(e)
    }
  }

  return (
    <TaskContext.Provider
      value={{ tasks, createTask, getTasks, deleteTask, getTask, updateTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}
