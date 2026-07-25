import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { Container, Button, Card } from "react-bootstrap";

export const Login = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div className="text-center mt-5">Loading...</div>;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Card style={{ width: "24rem" }} className="p-4 shadow text-center">
        <h3 className="mb-3">Task Manager Login</h3>
        <Button variant="primary" onClick={() => loginWithRedirect()}>
          Sign In / Sign Up
        </Button>
      </Card>
    </Container>
  );
};
