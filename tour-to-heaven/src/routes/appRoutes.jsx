// src/routes/appRoutes.jsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout";
import Home from "../pages/Home";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UserDashboard from "../pages/UserDashboard";
import ProfilePage from "../pages/Profile";
import ScrollToTop from "../components/ScrollToTop";
import CustomizeTrip from "../pages/CustomizeTrip";
import AdminDashboard from "../pages/AdminDashboard";
import Destination from "../pages/Destination";
import Packages from "../pages/Packages"
import AllReviews from "../pages/AllReviews";
import Contact from "../pages/Contact";

// Layout ke andar ScrollToTop wrap karenge
const withScrollToTop = (element) => (
  <>
    <ScrollToTop />
    {element}
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: withScrollToTop(<Layout />), // ✅ wrap layout
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "dashboard", element: <UserDashboard /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "customize-trip", element: <CustomizeTrip /> },
      { path: "admin-dashboard", element: <AdminDashboard /> },
      {path: "destinations", element: <Destination />},
      {path: "packages", element: <Packages/>},
      {path: "reviews", element: <AllReviews />},
      {path: "contact", element: <Contact />}
    ],
  },
]);

export default router;
