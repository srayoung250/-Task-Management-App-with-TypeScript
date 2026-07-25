# Task Management App (TypeScript + React)

A task management application built with React, TypeScript, and Auth0 authentication. Users can sign in, create and manage tasks, mark them complete, and edit task details.

## Features

- **Authentication** — Secure login/logout via Auth0 (hosted login page, handles both sign-in and registration)
- **Protected Routes** — Dashboard and task detail pages are only accessible when authenticated
- **Task Dashboard** — View all tasks, create new ones, mark complete/pending, delete
- **Task Details Page** — View full task info and edit title/description in place
- **Form Validation** — Visible error messages on empty task titles
- **Global State** — Task data managed via React Context API with typed hooks
- **Type Safety** — TypeScript interfaces for `Task` and context shape throughout

## Tech Stack

- React + TypeScript
- Vite
- React Router
- React Bootstrap
- Auth0 (`@auth0/auth0-react`)

### 1. Configure Auth0

1. Create a free account at [auth0.com](https://auth0.com)
2. Create a new Application → type **Single Page Web Application**
3. In the app's **Settings** tab, note your **Domain** and **Client ID**
4. Under **Application URIs**, set:
   - **Allowed Callback URLs**: `http://localhost:5173/dashboard`
   - **Allowed Logout URLs**: `http://localhost:5173`
   - **Allowed Web Origins**: `http://localhost:5173`
5. Save changes

### 2. Environment variables

Create a `.env` file in the project root:

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
