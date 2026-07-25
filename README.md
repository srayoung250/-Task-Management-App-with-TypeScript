# Task Management Application (React & TypeScript)

A robust, type-safe task management web application built with **React**, **TypeScript**, **React Router**, and **React Bootstrap**. This application features global state management via the Context API, user session handling, and full CRUD (Create, Read, Update, Delete) capabilities for task organization.

---

## Features

- **TypeScript Type Safety:** Built with explicit interfaces and type definitions for tasks and user states to catch runtime bugs early.
- **Global State Management:** Leverages React's **Context API** (`TaskContext`) to share user authentication and task arrays seamlessly across components without prop drilling.
- **Authentication Flow:** Simple mock login/session screen that routes users securely to their private dashboard.
- **Task Dashboard:** Interactive CRUD interface allowing users to:
  - Add new tasks with titles and descriptions.
  - Toggle task completion status dynamically (with strike-through styling).
  - Delete tasks instantly from the list.
- **Responsive Styling:** Styled using **React Bootstrap** for a clean, modern UI out-of-the-box.

---

## Project Architecture & File Structure

```text
task-manager/
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx    # Main task management interface & CRUD actions
│   │   └── Login.tsx        # User authentication form
│   ├── context/
│   │   └── TaskContext.tsx  # Global state provider and context definition
│   ├── types/
│   │   └── task.ts          # TypeScript interfaces for Task and User objects
│   ├── App.tsx              # Root component housing BrowserRouter and Routes
│   ├── main.tsx             # Application entry point with Bootstrap styles
│   └── index.css            # Custom global styles
├── package.json
└── tsconfig.json
```
