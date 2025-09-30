// src/router/index.jsx
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout";
import Home from "../pages/Home";
import About from "../pages/About"; 
import Login from "../pages/Login";
import Register from "../pages/Register";
import UserDashboard from "../pages/UserDashboard";
import { AuthProvider } from "../context/AuthContext";
import ProfilePage from "../pages/Profile";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Layout />
      </AuthProvider>
    ),
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "dashboard", element: <UserDashboard /> },
      { path: "profile", element: <ProfilePage />}
    ],
  },
]);

export default router;
