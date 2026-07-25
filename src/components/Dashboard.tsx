import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useTaskContext } from "../hooks/useTaskContext";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  ListGroup,
  Badge,
} from "react-bootstrap";

export const Dashboard = () => {
  const { user, logout } = useAuth0();
  const { tasks, addTask, deleteTask, toggleTask } = useTaskContext();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    setError("");
    addTask(title, desc);
    setTitle("");
    setDesc("");
  };

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Welcome, {user?.name}</h2>
        <Button
          variant="outline-danger"
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          Logout
        </Button>
      </div>

      <Row>
        <Col md={4}>
          <Card className="p-3 shadow-sm mb-4">
            <h4>Add New Task</h4>
            {error && <div className="text-danger mb-2">{error}</div>}
            <Form onSubmit={handleCreate}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  isInvalid={!!error}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </Form.Group>
              <Button variant="success" type="submit" className="w-100">
                Add Task
              </Button>
            </Form>
          </Card>
        </Col>

        <Col md={8}>
          <h4>Your Tasks</h4>
          <ListGroup>
            {tasks.map((task) => (
              <ListGroup.Item
                key={task.id}
                className="d-flex justify-content-between align-items-center mb-2 shadow-sm"
              >
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/tasks/${task.id}`)}
                >
                  <h5
                    style={{
                      textDecoration: task.completed ? "line-through" : "none",
                    }}
                  >
                    {task.title}
                  </h5>
                  <p className="mb-1 text-muted">{task.description}</p>
                  <Badge bg={task.completed ? "success" : "warning"}>
                    {task.completed ? "Completed" : "Pending"}
                  </Badge>
                </div>
                <div>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="me-2"
                    onClick={() => toggleTask(task.id)}
                  >
                    {task.completed ? "Undo" : "Complete"}
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};
