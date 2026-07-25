import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTaskContext } from "../hooks/useTaskContext";
import { Container, Card, Form, Button, Badge } from "react-bootstrap";

export const TaskDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tasks, updateTask, toggleTask, deleteTask } = useTaskContext();

  const task = tasks.find((t) => t.id === id);

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task?.title ?? "");
  const [desc, setDesc] = useState(task?.description ?? "");
  const [error, setError] = useState("");

  if (!task) {
    return (
      <Container className="mt-5">
        <p>Task not found.</p>
        <Button onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </Button>
      </Container>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    setError("");
    updateTask(task.id, title, desc);
    setEditing(false);
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "600px" }}>
      <Button
        variant="link"
        className="mb-3 ps-0"
        onClick={() => navigate("/dashboard")}
      >
        &larr; Back to Dashboard
      </Button>
      <Card className="p-4 shadow-sm">
        {editing ? (
          <Form onSubmit={handleSave}>
            {error && <div className="text-danger mb-2">{error}</div>}
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                isInvalid={!!error}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="success" className="me-2">
              Save
            </Button>
            <Button variant="secondary" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          </Form>
        ) : (
          <>
            <h3>{task.title}</h3>
            <Badge bg={task.completed ? "success" : "warning"} className="mb-3">
              {task.completed ? "Completed" : "Pending"}
            </Badge>
            <p>{task.description}</p>
            <div className="mt-3">
              <Button
                variant="primary"
                className="me-2"
                onClick={() => setEditing(true)}
              >
                Edit
              </Button>
              <Button
                variant="outline-secondary"
                className="me-2"
                onClick={() => toggleTask(task.id)}
              >
                {task.completed ? "Mark Pending" : "Mark Complete"}
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => {
                  deleteTask(task.id);
                  navigate("/dashboard");
                }}
              >
                Delete
              </Button>
            </div>
          </>
        )}
      </Card>
    </Container>
  );
};
