import { createContext, useState } from "react";
import type { ReactNode, FC } from "react";

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string, description: string) => void;
  updateTask: (id: string, title: string, description: string) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined,
);

export const TaskProvider: FC<{ children: ReactNode }> = ({ children }) => {
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

  const addTask = (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (id: string, title: string, description: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title, description } : task,
      ),
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const value: TaskContextType = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
