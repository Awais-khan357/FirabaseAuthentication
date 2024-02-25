// PrivateRoute.js
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function PrivateRoute({ component: Component }) {
  const { authenticated, error } = useAuth();

  if (error) {
    return <div>Error: {error.message}</div>; // Handle errors
  }

  return (
    <Route
      element={authenticated ? <Component /> : <Navigate to="/" replace />}
    />
  );
}

export default PrivateRoute;
