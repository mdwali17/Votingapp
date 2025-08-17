import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ user, children, requiredRole }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If a role is required but the user doesn't have it → block
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />; // send them to dashboard or home
  }

  return children;
}
