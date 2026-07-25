import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { TaskDetails } from "./components/TaskDetails";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <TaskProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks/:id"
            element={
              <ProtectedRoute>
                <TaskDetails />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </TaskProvider>
  );
}

export default App;
