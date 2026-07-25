import React, { createContext, useState, ReactNode } from "react";
import { Task, User } from "../types/task";

interface TaskContextType {
  tasks: Task[];
  user: User;
  login: (name: string) => void;
  logout: () => void;
  addTask: (title: string, description: string) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined,
);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Learn TypeScript",
      description: "Understand types and interfaces",
      completed: false,
    },
    {
      id: "2",
      title: "Finish Bootcamp",
      description: "Complete all remaining modules",
      completed: false,
    },
  ]);

  const [user, setUser] = useState<User>({ name: "", isAuthenticated: false });

  const login = (name: string) => setUser({ name, isAuthenticated: true });
  const logout = () => setUser({ name: "", isAuthenticated: false });

  const addTask = (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  return (
    <TaskContext.Provider
      value={{ tasks, user, login, logout, addTask, deleteTask, toggleTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};
