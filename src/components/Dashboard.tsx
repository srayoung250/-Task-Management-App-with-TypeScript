import React, { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
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
import { useNavigate } from "react-router-dom";

export const Dashboard: React.FC = () => {
  const context = useContext(TaskContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  if (!context) return null;
  const { tasks, user, logout, addTask, deleteTask, toggleTask } = context;

  if (!user.isAuthenticated) {
    navigate("/");
    return null;
  }

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask(title, desc);
    setTitle("");
    setDesc("");
  };

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Welcome, {user.name}</h2>
        <Button
          variant="outline-danger"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Logout
        </Button>
      </div>

      <Row>
        <Col md={4}>
          <Card className="p-3 shadow-sm mb-4">
            <h4>Add New Task</h4>
            <Form onSubmit={handleCreate}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
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
                <div>
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
