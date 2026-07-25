import React, { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

export const Login: React.FC = () => {
  const [name, setName] = useState("");
  const context = useContext(TaskContext);
  const navigate = useNavigate();

  if (!context) return null;
  const { login } = context;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    login(name);
    navigate("/dashboard");
  };

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Card style={{ width: "24rem" }} className="p-4 shadow">
        <h3 className="text-center mb-3">Task Manager Login</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username / Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Sign In
          </Button>
        </Form>
      </Card>
    </Container>
  );
};
