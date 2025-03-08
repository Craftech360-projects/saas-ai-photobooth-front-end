import { useState } from "react";
import { Navigate } from "react-router-dom";

// This is a simple authentication component
// In a real application, you would use a more secure authentication method
export function AdminAuth({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("admin_authenticated") === "true"
  );
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Simple password check - in a real app, use proper authentication
  const adminPassword = "admin123"; // This should be stored securely in a real app

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === adminPassword) {
      localStorage.setItem("admin_authenticated", "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6 text-center text-violet-800">Admin Login</h1>
          
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter admin password"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-violet-600 text-white py-2 rounded-md hover:bg-violet-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div> */}
      {children}
    </div>
  );
}